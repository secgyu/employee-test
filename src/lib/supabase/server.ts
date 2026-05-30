import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

import { getSupabaseEnv } from "@/src/lib/supabase/env";

/**
 * 서버 컴포넌트/서버 액션/라우트 핸들러용 Supabase 클라이언트.
 * Next.js 16에서 cookies()는 async이므로 await로 접근한다.
 */
export async function createClient() {
  const { url, anonKey } = getSupabaseEnv();
  const cookieStore = await cookies();

  return createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            cookieStore.set(name, value, options);
          });
        } catch {
          // 서버 컴포넌트에서 호출된 경우 set이 불가능하다.
          // 세션 갱신은 proxy.ts에서 처리하므로 무시해도 안전하다.
        }
      },
    },
  });
}
