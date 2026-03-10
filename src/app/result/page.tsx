'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RefreshCcw, Printer } from 'lucide-react';
import { Suspense } from 'react';

// Mock Tea Data based on survey answers + 6 Great Tea Types
const TEA_RECOMMENDATIONS: Record<string, any> = {
  'energetic-focus': {
    name: "녹차 (Green Tea)",
    benefits: "정신 맑음, 집중력 향상, 항산화",
    brewing: "따뜻한 물 150ml (70도), 2분간 우림",
    message: "찻잎 본연의 생기가 당신의 감각을 깨워줄 거예요."
  },
  'refreshing-empty': {
    name: "백차 (White Tea)",
    benefits: "노폐물 배출, 상쾌한 기분, 스트레스 해소",
    brewing: "따뜻한 물 200ml, 3분간 우림",
    message: "비 온 뒤 숲의 향기처럼, 무거운 마음을 씻어내 드릴게요."
  },
  'calm-comfort': {
    name: "황차 (Yellow Tea)",
    benefits: "심신 안정, 부드러운 위로",
    brewing: "따뜻한 물 200ml, 2분간 우림",
    message: "오랜 시간 공들여 빚은 부드러움이 당신을 감싸 안을 거예요."
  },
  'warm-warmth': {
    name: "청차 (Oolong Tea)",
    benefits: "심신 안정, 소화 도움, 체온 상승",
    brewing: "끓는 물 200ml, 1분 30초간 우림",
    message: "화사한 꽃향이 당신의 마음을 따뜻하게 녹여줄 시간입니다."
  },
  'energetic-warmth': {
    name: "홍차 (Black Tea)",
    benefits: "피로 회복, 활력 충전",
    brewing: "끓는 물 200ml, 3분간 우림",
    message: "붉은 수색처럼 당신의 하루에 열정을 채워 드릴게요."
  },
  'calm-empty': {
    name: "흑차 (Puerh Tea)",
    benefits: "깊은 안정, 정화 작용",
    brewing: "끓는 물 200ml, 1분간 우림 (첫 물은 버리세요)",
    message: "세월이 빚은 묵직한 무게감이 당신의 잡념을 눌러줄 거예요."
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
        <div className="bg-white text-zinc-900 p-8 shadow-2xl relative overflow-hidden font-mono text-sm leading-relaxed" style={{ minHeight: '500px', display: 'flex', flexDirection: 'column' }}>
          {/* Jagged Edge Top */}
          <div className="absolute top-0 left-0 w-full h-2 bg-[#1a1c18] jagged-border" />
          
          <div className="text-center mb-8 pt-4">
            <h1 className="text-xl font-bold mb-1 serif" style={{ color: '#1a1c18' }}>다(茶)방전 처방전</h1>
            <p className="text-xs opacity-60">Digital Tea Room No. 2026-03-10</p>
          </div>

          <div className="border-t border-dashed border-zinc-300 py-6" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex justify-between">
              <span style={{ color: '#666' }}>오늘의 마음 날씨</span>
              <span style={{ fontWeight: 700 }}>{mood === 'calm' ? '고요한 보라' : mood === 'energetic' ? '활기찬 노랑' : mood === 'warm' ? '몽글몽글 분홍' : '시원한 파랑'}</span>
            </div>
            <div className="flex justify-between gap-4">
              <span style={{ color: '#666' }}>진단 결과</span>
              <span className="text-right" style={{ fontWeight: 700 }}>{tea.benefits}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-zinc-300 py-6" style={{ flex: 1 }}>
            <div className="mb-4">
              <span className="block text-xs uppercase opacity-60 mb-1">처방 제품</span>
              <span className="text-lg font-bold text-accent-olive serif" style={{ color: '#8fb865', fontSize: '1.25rem' }}>{tea.name}</span>
            </div>
            <div>
              <span className="block text-xs uppercase opacity-60 mb-1">복용 요법</span>
              <p className="text-xs" style={{ color: '#333' }}>{tea.brewing}</p>
              <p className="text-[10px] mt-2 italic opacity-80" style={{ color: '#777', marginTop: '10px' }}>* {tea.message}</p>
            </div>
          </div>

          <div className="border-t border-dashed border-zinc-300 pt-6 text-center">
            <div className="bg-zinc-100 p-4 rounded mb-4" style={{ backgroundColor: '#f4f4f4', padding: '1rem', borderRadius: '8px' }}>
              <span className="block text-[10px] uppercase mb-1">Barcode</span>
              <div className="w-full h-8 bg-zinc-900 mb-1" style={{ backgroundColor: '#1a1c18', height: '30px', margin: '5px 0' }} />
              <span className="text-[10px]">TEA-RECIPE-MASTER-CODE</span>
            </div>
            <p className="text-[10px] opacity-40">본 처방전은 마음의 안정을 위한 가이드입니다.</p>
          </div>

          {/* Jagged Edge Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-2 bg-[#1a1c18] jagged-border" style={{ transform: 'rotate(180deg)' }} />
        </div>
      </motion.div>

      <div className="flex gap-4 justify-center" style={{ display: 'flex', gap: '1rem' }}>
        <Link href="/survey">
          <button className="button-premium text-sm" style={{ padding: '10px 20px' }}>
            <span className="flex items-center gap-2">
              <RefreshCcw className="w-4 h-4" />
              다시 진단하기
            </span>
          </button>
        </Link>
        <button 
          onClick={() => window.print()}
          className="button-premium text-sm"
          style={{ background: 'var(--accent-olive)', color: 'var(--bg-primary)', padding: '10px 20px' }}
        >
          <span className="flex items-center gap-2">
            <Printer className="w-4 h-4" />
            처방전 인쇄
          </span>
        </button>
      </div>

      <style jsx>{`
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-between { justify-content: space-between; }
        .text-center { text-align: center; }
        .mb-12 { margin-bottom: 3rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mt-8 { margin-top: 2rem; }
        .gap-4 { gap: 1rem; }
        .gap-2 { gap: 0.5rem; }
        .text-xl { font-size: 1.25rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xs { font-size: 0.75rem; }
        .opacity-60 { opacity: 0.6; }
        .opacity-40 { opacity: 0.4; }
        .w-full { width: 100%; }
        .max-w-sm { max-width: 24rem; }
        .font-bold { font-weight: 700; }
        .border-t { border-top: 1px solid #ddd; }
        .border-dashed { border-style: dashed; }
      `}</style>
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
