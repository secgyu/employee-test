"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { createClient } from "@/src/lib/supabase/client";

type SupabaseBrowserClient = ReturnType<typeof createClient>;

/**
 * Supabase 브라우저 클라이언트를 생성·유지하고,
 * 마운트 시점과 로그인 상태 변경 시 loader를 실행한다.
 *
 * @param loader 클라이언트를 받아 데이터를 적재하는 비동기 함수
 * @returns 안정적인 supabase 클라이언트와 수동 재조회용 reload
 */
export function useAuthScopedData(loader: (client: SupabaseBrowserClient) => Promise<void>) {
  const [supabase] = useState<SupabaseBrowserClient>(createClient);

  // loader는 매 렌더 새 클로저이므로 ref로 최신값을 유지한다.
  const loaderRef = useRef(loader);
  useEffect(() => {
    loaderRef.current = loader;
  });

  const reload = useCallback(() => loaderRef.current(supabase), [supabase]);

  useEffect(() => {
    void reload();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      void reload();
    });
    return () => subscription.unsubscribe();
  }, [supabase, reload]);

  return { supabase, reload };
}
