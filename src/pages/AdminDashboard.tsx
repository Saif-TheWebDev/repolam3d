import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Plus, Trash2, Package, ShoppingCart, XCircle, LogOut, Camera, Video, DollarSign, Tag, FileText, Upload, Check, Loader2, Play } from 'lucide-react';
import { Button, SectionHeader, cn } from '../components/Shared';

const FileUpload = ({ label, icon: Icon, value, onChange, accept = "image/*" }: { 
  label: string, 
  icon: any, 
  value: string, 
  onChange: (url: string) => void,
  accept?: string
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (file: File) => {
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.url) {
        onChange(data.url);
      }
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">{label}</label>
      <div 
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative border-2 border-dashed rounded-2xl p-4 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all duration-300 min-h-[120px]",
          isDragging ? "border-brand-red bg-brand-red/5" : "border-white/10 bg-white/[0.02] hover:border-white/20",
          value && !uploading && "border-green-500/30 bg-green-500/5"
        )}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept={accept}
          onChange={(e) => e.target.files?.[0] && handleUpload(e.target.files[0])}
        />
        
        {uploading ? (
          <Loader2 className="animate-spin text-brand-red" size={24} />
        ) : value ? (
          <Check className="text-green-500" size={24} />
        ) : (
          <Icon className="text-gray-600" size={24} />
        )}
        
        <div className="text-center">
          <p className="text-xs font-medium text-gray-400">
            {uploading ? 'UPLOADING...' : value ? 'FILE ATTACHED' : 'DRAG & DROP OR CLICK'}
          </p>
          {!uploading && !value && <p className="text-[10px] text-gray-600 mt-1 uppercase tracking-tighter">Files supported: {accept.replace('/*', '')}s</p>}
        </div>
      </div>
      
      {/* Fallback URL input */}
      <div className="relative mt-2">
        <Icon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
        <input 
          className="w-full bg-transparent border-b border-white/5 py-1 pl-9 pr-2 text-[10px] text-gray-600 focus:outline-none focus:border-brand-red/30" 
          placeholder="Or paste direct URL..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    </div>
  );
};

const AdminDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [stats, setStats] = useState({ buys: 0, cancels: 0 });
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    offerPrice: '',
    category: 'Character',
    thumbnail: '',
    videoPreview: '',
    creator: 'Admin',
    description: '',
    weight: '0',
    isHero: false,
    stats: { polyCount: '0', textures: '4K PBR', rigged: true, animated: false, uvMapped: true },
    formats: ['FBX']
  });

  const navigate = useNavigate();
  const auth = JSON.parse(localStorage.getItem('admin_auth') || '{}');

  useEffect(() => {
    if (!auth.id) navigate('/admin');
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [prodRes, statsRes] = await Promise.all([
        fetch('/api/products'),
        fetch('/api/stats')
      ]);
      const prodData = await prodRes.json();
      const statsData = await statsRes.json();
      setProducts(prodData);
      setStats(statsData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth, product: { ...newProduct, price: Number(newProduct.price), weight: Number(newProduct.weight) } }),
      });
      if (res.ok) {
        setShowAddForm(false);
        fetchData();
        setNewProduct({
          title: '',
          price: '',
          offerPrice: '',
          category: 'Character',
          thumbnail: '',
          videoPreview: '',
          creator: 'Admin',
          description: '',
          weight: '0',
          stats: { polyCount: '0', textures: '4K PBR', rigged: true, animated: false, uvMapped: true },
          formats: ['FBX']
        });
      }
    } catch (err) {
      alert('Failed to add product');
    }
  };

  const removeProduct = async (id: string) => {
    if (!confirm('Are you sure you want to remove this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth })
      });
      if (res.ok) {
        fetchData();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to remove product');
      }
    } catch (err) {
      alert('Failed to remove product');
    }
  };

  const toggleHero = async (id: string, currentStatus: boolean) => {
    const heroCount = products.filter(p => p.isHero).length;
    if (!currentStatus && heroCount >= 3) {
      alert('Maximum 3 items can be featured in the hero section.');
      return;
    }

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ auth, updates: { isHero: !currentStatus } }),
      });
      if (res.ok) fetchData();
    } catch (err) {
      alert('Failed to update hero status');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    navigate('/admin');
  };

  if (loading) return <div className="pt-40 text-center font-mono text-brand-red animate-pulse">BOOTING DASHBOARD...</div>;

  return (
    <div className="pt-32 pb-40 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16">
        <div>
          <h1 className="text-4xl font-display font-bold tracking-tight mb-2">CONTROL <span className="text-brand-red">CENTER</span></h1>
          <p className="text-gray-500 text-sm font-medium">Manage your marketplace operations and global assets.</p>
        </div>
        <div className="flex gap-4">
          <Button onClick={() => setShowAddForm(true)} className="gap-2">
            <Plus size={18} /> ADD NEW ASSET
          </Button>
          <button 
            onClick={handleLogout}
            className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center text-gray-500 hover:text-brand-red hover:bg-brand-red/10 transition-all border border-white/5"
          >
            <LogOut size={20} />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-green-500/10 rounded-xl flex items-center justify-center text-green-500 border border-green-500/20">
            <ShoppingCart size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Total Buys</p>
            <p className="text-3xl font-display font-bold">{stats.buys}</p>
          </div>
        </div>

        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-brand-red/10 rounded-xl flex items-center justify-center text-brand-red border border-brand-red/20">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Canceled</p>
            <p className="text-3xl font-display font-bold">{stats.cancels}</p>
          </div>
        </div>

        <div className="bg-brand-surface border border-white/10 rounded-2xl p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-500 border border-blue-500/20">
            <Package size={24} />
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-1">Active Assets</p>
            <p className="text-3xl font-display font-bold">{products.length}</p>
          </div>
        </div>
      </div>

      <SectionHeader title="Active Assets Store" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <motion.div 
            key={product.id}
            layout
            className="group bg-brand-surface border border-white/10 rounded-2xl overflow-hidden relative"
          >
            <div className="aspect-video relative">
              <img src={product.thumbnail || null} alt={product.title} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-brand-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button 
                  onClick={() => toggleHero(product.id, product.isHero)}
                  className={cn(
                    "w-12 h-12 rounded-full flex items-center justify-center transition-all shadow-lg",
                    product.isHero ? "bg-brand-red text-white" : "bg-white/10 text-white hover:bg-white/20"
                  )}
                  title={product.isHero ? "Remove from Hero Section" : "Add to Hero Section"}
                 >
                   <Play size={20} fill={product.isHero ? "currentColor" : "none"} />
                 </button>
                 <button 
                  onClick={() => removeProduct(product.id)}
                  className="w-12 h-12 bg-gray-800 text-white rounded-full flex items-center justify-center hover:bg-brand-red transition-all shadow-lg"
                 >
                   <Trash2 size={24} />
                 </button>
              </div>
              {product.isHero && (
                <div className="absolute top-3 right-3 px-2 py-1 bg-brand-red text-[8px] font-bold uppercase tracking-widest rounded shadow-[0_0_10px_rgba(255,0,0,0.5)]">
                  HERO SECTION
                </div>
              )}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-[10px] text-brand-red font-bold uppercase tracking-widest mb-1">{product.category}</p>
                  <h3 className="font-bold text-lg">{product.title}</h3>
                </div>
                <div className="text-right">
                  <p className="font-bold text-brand-red">৳{product.price}</p>
                  {product.offerPrice && <p className="text-xs text-gray-500 line-through">৳{product.offerPrice}</p>}
                </div>
              </div>
              <p className="text-xs text-gray-500 line-clamp-2 italic">{product.description}</p>
            </div>
          </motion.div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full py-20 border-2 border-dashed border-white/5 rounded-3xl text-center text-gray-500">
            No assets in database. Add your first product using the button above.
          </div>
        )}
      </div>

      {showAddForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
          <div className="absolute inset-0 bg-brand-black/80 backdrop-blur-md" onClick={() => setShowAddForm(false)} />
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative w-full max-w-2xl bg-brand-surface border border-white/10 rounded-3xl p-10 overflow-y-auto max-h-[90vh] custom-scrollbar"
          >
            <h2 className="text-2xl font-display font-bold mb-8">ADD NEW <span className="text-brand-red">ASSET</span></h2>
            
            <form onSubmit={handleAddProduct} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Product Title</label>
                  <div className="relative">
                    <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-red outline-none" value={newProduct.title} onChange={e => setNewProduct({...newProduct, title: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Category</label>
                  <select className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-sm focus:border-brand-red outline-none appearance-none" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                    {['Character', 'Prop', 'Weapon', 'Vehicle', 'Environment'].map(c => <option key={c} value={c} className="bg-brand-black">{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Listing Price (৳)</label>
                  <div className="relative">
                    <DollarSign size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-red outline-none" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Estimated weight (g)</label>
                  <div className="relative">
                    <Package size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input type="number" required className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-red outline-none" value={newProduct.weight} onChange={e => setNewProduct({...newProduct, weight: e.target.value})} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest pl-1">Asset Description</label>
                <div className="relative">
                  <FileText size={16} className="absolute left-4 top-4 text-gray-500" />
                  <textarea required rows={4} className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm focus:border-brand-red outline-none resize-none" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileUpload 
                  label="Thumbnail Image" 
                  icon={Camera} 
                  value={newProduct.thumbnail} 
                  onChange={(url) => setNewProduct({ ...newProduct, thumbnail: url })} 
                  accept="image/*"
                />
                <FileUpload 
                  label="Video Loop Preview" 
                  icon={Video} 
                  value={newProduct.videoPreview} 
                  onChange={(url) => setNewProduct({ ...newProduct, videoPreview: url })} 
                  accept="video/mp4"
                />
              </div>

              <div className="flex items-center gap-2 p-4 bg-white/5 border border-white/10 rounded-xl">
                <input 
                  type="checkbox" 
                  id="isHero"
                  className="w-4 h-4 rounded border-white/10 bg-white/5 text-brand-red focus:ring-brand-red"
                  checked={newProduct.isHero}
                  onChange={(e) => {
                    const heroCount = products.filter(p => p.isHero).length;
                    if (e.target.checked && heroCount >= 3) {
                      alert('Maximum 3 items can be featured in the hero section.');
                      return;
                    }
                    setNewProduct({...newProduct, isHero: e.target.checked});
                  }}
                />
                <label htmlFor="isHero" className="text-xs font-bold text-gray-400 uppercase tracking-widest cursor-pointer select-none">Feature in Hero Section (Max 3)</label>
              </div>

              <div className="flex gap-4 pt-6">
                <Button type="button" variant="outline" className="flex-1 border-white/10 text-white" onClick={() => setShowAddForm(false)}>CANCEL</Button>
                <Button className="flex-1">PUBLISH ASSET</Button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
