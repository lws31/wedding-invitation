"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export default function WeddingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // 파일명은 공백 없이 bgm.mp3로 변경하는 것을 추천하지만, 일단 현재 파일명을 유지합니다.
  const AUDIO_SRC = "/Christina Perri - A Thousand Years.mp3";

  // --- 1. 자동 재생 로직 ---
  useEffect(() => {
    const handleAutoPlay = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            removeInteractionListeners();
          })
          .catch((err) => console.log("상호작용 대기 중..."));
      }
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleAutoPlay);
      window.removeEventListener("touchstart", handleAutoPlay);
      window.removeEventListener("scroll", handleAutoPlay);
    };

    window.addEventListener("click", handleAutoPlay);
    window.addEventListener("touchstart", handleAutoPlay);
    window.addEventListener("scroll", handleAutoPlay);

    return () => removeInteractionListeners();
  }, []);

  // --- 2. 재생/일시정지 토글 함수 ---
  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation(); // 중요: 클릭 이벤트가 상위(window)로 퍼져 자동재생 로직이 다시 실행되는 것 방지

    if (audioRef.current) {
      if (!audioRef.current.paused) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch((err) => console.error("재생 실패:", err));
      }
    }
  };

  return (
    <div className="bg-[#fdfcfb] min-h-screen font-serif text-[#4a4a4a] overflow-x-hidden">
      {/* --- 음악 재생 버튼 --- */}
      <div className="fixed bottom-6 right-6 z-50">
        <audio
          ref={audioRef}
          src={AUDIO_SRC}
          loop
          playsInline
          preload="auto"
        />
        <motion.button
          onClick={togglePlay}
          whileTap={{ scale: 0.9 }}
          className="w-12 h-12 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full shadow-lg flex items-center justify-center text-stone-600 focus:outline-none"
        >
          {isPlaying ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5.5 3.5A.5.5 0 0 1 6 4v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm5 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z" />
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* 1. Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="tracking-[0.3em] text-sm text-stone-400 italic">2026 . 04 . 18</span>
          <h1 className="text-4xl mt-4 mb-8 font-normal tracking-tight text-stone-800">우석 <span className="text-stone-300 mx-1">&</span> 현주</h1>
          <div className="relative w-[280px] h-[400px] mx-auto shadow-2xl rounded-t-full overflow-hidden border-[6px] border-white">
            <Image
              src="/main-wedding.jpg"
              alt="Main Wedding"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* 2. Invitation */}
      <section className="py-32 px-8 text-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="space-y-8 leading-relaxed"
        >
          <div className="inline-block w-px h-12 bg-stone-200 mb-4"></div>
          <p className="text-lg text-stone-700">소중한 분들을 초대합니다</p>
          <div className="text-stone-500 font-light space-y-2">
            <p>함께 맞는 아침이 좋아서</p>
            <p>평생을 같이 가기로 했습니다.</p>
            <br />
            <p>저희의 시작을 응원해주시는</p>
            <p>소중한 분들을 초대합니다.</p>
          </div>
        </motion.div>
      </section>

      {/* 3. Gallery */}
      <section className="py-24 bg-white">
        <h3 className="text-center text-stone-400 tracking-[0.2em] text-xs mb-12 uppercase font-light">Gallery</h3>
        <div className="grid grid-cols-2 gap-1 px-1">
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
            <Image src="/gallery-1.jpg" alt="Gallery 1" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
            <Image src="/gallery-2.jpg" alt="Gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* 4. Location */}
      <section className="py-24 bg-[#faf9f8] text-center px-6">
        <h3 className="text-stone-400 tracking-[0.2em] text-xs mb-12 uppercase font-light">Location</h3>
        <div id="map" className="w-full h-64 bg-white rounded-sm overflow-hidden border border-stone-200 shadow-sm mb-8 flex items-center justify-center">
          <p className="text-stone-400 text-sm">지도는 API 키 설정 후 표시됩니다.</p>
        </div>
        <div className="space-y-3">
          <p className="font-bold text-xl text-stone-800 tracking-tight">법환동 마을회관</p>
          <p className="text-sm text-stone-500 font-light leading-relaxed">제주특별자치도 서귀포시 이어도로 96</p>
        </div>
      </section>

      {/* 5. Closing Mention */}
      <section className="py-32 bg-white text-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="border border-stone-100 p-12 rounded-lg bg-stone-50/30"
        >
          <p className="text-stone-500 font-light leading-loose text-sm italic">
            축복해 주시는 따뜻한 마음<br />
            잊지 않고 예쁘게 살겠습니다.
          </p>
          <p className="mt-8 text-stone-800 font-medium">신랑 우석 · 신부 현주 드림</p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 text-center text-[10px] text-stone-300 tracking-[0.2em] bg-[#faf9f8] uppercase">
        Copyright © 2026. All Rights Reserved.
      </footer>
    </div>
  );
}