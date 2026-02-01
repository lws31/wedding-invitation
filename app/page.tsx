// app/page.tsx
"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function WeddingPage() {
  return (
    <div className="bg-[#fdfcfb] min-h-screen font-serif text-[#4a4a4a]">
      {/* 1. Hero Section: 첫 인상 */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="tracking-[0.3em] text-sm text-gray-500">2026 . 04 . 18</span>
          <h1 className="text-4xl mt-4 mb-8">우석& 현주</h1>
          <div className="relative w-[300px] h-[450px] mx-auto shadow-2xl rounded-t-full overflow-hidden">
            <Image
              src="/main-wedding.jpg" // public 폴더에 위치
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Invitation: 초대 문구 */}
      <section className="py-24 px-8 text-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="space-y-6 leading-relaxed"
        >
          <h3 className="text-lg font-bold mb-10">초대합니다</h3>
          <p>함께 맞는 아침이 좋아서<br />평생을 같이 가기로 했습니다.</p>
          <p>저희의 시작을 응원해주시는<br />소중한 분들을 초대합니다.</p>
        </motion.div>
      </section>

      {/* 3. Location: 지도 (Kakao Map SDK 활용 권장) */}
      <section className="py-20 bg-gray-50 text-center">
        <h3 className="mb-8">오시는 길</h3>
        <div id="map" className="w-full h-72 bg-gray-200">
          {/* 실제 구현 시 카카오 지도 API 스크립트 삽입 필요 */}
          <p className="pt-32 text-gray-400">지도 API 영역</p>
        </div>
        <div className="mt-6 space-y-2">
          <p className="font-bold text-lg">법환동 마을회관</p>
          <p className="text-sm">제주특별자치도 서귀포시 이어도로 96</p>
        </div>
      </section>
    </div>
  );
}

// ------------------------------------------------------------------------------------------------

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
//       <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
//         <Image
//           className="dark:invert"
//           src="/next.svg"
//           alt="Next.js logo"
//           width={100}
//           height={20}
//           priority
//         />
//         <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
//           <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
//             To get started, edit the page.tsx file.
//           </h1>
//           <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
//             Looking for a starting point or more instructions? Head over to{" "}
//             <a
//               href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Templates
//             </a>{" "}
//             or the{" "}
//             <a
//               href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//               className="font-medium text-zinc-950 dark:text-zinc-50"
//             >
//               Learning
//             </a>{" "}
//             center.
//           </p>
//         </div>
//         <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
//           <a
//             className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
//             href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             <Image
//               className="dark:invert"
//               src="/vercel.svg"
//               alt="Vercel logomark"
//               width={16}
//               height={16}
//             />
//             Deploy Now
//           </a>
//           <a
//             className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
//             href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
//             target="_blank"
//             rel="noopener noreferrer"
//           >
//             Documentation
//           </a>
//         </div>
//       </main>
//     </div>
//   );
// }
