import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { CartProvider } from './context/CartContext';
import { Navbar, Footer } from './components/Shared';
import Home from './pages/Home';
import Marketplace from './pages/Marketplace';
import ProductDetails from './pages/ProductDetails';
import CartPage from './pages/CartPage';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { PrivacyPolicy, TermsConditions, RefundPolicy, LicensePolicy } from './pages/Policies';
import ContactUs from './pages/ContactUs';

// Page Transition Component
const PageTransition = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col bg-brand-black selection:bg-brand-red selection:text-white">
          <Navbar />
          <main className="flex-1">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/order-success" element={<OrderSuccess />} />
                <Route path="/admin" element={<AdminLogin />} />
                <Route path="/admin.html" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                <Route path="/terms-conditions" element={<TermsConditions />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/license-policy" element={<LicensePolicy />} />
                <Route path="/contact-us" element={<ContactUs />} />
                {/* Redirects for menu items to demonstrate functionality */}
                <Route path="/categories" element={<Marketplace />} />
                <Route path="/best-sellers" element={<Marketplace />} />
                <Route path="/new-releases" element={<Marketplace />} />
              </Routes>
            </PageTransition>
          </main>
          <Footer />
          
          {/* Global Aesthetic Overlays */}
          <div className="fixed inset-0 pointer-events-none z-[-1] opacity-20">
             <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(255,0,0,0.1)_0%,transparent_50%)]" />
             <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_100%,rgba(255,0,0,0.05)_0%,transparent_50%)]" />
          </div>
        </div>
      </CartProvider>
    </Router>
  );
}
