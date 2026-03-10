'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="tea-gradient-bg flex flex-col items-center justify-center min-h-screen px-6 text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="max-w-2xl"
        style={{ maxWidth: '42rem' }}
      >
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          className="text-accent-olive tracking-widest uppercase text-sm mb-4 block"
          style={{ color: 'var(--accent-olive)', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.875rem', marginBottom: '1rem', display: 'block' }}
        >
          Digital Tea Room
        </motion.span>
        
        <h1 className="text-4xl md:text-6xl font-bold serif tracking-tight" style={{ fontSize: '3.5rem', fontWeight: 700, marginBottom: '3rem', letterSpacing: '-0.025em', lineHeight: '1.6' }}>
          마음을 달이는 시간, <br />
          <span className="text-accent-olive" style={{ color: 'var(--accent-olive)', display: 'inline-block', marginTop: '1.5rem' }}>다(茶)방전</span>
        </h1>
        
        <p className="text-text-secondary text-lg mb-10 leading-relaxed font-light" style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginBottom: '3rem', lineHeight: 1.8, fontWeight: 300 }}>
          복잡한 생각은 잠시 내려놓고, <br />
          지금 당신에게 꼭 필요한 온기 한 잔을 찾아보세요.
        </p>

        <div className="flex flex-col items-center gap-4" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
          <Link href="/survey">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="button-premium px-12 py-4"
              style={{ padding: '1rem 3rem' }}
            >
              다실 입장하기
            </motion.button>
          </Link>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="text-xs text-text-secondary mt-4 font-light italic"
            style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '1rem', opacity: 0.6, fontWeight: 300, fontStyle: 'italic' }}
          >
            차(tea) 마스터가 당신의 마음 날씨를 기다리고 있습니다.
          </motion.div>
        </div>
      </motion.div>

      {/* Subtle Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-1/4 -right-1/4 w-1/2 h-1/2 bg-accent-olive rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.05, 0.15, 0.05],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute -bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-accent-gold rounded-full blur-[120px]"
        />
      </div>

      <style jsx>{`
        main {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          text-align: center;
          padding: 0 24px;
        }
        .max-w-2xl { max-width: 42rem; }
        .text-4xl { font-size: 2.25rem; line-height: 2.5rem; }
        .md\:text-6xl { @media (min-width: 768px) { font-size: 3.75rem; line-height: 1; } }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-10 { margin-bottom: 2.5rem; }
        .mt-4 { margin-top: 1rem; }
        .text-lg { font-size: 1.125rem; line-height: 1.75rem; }
        .text-sm { font-size: 0.875rem; }
        .text-xs { font-size: 0.75rem; }
        .font-bold { font-weight: 700; }
        .font-light { font-weight: 300; }
        .leading-relaxed { line-height: 1.625; }
        .tracking-widest { letter-spacing: 0.1em; }
        .tracking-tight { letter-spacing: -0.025em; }
        .flex { display: flex; }
        .flex-col { flex-direction: column; }
        .items-center { align-items: center; }
        .gap-4 { gap: 1rem; }
        .block { display: block; }
        .fixed { position: fixed; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .pointer-events-none { pointer-events: none; }
        .overflow-hidden { overflow: hidden; }
        .-z-10 { z-index: -10; }
        .absolute { position: absolute; }
        .-top-1\/4 { top: -25%; }
        .-right-1\/4 { right: -25%; }
        .-bottom-1\/4 { bottom: -25%; }
        .-left-1\/4 { left: -25%; }
        .w-1\/2 { width: 50%; }
        .h-1\/2 { height: 50%; }
        .bg-accent-olive { background-color: var(--accent-olive); }
        .bg-accent-gold { background-color: var(--accent-gold); }
        .rounded-full { border-radius: 9999px; }
        .blur-\[120px\] { filter: blur(120px); }
      `}</style>
    </main>
  );
}
