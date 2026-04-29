import React from 'react';
import { SectionHeader, WhatsAppIcon } from '../components/Shared';
import { Mail, MessageCircle, Send, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { motion } from 'motion/react';

const ContactMethod = ({ icon: Icon, title, description, link, colorClass }: { icon: any, title: string, description: string, link: string, colorClass: string }) => (
  <motion.a 
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ y: -5 }}
    className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center text-center group transition-all hover:border-brand-red/50 hover:bg-brand-red/5"
  >
    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${colorClass}`}>
      <Icon size={32} />
    </div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-gray-400 text-sm">{description}</p>
  </motion.a>
);

const ContactUs = () => {
  return (
    <div className="py-20 px-6 mt-12">
      <div className="max-w-7xl mx-auto">
        <SectionHeader 
          title="Get In Touch" 
          subtitle="Have a question or need support with your 3D assets? Our team is active and ready to help you across multiple platforms."
          className="text-center mx-auto"
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <ContactMethod 
            icon={WhatsAppIcon}
            title="WhatsApp"
            description="Message us for instant support and live previews."
            link="https://wa.me/8801601891993"
            colorClass="bg-[#25D366]/20 text-[#25D366]"
          />
          <ContactMethod 
            icon={MessageCircle}
            title="Messenger"
            description="Connect with our official Facebook community."
            link="https://m.me/LAM3D"
            colorClass="bg-[#0084FF]/20 text-[#0084FF]"
          />
          <ContactMethod 
            icon={Mail}
            title="Email Support"
            description="For official inquiries and custom asset requests."
            link="mailto:support@lam3d.com"
            colorClass="bg-brand-red/20 text-brand-red"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 bg-white/2 rounded-3xl p-8 md:p-12 border border-white/5">
          <div>
            <h2 className="text-3xl font-display font-bold mb-8">Send Us a <span className="text-brand-red">Message</span></h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Full Name</label>
                  <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-red transition-all" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-red transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">subject</label>
                <input type="text" placeholder="License Inquiry" className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-red transition-all" />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400">Message</label>
                <textarea rows={5} placeholder="Tell us more about your request..." className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 focus:outline-none focus:border-brand-red transition-all resize-none"></textarea>
              </div>
              <button type="submit" className="w-full md:w-auto px-10 py-4 bg-brand-red text-white font-bold rounded-xl hover:bg-brand-dark-red transition-all shadow-red-glow flex items-center justify-center gap-3">
                Send Message <Send size={18} />
              </button>
            </form>
          </div>

          <div className="flex flex-col justify-center gap-12 lg:pl-12">
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-red shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Our Location</h4>
                  <p className="text-gray-400 text-sm">Maskandha, Mymensing, Bangladesh - Anywhere in Bangladesh</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-red shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">Call Us</h4>
                  <p className="text-gray-400 text-sm">Anytime 24/7<br/>+880 1601-891993</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-brand-red/10 border border-brand-red/20 rounded-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 blur-3xl rounded-full -mr-16 -mt-16"></div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <ShieldCheck className="text-brand-red" size={20} />
                Verified Business
              </h4>
              <p className="text-gray-400 text-sm leading-relaxed">
                LÃM-3D is a registered entity dedicated to providing high-quality digital assets with full legal compliance and verified security.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
