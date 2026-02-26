import type { Metadata } from "next";
import { Nanum_Myeongjo, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// 명조체: 우아한 느낌 (제목, 이름, 인사말용)
const myeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-myeongjo",
});

// 고딕체: 깔끔한 느낌 (본문, 정보, 숫자용)
const sans = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "우석 & 현주",
  description: "2026년 4월 18일, 저희 결혼합니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${myeongjo.variable} ${sans.variable} antialiased`}>
        {children}

        {/* 2. 카카오맵 스크립트를 body 하단에 추가합니다. */}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
