import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Lock, User, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Shared';

import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { useFirebase } from '../context/FirebaseContext';

const AdminLogin = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { user, isAdmin, loading: authLoading } = useFirebase();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!authLoading && isAdmin) {
       navigate('/admin/dashboard');
    }
  }, [isAdmin, authLoading, navigate]);

  const handleGoogleLogin = async () => {
    setLoading(true);
    setError('');
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      
      // Check if user is admin
      const adminRef = doc(db, 'admins', user.uid);
      const adminDoc = await getDoc(adminRef);
      
      if (!adminDoc.exists()) {
        // FOR DEMO: If this matches the userEmail from metadata, make them admin
        if (user.email === 'soadjahan67@gmail.com') {
          await setDoc(adminRef, { email: user.email, role: 'admin' });
          navigate('/admin/dashboard');
        } else {
          await auth.signOut();
          setError('Access Denied: You are not an authorized admin.');
        }
      } else {
        navigate('/admin/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Authentication failed.');
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

        <div className="space-y-6">
          <Button 
            onClick={handleGoogleLogin}
            disabled={loading || authLoading}
            className="w-full h-16 text-sm tracking-widest group flex items-center justify-center gap-4 border border-white/10 hover:border-brand-red transition-all"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                SIGN IN WITH GOOGLE
              </>
            )}
          </Button>

          {error && (
            <motion.p 
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-xs text-brand-red font-bold text-center italic mt-4"
            >
              {error}
            </motion.p>
          )}
        </div>

        <p className="text-[10px] text-gray-600 text-center mt-8 uppercase tracking-widest">
          SYSTEM AUDIT LOGS ACTIVE
        </p>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
