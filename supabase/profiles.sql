-- =============================================================
-- profiles 테이블: auth.users(인증 전용)와 분리된 회원 정보 테이블
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- =============================================================

-- 1) 테이블 생성
create table if not exists public.profiles (
  id         uuid primary key references auth.users (id) on delete cascade,
  name       text,
  phone      text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is '앱에서 관리하는 회원 정보(배송 전화번호 등). auth.users와 1:1.';

-- 2) RLS(행 수준 보안) 활성화
alter table public.profiles enable row level security;

-- 3) 정책: 본인 행만 조회/생성/수정 가능
drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using ((select auth.uid()) = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check ((select auth.uid()) = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

-- 4) updated_at 자동 갱신 트리거
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

-- 5) 회원가입 시 profiles 행 자동 생성 트리거
--    가입 때 넘긴 user_metadata의 name, phone을 복사한다.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, name, phone)
  values (
    new.id,
    new.raw_user_meta_data ->> 'name',
    new.raw_user_meta_data ->> 'phone'
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 6) (선택) 이미 가입돼 있던 기존 사용자 백필
--    기존 auth.users에 대해 profiles 행이 없으면 만들어 준다.
insert into public.profiles (id, name, phone)
select
  u.id,
  u.raw_user_meta_data ->> 'name',
  u.raw_user_meta_data ->> 'phone'
from auth.users u
on conflict (id) do nothing;
