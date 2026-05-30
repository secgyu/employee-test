import { createClient } from "@/src/lib/supabase/server";
import type {
  ChallengeStatus,
  ChallengeWithState,
  LeaderboardEntry,
} from "@/src/features/challenges/types";

interface ChallengeRow {
  id: string;
  title: string;
  description: string;
  period: string;
  total_rounds: number;
  completed_rounds: number;
  participants: number;
  reward: string;
  status: ChallengeStatus;
  season_ids: number[];
}

const CHALLENGE_SELECT =
  "id, title, description, period, total_rounds, completed_rounds, participants, reward, status, season_ids";

function mapRow(row: ChallengeRow, joinedIds: Set<string>): ChallengeWithState {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    period: row.period,
    totalRounds: row.total_rounds,
    completedRounds: row.completed_rounds,
    participants: row.participants,
    reward: row.reward,
    status: row.status,
    seasonIds: row.season_ids ?? [],
    joined: joinedIds.has(row.id),
  };
}

/** 현재 사용자가 신청한 challenge_id 집합 */
async function getJoinedIds(
  supabase: Awaited<ReturnType<typeof createClient>>,
): Promise<Set<string>> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return new Set();

  const { data } = await supabase.from("challenge_applications").select("challenge_id");
  return new Set(((data as { challenge_id: string }[] | null) ?? []).map((row) => row.challenge_id));
}

/** 전체 챌린지 (sort_order 순) + 현재 사용자 신청 여부 */
export async function getChallenges(): Promise<ChallengeWithState[]> {
  const supabase = await createClient();
  const [{ data }, joinedIds] = await Promise.all([
    supabase.from("challenges").select(CHALLENGE_SELECT).order("sort_order", { ascending: true }),
    getJoinedIds(supabase),
  ]);

  return ((data as ChallengeRow[] | null) ?? []).map((row) => mapRow(row, joinedIds));
}

/** id로 챌린지 단건 + 신청 여부. 없으면 null. */
export async function getChallengeById(id: string): Promise<ChallengeWithState | null> {
  const supabase = await createClient();
  const [{ data }, joinedIds] = await Promise.all([
    supabase.from("challenges").select(CHALLENGE_SELECT).eq("id", id).maybeSingle(),
    getJoinedIds(supabase),
  ]);

  return data ? mapRow(data as ChallengeRow, joinedIds) : null;
}

/** 리더보드 (순위순) */
export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  const supabase = await createClient();
  const { data } = await supabase
    .from("leaderboard")
    .select("rank, nickname, average_score, streak_weeks")
    .order("rank", { ascending: true });

  return ((data as
    | { rank: number; nickname: string; average_score: number; streak_weeks: number }[]
    | null) ?? []).map((row) => ({
    rank: row.rank,
    nickname: row.nickname,
    averageScore: row.average_score,
    streakWeeks: row.streak_weeks,
  }));
}
