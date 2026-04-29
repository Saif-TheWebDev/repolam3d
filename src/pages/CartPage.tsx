import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, ArrowRight, ArrowLeft, Tag, Shield } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, SectionHeader } from '../components/Shared';
import { motion, AnimatePresence } from 'motion/react';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-60 text-center px-6 max-w-7xl mx-auto">
        <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center text-gray-500 mx-auto mb-8">
          <ShoppingCart size={40} />
        </div>
        <h2 className="text-3xl font-display font-bold mb-4">Your Cart is <span className="text-brand-red">Empty</span></h2>
        <p className="text-gray-400 mb-10 max-w-sm mx-auto font-light">You haven't added any premium assets to your vault yet.</p>
        <Button onClick={() => navigate('/marketplace')} className="mx-auto h-14 px-12">Browse Marketplace</Button>
      </div>
    );
  }

  const tax = cartTotal * 0.08; // 8% placeholder tax
  const total = cartTotal + tax;

  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <SectionHeader title="Your Asset Vault" subtitle={`You have ${cart.length} item(s) pending.`} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 items-start">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          <AnimatePresence>
            {cart.map((item) => (
              <motion.div
                key={`${item.model.id}-${item.selectedMaterial || 'none'}`}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex items-center gap-6 p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-colors relative group"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-xl overflow-hidden shrink-0 border border-white/10">
                  <img src={item.model.thumbnail || null} alt={item.model.title} className="w-full h-full object-cover" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between mb-2">
                    <p className="text-[10px] font-bold text-brand-red uppercase tracking-widest">{item.model.category}</p>
                    <button 
                      onClick={() => removeFromCart(item.model.id, item.selectedMaterial)}
                      className="text-gray-500 hover:text-brand-red transition-colors"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  <h3 className="text-lg font-bold truncate mb-1">{item.model.title}</h3>
                  <div className="flex items-center gap-3 mb-6">
                    <p className="text-xs text-gray-500">{item.model.creator}</p>
                    {item.selectedMaterial && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-700" />
                        <span className="text-[10px] font-bold text-brand-red uppercase tracking-wider bg-brand-red/10 px-2 py-0.5 rounded">
                          {item.selectedMaterial}
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 bg-brand-black border border-white/10 rounded-lg p-1">
                      <button 
                        onClick={() => updateQuantity(item.model.id, item.quantity - 1, item.selectedMaterial)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-bold px-2">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.model.id, item.quantity + 1, item.selectedMaterial)}
                        className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-white transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <p className="font-display font-bold text-xl">৳{((item.model.price + (item.materialPrice || 0)) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          <Link to="/marketplace" className="inline-flex items-center gap-2 text-gray-500 hover:text-white transition-colors pt-4 group text-sm font-medium">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </Link>
        </div>

        {/* Order Summary */}
        <aside className="lg:sticky lg:top-32 space-y-8">
          <div className="bg-brand-surface rounded-3xl p-8 border border-white/10 shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                <Shield size={120} />
             </div>
             
             <h3 className="text-xl font-display font-bold mb-8">Order Summary</h3>
             
             <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Subtotal</span>
                  <span className="text-white font-mono">৳{cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-400">
                  <span>Sales Tax (8%)</span>
                  <span className="text-white font-mono">৳{tax.toFixed(2)}</span>
                </div>
                <div className="pt-4 border-t border-white/10 flex justify-between items-end">
                   <span className="text-lg font-bold">Total Cost</span>
                   <span className="text-3xl font-display font-bold text-brand-red drop-shadow-[0_0_10px_rgba(255,0,0,0.3)]">
                    ৳{total.toFixed(2)}
                   </span>
                </div>
             </div>

             {/* Coupon */}
             <div className="relative mb-10">
                <Tag size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                <input 
                  type="text" 
                  placeholder="Promo Code" 
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-red transition-all"
                />
             </div>

             <Button 
               className="w-full h-14 text-base gap-3 group shadow-red-glow"
               onClick={() => navigate('/checkout')}
             >
               Proceed to Checkout
               <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
             </Button>
          </div>

          <div className="p-6 bg-white/2 rounded-2xl border border-white/5">
             <div className="flex items-center gap-4 text-xs text-gray-500 leading-relaxed italic">
                <Shield className="shrink-0 text-brand-red" size={20} />
                <span>Your purchase is encrypted with 256-bit SSL technology. Immediate digital delivery guaranteed after payment success.</span>
             </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
