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
  on public.orders for select using (auth.uid() = user_id);

drop policy if exists "orders_insert_own" on public.orders;
create policy "orders_insert_own"
  on public.orders for insert with check (auth.uid() = user_id);

drop policy if exists "orders_update_own" on public.orders;
create policy "orders_update_own"
  on public.orders for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

drop policy if exists "order_items_select_own" on public.order_items;
create policy "order_items_select_own"
  on public.order_items for select using (auth.uid() = user_id);

drop policy if exists "order_items_insert_own" on public.order_items;
create policy "order_items_insert_own"
  on public.order_items for insert with check (auth.uid() = user_id);
