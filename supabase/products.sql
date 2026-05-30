-- =============================================================
-- products 테이블: 스토어 상품
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- =============================================================

-- 1) 테이블 생성
create table if not exists public.products (
  id            text primary key,
  name          text not null,
  category      text not null check (category in ('pass', 'single')),
  price         integer,
  discount_rate integer,
  sale_price    integer,
  image_url     text,
  sort_order    integer not null default 0,
  created_at    timestamptz not null default now()
);

comment on table public.products is '스토어 상품. image_url에는 Storage 공개 URL을 저장한다.';

-- 2) RLS: 누구나 조회 가능(공개), 쓰기는 대시보드/서버에서만
alter table public.products enable row level security;

drop policy if exists "products_select_all" on public.products;
create policy "products_select_all"
  on public.products for select
  using (true);

-- 3) 시드 데이터 (이미지는 Storage 업로드 후 image_url 업데이트)
insert into public.products (id, name, category, price, discount_rate, sale_price, sort_order) values
  ('p01', '2026 Hidden Kice 단품 1회차', 'single', null,  null, null,   1),
  ('p02', '2026 Hidden Kice 시즌1',      'pass',   76000, 5,    72200,  2),
  ('p03', '2026 Hidden Kice 시즌2',      'pass',   76000, 5,    72200,  3),
  ('p04', '2026 Hidden Kice 시즌3',      'pass',   76000, 5,    72200,  4),
  ('p05', '2026 Hidden Kice 시즌4',      'pass',   76000, 5,    72200,  5),
  ('p06', '2026 Hidden Kice 시즌5',      'pass',   76000, 5,    72200,  6),
  ('p07', '2026 Hidden Kice 단품 2회차', 'single', null,  null, null,   7),
  ('p08', '2026 Hidden Kice 시즌6',      'pass',   76000, 5,    72200,  8),
  ('p09', '2026 Hidden Kice 단품 3회차', 'single', null,  null, null,   9),
  ('p10', '2026 Hidden Kice 시즌7',      'pass',   76000, 5,    72200, 10),
  ('p11', '2026 Hidden Kice 시즌8',      'pass',   76000, 5,    72200, 11),
  ('p12', '2026 Hidden Kice 시즌9',      'pass',   76000, 5,    72200, 12)
on conflict (id) do nothing;
