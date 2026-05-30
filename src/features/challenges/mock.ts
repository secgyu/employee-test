import type { Challenge, LeaderboardEntry, SeasonInfo } from "./types";

/** 시즌별 커리큘럼 (실제 Hidden Kice 시즌 구성을 반영) */
export const SEASONS: SeasonInfo[] = [
  {
    id: 1,
    label: "SEASON 1",
    title: "MBTI 입문",
    detail:
      "2025 수능 시험지의 'MBTI'인 ISFJ를 기준으로, 요소가 하나씩만 다른 ESFJ·INFJ·ISTJ·ISFP 유형의 시험지로 감을 잡아갑니다. (가이드북 제공)",
  },
  {
    id: 2,
    label: "SEASON 2",
    title: "E 유형 시험지",
    detail:
      "전체적으로 어렵고 배울 점이 많은 시험지. 기출의 다양한 요소와 빈출 스타일을 우수 문항으로 학습합니다. (가이드북 제공)",
  },
  {
    id: 3,
    label: "SEASON 3",
    title: "N 유형 시험지",
    detail:
      "전체적으로 실험적인 시험지. 6월 평가원을 반영하되 그에 국한되지 않은 다양한 스타일을 연습합니다.",
  },
  {
    id: 4,
    label: "SEASON 4",
    title: "T 유형 시험지",
    detail:
      "논리적 사고를 주로 요구하는 시험지. 6월 평가원을 포함한 기출 요소와 빈출 스타일을 학습합니다. (가이드북 제공)",
  },
  {
    id: 5,
    label: "SEASON 5",
    title: "P 유형 시험지",
    detail:
      "문항 간 난이도 차이가 큰 시험지. 가장 어려운 문항으로 킬러가 매우 어려운 시험을 대비합니다.",
  },
  {
    id: 6,
    label: "SEASON 6",
    title: "수능 최종 대비",
    detail: "9월 평가원 경향을 반영해 수능에서 출제될 수 있는 다양한 MBTI의 시험지로 구성합니다.",
  },
  {
    id: 7,
    label: "SEASON 7",
    title: "수능 최종 대비",
    detail:
      "6·9월 평가원 경향을 반영해, 더 연습이 필요한 다양한 MBTI의 시험지로 마무리합니다.",
  },
];

export const CHALLENGES: Challenge[] = [
  {
    id: "season-7-sprint",
    title: "시즌1~7 완주 챌린지",
    description: "매주 한 회차씩, 시즌1부터 7까지 28회분을 끝까지 풀어내는 정주행 챌린지입니다.",
    period: "2026.06.01 ~ 2026.09.20",
    totalRounds: 28,
    completedRounds: 11,
    participants: 342,
    reward: "완주 시 다음 시즌 패스 20% 할인 쿠폰",
    status: "ongoing",
    seasonIds: [1, 2, 3, 4, 5, 6, 7],
  },
  {
    id: "weekly-real-test",
    title: "매주 실전 모의고사 인증",
    description: "매주 일요일, 실전처럼 100분 안에 한 회차를 풀고 자동채점으로 성적을 인증합니다.",
    period: "2026.06.07 ~ 2026.08.30",
    totalRounds: 12,
    completedRounds: 4,
    participants: 521,
    reward: "8주 연속 인증 시 한정판 OMR 굿즈",
    status: "ongoing",
    seasonIds: [1, 2, 3, 4, 5, 6],
  },
  {
    id: "grade-up",
    title: "여름방학 1등급 도약 챌린지",
    description: "방학 동안 표준점수 10점 상승을 목표로, 자동채점 성적 추이를 함께 관리합니다.",
    period: "2026.07.20 ~ 2026.08.17",
    totalRounds: 8,
    completedRounds: 0,
    participants: 87,
    reward: "목표 달성 시 출제자 첨삭 1회 제공",
    status: "recruiting",
    seasonIds: [5, 6],
  },
  {
    id: "spring-finisher",
    title: "봄 시즌1~3 마스터",
    description: "시즌1~3 12회분을 한 달 안에 완주하며 실전 감각을 끌어올린 챌린지입니다.",
    period: "2026.03.02 ~ 2026.03.31",
    totalRounds: 12,
    completedRounds: 12,
    participants: 268,
    reward: "완주 인증서 발급 완료",
    status: "closed",
    seasonIds: [1, 2, 3],
  },
];

/** id로 챌린지 조회 */
export function getChallengeById(id: string): Challenge | undefined {
  return CHALLENGES.find((challenge) => challenge.id === id);
}

/** 모든 챌린지 id (정적 경로 생성용) */
export function getAllChallengeIds(): string[] {
  return CHALLENGES.map((challenge) => challenge.id);
}

/** 챌린지의 커리큘럼(포함 시즌) 조회 */
export function getChallengeCurriculum(challenge: Challenge): SeasonInfo[] {
  return challenge.seasonIds
    .map((seasonId) => SEASONS.find((season) => season.id === seasonId))
    .filter((season): season is SeasonInfo => season !== undefined);
}

export const LEADERBOARD: LeaderboardEntry[] = [
  { rank: 1, nickname: "수학마스터", averageScore: 138, streakWeeks: 11 },
  { rank: 2, nickname: "미적분지박령", averageScore: 135, streakWeeks: 11 },
  { rank: 3, nickname: "1등급가자", averageScore: 132, streakWeeks: 10 },
  { rank: 4, nickname: "확통러버", averageScore: 129, streakWeeks: 9 },
  { rank: 5, nickname: "히카팬", averageScore: 127, streakWeeks: 9 },
];
