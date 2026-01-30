import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Tag, Sparkles, Phone } from 'lucide-react';
import { CartItem, Snack } from '../types';
import { Button } from './ui/Button';
import { SNACKS, COUPONS } from '../constants';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onCheckout: (mobile: string) => void;
  onAdd: (snack: Snack) => void;
  rate: number;
  symbol: string;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity,
  onCheckout,
  onAdd,
  rate,
  symbol
}) => {
  const [activeCoupon, setActiveCoupon] = useState<string | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [error, setError] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = activeCoupon ? subtotal * (COUPONS.find(c => c.code === activeCoupon)?.discount || 0) : 0;
  const total = subtotal - discount;

  // Simple logic to recommend something not in cart
  const recommendation = SNACKS.find(s => !cart.some(c => c.id === s.id));

  const handleCheckoutClick = () => {
    if (!mobileNumber.trim()) {
      setError('Mobile number is required');
      return;
    }
    setError('');
    onCheckout(mobileNumber);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-stone-900/20 backdrop-blur-sm z-40"
          />
          
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col"
          >
            <div className="p-6 flex items-center justify-between border-b border-stone-100">
              <h2 className="text-2xl font-bold text-stone-800 flex items-center gap-2">
                <ShoppingBag className="text-teal-500" />
                Your Ritual
              </h2>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors text-stone-500">
                <X size={24} />
              </button>
            </div>

            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-stone-400 space-y-4">
                  <ShoppingBag size={48} className="opacity-20" />
                  <p>Your ritual is empty.</p>
                  <Button variant="ghost" onClick={onClose}>Browse Snacks</Button>
                </div>
              ) : (
                <>
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-4">
                        <img 
                          src={item.image} 
                          className="w-20 h-20 rounded-lg object-cover bg-stone-100"
                          alt={item.name}
                        />
                        <div className="flex-grow flex flex-col justify-between">
                          <div>
                            <h4 className="font-bold text-stone-800">{item.name}</h4>
                            <p className="text-sm text-stone-500">{symbol}{(item.price * rate).toFixed(2)}</p>
                          </div>
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => onUpdateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 text-stone-600"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="font-medium text-stone-800 w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => onUpdateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-full border border-stone-200 flex items-center justify-center hover:bg-stone-50 text-stone-600"
                            >
                              <Plus size={14} />
                            </button>
                          </div>
                        </div>
                        <div className="text-right font-medium text-stone-800">
                          {symbol}{((item.price * item.quantity) * rate).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Recommendation Engine */}
                  {recommendation && (
                    <div className="bg-teal-50 p-4 rounded-xl border border-teal-100">
                      <div className="flex items-center gap-2 mb-2 text-teal-700 font-bold text-sm">
                        <Sparkles size={16} />
                        <span>Pairing Suggestion</span>
                      </div>
                      <div className="flex gap-3 items-center">
                        <img 
                          src={recommendation.image} 
                          className="w-12 h-12 rounded-lg object-cover"
                          alt={recommendation.name}
                        />
                        <div className="flex-grow">
                          <p className="font-bold text-stone-800 text-sm">{recommendation.name}</p>
                          <p className="text-xs text-stone-500">{symbol}{(recommendation.price * rate).toFixed(2)}</p>
                        </div>
                        <Button size="sm" variant="secondary" onClick={() => onAdd(recommendation)} className="h-8 px-3">
                          Add
                        </Button>
                      </div>
                    </div>
                  )}

                  {/* Coupons */}
                  <div className="space-y-3">
                    <h4 className="font-bold text-stone-800 text-sm flex items-center gap-2">
                       <Tag size={16} /> Available Coupons
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {COUPONS.map(coupon => (
                         <button
                           key={coupon.code}
                           onClick={() => setActiveCoupon(coupon.code === activeCoupon ? null : coupon.code)}
                           className={`text-xs p-2 rounded-lg border text-center transition-all ${
                             activeCoupon === coupon.code 
                               ? 'bg-stone-800 text-white border-stone-800' 
                               : 'bg-white border-stone-200 text-stone-600 hover:border-stone-400'
                           }`}
                         >
                           <div className="font-bold">{coupon.code}</div>
                           <div className="opacity-80">{coupon.label}</div>
                         </button>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 bg-stone-50 border-t border-stone-100 space-y-4">
                <div className="space-y-2">
                   <div className="flex justify-between items-center text-sm text-stone-500">
                      <span>Subtotal</span>
                      <span>{symbol}{(subtotal * rate).toFixed(2)}</span>
                   </div>
                   {activeCoupon && (
                     <div className="flex justify-between items-center text-sm text-teal-600 font-medium">
                        <span>Discount</span>
                        <span>-{symbol}{(discount * rate).toFixed(2)}</span>
                     </div>
                   )}
                   <div className="flex justify-between items-center text-xl font-bold text-stone-800 pt-2 border-t border-stone-200 mb-2">
                     <span>Total</span>
                     <span>{symbol}{(total * rate).toFixed(2)}</span>
                   </div>

                   {/* Mobile Number Input */}
                   <div className="pt-2">
                      <label className="block text-xs font-bold text-stone-500 uppercase mb-1">Mobile Number</label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 text-stone-400" size={16} />
                        <input
                          type="tel"
                          value={mobileNumber}
                          onChange={(e) => {
                            setMobileNumber(e.target.value);
                            setError('');
                          }}
                          placeholder="+1 (555) 000-0000"
                          className={`w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 outline-none text-stone-800 ${error ? 'border-red-300 focus:ring-red-200 bg-red-50' : 'border-stone-200 focus:ring-teal-500 bg-white'}`}
                        />
                      </div>
                      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
                   </div>
                </div>
                
                <Button className="w-full justify-between group" onClick={handleCheckoutClick}>
                  <span>Start Ritual</span>
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};