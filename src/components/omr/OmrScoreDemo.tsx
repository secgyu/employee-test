"use client";

import { useMemo, useState } from "react";

/** 데모용 샘플 회차 정답 (5지선다 10문항) */
const ANSWER_KEY = [3, 5, 1, 4, 2, 2, 5, 3, 1, 4] as const;
const CHOICES = ["①", "②", "③", "④", "⑤"] as const;

/** 데모용 등급컷 (원점수 100점 만점 기준, 회원 데이터·출제자 분석을 본뜬 모의 값) */
const GRADE_TABLE = [
  { grade: 1, min: 88, percentile: 96 },
  { grade: 2, min: 80, percentile: 89 },
  { grade: 3, min: 71, percentile: 77 },
  { grade: 4, min: 60, percentile: 60 },
  { grade: 5, min: 46, percentile: 41 },
  { grade: 6, min: 31, percentile: 23 },
  { grade: 7, min: 21, percentile: 11 },
  { grade: 8, min: 11, percentile: 4 },
  { grade: 9, min: 0, percentile: 1 },
] as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** 맞힌 개수로부터 등급·백분위·표준점수를 산출 (데모) */
function scoreResult(correctCount: number) {
  const rawScore = Math.round((correctCount / ANSWER_KEY.length) * 100);
  const band = GRADE_TABLE.find((row) => rawScore >= row.min) ?? GRADE_TABLE[GRADE_TABLE.length - 1];
  const standardScore = clamp(Math.round(60 + rawScore * 0.85), 45, 145);
  return { rawScore, grade: band.grade, percentile: band.percentile, standardScore };
}

export function OmrScoreDemo() {
  const [answers, setAnswers] = useState<(number | null)[]>(() => ANSWER_KEY.map(() => null));
  const [graded, setGraded] = useState(false);

  const correctCount = useMemo(() => answers.filter((answer, index) => answer === ANSWER_KEY[index]).length, [answers]);
  const answeredCount = useMemo(() => answers.filter((answer) => answer !== null).length, [answers]);
  const result = useMemo(() => (graded ? scoreResult(correctCount) : null), [graded, correctCount]);

  function mark(questionIndex: number, choice: number) {
    if (graded) return;
    setAnswers((prev) => prev.map((value, index) => (index === questionIndex ? choice : value)));
  }

  function reset() {
    setAnswers(ANSWER_KEY.map(() => null));
    setGraded(false);
  }

  return (
    <div className="rounded-2xl border border-[#E9EAEC] bg-white p-6 sm:p-8">
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-medium text-ink">2027 Hidden Kice 시즌1 · 샘플 OMR (10문항)</p>
        <p className="text-[13px] text-muted">
          {answeredCount}/{ANSWER_KEY.length} 마킹
        </p>
      </div>

      {/* OMR 마킹 */}
      <ul className="mt-5 divide-y divide-[#F1F2F4]">
        {ANSWER_KEY.map((correct, questionIndex) => {
          const selected = answers[questionIndex];
          const isUnanswered = graded && selected === null;
          const isWrong = graded && selected !== null && selected !== correct;
          return (
            <li key={questionIndex} className="flex items-center gap-4 py-3">
              <span className="w-8 shrink-0 text-[14px] font-medium text-muted">{questionIndex + 1}</span>
              <div className="flex flex-wrap gap-2">
                {CHOICES.map((label, choiceIndex) => {
                  const choice = choiceIndex + 1;
                  const isSelected = selected === choice;
                  const isAnswer = graded && correct === choice;

                  let tone = "border-[#E9EAEC] text-muted hover:border-brand/40";
                  if (isAnswer) tone = "border-emerald-500 bg-emerald-50 text-emerald-600";
                  else if (isSelected && graded) tone = "border-red-400 bg-red-50 text-red-500";
                  else if (isSelected) tone = "border-brand bg-brand text-brand-foreground";

                  return (
                    <button
                      key={choice}
                      type="button"
                      onClick={() => mark(questionIndex, choice)}
                      disabled={graded}
                      className={`h-9 w-9 rounded-full border text-[15px] transition-colors disabled:cursor-default ${tone}`}
                      aria-label={`${questionIndex + 1}번 ${choice}번 선택`}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
              {isWrong ? <span className="ml-auto text-[13px] text-red-500">오답</span> : null}
              {isUnanswered ? <span className="ml-auto text-[13px] text-muted">미응답</span> : null}
            </li>
          );
        })}
      </ul>

      {/* 액션 */}
      <div className="mt-5 flex gap-3">
        {!graded ? (
          <button
            type="button"
            disabled={answeredCount === 0}
            onClick={() => setGraded(true)}
            className="h-12 rounded-md bg-brand px-7 text-[15px] font-medium text-brand-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
          >
            자동 채점
          </button>
        ) : (
          <button
            type="button"
            onClick={reset}
            className="h-12 rounded-md border border-[#E9EAEC] px-7 text-[15px] font-medium text-ink transition-colors hover:border-brand/40"
          >
            다시 풀기
          </button>
        )}
      </div>

      {/* 결과 */}
      {result ? (
        <div className="mt-6 rounded-xl bg-brand/5 p-6">
          <p className="text-[13px] text-muted">
            {ANSWER_KEY.length}문항 중 {correctCount}개 정답 · 원점수 {result.rawScore}점
          </p>
          <div className="mt-4 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[28px] font-semibold text-brand">{result.grade}등급</p>
              <p className="mt-1 text-[13px] text-muted">등급</p>
            </div>
            <div>
              <p className="text-[28px] font-semibold text-brand">{result.percentile}</p>
              <p className="mt-1 text-[13px] text-muted">백분위</p>
            </div>
            <div>
              <p className="text-[28px] font-semibold text-brand">{result.standardScore}</p>
              <p className="mt-1 text-[13px] text-muted">표준점수</p>
            </div>
          </div>
          <p className="mt-4 text-[12px] leading-relaxed text-muted">
            * 본 결과는 서비스 이해를 돕기 위한 데모입니다. 실제 등급컷은 회차별 응시 데이터와 출제자의 분석을 반영해
            산출됩니다.
          </p>
        </div>
      ) : null}
    </div>
  );
}
