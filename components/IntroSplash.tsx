import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/Button';
import { Wind } from 'lucide-react';

interface IntroSplashProps {
  onComplete: () => void;
}

export const IntroSplash: React.FC<IntroSplashProps> = ({ onComplete }) => {
  
  const playSound = () => {
    // Simple Web Audio API synthesized sound to avoid external assets
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    
    const ctx = new AudioContext();
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(180, ctx.currentTime); // Low soothing tone
    oscillator.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 1);
    
    gainNode.gain.setValueAtTime(0, ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.5);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 3);
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.start();
    oscillator.stop(ctx.currentTime + 3);
  };

  const handleStart = () => {
    playSound();
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-[#fafaf9] z-50 flex flex-col items-center justify-center overflow-hidden">
        {/* Soft Ambient Background Blobs */}
        <motion.div 
            className="absolute top-[-20%] left-[-20%] w-[60vw] h-[60vw] bg-teal-100/40 rounded-full blur-[120px]"
            animate={{ scale: [1, 1.2, 1], x: [0, 30, 0], y: [0, 40, 0] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
            className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-rose-100/40 rounded-full blur-[100px]"
            animate={{ scale: [1.1, 1, 1.1], x: [0, -40, 0], y: [0, -30, 0] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        />

      {/* 3D Scene */}
      <div className="relative w-72 h-72 mb-16" style={{ perspective: '1200px' }}>
        <motion.div
            className="w-full h-full relative"
            style={{ transformStyle: 'preserve-3d' }}
            initial={{ rotateX: 60, rotateY: 0, rotateZ: 0 }}
            animate={{ rotateZ: 360, rotateY: 360 }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
            {/* Central Core - The Soul */}
             <motion.div 
                className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full shadow-[0_0_50px_rgba(20,184,166,0.6)]"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: 'translateZ(0px)' }}
             />
             
             {/* Inner Ring */}
             <div 
                className="absolute top-1/2 left-1/2 border border-stone-800/20 rounded-full"
                style={{
                    width: '140px', height: '140px',
                    marginLeft: '-70px', marginTop: '-70px',
                    transform: 'rotateX(70deg) translateZ(0)'
                }}
             />

            {/* Orbiting Gyroscope Rings */}
            {[0, 1, 2].map((i) => (
                <motion.div
                    key={i}
                    className="absolute top-1/2 left-1/2 border border-stone-800/30 rounded-full"
                    style={{
                        width: `${200 + i * 40}px`,
                        height: `${200 + i * 40}px`,
                        marginLeft: `-${100 + i * 20}px`,
                        marginTop: `-${100 + i * 20}px`,
                    }}
                    animate={{ 
                        rotateX: [i * 45, 360 + i * 45], 
                        rotateY: [i * 30, 360 + i * 30] 
                    }}
                    transition={{ 
                        duration: 15 + i * 5, 
                        repeat: Infinity, 
                        ease: "linear" 
                    }}
                >
                    {/* Planet on Ring */}
                    <div className="absolute top-0 left-1/2 w-3 h-3 bg-stone-800 rounded-full -ml-1.5 -mt-1.5 shadow-lg" />
                </motion.div>
            ))}
        </motion.div>
      </div>
      
      <motion.h1 
        initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ delay: 0.3, duration: 1, ease: "easeOut" }}
        className="text-5xl md:text-6xl font-bold text-stone-800 mb-6 tracking-tight relative z-10"
      >
        Afternoon Reset
      </motion.h1>

      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="text-stone-500 mb-12 text-xl font-light tracking-wide relative z-10 max-w-md text-center leading-relaxed"
      >
        A mindful ritual to reclaim your calm.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ delay: 1.2, type: "spring" }}
        className="relative z-10"
      >
        <Button 
            onClick={handleStart} 
            className="px-12 py-5 text-lg bg-stone-800 hover:bg-stone-900 text-white rounded-full shadow-2xl hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.2)] transition-all duration-500 flex items-center gap-4 group"
        >
          <Wind size={22} className="text-teal-400 animate-pulse" />
          <span className="font-medium tracking-wide">Begin Ritual</span>
        </Button>
      </motion.div>
    </div>
  );
};