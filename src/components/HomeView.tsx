import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const HomeView: React.FC = () => {
  const { products, setCurrentView, setSelectedCategory, setSelectedProduct } = useStore();
  const [activeTab, setActiveTab] = useState<'All' | 'Occasionwear' | 'Everyday' | 'Floral' | 'Party'>('All');
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  // Filter products for the curated section
  const curatedProducts = products.filter((p) => {
    if (activeTab === 'All') return true;
    return p.category === activeTab;
  });

  // Hero showcase product (Lavender Evening Dress or first product)
  const heroProduct = products.find((p) => p.id === 'lavender-evening-dress') || products[0];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.includes('@')) {
      setSubscribed(true);
      setEmailInput('');
    }
  };

  return (
    <div className="bg-[#FAF7FC] min-h-screen text-[#1F1925]">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#CDC3D2]/40 bg-gradient-to-b from-[#F6EAFB]/60 via-[#FAF7FC] to-[#FAF7FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Column: Editorial Headline & Copy */}
            <div className="lg:col-span-7 flex flex-col justify-center space-y-6 lg:pr-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#E5B9FF]/30 border border-[#7950A8]/20 self-center lg:self-start">
                <span className="w-2 h-2 rounded-full bg-[#60378E] animate-pulse"></span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#60378E]">
                  Summer Atelier Edition 2025
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl tracking-tight text-[#1F1925] leading-[1.12]">
                Modern <span className="italic font-normal text-[#60378E]">Romance</span>, <br className="hidden sm:inline" />
                Refined Grace.
              </h1>

              <p className="text-base sm:text-lg text-[#4B4450] max-w-xl font-light leading-relaxed mx-auto lg:mx-0">
                Editorial silhouettes tailored for confident, globally minded women. Sculpted in pure mulberry silks, archival jacquards, and diaphanous tulles with personal WhatsApp concierge.
              </p>

              {/* CTAs */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setCurrentView('shop-all');
                  }}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#60378E] hover:bg-[#4C2479] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <span>Explore Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <a
                  href="https://wa.me/?text=Hello%20Violet%20Muse%20Atelier!%20I%20would%20like%20to%20consult%20with%20a%20private%20stylist%20for%20couture%20silhouettes."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-3.5 bg-white hover:bg-[#F6EAFB] text-[#60378E] border border-[#7950A8]/30 hover:border-[#60378E] text-xs font-semibold uppercase tracking-[0.16em] rounded-full transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#25D366]">chat</span>
                  <span>WhatsApp Concierge</span>
                </a>
              </div>

              {/* Value propositions */}
              <div className="pt-6 grid grid-cols-3 gap-3 border-t border-[#CDC3D2]/40 text-left">
                <div className="space-y-0.5">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#1F1925]">100% Silk & Lace</div>
                  <div className="text-[11px] text-[#7C7481]">Hand-finished couture seams</div>
                </div>
                <div className="space-y-0.5 border-l border-[#CDC3D2]/40 pl-3">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#1F1925]">VIP Fit Advice</div>
                  <div className="text-[11px] text-[#7C7481]">Direct stylist measurements</div>
                </div>
                <div className="space-y-0.5 border-l border-[#CDC3D2]/40 pl-3">
                  <div className="text-xs font-semibold tracking-wider uppercase text-[#1F1925]">Express Courier</div>
                  <div className="text-[11px] text-[#7C7481]">Global tracked delivery</div>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual with Oval Aperture */}
            <div className="lg:col-span-5 flex justify-center relative">
              <div className="relative w-full max-w-[360px] sm:max-w-[400px]">
                {/* Background decorative soft glow */}
                <div className="absolute inset-0 bg-gradient-to-tr from-[#E5B9FF]/40 to-[#F6EAFB] rounded-full blur-2xl transform -rotate-6 scale-105"></div>
                
                {/* Oval Arch Card */}
                <div
                  onClick={() => heroProduct && setSelectedProduct(heroProduct)}
                  className="relative z-10 w-full aspect-[3/4.4] rounded-full overflow-hidden shadow-2xl ring-1 ring-white/80 cursor-pointer group bg-[#EADCF3]"
                >
                  <img
                    src={heroProduct?.imageUrl}
                    alt={heroProduct?.title || 'Violet Muse Couture'}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>

                  {/* Floating Garment Tag */}
                  <div className="absolute bottom-8 inset-x-6 text-center text-white pointer-events-none">
                    <span className="inline-block px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-[10px] tracking-[0.2em] uppercase font-semibold text-[#E5B9FF] mb-1">
                      Featured Masterpiece
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-white drop-shadow">
                      {heroProduct?.title}
                    </h2>
                    <p className="text-xs text-white/90 font-light mt-0.5">
                      ${heroProduct?.price} USD • Tap to inspect details
                    </p>
                  </div>
                </div>

                {/* Floating pill badge 1 */}
                <div className="absolute -left-4 top-1/4 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#CDC3D2]/30 flex items-center gap-2.5 transform -rotate-3">
                  <span className="w-8 h-8 rounded-full bg-[#F6EAFB] flex items-center justify-center text-[#60378E]">
                    <span className="material-symbols-outlined text-[18px]">verified</span>
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold text-[#1F1925] tracking-wide">Parisian Cut</div>
                    <div className="text-[10px] text-[#7C7481]">Mulberry Silk Satin</div>
                  </div>
                </div>

                {/* Floating pill badge 2 */}
                <div className="absolute -right-4 bottom-16 z-20 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-lg border border-[#CDC3D2]/30 flex items-center gap-2.5 transform rotate-2">
                  <span className="w-8 h-8 rounded-full bg-[#25D366]/15 flex items-center justify-center text-[#25D366]">
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                  </span>
                  <div>
                    <div className="text-[11px] font-semibold text-[#1F1925] tracking-wide">Live Stylist</div>
                    <div className="text-[10px] text-[#7C7481]">Average 3-min reply</div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CURATED SILHOUETTES SECTION */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7950A8] block mb-2">
            The Atelier Selection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1925]">
            Curated Silhouettes
          </h2>
          <p className="text-[#4B4450] text-sm sm:text-base mt-2.5 font-light">
            Every garment is tailored with architectural precision, designed to drape seamlessly across formal galas and intimate garden gatherings.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {(['All', 'Occasionwear', 'Everyday', 'Floral', 'Party'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase rounded-full transition-all duration-200 cursor-pointer ${
                  activeTab === tab
                    ? 'bg-[#60378E] text-white shadow-sm'
                    : 'bg-white text-[#4B4450] hover:text-[#1F1925] border border-[#CDC3D2]/60 hover:border-[#60378E]'
                }`}
              >
                {tab === 'All' ? 'All Silhouettes' : tab}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 sm:gap-10">
          {curatedProducts.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} variant="oval" />
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-14 text-center">
          <button
            onClick={() => {
              setSelectedCategory(activeTab === 'All' ? null : activeTab);
              setCurrentView('shop-all');
            }}
            className="px-8 py-3.5 bg-white hover:bg-[#F6EAFB] text-[#60378E] border border-[#7950A8] rounded-full text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 inline-flex items-center gap-2 shadow-sm hover:shadow cursor-pointer"
          >
            <span>View Full Atelier Catalog ({products.length} Garments)</span>
            <span className="material-symbols-outlined text-[18px]">east</span>
          </button>
        </div>
      </section>

      {/* EDITORIAL QUOTE BANNER */}
      <section className="bg-[#60378E] text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
        {/* Subtle background motif */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#E5B9FF]">
            Philosophy of Form
          </span>
          <blockquote className="font-serif text-2xl sm:text-3xl md:text-4xl italic font-normal leading-relaxed text-[#FAF7FC]">
            “A dress should not simply be worn — it should become an atmosphere. Violet Muse was founded on the belief that pure silhouettes evoke an undeniable quiet authority.”
          </blockquote>
          <div className="pt-2">
            <div className="font-serif tracking-widest text-sm text-[#E5B9FF] uppercase">
              Elena Vance
            </div>
            <div className="text-xs text-[#FAF7FC]/70 uppercase tracking-widest mt-0.5">
              Atelier Creative Director • Paris
            </div>
          </div>
        </div>
      </section>

      {/* SUMMER SOIRÉE / JUST ARRIVED SHOWCASE */}
      <section className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-[#CDC3D2]/40">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7950A8] block mb-1">
              Fresh From The Workroom
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1925]">
              Summer Soirée Releases
            </h2>
          </div>
          <button
            onClick={() => {
              setSelectedCategory('Occasionwear');
              setCurrentView('shop-all');
            }}
            className="mt-4 md:mt-0 text-xs font-semibold tracking-wider uppercase text-[#60378E] hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>Explore Occasionwear</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.slice(4, 8).map((product) => (
            <ProductCard key={product.id} product={product} variant="arch" />
          ))}
        </div>
      </section>

      {/* HOW THE WHATSAPP CONCIERGE WORKS */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#7950A8] block mb-2">
              Bespoke Digital Service
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1925]">
              The WhatsApp Atelier Experience
            </h2>
            <p className="text-[#4B4450] text-sm sm:text-base mt-2.5 font-light">
              No generic automated bots. Connect directly with our atelier stylists to ensure the perfect drape, custom hem adjustments, and coordinated accessories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="p-8 rounded-2xl bg-[#FAF7FC] border border-[#CDC3D2]/40 relative group hover:border-[#7950A8] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#F6EAFB] text-[#60378E] flex items-center justify-center font-serif text-xl font-bold mb-6">
                01
              </div>
              <h3 className="font-serif text-xl text-[#1F1925] mb-2">
                Select Your Silhouette
              </h3>
              <p className="text-sm text-[#4B4450] font-light leading-relaxed">
                Browse our curated couture dresses. Choose your standard size (XS–XL) or gather preliminary measurements for a bespoke drape.
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-8 rounded-2xl bg-[#FAF7FC] border border-[#CDC3D2]/40 relative group hover:border-[#7950A8] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#F6EAFB] text-[#60378E] flex items-center justify-center font-serif text-xl font-bold mb-6">
                02
              </div>
              <h3 className="font-serif text-xl text-[#1F1925] mb-2">
                Direct Stylist Consultation
              </h3>
              <p className="text-sm text-[#4B4450] font-light leading-relaxed">
                Click “Order via WhatsApp” to initiate a secure encrypted chat with our studio fit expert. Receive fabric video clips and size guidance.
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-8 rounded-2xl bg-[#FAF7FC] border border-[#CDC3D2]/40 relative group hover:border-[#7950A8] transition-colors">
              <div className="w-12 h-12 rounded-full bg-[#F6EAFB] text-[#60378E] flex items-center justify-center font-serif text-xl font-bold mb-6">
                03
              </div>
              <h3 className="font-serif text-xl text-[#1F1925] mb-2">
                Hand-Finished Delivery
              </h3>
              <p className="text-sm text-[#4B4450] font-light leading-relaxed">
                Your gown is pressed, wrapped in acid-free tissue paper, placed into our signature violet box, and shipped via expedited tracked courier.
              </p>
            </div>
          </div>

          {/* Quick Consultation CTA */}
          <div className="mt-12 text-center">
            <a
              href="https://wa.me/?text=Hello%20Violet%20Muse!%20I%20would%20like%20to%20speak%20with%20a%20stylist."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-8 py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold tracking-[0.16em] uppercase rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Start Live WhatsApp Fit Chat</span>
            </a>
          </div>
        </div>
      </section>

      {/* VIP ATELIER NEWSLETTER */}
      <section className="py-16 sm:py-20 bg-[#F6EAFB] border-t border-[#CDC3D2]/40">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#60378E] block mb-2">
            Private Salon Invitations
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1F1925]">
            Join the Violet Muse Circle
          </h2>
          <p className="text-sm sm:text-base text-[#4B4450] font-light mt-2 mb-8">
            Receive private trunk show invites, limited silk drop alerts, and invitations to seasonal runway debuts before public release.
          </p>

          {subscribed ? (
            <div className="p-4 bg-white rounded-xl border border-[#7950A8] text-[#60378E] font-medium text-sm">
              ✨ Welcome to the Violet Muse Circle. Your private salon invitation will arrive shortly.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-5 py-3 rounded-full bg-white border border-[#CDC3D2] text-sm text-[#1F1925] placeholder-[#7C7481] focus:outline-none focus:border-[#60378E] focus:ring-1 focus:ring-[#60378E]"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-[#60378E] hover:bg-[#4C2479] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-full transition-colors cursor-pointer"
              >
                Join Circle
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};
