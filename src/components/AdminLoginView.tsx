import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';

export const AdminLoginView: React.FC = () => {
  const { login, loginAsCustomer, loginAsAdminDirect, authError, setAuthError, isLoading } = useAuth();
  const { setCurrentView } = useStore();

  const [email, setEmail] = useState('admin@violetmuse.com');
  const [password, setPassword] = useState('Atelier2025!');
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<'admin' | 'customer'>('admin');

  const handleAdminSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await login(email, password);
    if (res.success) {
      setCurrentView('admin-dashboard');
    }
  };

  const handleCustomerLogin = (customerEmail: string) => {
    loginAsCustomer(customerEmail);
    // Customers are redirected to storefront, NOT dashboard!
    setCurrentView('home');
  };

  return (
    <div className="min-h-[85vh] bg-[#FAF7FC] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-[#CDC3D2]/50 relative overflow-hidden">
        
        {/* Subtle decorative top bar */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#60378E] via-[#7950A8] to-[#E5B9FF]"></div>

        {/* Brand & Portal Header */}
        <div className="text-center pt-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#F6EAFB] border border-[#7950A8]/30 flex items-center justify-center text-[#60378E] mb-3">
            <span className="material-symbols-outlined text-[24px]">lock</span>
          </div>
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#7950A8] block">
            Security & Authentication
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl text-[#1F1925] mt-1">
            Atelier Portal
          </h2>
          <p className="text-xs text-[#7C7481] mt-1">
            Violet Muse Paris • New York • Milan
          </p>
        </div>

        {/* Fast Role Switcher Tabs for Demo Convenience */}
        <div className="grid grid-cols-2 p-1 bg-[#FAF7FC] rounded-full border border-[#CDC3D2]/60 text-xs">
          <button
            type="button"
            onClick={() => {
              setActiveTab('admin');
              setEmail('admin@violetmuse.com');
              setPassword('Atelier2025!');
              setAuthError(null);
            }}
            className={`py-2 rounded-full font-medium transition-all ${
              activeTab === 'admin'
                ? 'bg-[#60378E] text-white shadow-sm'
                : 'text-[#4B4450] hover:text-[#1F1925]'
            }`}
          >
            Director (Admin)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab('customer');
              setEmail('sophia@coutureclient.com');
              setPassword('');
              setAuthError(null);
            }}
            className={`py-2 rounded-full font-medium transition-all ${
              activeTab === 'customer'
                ? 'bg-[#60378E] text-white shadow-sm'
                : 'text-[#4B4450] hover:text-[#1F1925]'
            }`}
          >
            Normal User (Client)
          </button>
        </div>

        {/* Role Explanation Notice */}
        <div className="text-[11px] bg-[#F6EAFB]/80 text-[#60378E] p-3 rounded-xl border border-[#7950A8]/20 leading-relaxed">
          {activeTab === 'admin' ? (
            <span>
              <strong>Admin Mode:</strong> Grants access to inventory management, SKU editing, metrics, and adding new dresses.
            </span>
          ) : (
            <span>
              <strong>Normal User Mode:</strong> Can browse, save to wishlist, and order via WhatsApp. <em>Dashboard is strictly restricted and invisible to normal users.</em>
            </span>
          )}
        </div>

        {/* Error message banner */}
        {authError && (
          <div className="p-3 bg-[#FFEDEA] border border-[#BA1A1A]/30 text-[#BA1A1A] rounded-xl text-xs flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">error</span>
            <span>{authError}</span>
          </div>
        )}

        {/* Admin Form */}
        {activeTab === 'admin' ? (
          <form className="mt-6 space-y-4" onSubmit={handleAdminSubmit}>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1.5">
                Atelier Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#7C7481]">
                  badge
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@violetmuse.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E] focus:ring-1 focus:ring-[#60378E]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1.5">
                Security Passphrase
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#7C7481]">
                  key
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E] focus:ring-1 focus:ring-[#60378E]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7481] hover:text-[#1F1925]"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#60378E] hover:bg-[#4C2479] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[18px]">vpn_key</span>
                  <span>Enter Director Workspace</span>
                </>
              )}
            </button>
          </form>
        ) : (
          /* Customer Form */
          <div className="mt-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1.5">
                Client Email
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#7C7481]">
                  mail
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sophia@coutureclient.com"
                  className="w-full pl-10 pr-4 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleCustomerLogin(email)}
              className="w-full py-3 px-4 bg-[#60378E] hover:bg-[#4C2479] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">person</span>
              <span>Sign In as Normal Customer</span>
            </button>
          </div>
        )}

        {/* One-Click Quick Demo Presets */}
        <div className="pt-4 border-t border-[#CDC3D2]/40">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#7C7481] block text-center mb-2.5">
            Quick Demo Instant Switcher
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                loginAsAdminDirect();
                setCurrentView('admin-dashboard');
              }}
              className="p-2.5 bg-[#F6EAFB] hover:bg-[#E5B9FF]/50 text-[#60378E] rounded-xl border border-[#7950A8]/30 text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>👑 Instant Admin</span>
            </button>

            <button
              type="button"
              onClick={() => {
                loginAsCustomer('sophia.couture@example.com');
                setCurrentView('home');
              }}
              className="p-2.5 bg-white hover:bg-[#FAF7FC] text-[#4B4450] rounded-xl border border-[#CDC3D2] text-[11px] font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>👗 Instant Client</span>
            </button>
          </div>
        </div>

        {/* Return to Storefront */}
        <div className="text-center pt-2">
          <button
            onClick={() => setCurrentView('home')}
            className="text-xs text-[#7C7481] hover:text-[#60378E] transition-colors inline-flex items-center gap-1 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">arrow_back</span>
            <span>Return to Violet Muse Storefront</span>
          </button>
        </div>

      </div>
    </div>
  );
};
