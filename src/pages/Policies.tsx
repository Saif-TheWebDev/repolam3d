import React from 'react';
import { SectionHeader } from '../components/Shared';
import { motion } from 'motion/react';

const PolicyLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
  return (
    <div className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader title={title} className="mb-16" />
          <div className="prose prose-invert prose-brand max-w-none prose-p:text-gray-400 prose-headings:text-white prose-li:text-gray-400">
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const PrivacyPolicy = () => (
  <PolicyLayout title="Privacy Policy">
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">1. Information We Collect</h3>
      <p>We collect information you provide directly to us when you create an account, purchase assets, or communicate with our support team. This includes your name, email address, payment information, and any communication history.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">2. How We Use Your Information</h3>
      <p>We use the information we collect to facilitate transactions, improve our 3D marketplace, send platform updates, and provide customer support. Your payment data is securely processed by SSLCOMMERZ or Stripe and is never stored on our servers.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">3. Data Security</h3>
      <p>LÃM-3D employs industry-standard encryption and security protocols to project your data. However, no method of transmission over the internet is 100% secure.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">4. Cookies</h3>
      <p>We use cookies to enhance your browsing experience, remember your preferences, and analyze site traffic.</p>
    </section>
  </PolicyLayout>
);

export const TermsConditions = () => (
  <PolicyLayout title="Terms & Conditions">
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">1. Acceptance of Terms</h3>
      <p>By accessing or using the LÃM-3D marketplace, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">2. Digital Assets License</h3>
      <p>All 3D assets purchased on LÃM-3D are subject to the License Policy selected at checkout. Redistribution or resale of raw asset files is strictly prohibited.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">3. User Conduct</h3>
      <p>Users are responsible for maintaining the confidentiality of their account credentials and for all activities that occur under their account.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">4. Modifications</h3>
      <p>LÃM-3D reserves the right to modify or terminate services or update these terms at any time without prior notice.</p>
    </section>
  </PolicyLayout>
);

export const RefundPolicy = () => (
  <PolicyLayout title="Refund Policy">
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">1. Digital Nature of Products</h3>
      <p>Due to the digital nature of 3D assets, all sales are final once the download link has been accessed or the files have been delivered to your account.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">2. Refund Eligibility</h3>
      <p>Refunds may be considered only in the following cases:</p>
      <ul className="list-disc pl-6 mt-4 gap-2 flex flex-col">
        <li>The file is corrupted or damaged and cannot be opened.</li>
        <li>The asset significantly differs from the preview images and descriptions.</li>
        <li>A technical error resulted in multiple charges for the same item.</li>
      </ul>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">3. Request Process</h3>
      <p>Refund requests must be submitted within 7 days of purchase via our Contact Us page. Please include your order ID and a detailed explanation of the issue.</p>
    </section>
  </PolicyLayout>
);

export const LicensePolicy = () => (
  <PolicyLayout title="License Policy">
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">1. Standard License</h3>
      <p>Included with most basic purchases. Allows for use in personal projects and commercial projects with a limited audience. Non-transferable.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">2. Extended Commercial License</h3>
      <p>Required for large-scale commercial productions, games with over 100k downloads, and television/film use. Includes multi-user studio rights.</p>
    </section>
    <section className="mb-12">
      <h3 className="text-xl font-bold mb-4">3. Prohibited Uses</h3>
      <p>Regardless of the license, you may NOT:</p>
      <ul className="list-disc pl-6 mt-4 gap-2 flex flex-col">
        <li>Resell or redistribute asset files on other marketplaces.</li>
        <li>Include assets in "game kits" or "asset packs" for third-party use.</li>
        <li>Claim authorship of the original 3D meshes or textures.</li>
      </ul>
    </section>
  </PolicyLayout>
);
