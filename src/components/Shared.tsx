import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, ArrowRight, Linkedin, ShieldCheck, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useCart } from '../context/CartContext';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Navigation Component
export const Navbar = () => {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const { cart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "bg-brand-black/90 backdrop-blur-md border-b border-white/10" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between relative">
        <Link to="/" className="flex items-center gap-3 group">
          <img src="/images/logo.png" alt="LÃM-3D" className="h-9 w-auto" />
          <span className="text-2xl font-display font-bold tracking-tighter text-brand-red">
            LÃM-3D
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
          {['Home', 'Marketplace', 'Categories', 'Best Sellers', 'New Releases'].map((item) => (
            <NavLink
              key={item}
              to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
              className={({ isActive }) => cn(
                "text-sm font-medium transition-colors hover:text-brand-red",
                isActive ? "text-brand-red" : "text-gray-400"
              )}
            >
              {item}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 text-white hover:text-brand-red transition-colors">
            <ShoppingCart size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-red text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            className="lg:hidden text-white" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-brand-black border-b border-white/10 p-6 flex flex-col gap-4 lg:hidden"
          >
             {['Home', 'Marketplace', 'Categories', 'Best Sellers', 'New Releases'].map((item) => (
              <Link
                key={item}
                to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                className="text-lg font-medium text-gray-400 hover:text-brand-red py-2 border-b border-white/5"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

// X Brand Icon (Modern Twitter)
const XBrandIcon = ({ size = 18 }: { size?: number }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor" 
  >
    <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932L18.901 1.153ZM17.61 20.644h2.039L6.486 3.24H4.298L17.61 20.644Z" />
  </svg>
);

// WhatsApp Brand Icon
export const WhatsAppIcon = ({ size = 18, className }: { size?: number, className?: string }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="currentColor"
    className={className}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.72.94 3.659 1.437 5.63 1.438h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

// Footer Component
export const Footer = () => {
  return (
    <footer className="bg-brand-black border-t border-white/10 pt-20 pb-10 px-6 mt-auto">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
        <div className="flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="/images/logo.png" alt="LÃM-3D" className="h-7 w-auto" />
            <span className="text-xl font-display font-bold tracking-tighter text-brand-red">LÃM-3D</span>
          </Link>
          <p className="text-gray-400 text-sm leading-relaxed">
            Premium AAA-quality 3D assets for creators and game developers. Experience the next generation of asset commerce.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all">
              <XBrandIcon size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all">
              <Linkedin size={18} />
            </a>
            <a href="https://wa.me/8801601891993" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-brand-red hover:text-white transition-all">
              <WhatsAppIcon size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Policy</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li><Link to="/refund-policy" className="hover:text-brand-red transition-colors">Refund Policy</Link></li>
            <li><Link to="/license-policy" className="hover:text-brand-red transition-colors">License Policy</Link></li>
            <li><Link to="/terms-conditions" className="hover:text-brand-red transition-colors">Terms & Conditions</Link></li>
            <li><Link to="/privacy-policy" className="hover:text-brand-red transition-colors">Privacy Policy</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6">Support</h4>
          <ul className="flex flex-col gap-4 text-sm text-gray-400">
            <li><Link to="/contact-us" className="hover:text-brand-red transition-colors flex items-center gap-2"><Mail size={14} /> Contact Us</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
        <p>&copy;2026 LÃM-3D. All rights reserve.</p>
        <div className="flex gap-6">
          <span>Secure Payment powered by SSLCOMMERZ</span>
          <span>AAA Quality Verified</span>
        </div>
      </div>
    </footer>
  );
};

// Common Section Header
export const SectionHeader = ({ title, subtitle, className }: { title: string, subtitle?: string, className?: string }) => (
  <div className={cn("mb-12", className)}>
    <h2 className="text-3xl md:text-4xl font-display font-bold mb-3">
      {title.split(' ').map((word, i) => i === title.split(' ').length - 1 ? <span key={i} className="text-brand-red">{word}</span> : word + ' ')}
    </h2>
    {subtitle && <p className="text-gray-400 max-w-2xl">{subtitle}</p>}
  </div>
);

// CTA Button
export const Button = ({ 
  children, 
  variant = 'primary', 
  className,
  ...props 
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const variants = {
    primary: "bg-brand-red text-white hover:bg-brand-dark-red shadow-red-glow",
    secondary: "bg-white text-black hover:bg-gray-200",
    outline: "border border-brand-red text-brand-red hover:bg-brand-red hover:text-white"
  };

  return (
    <button 
      className={cn(
        "px-6 py-3 rounded-lg font-bold text-sm tracking-wide transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2",
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
