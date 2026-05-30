-- =============================================================
-- challenges / challenge_applications / leaderboard
-- Supabase 대시보드 > SQL Editor 에 붙여넣고 실행하세요.
-- =============================================================

-- 1) 챌린지 (공개 읽기)
create table if not exists public.challenges (
  id               text primary key,
  title            text not null,
  description      text not null,
  period           text not null,
  total_rounds     integer not null default 0,
  completed_rounds integer not null default 0,
  participants     integer not null default 0,
  reward           text not null,
  status           text not null check (status in ('recruiting', 'ongoing', 'closed')),
  season_ids       integer[] not null default '{}',
  sort_order       integer not null default 0,
  created_at       timestamptz not null default now()
);

alter table public.challenges enable row level security;

drop policy if exists "challenges_select_all" on public.challenges;
create policy "challenges_select_all"
  on public.challenges for select using (true);

-- 2) 챌린지 신청 (사용자별, 본인 것만 접근)
create table if not exists public.challenge_applications (
  user_id      uuid not null references auth.users (id) on delete cascade,
  challenge_id text not null references public.challenges (id) on delete cascade,
  created_at   timestamptz not null default now(),
  primary key (user_id, challenge_id)
);

alter table public.challenge_applications enable row level security;

drop policy if exists "applications_select_own" on public.challenge_applications;
create policy "applications_select_own"
  on public.challenge_applications for select using (auth.uid() = user_id);

drop policy if exists "applications_insert_own" on public.challenge_applications;
create policy "applications_insert_own"
  on public.challenge_applications for insert with check (auth.uid() = user_id);

drop policy if exists "applications_delete_own" on public.challenge_applications;
create policy "applications_delete_own"
  on public.challenge_applications for delete using (auth.uid() = user_id);

-- 3) 신청/취소 시 challenges.participants 자동 증감 (집계는 공개, 개인정보는 비공개)
create or replace function public.sync_challenge_participants()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if (tg_op = 'INSERT') then
    update public.challenges set participants = participants + 1 where id = new.challenge_id;
    return new;
  elsif (tg_op = 'DELETE') then
    update public.challenges set participants = greatest(0, participants - 1) where id = old.challenge_id;
    return old;
  end if;
  return null;
end;
$$;

drop trigger if exists trg_apps_participants on public.challenge_applications;
create trigger trg_apps_participants
  after insert or delete on public.challenge_applications
  for each row execute function public.sync_challenge_participants();

-- 4) 리더보드 (공개 읽기)
create table if not exists public.leaderboard (
  rank          integer primary key,
  nickname      text not null,
  average_score integer not null,
  streak_weeks  integer not null
);

alter table public.leaderboard enable row level security;

drop policy if exists "leaderboard_select_all" on public.leaderboard;
create policy "leaderboard_select_all"
  on public.leaderboard for select using (true);

-- 5) 시드 데이터
insert into public.challenges
  (id, title, description, period, total_rounds, completed_rounds, participants, reward, status, season_ids, sort_order)
values
  ('season-7-sprint', '시즌1~7 완주 챌린지',
   '매주 한 회차씩, 시즌1부터 7까지 28회분을 끝까지 풀어내는 정주행 챌린지입니다.',
   '2026.06.01 ~ 2026.09.20', 28, 11, 342, '완주 시 다음 시즌 패스 20% 할인 쿠폰', 'ongoing', '{1,2,3,4,5,6,7}', 1),
  ('weekly-real-test', '매주 실전 모의고사 인증',
   '매주 일요일, 실전처럼 100분 안에 한 회차를 풀고 자동채점으로 성적을 인증합니다.',
   '2026.06.07 ~ 2026.08.30', 12, 4, 521, '8주 연속 인증 시 한정판 OMR 굿즈', 'ongoing', '{1,2,3,4,5,6}', 2),
  ('grade-up', '여름방학 1등급 도약 챌린지',
   '방학 동안 표준점수 10점 상승을 목표로, 자동채점 성적 추이를 함께 관리합니다.',
   '2026.07.20 ~ 2026.08.17', 8, 0, 87, '목표 달성 시 출제자 첨삭 1회 제공', 'recruiting', '{5,6}', 3),
  ('spring-finisher', '봄 시즌1~3 마스터',
   '시즌1~3 12회분을 한 달 안에 완주하며 실전 감각을 끌어올린 챌린지입니다.',
   '2026.03.02 ~ 2026.03.31', 12, 12, 268, '완주 인증서 발급 완료', 'closed', '{1,2,3}', 4)
on conflict (id) do nothing;

insert into public.leaderboard (rank, nickname, average_score, streak_weeks) values
  (1, '수학마스터', 138, 11),
  (2, '미적분지박령', 135, 11),
  (3, '1등급가자', 132, 10),
  (4, '확통러버', 129, 9),
  (5, '히카팬', 127, 9)
on conflict (rank) do nothing;
