'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RefreshCcw, Printer } from 'lucide-react';
import { Suspense } from 'react';

// Mock Tea Data based on survey answers
const TEA_RECOMMENDATIONS: Record<string, any> = {
  'calm-comfort': {
    name: "페퍼민트 & 라벤더",
    benefits: "긴장 완화, 숙면 도움, 마음의 안정",
    brewing: "따뜻한 물 200ml, 3분간 우림",
    message: "오늘 하루 수고한 당신에게 보내는 고요한 밤의 선물을 드립니다."
  },
  'energetic-focus': {
    name: "우전 녹차",
    benefits: "정신 맑음, 집중력 향상, 항산화",
    brewing: "따뜻한 물 150ml (70도), 2분간 우림",
    message: "새벽 이슬을 머금은 찻잎처럼, 당신의 감각을 깨워줄게요."
  },
  'warm-warmth': {
    name: "카모마일 메들리",
    benefits: "심신 안정, 소화 도움, 체온 상승",
    brewing: "끓는 물 200ml, 5분간 우림",
    message: "포근한 담요처럼 당신의 마음을 감싸안아줄 시간입니다."
  },
  'refreshing-empty': {
    name: "철관음 (우롱차)",
    benefits: "노폐물 배출, 상쾌한 기분, 스트레스 해소",
    brewing: "따뜻한 물 200ml, 1분 30초간 우림",
    message: "비 온 뒤 숲의 향기처럼, 무거운 마음을 씻어내 드릴게요."
  },
  'default': {
    name: "루이보스 클래식",
    benefits: "무카페인, 노화 방지, 심신 위로",
    brewing: "따뜻한 물 200ml, 4분간 우림",
    message: "언제 어디서나 당신을 지켜주는 가장 편안한 차입니다."
  }
};

function PrescriptionContent() {
  const searchParams = useSearchParams();
  const mood = searchParams.get('mood');
  const need = searchParams.get('need');
  
  const key = `${mood}-${need}`;
  const tea = TEA_RECOMMENDATIONS[key] || TEA_RECOMMENDATIONS['default'];

  return (
    <div className="w-full flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-sm mb-12"
      >
        {/* Receipt UI */}
        <div className="bg-white text-zinc-900 p-8 shadow-2xl relative overflow-hidden font-mono text-sm leading-relaxed">
          {/* Jagged Edge Top */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#1a1c18]" style={{ clipPath: 'polygon(0 100%, 5% 0, 10% 100%, 15% 0, 20% 100%, 25% 0, 30% 100%, 35% 0, 40% 100%, 45% 0, 50% 100%, 55% 0, 60% 100%, 65% 0, 70% 100%, 75% 0, 80% 100%, 85% 0, 90% 100%, 95% 0, 100% 100%)' }} />
          
          <div className="text-center mb-8 pt-4">
            <h1 className="text-xl font-bold mb-1 serif">다(茶)방전 처방전</h1>
            <p className="text-xs opacity-60">Digital Tea Room No. 2026-03-10</p>
          </div>

          <div className="border-t border-dashed border-zinc-300 py-6 space-y-4">
            <div className="flex justify-between">
              <span>환자성함</span>
              <span className="font-bold">건우님</span>
            </div>
            <div className="flex justify-between">
              <span>오늘의 날씨</span>
              <span>{mood === 'calm' ? '고요한 보라' : mood === 'energetic' ? '활기찬 노랑' : mood === 'warm' ? '몽글몽글 분홍' : '시원한 파랑'}</span>
            </div>
            <div className="flex justify-between">
              <span>진단 결과</span>
              <span className="text-right">{tea.benefits}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-zinc-300 py-6">
            <div className="mb-4">
              <span className="block text-xs uppercase opacity-60 mb-1">처방 제품</span>
              <span className="text-lg font-bold text-accent-olive serif">{tea.name}</span>
            </div>
            <div>
              <span className="block text-xs uppercase opacity-60 mb-1">복용 요법</span>
              <p className="text-xs">{tea.brewing}</p>
              <p className="text-[10px] mt-2 italic opacity-80">* {tea.message}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-zinc-300 pt-6 text-center">
            <div className="bg-zinc-100 p-4 rounded mb-4">
              <span className="block text-[10px] uppercase mb-1">Barcode</span>
              <div className="w-full h-8 bg-zinc-900 mb-1" />
              <span className="text-[10px]">TEA-RECIPE-MASTER-CODE</span>
            </div>
            <p className="text-[10px] opacity-40">본 처방전은 마음의 안정을 위한 가이드입니다.</p>
          </div>

          {/* Jagged Edge Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-[#1a1c18]" style={{ clipPath: 'polygon(0 0, 5% 100%, 10% 0, 15% 100%, 20% 0, 25% 100%, 30% 0, 35% 100%, 40% 0, 45% 100%, 50% 0, 55% 100%, 60% 0, 65% 100%, 70% 0, 75% 100%, 80% 0, 85% 100%, 90% 0, 95% 100%, 100% 0)' }} />
        </div>
      </motion.div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/survey">
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 border border-white/10 text-sm hover:bg-white/10 transition-colors">
            <RefreshCcw className="w-4 h-4" />
            다시 진단하기
          </button>
        </Link>
        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-olive text-zinc-900 text-sm font-medium hover:scale-105 transition-transform"
        >
          <Printer className="w-4 h-4" />
          처방전 인쇄
        </button>
      </div>
    </div>
  );
}

export default function ResultPage() {
  return (
    <main className="tea-gradient-bg min-h-screen py-16 px-6 flex flex-col items-center">
      <Suspense fallback={<div className="text-accent-olive serif">마음을 달이는 중...</div>}>
        <PrescriptionContent />
      </Suspense>
      
      <Link href="/map" className="mt-8 text-sm text-accent-olive underline underline-offset-4 opacity-70 hover:opacity-100">
        차 향미 은하수 탐험하기
      </Link>
    </main>
  );
}
