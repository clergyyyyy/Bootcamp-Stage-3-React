// Header.tsx
'use client';
type HeaderProps = { email: string };
export default function Header({ email }: HeaderProps) {
  return <h2>您已使用 {email} 登入</h2>;
}
