import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Star, Search, MapPin, Loader2, Maximize2 } from 'lucide-react';
import { Snack, CurrencyCode, Shop } from '../types';
import { SNACKS } from '../constants';
import { Button } from './ui/Button';
import { findNearbyShops } from '../services/geminiService';
import { ProductDetailModal } from './ProductDetailModal';

interface SnackListProps {
  onAdd: (snack: Snack) => void;
  currency: CurrencyCode;
  rate: number;
  symbol: string;
}

export const SnackList: React.FC<SnackListProps> = ({ onAdd, currency, rate, symbol }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSnack, setSelectedSnack] = useState<Snack | null>(null);
  const [nearbySearchId, setNearbySearchId] = useState<string | null>(null);
  const [nearbyShops, setNearbyShops] = useState<Shop[]>([]);
  const [nearbyMessage, setNearbyMessage] = useState<string>('');

  const filteredSnacks = SNACKS.filter(snack => 
    snack.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    snack.moodTags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleFindNearby = async (e: React.MouseEvent, snack: Snack) => {
    e.stopPropagation();
    setNearbySearchId(snack.id);
    setNearbyMessage("Locating you...");
    setNearbyShops([]);

    if (!navigator.geolocation) {
      setNearbyMessage("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(async (position) => {
      setNearbyMessage("Searching nearby...");
      const { latitude, longitude } = position.coords;
      const result = await findNearbyShops(snack.name, latitude, longitude);
      
      setNearbyShops(result.shops);
      if (result.shops.length === 0) {
        setNearbyMessage(result.text.slice(0, 100) + "...");
      } else {
        setNearbyMessage(`Found ${result.shops.length} spots within 5km.`);
      }
    }, (err) => {
      console.error(err);
      setNearbyMessage("Location access denied.");
    });
  };

  const closeNearby = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setNearbySearchId(null);
    setNearbyShops([]);
    setNearbyMessage('');
  };

  return (
    <div className="pb-24">
      {/* Search Bar */}
      <div className="relative mb-8 max-w-md mx-auto md:mx-0">
        <input 
          type="text" 
          placeholder="Search snacks or moods (e.g., 'stressed', 'tea')..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-12 pr-4 py-3 rounded-xl border border-stone-200 focus:ring-2 focus:ring-teal-500 focus:outline-none bg-white shadow-sm"
        />
        <Search className="absolute left-4 top-3.5 text-stone-400" size={20} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSnacks.map((snack, index) => (
          <motion.div
            key={snack.id}
            layoutId={`card-${snack.id}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelectedSnack(snack)}
            className="bg-white rounded-2xl shadow-sm hover:shadow-xl hover:shadow-teal-500/5 transition-all duration-300 overflow-hidden group flex flex-col h-full border border-stone-100 relative cursor-pointer"
          >
            {/* Image & Similar Vibe Indicator */}
            <div className="relative h-48 overflow-hidden bg-stone-200">
               <motion.img 
                 src={snack.image} 
                 alt={snack.name}
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                 loading="lazy"
               />
               
               <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
               
               {/* Offer Badge */}
               {snack.offer && (
                 <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-sm uppercase tracking-wider z-10">
                   {snack.offer}
                 </div>
               )}

               <div className="absolute top-3 right-3 flex gap-2">
                 <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-stone-600 uppercase tracking-wide">
                   {snack.category}
                 </span>
               </div>
               
               <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white/30 backdrop-blur-md p-3 rounded-full text-white">
                    <Maximize2 size={24} />
                  </div>
               </div>
               
               {/* Location Overlay if Active */}
               <AnimatePresence>
                 {nearbySearchId === snack.id && (
                   <motion.div 
                    initial={{ opacity: 0, y: '100%' }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: '100%' }}
                    onClick={(e) => e.stopPropagation()}
                    className="absolute inset-0 bg-white/95 backdrop-blur-md p-4 flex flex-col z-10 cursor-default"
                   >
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-stone-800 text-sm">Nearby Locations</h4>
                        <button onClick={closeNearby} className="text-stone-400 hover:text-stone-600"><Plus className="rotate-45" size={20}/></button>
                      </div>
                      <div className="flex-grow overflow-y-auto no-scrollbar space-y-2">
                         {nearbyMessage && <p className="text-xs text-stone-500 italic">{nearbyMessage}</p>}
                         {nearbyShops.map((shop, i) => (
                           <a key={i} href={shop.uri} target="_blank" rel="noopener noreferrer" className="block p-2 bg-stone-50 rounded border border-stone-100 hover:bg-teal-50 hover:border-teal-100 transition-colors">
                             <p className="font-bold text-sm text-stone-800">{shop.name}</p>
                             <p className="text-xs text-teal-600 flex items-center gap-1"><MapPin size={10}/> View on Map</p>
                           </a>
                         ))}
                         {nearbyShops.length === 0 && !nearbyMessage.includes("Found") && (
                            <div className="flex justify-center py-4 text-teal-500 animate-pulse"><Loader2 className="animate-spin"/></div>
                         )}
                      </div>
                   </motion.div>
                 )}
               </AnimatePresence>
            </div>
            
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-1">
                <h3 className="text-xl font-bold text-stone-800 leading-tight group-hover:text-teal-700 transition-colors">{snack.name}</h3>
                <span className="text-lg font-medium text-teal-600">{symbol}{(snack.price * rate).toFixed(2)}</span>
              </div>
              
              {/* Ratings */}
              <div className="flex items-center gap-1 mb-3">
                 <Star size={14} className="fill-amber-400 text-amber-400" />
                 <span className="text-sm font-bold text-stone-700">{snack.rating}</span>
                 <span className="text-xs text-stone-400">({snack.reviews} reviews)</span>
              </div>
              
              <p className="text-stone-500 text-sm mb-4 line-clamp-2 flex-grow">{snack.description}</p>
              
              <div className="mt-auto grid grid-cols-[auto_1fr] gap-2">
                <Button 
                  variant="outline"
                  size="sm"
                  onClick={(e) => handleFindNearby(e, snack)}
                  className="px-3 hover:bg-stone-100"
                  title="Find Nearby Shops"
                >
                  <MapPin size={18} />
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="w-full flex items-center gap-2 justify-center group-hover:bg-teal-600 transition-all shadow-sm"
                  onClick={(e) => { e.stopPropagation(); onAdd(snack); }}
                >
                  <Plus size={16} />
                  <span>Add to Ritual</span>
                </Button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      {filteredSnacks.length === 0 && (
        <div className="text-center py-12 text-stone-400">
          <p>No snacks found matching that mood or name.</p>
        </div>
      )}

      <AnimatePresence>
        {selectedSnack && (
          <ProductDetailModal 
            snack={selectedSnack} 
            onClose={() => setSelectedSnack(null)} 
            onAdd={onAdd}
            currencySymbol={symbol}
            rate={rate}
          />
        )}
      </AnimatePresence>
    </div>
  );
};