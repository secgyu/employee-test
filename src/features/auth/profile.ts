import { createClient } from "@/src/lib/supabase/server";

export interface Profile {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
}

/**
 * 현재 로그인 사용자의 프로필을 반환한다.
 * profiles 행이 아직 없으면 auth user_metadata로 폴백한다.
 * 미로그인 시 null.
 */
export async function getProfile(): Promise<Profile | null> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: row } = await supabase
    .from("profiles")
    .select("name, phone")
    .eq("id", user.id)
    .maybeSingle();

  const metaName = (user.user_metadata?.name as string | undefined) ?? null;
  const metaPhone = (user.user_metadata?.phone as string | undefined) ?? null;

  return {
    id: user.id,
    email: user.email ?? null,
    name: row?.name ?? metaName,
    phone: row?.phone ?? metaPhone,
  };
}
