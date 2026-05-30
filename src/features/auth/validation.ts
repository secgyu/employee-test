/** 간단한 이메일 형식 검사 */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** 비밀번호 최소 길이 */
export const MIN_PASSWORD_LENGTH = 8;

/** 전화번호에서 숫자만 추출 */
export function normalizePhone(value: string): string {
  return value.replace(/[^0-9]/g, "");
}

/** 한국 휴대폰 번호 형식 검사 (010, 011, 016~019) */
export function isValidPhone(value: string): boolean {
  return /^01[016789]\d{7,8}$/.test(normalizePhone(value));
}

/** 숫자 전화번호를 010-1234-5678 형태로 포맷 */
export function formatPhone(value: string): string {
  const digits = normalizePhone(value);
  if (digits.length === 11) return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  if (digits.length === 10) return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  return value;
}
