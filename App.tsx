import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import { Snack, CartItem, AppView, CurrencyCode, CURRENCY_RATES, CURRENCY_SYMBOLS } from './types';
import { SnackList } from './components/SnackList';
import { MoodWizard } from './components/MoodWizard';
import { CartDrawer } from './components/CartDrawer';
import { Confirmation } from './components/Confirmation';
import { IntroSplash } from './components/IntroSplash';
import { Button } from './components/ui/Button';
import { Logo } from './components/ui/Logo';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.INTRO);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [userMobile, setUserMobile] = useState('');

  const addToCart = (snack: Snack) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === snack.id);
      if (existing) {
        return prev.map(item => 
          item.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...snack, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        return { ...item, quantity: Math.max(0, item.quantity + delta) };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const clearCart = () => setCart([]);

  const handleCheckout = (mobile: string) => {
    setUserMobile(mobile);
    setIsCartOpen(false);
    setView(AppView.CONFIRMATION);
    clearCart();
  };

  const handleRecommendationAccepted = (snack: Snack) => {
    addToCart(snack);
    setView(AppView.BROWSE);
  };

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // If we are in INTRO view, show splash
  if (view === AppView.INTRO) {
    return <IntroSplash onComplete={() => setView(AppView.BROWSE)} />;
  }

  return (
    <div className="min-h-screen bg-[#fafaf9] text-stone-800">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-[#fafaf9]/80 backdrop-blur-md border-b border-stone-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setView(AppView.BROWSE)}
          >
            <Logo size={32} animated={false} />
            <h1 className="text-xl font-bold tracking-tight text-stone-800">
              Afternoon Reset
            </h1>
          </div>
          
          <div className="flex items-center gap-3">
             <div className="relative hidden md:flex items-center bg-transparent hover:bg-stone-100 rounded-full transition-colors">
               <Globe size={14} className="absolute left-3 text-stone-500 pointer-events-none" />
               <select
                 value={currency}
                 onChange={(e) => setCurrency(e.target.value as CurrencyCode)}
                 className="pl-8 pr-3 py-1.5 bg-transparent text-stone-600 font-mono text-xs appearance-none border-none focus:ring-0 cursor-pointer outline-none w-20"
               >
                 {Object.keys(CURRENCY_RATES).map((code) => (
                   <option key={code} value={code}>{code}</option>
                 ))}
               </select>
             </div>

             {view === AppView.BROWSE && (
               <Button 
                 variant="ghost" 
                 size="sm" 
                 className="hidden sm:flex gap-2 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                 onClick={() => setView(AppView.MOOD_WIZARD)}
               >
                 <Sparkles size={18} />
                 <span>Mood Wizard</span>
               </Button>
             )}

            <button 
              className="relative p-2 hover:bg-stone-100 rounded-full transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingBag size={24} className="text-stone-600" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 h-5 w-5 bg-teal-500 text-white text-xs font-bold flex items-center justify-center rounded-full border-2 border-[#fafaf9]">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AnimatePresence mode="wait">
          {view === AppView.BROWSE && (
            <motion.div
              key="browse"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-8"
            >
              <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-3xl p-8 md:p-12 mb-10 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
                <div className="space-y-4 max-w-lg relative z-10">
                  <h2 className="text-3xl md:text-4xl font-bold text-stone-800 leading-tight">
                    Reset your mind,<br/>one snack at a time.
                  </h2>
                  <p className="text-lg text-stone-600">
                    Discover curated rituals to break the afternoon slump.
                  </p>
                  <Button 
                    className="gap-2 bg-stone-800 text-white" 
                    onClick={() => setView(AppView.MOOD_WIZARD)}
                  >
                    <Sparkles size={18} />
                    Find my perfect ritual
                  </Button>
                </div>
                <div className="hidden md:block opacity-60 scale-150 transform translate-x-12">
                   <Logo size={200} animated={true} />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-stone-800">Curated Collection</h3>
              </div>
              
              <SnackList 
                onAdd={addToCart} 
                currency={currency}
                rate={CURRENCY_RATES[currency]}
                symbol={CURRENCY_SYMBOLS[currency]}
              />
            </motion.div>
          )}

          {view === AppView.MOOD_WIZARD && (
            <motion.div
              key="wizard"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <MoodWizard 
                onRecommendationAccepted={handleRecommendationAccepted}
                onCancel={() => setView(AppView.BROWSE)}
              />
            </motion.div>
          )}

          {view === AppView.CONFIRMATION && (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Confirmation 
                onHome={() => setView(AppView.BROWSE)} 
                mobileNumber={userMobile}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onCheckout={handleCheckout}
        onAdd={addToCart}
        rate={CURRENCY_RATES[currency]}
        symbol={CURRENCY_SYMBOLS[currency]}
      />
    </div>
  );
};

export default App;