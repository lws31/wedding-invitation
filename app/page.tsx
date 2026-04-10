"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

declare global {
  interface Window {
    kakao: any;
  }
}

const AccountItem = ({ title, name, bank, account }: { title: string, name: string, bank: string, account: string }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText(account);
    alert("계좌번호가 복사되었습니다.");
  };

  return (
    <div className="flex items-center justify-between py-3 border-stone-100">
      <div className="text-left">
        <p className="text-[14px] text-stone-900 font-semibold">
          <span className="text-stone-500 mr-2 font-normal">{title}</span> {name}
        </p>
        <p className="text-[13px] text-stone-700 font-medium mt-1.5">
          {bank} <span className="ml-1 tracking-tight">{account}</span>
        </p>
      </div>
      <button
        onClick={handleCopy}
        className="px-3 py-1.5 border border-stone-300 text-[10px] text-stone-600 rounded-sm bg-white active:bg-stone-100 transition-colors shadow-sm"
      >
        계좌복사
      </button>
    </div>
  );
};

export default function WeddingPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const AUDIO_SRC = "/sounds/bgm.mp3";

  const LAT = 33.240489;
  const LNG = 126.516592;

  // --- 오디오 관련 useEffect ---
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!audioRef.current) return;

      if (document.hidden) {
        // 탭이 숨겨졌을 때 (백그라운드)
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        // 사용자가 다시 탭으로 돌아왔을 때
        // 이전에 재생 중이었던 경우에만 다시 재생하고 싶다면
        // 별도의 상태(예: wasPlaying)를 관리해야 하지만,
        // 보통은 다시 돌아왔을 때 들려주는 것이 자연스럽습니다.
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {
            // 브라우저 정책상 자동 재개가 막힐 수 있으므로 에러 방지 처리만 해둡니다.
            setIsPlaying(false);
          });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleAutoPlay = () => {
      // 이미 재생 중이면 실행 안 함
      if (!audio.paused) return;

      audio.play()
        .then(() => {
          setIsPlaying(true);
          // 재생 성공 시 모든 이벤트 리스너 제거
          removeInteractionListeners();
        })
        .catch((err) => {
          // 재생 실패 시 (정책 때문) 계속 대기
          console.log("상호작용 대기 중...", err);
        });
    };

    const removeInteractionListeners = () => {
      window.removeEventListener("click", handleAutoPlay);
      window.removeEventListener("touchstart", handleAutoPlay);
      window.removeEventListener("touchmove", handleAutoPlay);
      window.removeEventListener("touchend", handleAutoPlay);
      window.removeEventListener("scroll", handleAutoPlay);
      window.removeEventListener("wheel", handleAutoPlay);
    };

    window.addEventListener("click", handleAutoPlay);
    window.addEventListener("touchstart", handleAutoPlay);
    window.addEventListener("touchmove", handleAutoPlay);
    window.addEventListener("touchend", handleAutoPlay);
    window.addEventListener("scroll", handleAutoPlay);
    window.addEventListener("wheel", handleAutoPlay);

    return () => removeInteractionListeners();
  }, []);

  // --- 카카오맵 로드 useEffect ---
  useEffect(() => {
    const script = window.kakao;
    if (script && script.maps) {
      script.maps.load(() => {
        const container = document.getElementById("map");
        const options = {
          center: new script.maps.LatLng(LAT, LNG),
          level: 3,
        };
        const map = new script.maps.Map(container, options);

        // 마커 생성
        const markerPosition = new script.maps.LatLng(LAT, LNG);
        const marker = new script.maps.Marker({
          position: markerPosition,
        });
        marker.setMap(map);
      });
    }
  }, []);

  // --- 재생/일시정지 토글 함수 ---
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
    <div className="min-h-screen overflow-x-hidden">
      {/* --- 음악 재생 버튼 --- */}
      <div className="fixed top-6 right-6 z-50">
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
          // 재생 중일 때 버튼이 살짝 떨리는 애니메이션을 원한다면 animate 설정을 추가할 수 있어.
          className="w-12 h-12 bg-white/90 backdrop-blur-sm border border-stone-200 rounded-full shadow-lg flex items-center justify-center text-stone-600 focus:outline-none"
        >
          {isPlaying ? (
            // 음악이 멈췄을 때: 스피커 끄기 아이콘 (직관적으로 소리가 안 남을 알림)
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            // 음악이 나오고 있을 때: 음표 아이콘 (음악이 흐르는 느낌)
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18V5l12-2v13" />
              <circle cx="6" cy="18" r="3" />
              <circle cx="18" cy="16" r="3" />
            </svg>
          )}
        </motion.button>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="tracking-[0.3em] text-sm text-stone-400 italic">2026 . 04 . 18</span>
          <h1 className="text-4xl mt-4 mb-8 font-serif font-normal tracking-tight text-stone-800">우석 <span className="text-stone-300 mx-1">&</span> 현주</h1>
          <div className="relative w-[280px] h-[400px] mx-auto shadow-2xl rounded-t-full overflow-hidden border-[6px] border-white">
            <Image
              src="/images/main-wedding.jpg"
              alt="Main Wedding"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>
      </section>

      {/* Invitation */}
      <section className="py-32 px-8 text-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="space-y-8 leading-relaxed"
        >
          <div className="inline-block w-px h-24 bg-stone-200 mb-4"></div>
          <div className="text-stone-500 font-serif font-light space-y-2 whitespace-pre-line">
            <p>
              {`맑고 푸른 봄 하늘 아래
              서로를 아끼고 신뢰하며 인생의 길을
              함께 걷기로 약속했습니다.

              저희 두 사람의 뜻에 따라
              화려한 예식은 생략하고
              감사한 분들을 모시고 따뜻한 식사 자리를
              마련하고자 합니다.

              귀한 걸음 하시어
              저희의 새로운 시작을 축복해 주시고
              격려해 주시면 감사하겠습니다.`}
            </p>
          </div>
        </motion.div>
      </section>

      {/* Location */}
      <section className="py-24 bg-[#faf9f8] text-center px-6">
        {/* 상단 영문 타이틀 */}
        <h3 className="text-stone-400 tracking-[0.2em] text-xs mb-2 uppercase font-light">
          Location
        </h3>

        {/* 추가된 국문 타이틀: 명조체로 우아하게 표현 */}
        <h2 className="text-stone-800 font-serif text-2xl mb-12 tracking-tight">
          오시는 길
        </h2>

        {/* 지도가 그려질 영역 */}
        <div id="map" className="w-full h-80 bg-white rounded-sm overflow-hidden border border-stone-200 shadow-sm mb-8 flex items-center justify-center">
          <p className="text-stone-400 text-sm italic">지도를 불러오는 중입니다...</p>
        </div>

        <div className="space-y-3">
          <p className="text-xl text-stone-800 tracking-tight font-medium">법환동 마을회관</p>
          <p className="text-sm text-stone-500 font-light leading-relaxed mb-6">제주특별자치도 서귀포시 이어도로 968</p>

          {/* 길찾기 버튼 */}
          <div className="flex justify-center gap-3">
            <a
              href={`https://map.kakao.com/link/to/법환동 마을회관,${LAT},${LNG}`}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 bg-stone-800 text-white text-[12px] rounded-full shadow-md active:bg-stone-700 transition-colors"
            >
              카카오맵 길찾기
            </a>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="pt-24 bg-white">
        <h3 className="text-center text-stone-400 tracking-[0.2em] text-xs mb-12 uppercase font-light">Gallery</h3>
        <div className="grid grid-cols-2 gap-1 px-1">
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
            <Image src="/images/gallery-1.jpg" alt="Gallery 1" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
            <Image src="/images/gallery-2.jpg" alt="Gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
            <Image src="/images/gallery-3.png" alt="Gallery 1" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
          <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
            <Image src="/images/gallery-4.jpg" alt="Gallery 2" fill className="object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>
      </section>

      {/* Closing Mention */}
      <section className="py-32 bg-white text-center px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="border border-stone-100 p-12 rounded-lg bg-stone-50/30"
        >
          <p className="text-stone-500 font-serif font-light leading-loose text-sm italic">
            축복해 주시는 따뜻한 마음<br />
            잊지 않고 예쁘게 살겠습니다.
          </p>
          <p className="mt-8 text-stone-800 font-serif font-medium">신랑 우석 · 신부 현주 드림</p>
        </motion.div>
      </section>

      {/* Accounts */}
      <section className="py-24 bg-[#faf9f8] px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="mb-8">
            <h3 className="text-stone-600 font-serif text-[15px] mb-2 leading-relaxed">
              참석이 어려우신 분들을 위해 기재했습니다
            </h3>
            <p className="text-stone-400 font-serif text-[13px] font-light italic">
              진심으로 축하해주셔서 감사합니다
            </p>
          </div>

          {/* 신랑측 */}
          <div className="max-w-md mx-auto">
            <AccountItem title="신랑" name="이우석" bank="농협" account="302-0158-7309-51" />
            <AccountItem title="신랑 어머니" name="김위자" bank="농협" account="352-1532-7005-33" />
          </div>

          <div className="w-full h-px bg-stone-200 my-8 mx-auto"></div>

          {/* 신부측 */}
          <div className="max-w-md mx-auto">
            <AccountItem title="신부" name="이현주" bank="농협" account="302-0490-1770-11" />
            <AccountItem title="신부 아버지" name="이택상" bank="농협" account="302-1053-7482-41" />
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="pt-24 pb-8 text-center text-[10px] text-stone-300 tracking-[0.2em] bg-white uppercase">
        Copyright © 2026. All Rights Reserved.
      </footer>
    </div>
  );
}
