import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LogoutButton } from "@/src/components/auth/LogoutButton";
import { ProfileForm } from "@/src/components/auth/ProfileForm";
import { getProfile } from "@/src/features/auth/profile";

export const metadata: Metadata = {
  title: "마이페이지 | HIDDEN KICE",
};

export default async function AccountPage() {
  const profile = await getProfile();

  if (!profile) redirect("/login");

  return (
    <section className="mx-auto flex w-full max-w-[600px] flex-col px-4 py-[80px]">
      <h1 className="text-[28px] font-semibold text-black">마이페이지</h1>
      <p className="mt-2 text-[15px] text-muted">계정 정보를 확인하고 배송 정보를 관리하세요.</p>

      <div className="mt-8 flex items-center gap-6 rounded-2xl border border-[#E9EAEC] px-6 py-5">
        <span className="w-20 shrink-0 text-[14px] font-medium text-muted">이메일</span>
        <span className="text-[15px] text-black">{profile.email}</span>
      </div>

      <div className="mt-6">
        <ProfileForm initialName={profile.name ?? ""} initialPhone={profile.phone ?? ""} />
      </div>

      <div className="mt-8 border-t border-[#F1F2F4] pt-8">
        <LogoutButton />
      </div>
    </section>
  );
}
