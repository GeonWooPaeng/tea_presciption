import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "다(茶)방전 - 마음을 달이는 시간",
  description: "당신의 지친 일상에 차 한 잔의 온기를 전합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}
