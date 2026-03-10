'use client';

import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { RefreshCcw, Printer } from 'lucide-react';
import { Suspense } from 'react';

// Mock Tea Data based on survey answers + 6 Great Tea Types
const TEA_RECOMMENDATIONS: Record<string, any> = {
  // Energetic
  'energetic-focus': {
    name: "녹차 (Green Tea)",
    benefits: "정신 맑음, 집중력 향상, 항산화",
    brewing: "따뜻한 물 150ml (70도), 2분간 우림",
    message: "찻잎 본연의 생기가 당신의 감각을 깨워줄 거예요."
  },
  'energetic-warmth': {
    name: "홍차 (Black Tea)",
    benefits: "피로 회복, 활력 충전",
    brewing: "끓는 물 200ml, 3분간 우림",
    message: "붉은 수색처럼 당신의 하루에 열정을 채워 드릴게요."
  },
  'energetic-empty': {
    name: "청차 (Oolong Tea)",
    benefits: "화사한 전환, 대사 활발",
    brewing: "끓는 물 200ml, 1분 30초간 우림",
    message: "다채로운 향기가 복잡한 머릿속을 상쾌하게 비워줄 거예요."
  },
  'energetic-comfort': {
    name: "카모마일 (Chamomile)",
    benefits: "긴장 완화, 부드러운 에너지",
    brewing: "끓는 물 200ml, 4분간 우림",
    message: "지친 마음을 달콤한 사과향으로 포근하게 감싸 드릴게요."
  },
  
  // Calm
  'calm-comfort': {
    name: "황차 (Yellow Tea)",
    benefits: "심신 안정, 부드러운 위로",
    brewing: "따뜻한 물 200ml, 2분간 우림",
    message: "오랜 시간 공들여 빚은 부드러움이 당신을 감싸 안을 거예요."
  },
  'calm-empty': {
    name: "흑차 (Puerh Tea)",
    benefits: "깊은 안정, 정화 작용",
    brewing: "끓는 물 200ml, 1분간 우림 (첫 물은 버리세요)",
    message: "세월이 빚은 묵직한 무게감이 당신의 잡념을 눌러줄 거예요."
  },
  'calm-focus': {
    name: "녹차 (Green Tea)",
    benefits: "조용한 집중, 평온한 정신",
    brewing: "따뜻한 물 150ml (70도), 2분간 우림",
    message: "고요한 숲속의 공기처럼 당신의 집중을 도와줄 거예요."
  },
  'calm-warmth': {
    name: "루이보스 (Rooibos)",
    benefits: "무카페인 안정, 온기 유지",
    brewing: "따뜻한 물 200ml, 4분간 우림",
    message: "붉은 흙의 대지처럼 당신의 마음을 따뜻하게 지탱해 드릴게요."
  },

  // Refreshing
  'refreshing-empty': {
    name: "백차 (White Tea)",
    benefits: "노폐물 배출, 상쾌한 기분, 스트레스 해소",
    brewing: "따뜻한 물 200ml, 3분간 우림",
    message: "비 온 뒤 숲의 향기처럼, 무거운 마음을 씻어내 드릴게요."
  },
  'refreshing-focus': {
    name: "녹차 (Green Tea)",
    benefits: "상쾌한 환기, 맑은 정신",
    brewing: "따뜻한 물 150ml (70도), 2분간 우림",
    message: "이슬 맺힌 찻잎의 청량함이 당신을 깨워줄 거예요."
  },
  'refreshing-comfort': {
    name: "카모마일 (Chamomile)",
    benefits: "편안한 휴식, 심신의 정화",
    brewing: "끓는 물 200ml, 4분간 우림",
    message: "맑은 하늘 같은 향기가 당신의 긴장을 풀어 드릴게요."
  },
  'refreshing-warmth': {
    name: "백차 (White Tea)",
    benefits: "은은한 온기, 청량한 위로",
    brewing: "따뜻한 물 200ml, 3분간 우림",
    message: "하얀 솜털의 부드러움이 당신의 마음을 따뜻하게 적셔줄 거예요."
  },

  // Warm
  'warm-warmth': {
    name: "청차 (Oolong Tea)",
    benefits: "심신 안정, 소화 도움, 체온 상승",
    brewing: "끓는 물 200ml, 1분 30초간 우림",
    message: "화사한 꽃향이 당신의 마음을 따뜻하게 녹여줄 시간입니다."
  },
  'warm-comfort': {
    name: "황차 (Yellow Tea)",
    benefits: "부드러운 포용, 따뜻한 위로",
    brewing: "따뜻한 물 200ml, 2분간 우림",
    message: "햇살을 품은 찻잎이 당신의 고단함을 어루만져 드릴게요."
  },
  'warm-focus': {
    name: "홍차 (Black Tea)",
    benefits: "따뜻한 활력, 집중력 유지",
    brewing: "끓는 물 200ml, 3분간 우림",
    message: "단단한 온기가 당신의 명료한 판단을 도와줄 거예요."
  },
  'warm-empty': {
    name: "루이보스 (Rooibos)",
    benefits: "편안한 비움, 순수한 온기",
    brewing: "따뜻한 물 200ml, 4분간 우림",
    message: "군더더기 없는 자연의 맛이 당신의 마음을 깨끗하게 채워줄 거예요."
  },

  'default': {
    name: "루이보스 (Rooibos)",
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
        {/* Receipt UI - Enhanced Premium Look */}
        <div className="bg-[#f9f8f4] text-zinc-900 p-8 shadow-2xl relative overflow-hidden font-mono text-sm leading-relaxed" 
             style={{ 
               minHeight: '520px', 
               display: 'flex', 
               flexDirection: 'column',
               backgroundImage: 'radial-gradient(#d1d1d1 0.5px, transparent 0.5px)',
               backgroundSize: '20px 20px',
               border: '1px solid rgba(0,0,0,0.05)'
             }}>
          {/* Jagged Edge Top */}
          <div className="absolute top-0 left-0 w-full h-3 bg-[#1a1c18] jagged-border" />
          
          {/* Aesthetic Overlay */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("https://www.transparenttextures.com/patterns/paper.png")' }} />

          <div className="text-center mb-10 pt-6">
            <div className="inline-block border-2 border-zinc-900 px-4 py-1 mb-4">
              <h1 className="text-xl font-black serif tracking-[0.2em] uppercase" style={{ color: '#1a1c18' }}>Tea Prescription</h1>
            </div>
            <p className="text-[10px] tracking-widest opacity-60 uppercase font-bold">Digital Tea Room | No. {new Date().toISOString().slice(0,10)}</p>
          </div>

          <div className="border-t-2 border-zinc-900 py-8 mb-4 border-double" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="flex justify-between items-end border-b border-zinc-200 pb-2">
              <span className="text-[10px] uppercase font-bold tracking-tighter" style={{ color: '#888' }}>Patient Mood</span>
              <span style={{ fontWeight: 800, fontSize: '1rem' }}>{mood === 'calm' ? '고요한 보라 (Calm Purple)' : mood === 'energetic' ? '활기찬 노랑 (Energetic Yellow)' : mood === 'warm' ? '몽글몽글 분홍 (Warm Pink)' : '시원한 파랑 (Refreshing Blue)'}</span>
            </div>
            <div className="flex justify-between items-start gap-4">
              <span className="text-[10px] uppercase font-bold" style={{ color: '#888', marginTop: '4px' }}>Diagnosis</span>
              <span className="text-right leading-snug" style={{ fontWeight: 700, flex: 1 }}>{tea.benefits}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-zinc-400 py-8" style={{ flex: 1 }}>
            <div className="mb-6">
              <span className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Prescribed Item</span>
              <span className="text-2xl font-black text-accent-olive serif italic underline decoration-zinc-200 underline-offset-8" style={{ color: '#5b8235' }}>{tea.name}</span>
            </div>
            <div>
              <span className="block text-[10px] uppercase font-bold tracking-widest opacity-60 mb-2">Dosage & Usage</span>
              <p className="text-xs leading-relaxed font-bold" style={{ color: '#444' }}>{tea.brewing}</p>
              <div className="mt-4 p-3 bg-zinc-100/50 rounded italic text-[11px] border-l-2 border-zinc-300" style={{ color: '#555' }}>
                " {tea.message} "
              </div>
            </div>
          </div>

          <div className="border-t border-zinc-300 pt-8 mt-4 text-center">
            <div className="p-4 border border-zinc-200 rounded-lg mb-6 group hover:border-zinc-400 transition-colors" style={{ backgroundColor: '#fff' }}>
              <span className="block text-[9px] uppercase tracking-[0.3em] mb-2 opacity-50">Master Validation Code</span>
              <div className="w-full h-10 bg-repeat-x opacity-90" style={{ backgroundImage: 'linear-gradient(90deg, #000 2px, transparent 2px)', backgroundSize: '6px 100%' }} />
              <span className="text-[9px] font-bold tracking-[0.5em] mt-2 block">TEA-RECIPE-7729-ALPHA</span>
            </div>
            <p className="text-[9px] opacity-40 leading-relaxed font-bold uppercase tracking-tighter">Certified by Digital Tea Room Academy<br/>Mind-Calming Solution v1.2</p>
          </div>

          {/* Jagged Edge Bottom */}
          <div className="absolute bottom-0 left-0 w-full h-3 bg-[#1a1c18] jagged-border" style={{ transform: 'rotate(180deg)' }} />
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

      <div className="mt-12 w-full max-w-sm flex flex-col gap-4">
        <Link href={`/map?tea=${encodeURIComponent(tea.name)}&mood=${mood}&need=${need}`} style={{ width: '100%' }}>
          <button 
            className="button-premium w-full" 
            style={{ 
              background: 'linear-gradient(135deg, var(--accent-olive), #7ea360)', 
              color: 'var(--bg-primary)', 
              padding: '16px', 
              fontSize: '1rem',
              fontWeight: 600,
              boxShadow: '0 4px 20px rgba(152, 214, 151, 0.3)',
              border: 'none',
              width: '100%'
            }}
          >
            <span className="flex items-center justify-center gap-2">
              <span className="serif">'{tea.name}'</span> 향미 은하수 탐험하기
            </span>
          </button>
        </Link>
        
        <Link href="/" style={{ width: '100%' }}>
          <button 
            className="button-premium w-full text-text-secondary" 
            style={{ 
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '12px',
              fontSize: '0.875rem',
              width: '100%'
            }}
          >
            처음으로 돌아가기
          </button>
        </Link>
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
    </main>
  );
}
