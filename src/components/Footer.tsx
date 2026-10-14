import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { setCurrentView, setSelectedCategory, showToast, isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const { isAdmin } = useAuth();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      showToast('Please enter a valid international email.');
      return;
    }
    setSubscribed(true);
    showToast('Thank you for subscribing to Violet Muse private invitations.');
    setEmail('');
  };

  const handleCategoryClick = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentView('dresses');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#60378E] text-white pt-16 pb-12 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10">
          {/* Brand Info */}
          <div className="space-y-4">
            <h3 className="font-serif text-2xl text-white">Violet Muse</h3>
            <p className="text-xs text-[#EED9FF] max-w-xs leading-relaxed font-light">
              Quiet luxury and haute-couture editorial silhouettes tailored for confident, stylish, globally minded women.
            </p>
            <div className="pt-2">
              <a
                className="inline-flex items-center gap-2 px-4 py-2 bg-white text-[#60378E] hover:bg-[#F6EAFB] text-xs font-semibold tracking-wider uppercase transition-all rounded"
                href="https://wa.me/?text=Hello%20Violet%20Muse%20Concierge"
                rel="noopener noreferrer"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[18px]">support_agent</span>
                WhatsApp Concierge
              </a>
            </div>
          </div>

          {/* Shop Directory */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#EADFEF] mb-4 font-semibold">
              Shop Directory
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EED9FF]">
              <li
                onClick={() => handleCategoryClick('Occasionwear')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Evening &amp; Gala Dresses
              </li>
              <li
                onClick={() => handleCategoryClick('Floral')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Silk &amp; Chiffon Silhouettes
              </li>
              <li
                onClick={() => handleCategoryClick('Everyday')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Contemporary Tailoring
              </li>
              <li
                onClick={() => handleCategoryClick('Party')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Resort &amp; Vacation Wear
              </li>
              <li
                onClick={() => {
                  setSelectedCategory(null);
                  setCurrentView('new-arrivals');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Curated Capsule Drops
              </li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#EADFEF] mb-4 font-semibold">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-xs text-[#EED9FF]">
              <li>
                <a
                  href="https://wa.me/?text=Hello%20Violet%20Muse!%20I%20need%20sizing%20advice."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp Sizing Advice
                </a>
              </li>
              <li
                onClick={() => setIsSizeGuideOpen(true)}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Atelier Size Guide
              </li>
              <li
                onClick={() => showToast('Global express delivery dispatched within 24-48 hours via DHL Express.')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Global Express Shipping
              </li>
              <li
                onClick={() => showToast('Bespoke custom alterations available for VIP clientele upon request.')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Bespoke Alterations
              </li>
              <li
                onClick={() => showToast('WhatsApp concierge is online 24/7 for all client inquiries.')}
                className="hover:text-white cursor-pointer transition-colors"
              >
                Frequently Asked Questions
              </li>
            </ul>
          </div>

          {/* Curated Dispatch */}
          <div>
            <h4 className="text-xs uppercase tracking-wider text-[#EADFEF] mb-4 font-semibold">
              Curated Dispatch
            </h4>
            <p className="text-xs text-[#EED9FF] mb-4 font-light">
              Receive private invitations to seasonal private sales and trunk shows.
            </p>
            {subscribed ? (
              <p className="text-xs bg-[#7950A8] p-3 text-white">
                ✓ You have been added to the private atelier invitation ledger.
              </p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center bg-[#7950A8] p-1 rounded">
                <input
                  className="bg-transparent px-3 py-2 text-white placeholder:text-[#EED9FF]/70 text-xs w-full outline-none"
                  placeholder="Your email address"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-[#60378E] text-xs uppercase tracking-wider font-semibold hover:bg-[#EADFEF] transition-colors rounded"
                >
                  Join
                </button>
              </form>
            )}
            <div className="mt-4 flex items-center justify-between text-[#EED9FF] text-[11px]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px]">public</span>
                <span>Global Store · USD ($)</span>
              </div>
              <button
                onClick={() => {
                  if (isAdmin) {
                    setCurrentView('admin-dashboard');
                  } else {
                    setCurrentView('admin-login');
                  }
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-[10px] text-white/70 hover:text-white underline tracking-wider uppercase"
              >
                {isAdmin ? 'Admin Dashboard' : 'Atelier Staff'}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Legal Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#EED9FF]/80">
          <p>© 2025 Violet Muse Atelier Inc. All international rights reserved.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => showToast('Client privacy is strictly guarded with bank-grade encryption.')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => showToast('Terms of service available upon checkout.')}
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </button>
            <button
              onClick={() => showToast('All cookies configured strictly for session functionality.')}
              className="hover:text-white transition-colors"
            >
              Cookie Preferences
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
