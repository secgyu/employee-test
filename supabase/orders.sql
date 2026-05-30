-- =============================================================
-- orders / order_items 테이블: 주문 (Stripe 등 PG 없이 주문 기록만)
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- (products 테이블이 먼저 생성돼 있어야 합니다)
-- =============================================================

-- 1) 주문 헤더
create table if not exists public.orders (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid not null references auth.users (id) on delete cascade,
  recipient_name  text not null,
  recipient_phone text not null,
  total_amount    integer not null default 0,
  status          text not null default 'paid' check (status in ('paid', 'cancelled')),
  created_at      timestamptz not null default now()
);

comment on table public.orders is '주문 헤더. 결제 연동 전이라 status는 기본 paid(주문완료) 처리.';

create index if not exists orders_user_created_idx
  on public.orders (user_id, created_at desc);

-- 2) 주문 상세 (주문 시점의 이름/가격을 스냅샷으로 보관)
create table if not exists public.order_items (
  id         uuid primary key default gen_random_uuid(),
  order_id   uuid not null references public.orders (id) on delete cascade,
  user_id    uuid not null references auth.users (id) on delete cascade,
  product_id text references public.products (id) on delete set null,
  name       text not null,
  unit_price integer not null,
  quantity   integer not null check (quantity > 0)
);

create index if not exists order_items_order_idx on public.order_items (order_id);

-- 3) RLS
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

drop policy if exists "orders_select_own" on public.orders;
create policy "orders_select_own"
  on public.orders for select using ((select auth.uid()) = user_id);

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own"
  on public.orders for insert with check ((select auth.uid()) = user_id);

drop policy if exists "orders_update_own" on public.orders;
create policy "orders_update_own"
  on public.orders for update using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);

drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own"
  on public.order_items for select using ((select auth.uid()) = user_id);

drop policy if exists "order_items_insert_own" on public.order_items;
create policy "order_items_insert_own"
  on public.order_items for insert with check ((select auth.uid()) = user_id);

-- 4) 체크아웃 RPC: 주문 생성 전 과정을 단일 트랜잭션으로 처리
--    (주문 헤더 + 상세 스냅샷 + 장바구니 비우기 + 알림을 원자적으로 실행)
--    security invoker라 호출자의 RLS가 그대로 적용된다.
create or replace function public.create_order(
  p_recipient_name  text,
  p_recipient_phone text
)
returns uuid
language plpgsql
security invoker
set search_path = public
as $$
declare
  v_user_id  uuid := (select auth.uid());
  v_order_id uuid;
  v_total    integer;
begin
  if v_user_id is null then
    raise exception 'AUTH_REQUIRED';
  end if;

  if not exists (select 1 from public.cart_items where user_id = v_user_id) then
    raise exception 'CART_EMPTY';
  end if;

  -- 금액은 DB의 현재 상품 가격으로 재계산 (클라이언트 값 신뢰 X)
  select coalesce(sum(coalesce(p.sale_price, p.price, 0) * c.quantity), 0)
    into v_total
  from public.cart_items c
  join public.products p on p.id = c.product_id
  where c.user_id = v_user_id;

  insert into public.orders (user_id, recipient_name, recipient_phone, total_amount, status)
  values (v_user_id, p_recipient_name, p_recipient_phone, v_total, 'paid')
  returning id into v_order_id;

  insert into public.order_items (order_id, user_id, product_id, name, unit_price, quantity)
  select v_order_id, v_user_id, p.id, p.name, coalesce(p.sale_price, p.price, 0), c.quantity
  from public.cart_items c
  join public.products p on p.id = c.product_id
  where c.user_id = v_user_id;

  delete from public.cart_items where user_id = v_user_id;

  insert into public.notifications (user_id, type, title, body)
  values (
    v_user_id,
    'order',
    '주문이 완료되었습니다',
    '총 ' || to_char(v_total, 'FM999,999,999') || '원 주문이 정상 접수되었습니다.'
  );

  return v_order_id;
end;
$$;
