import React, { useState, useEffect } from 'react';
import { Search, ChevronDown, Grid, List, SlidersHorizontal, Package, Zap, RefreshCcw } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';
import { SectionHeader, Button } from '../components/Shared';
import { clsx } from 'clsx';
import { Model3D } from '../types';

const CATEGORIES = ['All', 'Character', 'Environment', 'Vehicle', 'Prop', 'Weapon'];
const SORT_OPTIONS = [
  { label: 'Recently Added', value: 'new' },
  { label: 'Best Selling', value: 'best' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' }
];

export default function Marketplace() {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('new');
  const [showFilters, setShowFilters] = useState(false);
  const [models, setModels] = useState<Model3D[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        setModels(data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

  const filteredModels = models.filter(model => {
    const matchesSearch = model.title.toLowerCase().includes(search.toLowerCase()) || 
                          model.creator.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = activeCategory === 'All' || model.category === activeCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    if (sortBy === 'price_asc') return a.price - b.price;
    if (sortBy === 'price_desc') return b.price - a.price;
    return 0;
  });

  if (loading) return <div className="pt-40 text-center font-mono text-brand-red animate-pulse">CONNECTING TO VAULT...</div>;

  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <SectionHeader 
        title="Explore The Marketplace" 
        subtitle="Unrivaled collection of high-end 3D assets for every vision."
      />

      <div className="flex flex-col lg:flex-row gap-6 mb-12">
        <div className="relative flex-1">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
          <input 
            type="text" 
            placeholder="Search assets, creators, categories..."
            className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-brand-red focus:bg-white/[0.08] transition-all text-sm font-medium"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex gap-4">
          <div className="relative group">
            <select 
              className="appearance-none bg-brand-surface border border-white/10 rounded-xl py-4 pl-6 pr-12 focus:outline-none focus:border-brand-red transition-all text-sm font-bold cursor-pointer text-white"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              {SORT_OPTIONS.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none group-hover:text-brand-red transition-colors" />
          </div>

          <Button 
            variant="outline" 
            className={clsx("lg:hidden border-white/10 text-white gap-2", showFilters && "bg-brand-red border-brand-red text-white")}
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            Filters
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12">
        <aside className={clsx(
          "flex flex-col gap-10 lg:sticky lg:top-32 h-fit",
          !showFilters && "hidden lg:flex"
        )}>
           <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Package size={14} className="text-brand-red" />
                Categories
              </h4>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={clsx(
                      "text-left px-4 py-2 rounded-lg text-sm font-medium transition-all",
                      activeCategory === cat ? "bg-brand-red text-white shadow-red-glow" : "text-gray-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
           </div>

            <div>
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6 flex items-center gap-2">
                <Zap size={14} className="text-brand-red" />
                Quality Preset
              </h4>
              <div className="flex flex-col gap-3">
                 {['Fully Rigged', 'Animated', 'PBR Textured', 'Low Poly'].map(check => (
                   <label key={check} className="flex items-center gap-3 cursor-pointer group">
                      <div className="w-5 h-5 rounded border border-white/20 group-hover:border-brand-red transition-colors flex items-center justify-center p-1">
                         <div className="w-full h-full rounded-[1px] bg-brand-red opacity-0 group-hover:opacity-20 transition-all" />
                      </div>
                      <span className="text-sm text-gray-400 group-hover:text-white transition-colors">{check}</span>
                   </label>
                 ))}
              </div>
           </div>
        </aside>

        <div>
           <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
              <p className="text-sm text-gray-400">Showing <span className="text-white font-bold">{filteredModels.length}</span> assets</p>
              <div className="flex gap-2">
                 <button className="p-2 text-brand-red bg-brand-red/10 rounded-md"><Grid size={18} /></button>
                 <button className="p-2 text-gray-500 hover:text-white transition-colors"><List size={18} /></button>
              </div>
           </div>

           {filteredModels.length > 0 ? (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredModels.map(model => (
                  <ProductCard key={model.id} model={model} />
                ))}
             </div>
           ) : (
             <div className="py-40 text-center flex flex-col items-center gap-6">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-gray-500 mb-4 animate-pulse">
                   <RefreshCcw size={40} />
                </div>
                <h3 className="text-2xl font-bold">No assets found</h3>
                <p className="text-gray-500 max-w-sm">Try adjusting your filters or search terms.</p>
                <Button variant="outline" onClick={() => {setSearch(''); setActiveCategory('All');}}>Clear All Filters</Button>
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
