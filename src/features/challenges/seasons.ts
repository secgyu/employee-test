import type { SeasonInfo } from "@/src/features/challenges/types";

/** 시즌별 커리큘럼 (정적 콘텐츠) */
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
    detail: "전체적으로 실험적인 시험지. 6월 평가원을 반영하되 그에 국한되지 않은 다양한 스타일을 연습합니다.",
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
    detail: "문항 간 난이도 차이가 큰 시험지. 가장 어려운 문항으로 킬러가 매우 어려운 시험을 대비합니다.",
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
    detail: "6·9월 평가원 경향을 반영해, 더 연습이 필요한 다양한 MBTI의 시험지로 마무리합니다.",
  },
];

/** seasonIds 목록 → 커리큘럼 시즌 정보 */
export function getCurriculum(seasonIds: number[]): SeasonInfo[] {
  return seasonIds
    .map((seasonId) => SEASONS.find((season) => season.id === seasonId))
    .filter((season): season is SeasonInfo => season !== undefined);
}
