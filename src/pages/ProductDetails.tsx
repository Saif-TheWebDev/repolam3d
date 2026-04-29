import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Star, ShoppingCart, ArrowLeft, Box, Maximize2, 
  Layers, Package, CheckCircle, Info, ChevronRight,
  ShieldCheck, Clock, Download
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, cn, SectionHeader } from '../components/Shared';
import { ProductCard } from '../components/ProductCard';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = React.useState(0);
  const [model, setModel] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const [relatedModels, setRelatedModels] = React.useState<any[]>([]);
  
  React.useEffect(() => {
    setLoading(true);
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        const found = data.find((m: any) => m.id === id);
        setModel(found);
        setRelatedModels(data.filter((m: any) => m.id !== id).slice(0, 3));
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  const [selectedMaterial, setSelectedMaterial] = React.useState<string | null>(null);

  const MATERIALS = [
    { id: 'PLA', name: 'PLA (Standard)', rate: 3.75 },
    { id: 'PLA+', name: 'PLA+ (Enhanced)', rate: 3.99 },
    { id: 'PETG', name: 'PETG (Durable)', rate: 5.5 },
    { id: 'ABS', name: 'ABS (Heat Resistant)', rate: 7 },
    { id: 'TPU', name: 'TPU (Flexible)', rate: 9 },
    { id: 'PLA-CF', name: 'PLA-CF (Carbon Fiber)', rate: 11 },
  ];

  if (loading) return <div className="pt-40 text-center font-mono text-brand-red animate-pulse">DECRYPTING ASSET...</div>;

  if (!model) {
    return (
      <div className="pt-40 pb-40 text-center">
        <h2 className="text-4xl font-display font-bold mb-4">Model <span className="text-brand-red">Not Found</span></h2>
        <Button onClick={() => navigate('/marketplace')}>Back to Marketplace</Button>
      </div>
    );
  }

  const mat = MATERIALS.find(m => m.id === selectedMaterial);
  const materialPrice = mat ? (model.weight || 0) * mat.rate : 0;
  const totalPrice = model.price + materialPrice;

  const images = [model.thumbnail, ...Array(3).fill(model.thumbnail)]; // Simulated gallery

  const handleBuyNow = () => {
    addToCart(model, selectedMaterial || undefined, materialPrice || undefined);
    navigate('/checkout');
  };

  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <Link to="/marketplace" className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group">
        <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
        Back to Marketplace
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Gallery & Preview Section */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 group shadow-2xl"
          >
            {model.videoPreview && (
              <video 
                autoPlay 
                muted 
                loop 
                playsInline
                className="w-full h-full object-cover"
              >
                <source src={model.videoPreview || null} type="video/mp4" />
              </video>
            )}
            
            <div className="absolute top-6 right-6">
              <button className="p-3 bg-brand-black/60 backdrop-blur-md rounded-full text-white hover:bg-brand-red transition-colors border border-white/10">
                <Maximize2 size={20} />
              </button>
            </div>
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {images.map((img, i) => (
              <button 
                key={i}
                onClick={() => setActiveImage(i)}
                className={cn(
                  "aspect-square rounded-xl overflow-hidden border-2 transition-all",
                  activeImage === i ? "border-brand-red scale-95" : "border-transparent opacity-50 hover:opacity-100"
                )}
              >
                <img src={img || null} alt="Preview" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
               <span className="px-3 py-1 bg-brand-red/10 text-brand-red rounded-md text-[10px] font-bold uppercase tracking-widest border border-brand-red/20">
                {model.category}
              </span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-brand-red fill-brand-red" />
                <span className="text-sm font-bold">{model.rating}</span>
                <span className="text-xs text-gray-500 ml-1">({model.reviews} reviews)</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-4 tracking-tight">{model.title}</h1>
            <p className="text-sm text-gray-400 mb-6">Designed by <span className="text-white font-bold cursor-pointer hover:text-brand-red transition-colors">{model.creator}</span></p>
            
            <div className="flex items-baseline gap-4 mb-2">
              <span className="text-4xl font-display font-bold text-white">৳{totalPrice.toFixed(2)}</span>
              {!selectedMaterial && (
                <span className="text-sm text-gray-500 line-through">৳{(model.price * 1.5).toFixed(2)}</span>
              )}
              {!selectedMaterial && (
                 <span className="text-xs font-bold text-green-500 uppercase tracking-widest">33% OFF</span>
              )}
            </div>

            {selectedMaterial && (
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">
                Base: ৳{model.price} + Printing: ৳{materialPrice.toFixed(2)} ({model.weight}g model)
              </p>
            )}

            <div className="mb-8 space-y-4">
              <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest flex items-center gap-2">
                <Box size={12} className="text-brand-red" />
                Select Production Material
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {MATERIALS.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedMaterial(prev => prev === m.id ? null : m.id)}
                    className={cn(
                      "flex flex-col items-center justify-center p-3 rounded-xl border transition-all text-center gap-1",
                      selectedMaterial === m.id 
                        ? "bg-brand-red/10 border-brand-red text-white shadow-[0_0_15px_rgba(255,0,0,0.2)]" 
                        : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
                    )}
                  >
                    <span className="text-[10px] font-bold uppercase tracking-tighter">{m.id}</span>
                    <span className="text-[8px] opacity-60 truncate w-full">{m.name}</span>
                    {m.rate > 0 && <span className="text-[9px] font-mono text-brand-red">৳{m.rate}/g</span>}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <Button onClick={() => addToCart(model, selectedMaterial || undefined, materialPrice || undefined)} className="flex-1 h-14 text-base">
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
              <Button onClick={handleBuyNow} variant="secondary" className="flex-1 h-14 text-base">
                Buy Now
              </Button>
            </div>

            <p className="text-gray-400 leading-relaxed font-light mb-10 pb-10 border-b border-white/10">
              {model.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-y-10 gap-x-8 mb-12">
            <div>
              <div className="flex items-center gap-3 text-brand-red mb-3">
                <Box size={20} />
                <span className="text-sm font-bold uppercase tracking-wider text-white">Polycount</span>
              </div>
              <p className="text-gray-400 font-mono text-sm">{model.stats.polyCount} Tris</p>
            </div>
            <div>
              <div className="flex items-center gap-3 text-brand-red mb-3">
                <Layers size={20} />
                <span className="text-sm font-bold uppercase tracking-wider text-white">Textures</span>
              </div>
              <p className="text-gray-400 font-mono text-sm">{model.stats.textures}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 text-brand-red mb-3">
                <Package size={20} />
                <span className="text-sm font-bold uppercase tracking-wider text-white">File Formats</span>
              </div>
              <p className="text-gray-400 font-mono text-sm">{model.formats.join(', ')}</p>
            </div>
            <div>
              <div className="flex items-center gap-3 text-brand-red mb-3">
                <CheckCircle size={20} />
                <span className="text-sm font-bold uppercase tracking-wider text-white">Features</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {model.stats.rigged && <span className="text-[10px] bg-white/5 px-2 py-1 rounded">RIGGED</span>}
                {model.stats.animated && <span className="text-[10px] bg-white/10 px-2 py-1 rounded">ANIMATED</span>}
                {model.stats.uvMapped && <span className="text-[10px] bg-white/10 px-2 py-1 rounded">UV MAPPED</span>}
              </div>
            </div>
          </div>

          {/* Trust Panel */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/5 space-y-4">
             <div className="flex items-start gap-4">
                <div className="mt-1 text-brand-red"><ShieldCheck size={20} /></div>
                <div>
                   <h5 className="text-sm font-bold mb-1">Standard License Included</h5>
                   <p className="text-xs text-gray-500 font-light">Use this asset in unlimited personal or commercial projects. No attribution required.</p>
                </div>
             </div>
             <div className="flex items-start gap-4">
                <div className="mt-1 text-brand-red"><Clock size={20} /></div>
                <div>
                   <h5 className="text-sm font-bold mb-1">Immediate Availability</h5>
                   <p className="text-xs text-gray-500 font-light">Your files will be ready for download instantly after purchase confirmation.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Comparisons/Related */}
      <section className="mt-40">
        <div className="flex justify-between items-center mb-12">
          <SectionHeader title="Related Assets" className="mb-0" />
          <Link to="/marketplace" className="text-sm font-bold text-gray-400 hover:text-brand-red flex items-center gap-2">
            View All Marketplace
            <ChevronRight size={16} />
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
           {relatedModels.map(m => (
             <ProductCard key={m.id} model={m} />
           ))}
        </div>
      </section>
    </div>
  );
}
