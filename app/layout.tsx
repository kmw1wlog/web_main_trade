import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "투자도구 허브 MVP",
  description:
    "SNS 유입자용 투자도구 종합웹 MVP. 지표, 전자책, 앱 베타, 강의 사전예약을 한 페이지에서 제공합니다.",
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
