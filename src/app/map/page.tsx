'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, Suspense } from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const TEA_MAP_DATA = [
  { id: 1, name: "녹차 (Green Tea)", x: 20, y: 70, note: "맑고 깨끗한 향, 은은하고 산뜻한 단맛", color: "#8ab04b" }, // 덜 단향 쪽
  { id: 2, name: "백차 (White Tea)", x: 35, y: 55, note: "솜털같이 가볍고 섬세한 달큰함", color: "#d2d8bc" },
  { id: 3, name: "황차 (Yellow Tea)", x: 45, y: 50, note: "떫은맛을 덜어내어 더욱 부드러운 단맛", color: "#f7d08a" },
  { id: 4, name: "청차 (Oolong Tea)", x: 75, y: 15, note: "화사한 과일과 꽃의 달콤한 향이 일품", color: "#6cad91" }, // 강한 단향
  { id: 5, name: "홍차 (Black Tea)", x: 90, y: 25, note: "깊고 진한 풍미 속에 감춰진 꿀 같은 달콤함", color: "#c15c4d" }, // 강한 단향
  { id: 6, name: "흑차 (Puerh Tea)", x: 40, y: 85, note: "묵직한 대지의 맛, 숙성된 깊은 단맛", color: "#4d3a2b" }, // 덜 단향 (중후)
  { id: 7, name: "카모마일 (Chamomile)", x: 85, y: 10, note: "사과처럼 향긋하고 달콤한 꽃향기", color: "#f9dc5c" }, // 매우 강한 단향
  { id: 8, name: "루이보스 (Rooibos)", x: 65, y: 60, note: "자극 없이 편안하게 스며드는 은은한 단맛", color: "#bc4749" },
];

function MapContent() {
  const [hoveredTea, setHoveredTea] = useState<any>(null);
  const searchParams = useSearchParams();
  const prescribedTeaName = searchParams.get('tea');
  const mood = searchParams.get('mood');
  const need = searchParams.get('need');

  // Filter to only show the prescribed tea if provided (robust matching)
  const displayTeas = prescribedTeaName 
    ? TEA_MAP_DATA.filter(t => 
        t.name.toLowerCase().includes(prescribedTeaName.toLowerCase()) || 
        prescribedTeaName.toLowerCase().includes(t.name.split(' (')[0].toLowerCase())
      )
    : TEA_MAP_DATA;

  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex justify-between items-center mb-12" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
        <div className="flex gap-4">
          <Link href={prescribedTeaName ? `/result?mood=${mood}&need=${need}` : "/survey"}>
            <button className="flex items-center gap-2 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', color: '#fff', fontSize: '0.875rem', opacity: 0.8 }}>
              <ArrowLeft className="w-4 h-4" />
              <span className="serif">처방전으로</span>
            </button>
          </Link>
          <Link href="/">
            <button className="flex items-center gap-2 transition-colors" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', padding: '8px 16px', borderRadius: '20px', cursor: 'pointer', color: '#fff', fontSize: '0.875rem', opacity: 0.8 }}>
              <span className="serif">처음으로</span>
            </button>
          </Link>
        </div>
        <div className="text-right" style={{ textAlign: 'right' }}>
          <h1 className="text-2xl font-bold serif" style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff' }}>차(Tea) 향미 은하수</h1>
          <p className="text-xs opacity-60" style={{ fontSize: '0.75rem', opacity: 0.6, color: '#fff' }}>Flavor Galaxy Map</p>
        </div>
      </div>

      <div className="flex-1 relative glass-card p-12 overflow-hidden flex items-center justify-center" style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '3rem', backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: '1.5rem', border: '1px solid rgba(255, 255, 255, 0.1)', minHeight: 'calc(100vh - 250px)', margin: '0 0 2rem 0' }}>
        {/* Galaxy Axis Labels - Adjusted for better visibility and spacing */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.2em] opacity-90 uppercase font-bold pointer-events-none" style={{ position: 'absolute', top: '2rem', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', letterSpacing: '0.2em', opacity: 0.9, textTransform: 'uppercase', color: '#fff', zIndex: 5 }}>단향 (Sweet Aroma)</div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[12px] tracking-[0.2em] opacity-90 uppercase font-bold pointer-events-none" style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', letterSpacing: '0.2em', opacity: 0.9, textTransform: 'uppercase', color: '#fff', zIndex: 5 }}>덜 단향 (Fresh/Clean)</div>
        <div className="absolute left-8 top-1/2 -rotate-90 origin-center text-[12px] tracking-[0.2em] opacity-90 uppercase font-bold pointer-events-none" style={{ position: 'absolute', left: '2rem', top: '50%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'center', fontSize: '12px', letterSpacing: '0.2em', opacity: 0.9, textTransform: 'uppercase', color: '#fff', zIndex: 5 }}>덜 단맛 (Subtle Sweet)</div>
        <div className="absolute right-8 top-1/2 rotate-90 origin-center text-[12px] tracking-[0.2em] opacity-90 uppercase font-bold pointer-events-none" style={{ position: 'absolute', right: '2rem', top: '50%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'center', fontSize: '12px', letterSpacing: '0.2em', opacity: 0.9, textTransform: 'uppercase', color: '#fff', zIndex: 5 }}>단맛 (Rich Sweet)</div>

        {/* Center Grid Lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 0.2, pointerEvents: 'none', zIndex: 1 }}>
          <div className="w-[90%] h-px bg-white/20" style={{ width: '90%', height: '1px', backgroundColor: 'rgba(255,255,255,0.2)' }} />
          <div className="h-[90%] w-px bg-white/20 absolute" style={{ height: '90%', width: '1px', backgroundColor: 'rgba(255,255,255,0.2)', position: 'absolute' }} />
        </div>

        {/* Tea Stars Container - Ensuring it is above grid but accessible */}
        <div className="relative w-full h-full max-w-5xl aspect-square md:aspect-video flex items-center justify-center" style={{ width: '100%', height: '100%', position: 'relative', zIndex: 10 }}>
          {displayTeas.map((tea) => (
            <motion.div
              key={tea.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              style={{ 
                left: `${tea.x}%`, 
                top: `${tea.y}%`,
                position: 'absolute'
              }}
              onHoverStart={() => setHoveredTea(tea)}
              onHoverEnd={() => setHoveredTea(null)}
              className="relative cursor-pointer group"
            >
              <motion.div
                animate={{ 
                  boxShadow: hoveredTea?.id === tea.id 
                    ? `0 0 30px 10px ${tea.color}` 
                    : `0 0 20px 5px ${tea.color}60`,
                  scale: hoveredTea?.id === tea.id ? 2 : 1.5
                }}
                className="w-5 h-5 rounded-full"
                style={{ backgroundColor: tea.color }}
              />
              <span className="absolute top-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-xs font-bold transition-opacity" style={{ color: tea.color, textShadow: '0 0 10px rgba(0,0,0,0.8)' }}>
                {tea.name}
              </span>

              {/* Ink Spread Effect on Hover */}
              {hoveredTea?.id === tea.id && (
                <div className="ink-drop" style={{ left: '50%', top: '50%', backgroundColor: tea.color }} />
              )}
            </motion.div>
          ))}
        </div>

        {/* Hover Information Display */}
        <div className="absolute bottom-8 left-8 right-8 pointer-events-none">
          <AnimatePresence>
            {hoveredTea && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl max-w-xs mx-auto text-center pointer-events-auto"
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255, 255, 255, 0.2)', padding: '1.5rem', borderRadius: '1rem' }}
              >
                <h3 className="text-lg font-bold serif mb-1 text-accent-olive" style={{ color: 'var(--accent-olive)', marginBottom: '0.25rem' }}>{hoveredTea.name}</h3>
                <p className="text-sm font-light leading-relaxed" style={{ fontSize: '0.875rem' }}>{hoveredTea.note}</p>
                <div className="mt-4 flex justify-center gap-1" style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginTop: '1rem' }}>
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-accent-olive opacity-40" style={{ width: '4px', height: '4px', borderRadius: '50%', backgroundColor: 'var(--accent-olive)', opacity: 0.4 }} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default function FlavorMapPage() {
  return (
    <main className="tea-gradient-bg min-h-screen relative overflow-hidden p-6 md:p-12 flex flex-col" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', position: 'relative', overflow: 'hidden', padding: '1.5rem' }}>
      <Suspense fallback={<div className="text-accent-olive serif">은하수 관측 중...</div>}>
        <MapContent />
      </Suspense>
    </main>
  );
}
