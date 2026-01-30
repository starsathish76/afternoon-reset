import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Check, Clock, Home, MessageSquare } from 'lucide-react';
import { Button } from './ui/Button';
import { CALM_QUOTES } from '../constants';

interface ConfirmationProps {
  onHome: () => void;
  mobileNumber: string;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ onHome, mobileNumber }) => {
  // Select a random quote
  const quote = CALM_QUOTES[Math.floor(Math.random() * CALM_QUOTES.length)];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 mb-8"
      >
        <Check size={48} strokeWidth={3} />
      </motion.div>

      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold text-stone-800 mb-4"
      >
        Order Confirmed
      </motion.h2>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-stone-500 max-w-md mb-8 text-lg"
      >
        Your ritual is being prepared. It will arrive at your desk shortly.
      </motion.p>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white rounded-xl shadow-sm border border-stone-100 p-6 w-full max-w-sm mb-12"
      >
        <div className="flex items-center justify-center gap-2 text-stone-700 font-medium mb-2">
          <Clock size={20} className="text-teal-500" />
          <span>Estimated Arrival</span>
        </div>
        <div className="text-4xl font-bold text-stone-800 mb-4">
          5:00 <span className="text-lg text-stone-400 font-normal">mins</span>
        </div>
        
        {mobileNumber && (
          <div className="pt-4 border-t border-stone-100 flex items-center justify-center gap-2 text-stone-500 text-sm">
             <MessageSquare size={16} className="text-stone-400"/>
             <span>Updates sent to <span className="font-mono font-medium text-stone-700">{mobileNumber}</span></span>
          </div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="mb-12"
      >
        <p className="italic text-stone-400 font-serif text-lg">"{quote}"</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Button variant="outline" onClick={onHome} className="gap-2">
          <Home size={18} /> Back to Home
        </Button>
      </motion.div>
    </div>
  );
};