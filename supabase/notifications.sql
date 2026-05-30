-- =============================================================
-- notifications 테이블: 계정에 영구 저장되는 알림
-- (주문/배송, 챌린지 신청, 가입 환영 등)
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- =============================================================

-- 1) 테이블 생성
create table if not exists public.notifications (
  id         uuid primary key default gen_random_uuid(),
  user_id    uuid not null references auth.users (id) on delete cascade,
  type       text not null default 'system'
             check (type in ('order', 'promo', 'system')),
  title      text not null,
  body       text not null,
  read       boolean not null default false,
  created_at timestamptz not null default now()
);

comment on table public.notifications is '계정별 영구 알림. user_id로 소유자 구분.';

create index if not exists notifications_user_created_idx
  on public.notifications (user_id, created_at desc);

-- 2) RLS 활성화
alter table public.notifications enable row level security;

-- 3) 정책: 본인 알림만 조회/생성/수정/삭제
drop policy if exists "notifications_select_own" on public.notifications;
create policy "notifications_select_own"
  on public.notifications for select
  using ((select auth.uid()) = user_id);

drop policy if exists "notifications_insert_own" on public.notifications;
create policy "notifications_insert_own"
  on public.notifications for insert
  with check ((select auth.uid()) = user_id);

drop policy if exists "notifications_update_own" on public.notifications;
create policy "notifications_update_own"
  on public.notifications for update
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "notifications_delete_own" on public.notifications;
create policy "notifications_delete_own"
  on public.notifications for delete
  using ((select auth.uid()) = user_id);

-- 4) 회원가입 시 환영 알림 자동 생성 트리거
create or replace function public.handle_new_user_welcome()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.notifications (user_id, type, title, body)
  values (
    new.id,
    'system',
    'HIDDEN KICE 가입을 환영합니다',
    '회원가입이 완료되었습니다. 다양한 챌린지와 학습 콘텐츠를 만나보세요.'
  );
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_welcome on auth.users;
create trigger on_auth_user_created_welcome
  after insert on auth.users
  for each row execute function public.handle_new_user_welcome();
