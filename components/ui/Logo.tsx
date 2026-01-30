import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const Logo: React.FC<{ size?: number, animated?: boolean }> = ({ size = 40, animated = false }) => {
  const [blink, setBlink] = useState(false);
  
  useEffect(() => {
    if (!animated) return;
    
    let timeout: ReturnType<typeof setTimeout>;
    const triggerBlink = () => {
        setBlink(true);
        setTimeout(() => {
            setBlink(false);
            // Random interval between 2s and 6s for next blink
            timeout = setTimeout(triggerBlink, Math.random() * 4000 + 2000); 
        }, 150); // Blink duration
    };
    
    // Initial delay
    timeout = setTimeout(triggerBlink, 2000);
    return () => clearTimeout(timeout);
  }, [animated]);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      {/* Container - centers content */}
      <div className="w-full h-full relative flex items-center justify-center">
        
        {/* Eye Shape / Mask */}
        <motion.div
          className="relative bg-white overflow-hidden shadow-inner border border-stone-200"
          style={{
            width: '90%',
            height: '70%',
            borderRadius: '70% 70% 50% 50% / 90% 90% 50% 50%', // Anime eye shape
            boxShadow: 'inset 0 4px 12px rgba(0,0,0,0.15), 0 2px 5px rgba(0,0,0,0.1)'
          }}
          animate={animated && blink ? { scaleY: 0.1 } : { scaleY: 1 }}
          transition={{ duration: 0.1 }}
        >
          {/* Sclera Shadow (Top) - 3D depth */}
          <div className="absolute top-0 w-full h-1/3 bg-gradient-to-b from-stone-400/30 to-transparent pointer-events-none z-10" />

          {/* Iris - Animated */}
          <motion.div
            className="absolute top-1/2 left-1/2"
            style={{
              width: '55%',
              height: '85%',
              marginLeft: '-27.5%',
              marginTop: '-42.5%'
            }}
            animate={animated ? {
              x: [0, 8, -8, 0, 0, 0], 
              y: [0, 0, 2, 0, -4, 0]
            } : {}}
            transition={{
              duration: 8,
              repeat: Infinity,
              times: [0, 0.1, 0.2, 0.3, 0.4, 1],
              ease: "easeInOut"
            }}
          >
             {/* Iris Gradient Body */}
             <div className="w-full h-full rounded-[45%] overflow-hidden relative shadow-lg bg-gradient-to-br from-teal-800 via-teal-500 to-teal-300">
                {/* Dark Ring Outline */}
                <div className="absolute inset-0 border-2 border-teal-900/40 rounded-[45%]" />
                
                {/* Pupil */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[35%] h-[45%] bg-stone-900 rounded-[50%]" />

                {/* Internal Glow/Reflection (Bottom U shape) */}
                <div className="absolute bottom-[-10%] left-1/2 transform -translate-x-1/2 w-[80%] h-[50%] bg-teal-200/40 blur-md rounded-full" />
                
                {/* Top Shadow inside Iris */}
                <div className="absolute top-0 w-full h-[40%] bg-gradient-to-b from-black/50 to-transparent" />
             </div>

             {/* Main Highlight (Top Left) */}
             <div className="absolute top-[15%] left-[10%] w-[35%] h-[25%] bg-white rounded-full shadow-[0_0_10px_white] z-20" />
             
             {/* Secondary Highlight (Bottom Right) */}
             <div className="absolute bottom-[20%] right-[15%] w-[12%] h-[12%] bg-white/70 rounded-full blur-[0.5px] z-20" />

          </motion.div>
        </motion.div>

        {/* Upper Lash (Thick) */}
        <motion.div 
            className="absolute top-[10%] w-[100%] h-[12%] bg-stone-800 rounded-[50%_50%_100%_0]"
            animate={animated && blink ? { y: '250%' } : { y: 0 }}
            transition={{ duration: 0.1 }}
            style={{ zIndex: 30 }}
        />
        {/* Upper Lash Wing */}
        <motion.div 
            className="absolute top-[5%] right-[-5%] w-[25%] h-[15%] bg-stone-800 rounded-full"
            style={{ rotate: '-20deg', zIndex: 29 }}
            animate={animated && blink ? { y: '250%', rotate: 0 } : { y: 0, rotate: -20 }}
            transition={{ duration: 0.1 }}
        />

        {/* Simple Lower Lash Line */}
        <div className="absolute bottom-[12%] w-[60%] h-[3%] bg-stone-300 rounded-full opacity-60" />

      </div>
    </div>
  );
};