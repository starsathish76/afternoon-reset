import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2, RefreshCw, ArrowRight } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Snack, RitualRecommendation } from '../types';
import { getRitualSuggestion } from '../services/geminiService';
import { SNACKS, MOOD_STATS } from '../constants';
import { Button } from './ui/Button';

interface MoodWizardProps {
  onRecommendationAccepted: (snack: Snack) => void;
  onCancel: () => void;
}

export const MoodWizard: React.FC<MoodWizardProps> = ({ onRecommendationAccepted, onCancel }) => {
  const [moodInput, setMoodInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<RitualRecommendation | null>(null);

  const handleGetSuggestion = async () => {
    if (!moodInput.trim()) return;
    setIsLoading(true);
    const result = await getRitualSuggestion(moodInput, SNACKS);
    setRecommendation(result);
    setIsLoading(false);
  };

  const recommendedSnack = recommendation 
    ? SNACKS.find(s => s.id === recommendation.snackId) 
    : null;

  return (
    <div className="max-w-2xl mx-auto space-y-8 pb-24">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-stone-800">How are you feeling right now?</h2>
        <p className="text-stone-500">We'll curate a ritual to help you reset.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-6 space-y-6">
        {!recommendation ? (
          <>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-stone-700">Describe your mood</label>
              <div className="relative">
                <textarea
                  value={moodInput}
                  onChange={(e) => setMoodInput(e.target.value)}
                  placeholder="e.g., I'm feeling overwhelmed with deadlines and need a moment of peace..."
                  className="w-full h-32 p-4 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none bg-stone-50 text-stone-800 placeholder:text-stone-400"
                />
                <div className="absolute bottom-3 right-3">
                   <Sparkles className="text-teal-400" size={20} />
                </div>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" onClick={onCancel}>Cancel</Button>
                <Button 
                  onClick={handleGetSuggestion} 
                  disabled={!moodInput.trim() || isLoading}
                  className="w-full sm:w-auto"
                >
                  {isLoading ? (
                    <><Loader2 className="animate-spin mr-2" size={18}/> Thinking...</>
                  ) : (
                    'Suggest a Ritual'
                  )}
                </Button>
              </div>
            </div>

            <div className="pt-6 border-t border-stone-100">
               <h3 className="text-sm font-semibold text-stone-500 mb-4 uppercase tracking-wider text-center">Current Office Vibe</h3>
               <div className="h-48 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={MOOD_STATS}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {MOOD_STATS.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.fill} stroke="none" />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#57534e', fontWeight: 600 }}
                      />
                    </PieChart>
                 </ResponsiveContainer>
               </div>
               <p className="text-center text-xs text-stone-400 mt-2">Based on anonymous check-ins today</p>
            </div>
          </>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-6"
          >
             <div className="bg-teal-50 rounded-xl p-6 border border-teal-100">
                <div className="flex items-center gap-2 text-teal-700 font-medium mb-2">
                   <Sparkles size={18} />
                   <span>Ritual Recommendation</span>
                </div>
                <p className="text-teal-900 text-lg leading-relaxed">{recommendation.reasoning}</p>
             </div>

             <div className="bg-stone-50 rounded-xl p-6 border border-stone-100">
                <div className="flex items-center gap-2 text-stone-600 font-medium mb-2">
                   <RefreshCw size={18} />
                   <span>Suggested Activity</span>
                </div>
                <p className="text-stone-800 text-lg font-medium">{recommendation.activity}</p>
             </div>

             {recommendedSnack && (
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-white p-4 rounded-xl border border-stone-100 shadow-sm">
                   <img 
                     src={recommendedSnack.image}
                     className="w-20 h-20 rounded-lg object-cover"
                     alt={recommendedSnack.name}
                   />
                   <div className="flex-grow text-center sm:text-left">
                     <h4 className="font-bold text-stone-800">{recommendedSnack.name}</h4>
                     <p className="text-sm text-stone-500">{recommendedSnack.description}</p>
                   </div>
                   <div className="text-teal-600 font-bold">
                     ${recommendedSnack.price.toFixed(2)}
                   </div>
                </div>
             )}

             <div className="flex gap-3 pt-4">
                <Button variant="ghost" onClick={() => setRecommendation(null)} className="flex-1">Try Again</Button>
                <Button 
                  className="flex-[2]" 
                  onClick={() => recommendedSnack && onRecommendationAccepted(recommendedSnack)}
                >
                  Accept Ritual <ArrowRight size={18} className="ml-2"/>
                </Button>
             </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};