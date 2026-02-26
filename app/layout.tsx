import type { Metadata } from "next";
import { Nanum_Myeongjo, Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import Script from "next/script";

// 명조체
const nanumMyeongjo = Nanum_Myeongjo({
  weight: ["400", "700", "800"],
  subsets: ["latin"],
  variable: "--font-myeongjo", // CSS 변수 이름 지정
  display: "swap",
})

// 고딕체
const notoSansKR = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-sans",    // CSS 변수 이름 지정
  display: "swap",
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
      {/* 폰트 등록 */}
      <body className={`${nanumMyeongjo.variable} ${notoSansKR.variable} font-sans antialiased`}>
        {children}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_MAP_API_KEY}&autoload=false`}
          strategy="beforeInteractive"
        />
      </body>
    </html>
  );
}
