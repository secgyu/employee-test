/** 간단한 이메일 형식 검사 */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

/** 비밀번호 최소 길이 */
export const MIN_PASSWORD_LENGTH = 8;
