## 요구사항 구현 내역

1. Next.js 기반으로 프론트 작업
   -> Next.js 16(App Router)으로 구현

2. vercel 기반으로 완료 내용 deploy
   -> vercel 배포 완료 : https://employee-test-phi.vercel.app/products

3. supabase를 이용해서 백엔드 구현
   -> 구현 완료. 상품·리더보드는 조회 전용, 장바구니·주문·챌린지 신청·알림·프로필은 사용자별로 저장.
   -> 인증은 Supabase Auth 사용

4. 페이지를 기본적으로 ssr 방식으로 하고, 상품리스트만 csr로 할것
   -> 기본적으로 SSR을 사용하기위해
   **products/page.tsx**는 서버컴포넌트로 되어있으며, 캐러셀과 레이아웃은 서버상에서 렌더링.
   상품리스트만 CSR로 하기위해 **products/ProductList.tsx**는 클라이언트 컴포넌트로 구성.
5. 폴더 구조를 확장 가능한 구조로 하고, 이에 대한 설명
   -> **feature-first 구조**와 **components폴더**를 사용해 확장 가능한 폴더 구성.
   **feature/<도메인>/** 폴더에 도메인로직 (api, 비즈니스로직, 타입, 공통코드)
   **components** 폴더에 화면 UI 컴포넌트 구성. (ui 컴포넌트 JSX, 스타일링)
   새 도메인 추가 시 features/<도메인> 폴더만 늘리면 되어 사이드이펙트 없이 확장 가능

6. vercel 주소와 github repo 주소를 제출
   vercel 배포 주소 : https://employee-test-phi.vercel.app/products
   github repo 주소 : https://github.com/secgyu/employee-test

## 실행법

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 구현

- 첫 페이지 구현 완료
- 나머지 페이지는 자발적으로 구현 (~~)

## 폴더 구조

```text
app/                      # 라우팅 (App Router)
  layout.tsx              # 공통 레이아웃 (Header 포함)
  page.tsx                # 홈
src/
  features/               # 도메인 로직 (api, actions, types, context 등)
    auth/                 # 인증/프로필 (로그인, 회원가입, 검증)
    products/             # 상품 조회, 가격 포맷
    cart/                 # 장바구니 상태/조회 (CartContext)
    orders/               # 주문 생성(RPC)/조회
    challenges/           # 챌린지/리더보드, 신청 토글
    notifications/        # 알림 상태/조회 (NotificationContext)
  components/             # 화면 UI 컴포넌트 (JSX, 스타일링)
    layout/               # Header, NavLinks 등 레이아웃 컴포넌트
    products/             # 상품 목록/카드/구매 UI
    cart/ checkout/       # 장바구니, 결제 UI
    challenges/ auth/     # 챌린지, 로그인/회원가입 UI
    notifications/ home/  # 알림, 홈 캐러셀 등
    icons/                # 아이콘
  lib/supabase/           # Supabase 클라이언트 (server/client) 및 헬퍼
  constants/              # 전역 상수 (사이트 메타, 내비게이션)
  assets/                 # 이미지 등 정적 에셋 (로고)
```
