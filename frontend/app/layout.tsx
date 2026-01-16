import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSansKr = Noto_Sans_KR({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-noto",
});

export const metadata: Metadata = {
  title: "풀빌라 :: 프라이빗한 휴식의 시작",
  description: "전국 럭셔리 풀빌라, 감성 숙소 예약. 가족, 연인과 함께하는 특별한 추억을 위한 프라이빗 스테이 플랫폼.",
  openGraph: {
    title: "풀빌라 :: 프라이빗한 휴식의 시작",
    description: "누구나 한번쯤 꿈꾸는 완벽한 휴식. 검증된 럭셔리 풀빌라와 감성 숙소를 만나보세요.",
    images: ["https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=1200&auto=format&fit=crop"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.className} antialiased`}>
        {children}
      </body>
    </html>
  );
}
