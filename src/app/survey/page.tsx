'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Heart, Wind, Coffee, Moon, Sun, Cloud, Zap, Sparkles } from 'lucide-react';

const QUESTIONS = [
  {
    id: 'mood',
    question: "오늘 하루의 색깔은 어땠나요?",
    options: [
      { label: "차분한 보라", value: "calm", icon: <Moon className="w-6 h-6" />, color: "#9b6dff" },
      { label: "활기찬 노랑", value: "energetic", icon: <Sun className="w-6 h-6" />, color: "#ffcc00" },
      { label: "몽글몽글 분홍", value: "warm", icon: <Heart className="w-6 h-6" />, color: "#ff8da1" },
      { label: "시원한 파랑", value: "refreshing", icon: <Wind className="w-6 h-6" />, color: "#60a5fa" },
    ]
  },
  {
    id: 'need',
    question: "지금 당장 내게 필요한 단어는?",
    options: [
      { label: "위로", value: "comfort", icon: <Cloud className="w-6 h-6" /> },
      { label: "집중", value: "focus", icon: <Zap className="w-6 h-6" /> },
      { label: "비워냄", value: "empty", icon: <Sparkles className="w-6 h-6" /> },
      { label: "따뜻함", value: "warmth", icon: <Coffee className="w-6 h-6" /> },
    ]
  }
];

export default function SurveyPage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const router = useRouter();

  const handleSelect = (value: string) => {
    const newAnswers = { ...answers, [QUESTIONS[step].id]: value };
    setAnswers(newAnswers);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      // 결론 페이지로 이동 (쿼리 파라미터로 데이터 전달)
      const params = new URLSearchParams(newAnswers);
      router.push(`/result?${params.toString()}`);
    }
  };

  return (
    <main className="tea-gradient-bg flex flex-col items-center justify-center min-h-screen px-6" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div className="w-full max-w-lg" style={{ width: '100%', maxWidth: '32rem' }}>
        {/* Progress Bar */}
        <div className="mb-12 flex justify-center gap-2" style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
          {QUESTIONS.map((_, i) => (
            <div 
              key={i}
              className={`h-1 rounded-full transition-all duration-500 ${
                i <= step ? 'w-8 bg-accent-olive' : 'w-4 bg-white/10'
              }`}
              style={{ height: '4px', borderRadius: '2px', width: i <= step ? '2rem' : '1rem', backgroundColor: i <= step ? 'var(--accent-olive)' : 'rgba(255,255,255,0.1)' }}
            />
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="glass-card p-10 text-center"
            style={{ textAlign: 'center' }}
          >
            <h2 className="text-2xl md:text-3xl mb-10 serif leading-snug" style={{ fontSize: '1.75rem', marginBottom: '2.5rem' }}>
              {QUESTIONS[step].question}
            </h2>

            <div className="grid grid-cols-2 gap-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              {QUESTIONS[step].options.map((option) => (
                <motion.button
                  key={option.value}
                  whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.1)' }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleSelect(option.value)}
                  className="flex flex-col items-center justify-center p-6 rounded-2xl border border-white/10 bg-white/5 gap-3 group"
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', cursor: 'pointer', backgroundColor: 'rgba(255,255,255,0.05)' }}
                >
                  <div className="text-accent-olive group-hover:scale-110 transition-transform duration-300" style={{ color: 'var(--accent-olive)' }}>
                    {option.icon}
                  </div>
                  <span className="text-sm font-light text-text-secondary" style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                    {option.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="text-center mt-12 text-xs font-light tracking-widest text-text-secondary"
          style={{ textAlign: 'center', marginTop: '3rem', opacity: 0.5, fontSize: '0.75rem', letterSpacing: '0.1em' }}
        >
          마음의 소리에 귀를 기울여보세요
        </motion.p>
      </div>

      <style jsx>{`
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .justify-center { justify-content: center; }
        .grid { display: grid; }
        .grid-cols-2 { grid-template-columns: 1fr 1fr; }
        .gap-4 { gap: 1rem; }
        .mb-12 { margin-bottom: 3rem; }
        .p-10 { padding: 2.5rem; }
        .p-6 { padding: 1.5rem; }
        .rounded-2xl { border-radius: 1rem; }
      `}</style>
    </main>
  );
}
