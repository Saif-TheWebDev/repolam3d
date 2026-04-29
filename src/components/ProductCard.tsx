import React from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingCart, Eye, Box } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Model3D } from '../types';
import { useCart } from '../context/CartContext';
import { cn, Button } from './Shared';

interface ProductCardProps {
  model: Model3D;
  featured?: boolean;
  key?: React.Key;
}

export const ProductCard = ({ model, featured = false }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square rounded-xl overflow-hidden bg-white/5 border border-white/10 transition-all duration-500 group-hover:border-brand-red/50 group-hover:shadow-[0_0_30px_rgba(255,0,0,0.15)]">
        {/* Thumbnail or Video on Hover */}
        <div className="absolute inset-0 z-0">
          <img 
            src={model.thumbnail || null} 
            alt={model.title} 
            className={cn("w-full h-full object-cover transition-opacity duration-700", isHovered ? "opacity-0" : "opacity-100")}
          />
          {isHovered && model.videoPreview && (
            <video 
              autoPlay 
              muted 
              loop 
              playsInline
              className="w-full h-full object-cover scale-110 transition-transform duration-1000"
            >
              <source src={model.videoPreview || null} type="video/mp4" />
            </video>
          )}
        </div>

        {/* Overlay Badges */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <span className="px-3 py-1 bg-brand-black/80 backdrop-blur-md rounded-md text-[10px] font-bold uppercase tracking-widest text-brand-red border border-brand-red/20">
            {model.category}
          </span>
        </div>

        <div className="absolute top-4 right-4 z-10">
          <div className="flex items-center gap-1 bg-brand-black/80 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
            <Star size={10} className="text-brand-red fill-brand-red" />
            <span className="text-[10px] font-bold">{model.rating}</span>
          </div>
        </div>

        {/* Action Overlay */}
        <div className="absolute inset-0 bg-brand-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3 z-20">
          <Link 
            to={`/product/${model.id}`}
            className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <Eye size={20} />
          </Link>
          <button 
            onClick={() => addToCart(model)}
            className="w-12 h-12 rounded-full bg-brand-red text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Bottom Info Gradient */}
        <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-brand-black via-brand-black/50 to-transparent">
          <div className="flex justify-between items-end">
            <div>
              <p className="text-xs text-gray-400 font-medium mb-1">{model.creator}</p>
              <h3 className="text-sm font-bold text-white group-hover:text-brand-red transition-colors mb-2 pr-2 leading-tight">
                {model.title}
              </h3>
            </div>
            <div className="text-right">
              <span className="text-lg font-display font-bold text-white">৳{model.price}</span>
            </div>
          </div>
          
          {/* Quick Specs */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-white/10 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <Box size={12} className="text-brand-red" />
              <span>{model.stats.polyCount} Tris</span>
            </div>
            <div className="flex items-center gap-1 text-[10px] text-gray-400">
              <span className="text-brand-red font-bold">4K</span>
              <span>PBR</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
