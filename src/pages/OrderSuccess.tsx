import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { CheckCircle2, Download, ExternalLink, Mail, Copy, Package, ChevronRight, Share2, ShieldCheck } from 'lucide-react';
import { Button, SectionHeader } from '../components/Shared';

export default function OrderSuccess() {
  const [orderNumber] = useState(`AX-${Math.floor(100000 + Math.random() * 900000)}`);
  
  // Simulated confetti/celebration effect on mount
  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  return (
    <div className="pt-48 pb-60 px-6 max-w-4xl mx-auto flex flex-col items-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="w-24 h-24 rounded-full bg-brand-red flex items-center justify-center text-white mb-8 shadow-[0_0_50px_rgba(255,0,0,0.5)]"
      >
        <CheckCircle2 size={56} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">VAULT <span className="text-brand-red">UNLOCKED</span></h1>
        <p className="text-lg text-gray-400 mb-2 font-light">Your transaction has been finalized successfully.</p>
        <p className="text-sm font-mono text-brand-red mb-12">ORDER_ID: {orderNumber}</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="w-full grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
      >
        {/* Action Panel 1 */}
        <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-brand-red/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Download size={120} />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
             <Download size={20} className="text-brand-red" />
             Instant Access
          </h3>
          <p className="text-sm text-gray-400 font-light mb-8 italic">Download your raw asset files including FBX, OBJ, and PBR textures. Link expires in 7 days.</p>
          <Button className="w-full h-14 uppercase tracking-widest gap-3 shadow-none hover:shadow-red-glow">
            Initialize Download
            <ExternalLink size={18} />
          </Button>
        </div>

        {/* Action Panel 2 */}
        <div className="bg-brand-surface border border-white/10 rounded-3xl p-8 relative overflow-hidden group hover:border-brand-red/30 transition-colors">
          <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
            <Mail size={120} />
          </div>
          <h3 className="text-xl font-bold mb-4 flex items-center gap-3">
             <Mail size={20} className="text-brand-red" />
             Email Confirmation
          </h3>
          <p className="text-sm text-gray-400 font-light mb-8 italic">We've sent a detailed receipt and a mirror download link to your provided email address.</p>
          <div className="flex gap-2">
            <input 
              readOnly 
              value="Receipt-Sent.pdf" 
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 text-xs font-mono text-gray-500"
            />
            <button className="p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
              <Copy size={16} />
            </button>
          </div>
        </div>
      </motion.div>

      <div className="flex flex-col items-center gap-8 w-full border-t border-white/5 pt-12">
         <div className="flex gap-12 text-gray-500">
            <div className="flex flex-col items-center gap-2">
               <Package size={20} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Secure Pack</span>
            </div>
            <div className="flex flex-col items-center gap-2">
               <ShieldCheck size={20} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Verified Files</span>
            </div>
            <div className="flex flex-col items-center gap-2 group cursor-pointer hover:text-brand-red transition-colors">
               <Share2 size={20} />
               <span className="text-[10px] font-bold uppercase tracking-widest">Share Receipt</span>
            </div>
         </div>
         
         <Link to="/marketplace">
            <Button variant="outline" className="h-14 px-12 group">
               Back to Marketplace
               <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </Button>
         </Link>
      </div>
    </div>
  );
}
