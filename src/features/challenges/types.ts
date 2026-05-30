/** 챌린지 진행 상태 */
export type ChallengeStatus = "recruiting" | "ongoing" | "closed";

/** 상태 → 화면 표시 라벨 */
export const CHALLENGE_STATUS_LABEL: Record<ChallengeStatus, string> = {
  recruiting: "모집중",
  ongoing: "진행중",
  closed: "종료",
};

export interface Challenge {
  id: string;
  title: string;
  description: string;
  /** 표시용 기간 (예: 2026.06.01 ~ 2026.07.13) */
  period: string;
  /** 총 회차 수 */
  totalRounds: number;
  /** 인증 완료된 회차 수 (진행률 계산용) */
  completedRounds: number;
  participants: number;
  reward: string;
  status: ChallengeStatus;
  /** 커리큘럼에 포함되는 시즌 id 목록 */
  seasonIds: number[];
}

/** 시즌(커리큘럼 단계) 정보 */
export interface SeasonInfo {
  id: number;
  label: string;
  title: string;
  detail: string;
}

/** 현재 사용자의 신청 여부가 포함된 챌린지 */
export interface ChallengeWithState extends Challenge {
  joined: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  nickname: string;
  /** 평균 표준점수 */
  averageScore: number;
  /** 연속 인증 주차 */
  streakWeeks: number;
}
