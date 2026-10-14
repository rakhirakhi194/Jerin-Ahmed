import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { useAuth } from '../context/AuthContext';

const BRAND_LOGO_URL =
  'https://lh3.googleusercontent.com/aida/AEtjO1Xet2HG_TQCnjskU_6JmGag9dShA7gFAmHqXJmULn-rWbLUl5WnSARHMtz_tGIUoj8JRdpaQiuBLPrmJVcyZ3Kxajc--MXUO7yZqUdmgy5JdTcpbPC1eIhrgjRSHjWAE4mBmAcFPzOTEwoSQL7BVxwrLDkz4A5e3F4A0kDZw9aCLViANohIGGYR0NO7mRwH4dSg9sdY4miMNjTzMIJ_GLjGqQI9x7qBK7YI-3YVGea1I8NEu2xzCLsrsg';

export const Header: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    setSelectedCategory,
    wishlist,
    setIsSearchOpen,
    setIsWishlistOpen,
    setSelectedProduct
  } = useStore();

  const { user, isAdmin, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDressesExpanded, setMobileDressesExpanded] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const handleNavClick = (view: typeof currentView, category?: string) => {
    setSelectedProduct(null);
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory(null);
    }
    setCurrentView(view);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 bg-[#FFF7FF]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(71,36,95,0.06)] border-b border-[#E1D6E7]/50">
        {/* Top Announcement Bar */}
        <div className="bg-[#F6EAFB] py-1.5 px-4 text-center border-b border-[#E1D6E7]/40">
          <p className="text-[11px] font-medium uppercase tracking-wider text-[#60378E]">
            Discover your next favorite look. Personal styling &amp; WhatsApp order assistance available.
          </p>
        </div>

        {/* Main Navigation Bar */}
        <div className="h-20 max-w-[1440px] mx-auto px-6 lg:px-16 flex items-center justify-between">
          {/* Logo & Brand Wordmark */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 text-left focus:outline-none group"
            >
              <img
                alt="Violet Muse Brand Logo"
                className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                src={BRAND_LOGO_URL}
                onError={(e) => {
                  // Fallback icon if image blocked
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="font-serif text-2xl tracking-tight text-[#60378E] font-medium group-hover:text-[#47245F] transition-colors">
                Violet Muse
              </span>
            </button>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-semibold uppercase tracking-[0.1em]">
            <button
              onClick={() => handleNavClick('home')}
              className={`py-1 transition-colors ${
                currentView === 'home'
                  ? 'text-[#60378E] font-bold border-b border-[#60378E]'
                  : 'text-[#4B4450] hover:text-[#60378E]'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('shop-all')}
              className={`py-1 transition-colors ${
                currentView === 'shop-all'
                  ? 'text-[#60378E] font-bold border-b border-[#60378E]'
                  : 'text-[#4B4450] hover:text-[#60378E]'
              }`}
            >
              Shop All
            </button>
            <button
              onClick={() => handleNavClick('new-arrivals')}
              className={`py-1 transition-colors ${
                currentView === 'new-arrivals'
                  ? 'text-[#60378E] font-bold border-b border-[#60378E]'
                  : 'text-[#4B4450] hover:text-[#60378E]'
              }`}
            >
              New Arrivals
            </button>
            <button
              onClick={() => handleNavClick('dresses')}
              className={`py-1 transition-colors ${
                currentView === 'dresses'
                  ? 'text-[#60378E] font-bold border-b border-[#60378E]'
                  : 'text-[#4B4450] hover:text-[#60378E]'
              }`}
            >
              Dresses
            </button>
            <button
              onClick={() => handleNavClick('collections')}
              className={`py-1 transition-colors ${
                currentView === 'collections'
                  ? 'text-[#60378E] font-bold border-b border-[#60378E]'
                  : 'text-[#4B4450] hover:text-[#60378E]'
              }`}
            >
              Collections
            </button>
          </nav>

          {/* Action Icons */}
          <div className="flex items-center gap-4 sm:gap-5">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search silhouettes"
              className="p-1.5 text-[#4B4450] hover:text-[#60378E] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Button */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative p-1.5 text-[#4B4450] hover:text-[#60378E] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlist.length > 0 && (
                <span className="absolute 0 top-0.5 right-0.5 bg-[#60378E] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Concierge Button */}
            <a
              href="https://wa.me/?text=Hello%20Violet%20Muse%20Atelier!%20I%20would%20like%20personal%20styling%20assistance."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FBF0FF] text-[#60378E] hover:bg-[#60378E] hover:text-white transition-all rounded text-xs font-semibold tracking-wider uppercase border border-[#E1D6E7]"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span className="hidden lg:inline">Concierge</span>
            </a>

            {/* Profile / Atelier Admin Avatar */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isAdmin
                    ? 'bg-[#47245F] text-white ring-2 ring-[#E5B9FF]'
                    : user
                    ? 'bg-[#7950A8] text-white'
                    : 'bg-[#60378E] text-white hover:bg-[#47245F]'
                }`}
                title={user ? `${user.name} (${user.role})` : 'Atelier Login'}
              >
                {isAdmin ? (
                  <span className="text-xs font-bold font-serif">EV</span>
                ) : (
                  <span className="material-symbols-outlined text-[18px]">person</span>
                )}
              </button>

              {/* Profile Dropdown */}
              {profileDropdownOpen && (
                <div
                  className="absolute right-0 mt-2 w-64 bg-white shadow-2xl border border-[#E1D6E7] p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onClick={() => setProfileDropdownOpen(false)}
                >
                  {isAdmin ? (
                    <div>
                      <div className="px-3 py-2 border-b border-[#F0E4F5]">
                        <p className="font-serif text-sm font-semibold text-[#1F1925]">Elena Vance</p>
                        <p className="text-[11px] text-[#60378E] font-medium uppercase tracking-wider">
                          Atelier Director (Admin)
                        </p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => handleNavClick('admin-dashboard')}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-[#1F1925] hover:bg-[#F6EAFB] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#60378E]">dashboard</span>
                          Atelier Admin Dashboard
                        </button>
                        <button
                          onClick={() => handleNavClick('admin-add-product')}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-[#1F1925] hover:bg-[#F6EAFB] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#60378E]">add_circle</span>
                          Add New Garment
                        </button>
                        <button
                          onClick={() => handleNavClick('home')}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-[#1F1925] hover:bg-[#F6EAFB] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#60378E]">storefront</span>
                          View Storefront
                        </button>
                        <button
                          onClick={() => logout()}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-[#F0E4F5] mt-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">logout</span>
                          Sign Out of Atelier
                        </button>
                      </div>
                    </div>
                  ) : user ? (
                    <div>
                      <div className="px-3 py-2 border-b border-[#F0E4F5]">
                        <p className="text-xs font-semibold text-[#1F1925] truncate">{user.email}</p>
                        <p className="text-[10px] text-[#4B4450]">Atelier Valued Client</p>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={() => setIsWishlistOpen(true)}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-[#1F1925] hover:bg-[#F6EAFB] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px] text-[#60378E]">favorite</span>
                          My Wishlist ({wishlist.length})
                        </button>
                        <button
                          onClick={() => handleNavClick('admin-login')}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-[#60378E] hover:bg-[#F6EAFB] flex items-center gap-2"
                        >
                          <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
                          Atelier Staff Sign In
                        </button>
                        <button
                          onClick={() => logout()}
                          className="w-full text-left px-3 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 flex items-center gap-2 border-t border-[#F0E4F5] mt-1"
                        >
                          <span className="material-symbols-outlined text-[18px]">logout</span>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="py-1">
                      <div className="px-3 py-2 border-b border-[#F0E4F5]">
                        <p className="font-serif text-xs font-semibold text-[#1F1925]">Atelier Portal Access</p>
                        <p className="text-[10px] text-[#4B4450]">Sign in for catalog management</p>
                      </div>
                      <button
                        onClick={() => handleNavClick('admin-login')}
                        className="w-full text-left px-3 py-2 text-xs font-semibold text-[#60378E] hover:bg-[#F6EAFB] flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-[18px]">lock</span>
                        Atelier Admin Sign In
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[#4B4450] hover:text-[#60378E]"
              aria-label="Toggle navigation menu"
            >
              <span className="material-symbols-outlined text-[24px]">
                {mobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer (Matches Image 7) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#FFF7FF] pt-24 pb-8 px-6 overflow-y-auto md:hidden animate-in fade-in duration-200">
          <div className="max-w-md mx-auto space-y-6">
            {/* Quick Search */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search silhouettes, fabrics, occasions..."
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSearchOpen(true);
                }}
                className="w-full bg-[#F8F4FB] border border-[#E1D6E7] rounded-lg pl-10 pr-4 py-2.5 text-xs text-[#1F1925] focus:outline-none focus:border-[#7950A8]"
              />
              <span className="material-symbols-outlined text-[18px] text-[#7950A8] absolute left-3 top-2.5">
                search
              </span>
            </div>

            {/* Nav List */}
            <nav className="space-y-1 divide-y divide-[#F1E8F6]">
              <div
                onClick={() => handleNavClick('home')}
                className="py-3 flex items-center justify-between cursor-pointer"
              >
                <span className="font-serif text-lg text-[#1F1925] font-medium">Home</span>
                <span className="text-xs text-[#7950A8]">→</span>
              </div>

              {/* Accordion for Dresses & Silhouettes */}
              <div className="py-3">
                <div
                  onClick={() => setMobileDressesExpanded(!mobileDressesExpanded)}
                  className="flex items-center justify-between cursor-pointer"
                >
                  <span className="font-serif text-lg text-[#47245F] font-semibold">
                    Dresses &amp; Silhouettes
                  </span>
                  <span className="text-xs text-[#47245F] font-bold">
                    {mobileDressesExpanded ? '▲' : '▼'}
                  </span>
                </div>
                {mobileDressesExpanded && (
                  <div className="mt-3 pl-3 border-l-2 border-[#7950A8] space-y-2 text-xs">
                    <button
                      onClick={() => handleNavClick('shop-all')}
                      className="block w-full text-left text-[#7950A8] font-medium bg-[#F8F4FB] py-1.5 px-2.5 rounded"
                    >
                      All Dresses (24)
                    </button>
                    <button
                      onClick={() => handleNavClick('dresses', 'Occasionwear')}
                      className="block w-full text-left text-[#4B4450] hover:text-[#47245F] py-1 px-2.5"
                    >
                      Occasionwear &amp; Evening
                    </button>
                    <button
                      onClick={() => handleNavClick('dresses', 'Floral')}
                      className="block w-full text-left text-[#4B4450] hover:text-[#47245F] py-1 px-2.5"
                    >
                      Floral Silk &amp; Chiffon
                    </button>
                    <button
                      onClick={() => handleNavClick('dresses', 'Everyday')}
                      className="block w-full text-left text-[#4B4450] hover:text-[#47245F] py-1 px-2.5"
                    >
                      Everyday Linen Edit
                    </button>
                    <button
                      onClick={() => handleNavClick('dresses', 'Party')}
                      className="block w-full text-left text-[#4B4450] hover:text-[#47245F] py-1 px-2.5"
                    >
                      Cocktail &amp; Party
                    </button>
                  </div>
                )}
              </div>

              <div
                onClick={() => handleNavClick('new-arrivals')}
                className="py-3 flex items-center justify-between cursor-pointer"
              >
                <span className="font-serif text-lg text-[#1F1925]">New Arrivals</span>
                <span className="text-[10px] bg-[#EDE4F5] text-[#47245F] font-semibold px-2 py-0.5 rounded-full">
                  New
                </span>
              </div>

              <div
                onClick={() => handleNavClick('collections')}
                className="py-3 flex items-center justify-between cursor-pointer"
              >
                <span className="font-serif text-lg text-[#1F1925]">Curated Collections</span>
                <span className="text-xs text-[#4B4450]">→</span>
              </div>

              {/* Admin Portal shortcut in mobile */}
              <div
                onClick={() => handleNavClick(isAdmin ? 'admin-dashboard' : 'admin-login')}
                className="py-3 flex items-center justify-between cursor-pointer"
              >
                <span className="font-serif text-lg text-[#60378E] font-medium">
                  {isAdmin ? 'Atelier Admin Dashboard' : 'Atelier Staff Portal'}
                </span>
                <span className="material-symbols-outlined text-sm text-[#60378E]">lock</span>
              </div>
            </nav>

            {/* Stylist Online Now card */}
            <div className="bg-gradient-to-br from-[#EDE4F5] to-[#F8F4FB] p-4 rounded-xl border border-[#C7A6E5] space-y-2.5">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[11px] font-semibold text-[#47245F] uppercase tracking-wider">
                  Stylist Online Now
                </span>
              </div>
              <h4 className="font-serif text-base text-[#47245F] font-semibold leading-tight">
                Need Sizing or Fit Guidance?
              </h4>
              <p className="text-[11px] text-[#4B4450] leading-relaxed">
                Chat directly with an atelier stylist via WhatsApp for custom measurements, color inquiries, or instant orders.
              </p>
              <a
                href="https://wa.me/?text=Hello%20Violet%20Muse!%20I%20need%20sizing%20guidance."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full bg-[#25D366] hover:bg-[#20ba5a] text-white text-xs font-semibold py-2.5 px-3 rounded shadow-sm transition gap-2 uppercase tracking-wider"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            {/* Currency */}
            <div className="pt-3 border-t border-[#E1D6E7] flex items-center justify-between text-xs text-[#4B4450]">
              <span>
                Currency: <strong className="text-[#47245F]">USD ($)</strong>
              </span>
              <span>Worldwide Express Delivery</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
