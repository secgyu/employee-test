"use server";

import { createClient } from "@/src/lib/supabase/server";

export interface ToggleApplicationResult {
  ok: boolean;
  /** 처리 후 신청 상태 */
  joined?: boolean;
  /** 비로그인 상태 */
  needLogin?: boolean;
  error?: string;
}

/**
 * 챌린지 신청/취소 토글. (모집중 챌린지만 허용)
 * 신청 시 알림 생성, participants는 DB 트리거가 자동 증감.
 */
export async function toggleApplicationAction(challengeId: string): Promise<ToggleApplicationResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, needLogin: true };

  const { data: challenge } = await supabase
    .from("challenges")
    .select("title, status")
    .eq("id", challengeId)
    .maybeSingle();

  if (!challenge) return { ok: false, error: "챌린지를 찾을 수 없습니다." };
  if (challenge.status !== "recruiting") return { ok: false, error: "모집 중인 챌린지가 아닙니다." };

  const { data: existing } = await supabase
    .from("challenge_applications")
    .select("challenge_id")
    .eq("user_id", user.id)
    .eq("challenge_id", challengeId)
    .maybeSingle();

  if (existing) {
    const { error } = await supabase
      .from("challenge_applications")
      .delete()
      .eq("user_id", user.id)
      .eq("challenge_id", challengeId);
    if (error) return { ok: false, error: error.message };
    return { ok: true, joined: false };
  }

  const { error } = await supabase
    .from("challenge_applications")
    .insert({ user_id: user.id, challenge_id: challengeId });
  if (error) return { ok: false, error: error.message };

  await supabase.from("notifications").insert({
    user_id: user.id,
    type: "system",
    title: "챌린지 신청 완료",
    body: `'${challenge.title}' 챌린지 신청이 완료되었습니다.`,
  });

  return { ok: true, joined: true };
}
