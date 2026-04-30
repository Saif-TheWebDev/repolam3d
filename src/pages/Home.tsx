import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Play, Box, Download, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';
import { collection, query, where, limit, getDocs, onSnapshot } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../lib/firebase';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader, Button, WhatsAppIcon } from '../components/Shared';

const Hero = () => {
  const videoRef = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.5;
    }
  }, []);

  return (
    <section className="relative min-h-[90vh] flex items-center pt-24 overflow-hidden px-6">
      {/* Background Decorative Elements */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-red/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-brand-red/5 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto w-full flex justify-center items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="z-10 text-center flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-red/10 border border-brand-red/20 mb-6">
            <span className="flex h-2 w-2 rounded-full bg-brand-red animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-brand-red">Next-Gen Asset Store</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-display font-bold leading-[0.9] tracking-tighter mb-6">
            CRAFTED FOR <br />
            <span className="text-brand-red drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">FUTURE</span> GAMES
          </h1>
          
          <p className="text-lg text-gray-400 max-w-lg mb-10 leading-relaxed font-light mx-auto">
            Access a premium collection of AAA-quality 3D assets, environmental modules, and rigged characters for the most ambitious digital projects.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-16">
            <Link to="/marketplace">
              <Button className="h-14 px-10 group">
                Browse Models
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/marketplace">
              <Button variant="outline" className="h-14 px-10 border-white/20 text-white hover:bg-white hover:text-black">
                <Play size={16} fill="currentColor" />
                Featured Model
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10 w-full max-w-sm">
            <a href="https://wa.me/8801601891993" target="_blank" rel="noopener noreferrer" className="group">
              <div className="flex items-center gap-2 mb-1">
                <p className="text-xl font-display font-bold text-white leading-none uppercase tracking-tight">Available</p>
              </div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none text-left">Live Preview</p>
            </a>
            <div>
              <p className="text-2xl font-display font-bold text-white mb-1">AAA</p>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest leading-none">Quality Certified</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default function Home() {
  const [heroProducts, setHeroProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const q = query(
      collection(db, 'products'),
      where('isHero', '==', true),
      limit(3)
    );
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setHeroProducts(data);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'products');
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="pb-32">
      <Hero />
      
      {/* Top 3 Featured Section */}
      <section className="px-6 mt-12 max-w-7xl mx-auto">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-2xl border border-white/5 bg-white/[0.02] animate-pulse" />
            ))}
          </div>
        ) : heroProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {heroProducts.map((product) => (
              <ProductCard key={product.id} model={product} />
            ))}
            {/* Fill remaining slots if less than 3 */}
            {heroProducts.length < 3 && Array.from({ length: 3 - heroProducts.length }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-[4/5] rounded-2xl border border-white/5 bg-white/[0.01] flex items-center justify-center p-8 text-center">
                 <p className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">Reserved for Featured Asset</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="aspect-square rounded-2xl border border-white/5 bg-white/[0.02] flex items-center justify-center group hover:border-brand-red/20 transition-all duration-500">
                <div className="w-12 h-12 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center text-gray-700 font-display font-black text-2xl group-hover:text-brand-red transition-colors">
                  {i}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
