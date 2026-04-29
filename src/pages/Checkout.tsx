import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  CreditCard, ShieldCheck, Mail, Globe, MapPin, 
  Lock, ArrowRight, Tag, HelpCircle, ChevronRight,
  Download
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, SectionHeader, cn } from '../components/Shared';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    country: 'United States',
    city: '',
    zip: '',
    agreed: false
  });

  if (cart.length === 0) {
    navigate('/marketplace');
    return null;
  }

  const tax = cartTotal * 0.08;
  const total = cartTotal + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreed) return;
    
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      clearCart();
      navigate('/order-success');
      setIsProcessing(false);
    }, 2500);
  };

  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <div className="flex items-center gap-4 mb-12">
        <div className="flex items-center gap-2 text-brand-red">
          <span className="w-8 h-8 rounded-full border-2 border-brand-red flex items-center justify-center font-bold text-sm">1</span>
          <span className="font-bold text-sm uppercase tracking-widest">Information</span>
        </div>
        <div className="h-[1px] w-12 bg-white/10" />
        <div className="flex items-center gap-2 text-gray-500">
          <span className="w-8 h-8 rounded-full border-2 border-white/10 flex items-center justify-center font-bold text-sm">2</span>
          <span className="font-bold text-sm uppercase tracking-widest">Verification</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-20 items-start">
        {/* Form Section */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-display font-bold mb-10">Guest <span className="text-brand-red">Checkout</span></h2>
          
          <form onSubmit={handleSubmit} className="space-y-10">
            <section className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-3">
                <Mail size={20} className="text-brand-red" />
                Delivery Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-brand-red transition-all"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Email Address</label>
                  <input 
                    required
                    type="email" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-brand-red transition-all"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                  />
                  <p className="text-[10px] text-gray-500 mt-2 px-1 lowercase italic">* Link delivery destination</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-3">
                <Globe size={20} className="text-brand-red" />
                Billing Location
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-2">
                   <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Country / Region</label>
                   <select 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm appearance-none focus:outline-none focus:border-brand-red cursor-pointer"
                    value={formData.country}
                    onChange={e => setFormData({ ...formData, country: e.target.value })}
                   >
                     <option className="bg-brand-black">United States</option>
                     <option className="bg-brand-black">United Kingdom</option>
                     <option className="bg-brand-black">Germany</option>
                     <option className="bg-brand-black">Japan</option>
                     <option className="bg-brand-black">Canada</option>
                   </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Zip Code</label>
                  <input 
                    required
                    type="text" 
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-sm focus:outline-none focus:border-brand-red transition-all"
                    placeholder="10001"
                    value={formData.zip}
                    onChange={e => setFormData({ ...formData, zip: e.target.value })}
                  />
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h3 className="text-lg font-bold flex items-center gap-3">
                <CreditCard size={20} className="text-brand-red" />
                Payment Method
              </h3>
              <div className="grid grid-cols-1 gap-4">
                 <div className="p-6 rounded-2xl border border-brand-red bg-brand-red/5 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                       <CreditCard size={24} className="text-brand-red" />
                       <div>
                          <p className="text-sm font-bold">Credit / Debit Card</p>
                          <p className="text-xs text-gray-500 italic">Secure processing via Stripe</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <div className="w-8 h-5 bg-white/10 rounded" />
                       <div className="w-8 h-5 bg-white/10 rounded" />
                    </div>
                 </div>
                 <div className="p-6 rounded-2xl border border-white/5 bg-white/2 hover:bg-white/5 transition-colors flex items-center justify-between opacity-50 cursor-not-allowed">
                    <div className="flex items-center gap-4">
                       <HelpCircle size={24} className="text-gray-500" />
                       <div>
                          <p className="text-sm font-bold">Alternative Methods</p>
                          <p className="text-xs text-gray-500 italic">PayPal & Crypto coming soon</p>
                       </div>
                    </div>
                 </div>
              </div>
            </section>

            <div className="pt-6">
               <label className="flex items-center gap-4 cursor-pointer group">
                  <div className={cn(
                    "w-6 h-6 rounded border-2 transition-all flex items-center justify-center",
                    formData.agreed ? "bg-brand-red border-brand-red" : "border-white/10 group-hover:border-brand-red"
                  )}>
                    <input 
                      type="checkbox" 
                      className="hidden" 
                      checked={formData.agreed}
                      onChange={() => setFormData({ ...formData, agreed: !formData.agreed })}
                    />
                    {formData.agreed && <Lock size={12} className="text-white" />}
                  </div>
                  <span className="text-xs text-gray-500 font-light leading-relaxed">
                    I agree to the <span className="text-brand-red hover:underline underline-offset-4 cursor-pointer">Marketplace Terms & Conditions</span> and understand this is a digital-only delivery.
                  </span>
               </label>
            </div>

            <Button 
               disabled={!formData.agreed || isProcessing}
               className="w-full h-16 text-lg tracking-widest gap-4 group"
            >
               {isProcessing ? (
                 <div className="flex items-center gap-3">
                   <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   Processing Security Nodes...
                 </div>
               ) : (
                 <>
                  COMPLETE PURCHASE 
                  <ChevronRight size={24} className="group-hover:translate-x-1 transition-transform" />
                 </>
               )}
            </Button>
          </form>
        </motion.div>

        {/* Sidebar Order Summary */}
        <aside className="lg:sticky lg:top-32">
           <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-red to-transparent" />
              
              <h3 className="text-xl font-display font-bold">In Your <span className="text-brand-red">Order</span></h3>
              
              <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                 {cart.map(item => (
                   <div key={`${item.model.id}-${item.selectedMaterial || 'none'}`} className="flex gap-4 group">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-white/5 shrink-0">
                         <img src={item.model.thumbnail || null} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1 min-w-0">
                         <h4 className="text-sm font-bold truncate group-hover:text-brand-red transition-colors">{item.model.title}</h4>
                         <div className="flex items-center gap-2 mt-1">
                            <p className="text-[10px] text-gray-500 uppercase tracking-widest italic">{item.model.category}</p>
                            {item.selectedMaterial && (
                              <p className="text-[10px] font-bold text-brand-red bg-brand-red/10 px-1.5 rounded">{item.selectedMaterial}</p>
                            )}
                         </div>
                         <p className="text-xs text-brand-red font-bold mt-1">৳{(item.model.price + (item.materialPrice || 0)).toFixed(2)}</p>
                      </div>
                   </div>
                 ))}
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5 text-sm">
                 <div className="flex justify-between text-gray-500">
                    <span>Pre-Tax Subtotal</span>
                    <span className="text-white font-mono">৳{cartTotal.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between text-gray-500">
                    <span>Platform Service Tax</span>
                    <span className="text-white font-mono">৳{tax.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-end pt-4 border-t border-white/5">
                    <span className="text-lg font-bold">Total Bill</span>
                    <span className="text-3xl font-display font-bold text-brand-red tracking-tighter">৳{total.toFixed(2)}</span>
                 </div>
              </div>

              <div className="p-4 bg-white/2 rounded-xl text-[10px] text-gray-500 leading-relaxed text-center italic">
                Secure checkout is audited by LÃM-3D Security. All rights reserved.
              </div>
           </div>

           <div className="mt-8 flex items-center justify-center gap-4 opacity-40">
              <ShieldCheck size={20} />
              <span className="text-[10px] font-bold uppercase tracking-widest">Verified Digital Supply</span>
           </div>
        </aside>
      </div>
    </div>
  );
}
