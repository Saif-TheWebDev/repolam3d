import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Shared';

const AdminLogin = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, password }),
      });

      if (res.ok) {
        localStorage.setItem('admin_auth', JSON.stringify({ id, password }));
        navigate('/admin/dashboard');
      } else {
        setError('Invalid credentials access denied.');
      }
    } catch (err) {
      setError('Connection failure.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-black px-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-brand-surface border border-white/10 rounded-3xl p-8 shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
           <ShieldCheck size={120} className="text-brand-red" />
        </div>

        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-brand-red/10 rounded-2xl flex items-center justify-center text-brand-red mx-auto mb-4 border border-brand-red/20">
            <Lock size={32} />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight">ADMIN <span className="text-brand-red">PORTAL</span></h1>
          <p className="text-sm text-gray-500 mt-2">Authorized Personnel Only</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Admin ID</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                required
                type="text" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-red transition-all"
                placeholder="Enter ID"
                value={id}
                onChange={(e) => setId(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Security Key</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input 
                required
                type="password" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-sm focus:outline-none focus:border-brand-red transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-brand-red font-bold text-center italic"
            >
              {error}
            </motion.p>
          )}

          <Button 
            disabled={loading}
            className="w-full h-14 text-sm tracking-widest group"
          >
            {loading ? 'VERIFYING...' : 'ACCESS DASHBOARD'}
          </Button>
        </form>

        <p className="text-[10px] text-gray-600 text-center mt-8 uppercase tracking-widest">
          SYSTEM AUDIT LOGS ACTIVE
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
