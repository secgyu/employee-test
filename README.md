This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 진행 상황

- 전역 헤더(GNB) 구현: 로고, 내비게이션(활성/호버 상태), 우측 아이콘(장바구니/알림/유저)
- 브랜드 컬러 토큰(`--color-brand` 등) 및 Pretendard 폰트 적용

## 폴더 구조

```text
app/                      # 라우팅 (App Router)
  layout.tsx              # 공통 레이아웃 (Header 포함)
  page.tsx                # 홈
src/
  components/
    layout/               # Header, NavLinks 등 레이아웃 컴포넌트
    icons/                # 아이콘
  constants/              # 전역 상수 (사이트 메타, 내비게이션)
  assets/                 # 이미지 등 정적 에셋 (로고)
```
