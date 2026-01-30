import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Plus, Flame, ChevronLeft, ChevronRight } from 'lucide-react';
import { Snack } from '../types';
import { Button } from './ui/Button';

interface ProductDetailModalProps {
  snack: Snack;
  onClose: () => void;
  onAdd: (snack: Snack) => void;
  currencySymbol: string;
  rate: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ 
  snack, 
  onClose, 
  onAdd,
  currencySymbol,
  rate
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = snack.gallery && snack.gallery.length > 0 ? snack.gallery : [snack.image];

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/60 backdrop-blur-sm"
      />
      
      <motion.div
        layoutId={`card-${snack.id}`}
        className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:h-[600px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-white/80 backdrop-blur-md rounded-full text-stone-600 hover:text-stone-900 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Gallery Section */}
        <div className="w-full md:w-1/2 bg-stone-100 relative h-64 md:h-full group">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt={snack.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>
          
          {images.length > 1 && (
            <>
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronLeft size={24} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white rounded-full transition-all opacity-0 group-hover:opacity-100"
              >
                <ChevronRight size={24} />
              </button>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-4' : 'bg-white/50 hover:bg-white/80'}`}
                  />
                ))}
              </div>
            </>
          )}

          {snack.offer && (
             <div className="absolute top-4 left-4 bg-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
               {snack.offer}
             </div>
          )}
        </div>

        {/* Details Section */}
        <div className="w-full md:w-1/2 p-8 flex flex-col h-full overflow-y-auto">
          <div className="flex justify-between items-start mb-2">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-teal-50 text-teal-700 text-xs font-bold uppercase tracking-wider mb-2">
                {snack.category}
              </span>
              <h2 className="text-3xl font-bold text-stone-800 leading-tight mb-2">{snack.name}</h2>
            </div>
            <div className="text-2xl font-bold text-teal-600">
              {currencySymbol}{(snack.price * rate).toFixed(2)}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 text-amber-400">
              <Star className="fill-current" size={16} />
              <span className="font-bold text-stone-700">{snack.rating}</span>
              <span className="text-stone-400 text-sm">({snack.reviews} reviews)</span>
            </div>
            <div className="w-1 h-1 bg-stone-300 rounded-full" />
            <div className="flex items-center gap-1 text-stone-500 text-sm">
              <Flame size={16} />
              <span>{snack.calories} kcal</span>
            </div>
          </div>

          <p className="text-stone-600 leading-relaxed text-lg mb-6">
            {snack.description}
          </p>

          <div className="mb-8">
            <h4 className="text-sm font-bold text-stone-400 uppercase tracking-wider mb-3">Perfect For Moods</h4>
            <div className="flex flex-wrap gap-2">
              {snack.moodTags.map(tag => (
                <span key={tag} className="px-3 py-1 bg-stone-100 text-stone-600 rounded-lg text-sm font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-stone-100">
            <Button 
              onClick={() => { onAdd(snack); onClose(); }} 
              className="w-full py-4 text-lg shadow-xl shadow-teal-500/10"
            >
              <Plus size={20} className="mr-2" />
              Add to Ritual
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};