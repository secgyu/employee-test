import { type NextRequest } from "next/server";

import { updateSession } from "@/src/lib/supabase/proxy";

export async function proxy(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 다음을 제외한 모든 요청 경로에서 실행:
     * - _next/static, _next/image (정적/이미지)
     * - favicon.ico
     * - 이미지 파일 확장자
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
