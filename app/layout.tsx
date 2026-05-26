import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "트레이드패스 | 투자도구 무료 체험",
  description:
    "지표, 무료 자료, 앱 베타, 강의 사전예약을 한 번에 담아두고 직접 검증해보는 투자도구 허브입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
