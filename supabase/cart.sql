-- =============================================================
-- cart_items 테이블: 로그인 사용자별 장바구니
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- (products 테이블이 먼저 생성돼 있어야 합니다)
-- =============================================================

-- 1) 테이블 생성 (사용자 + 상품 조합당 1행)
create table if not exists public.cart_items (
  user_id    uuid not null references auth.users (id) on delete cascade,
  product_id text not null references public.products (id) on delete cascade,
  quantity   integer not null default 1 check (quantity > 0),
  created_at timestamptz not null default now(),
  primary key (user_id, product_id)
);

comment on table public.cart_items is '사용자별 장바구니. 가격/이름은 products와 조인해 최신값 사용.';

-- 2) RLS 활성화
alter table public.cart_items enable row level security;

-- 3) 정책: 본인 장바구니만 조회/생성/수정/삭제
drop policy if exists "cart_select_own" on public.cart_items;
create policy "cart_select_own"
  on public.cart_items for select
  using (auth.uid() = user_id);

drop policy if exists "cart_insert_own" on public.cart_items;
create policy "cart_insert_own"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

drop policy if exists "cart_update_own" on public.cart_items;
create policy "cart_update_own"
  on public.cart_items for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

drop policy if exists "cart_delete_own" on public.cart_items;
create policy "cart_delete_own"
  on public.cart_items for delete
  using (auth.uid() = user_id);
