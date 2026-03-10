'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { ArrowLeft, Info } from 'lucide-react';
import Link from 'next/link';

const TEA_MAP_DATA = [
  { id: 1, name: "말차", x: 80, y: 20, note: "깊은 감칠맛과 에너자이징", color: "#4f772d" },
  { id: 2, name: "카모마일", x: 20, y: 30, note: "포근하고 화사한 꽃향기", color: "#f9dc5c" },
  { id: 3, name: "백차", x: 10, y: 10, note: "순수하고 싱그러운 첫물", color: "#e9edc9" },
  { id: 4, name: "철관음", x: 60, y: 80, note: "비 온 뒤 숲의 향기, 깊은 여운", color: "#2d6a4f" },
  { id: 5, name: "보이차", x: 90, y: 90, note: "세월이 빚은 묵직한 대지의 맛", color: "#3d2b1f" },
  { id: 6, name: "루이보스", x: 40, y: 60, note: "카페인 없는 따뜻한 위로", color: "#bc4749" },
  { id: 7, name: "얼그레이", x: 50, y: 20, note: "세련된 베르가못의 화사함", color: "#e07a5f" },
  { id: 8, name: "쟈스민", x: 15, y: 40, note: "우아하고 향긋한 휴식", color: "#fefae0" },
];

export default function FlavorMapPage() {
  const [hoveredTea, setHoveredTea] = useState<any>(null);

  return (
    <main className="tea-gradient-bg min-h-screen relative overflow-hidden p-6 md:p-12 flex flex-col">
      <div className="flex justify-between items-center mb-12">
        <Link href="/">
          <button className="flex items-center gap-2 text-text-secondary hover:text-accent-olive transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="serif">다실로 돌아가기</span>
          </button>
        </Link>
        <div className="text-right">
          <h1 className="text-2xl font-bold serif">차(Tea) 향미 은하수</h1>
          <p className="text-xs text-text-secondary opacity-60">Flavor Galaxy Map</p>
        </div>
      </div>

      <div className="flex-1 relative glass-card p-12 overflow-hidden flex items-center justify-center">
        {/* Galaxy Axis Labels */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest opacity-40 uppercase">화사함 (Floral/Fruit)</div>
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] tracking-widest opacity-40 uppercase">차분함 (Earthy/Body)</div>
        <div className="absolute left-4 top-1/2 -rotate-90 origin-center text-[10px] tracking-widest opacity-40 uppercase">산뜻함 (Light)</div>
        <div className="absolute right-4 top-1/2 rotate-90 origin-center text-[10px] tracking-widest opacity-40 uppercase">깊은맛 (Heavy)</div>

        {/* Center Grid Lines */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="w-full h-px bg-white" />
          <div className="h-full w-px bg-white absolute" />
        </div>

        {/* Tea Stars */}
        <div className="relative w-full h-full max-w-4xl max-h-[600px]">
          {TEA_MAP_DATA.map((tea) => (
            <motion.div
              key={tea.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: tea.id * 0.1, duration: 0.5 }}
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
                    ? `0 0 20px 5px ${tea.color}` 
                    : `0 0 10px 0px ${tea.color}40`,
                  scale: hoveredTea?.id === tea.id ? 1.5 : 1
                }}
                className="w-4 h-4 rounded-full"
                style={{ backgroundColor: tea.color }}
              />
              <span className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] opacity-60 font-light group-hover:opacity-100 transition-opacity">
                {tea.name}
              </span>

              {/* Ink Spread Effect on Hover (Simulated with simple circle) */}
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
              >
                <h3 className="text-lg font-bold serif mb-1 text-accent-olive">{hoveredTea.name}</h3>
                <p className="text-sm font-light leading-relaxed">{hoveredTea.note}</p>
                <div className="mt-4 flex justify-center gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="w-1 h-1 rounded-full bg-accent-olive opacity-40" />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
