import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/products';

export const PDPModal: React.FC = () => {
  const {
    selectedProduct,
    setSelectedProduct,
    toggleWishlist,
    isInWishlist,
    showToast,
    setIsSizeGuideOpen,
    setIsVirtualFittingOpen,
    products
  } = useStore();

  if (!selectedProduct) return null;

  const [selectedSize, setSelectedSize] = useState<Product['sizes'][number]>(
    selectedProduct.sizes[1] || 'S'
  );
  const [selectedColor, setSelectedColor] = useState(
    selectedProduct.colors[0] || { name: 'Royal Hue', hex: '#60378E' }
  );
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [copied, setCopied] = useState(false);

  // Accordion toggle states
  const [openMaterial, setOpenMaterial] = useState(false);
  const [openFit, setOpenFit] = useState(false);
  const [openConcierge, setOpenConcierge] = useState(false);

  const images = [
    selectedProduct.imageUrl,
    ...(selectedProduct.additionalImages || [])
  ];

  const wishlisted = isInWishlist(selectedProduct.id);

  const productUrl = `https://violetmuse.com/dresses/${selectedProduct.id}`;

  const inquiryMessage = `Hello! I am interested in the ${selectedProduct.title}. Price: $${selectedProduct.price} USD. Product link: ${productUrl} Size: ${selectedSize} Color: ${selectedColor.name}. Please help me with the next steps to place my order.`;

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(inquiryMessage);
    setCopied(true);
    showToast('Inquiry transmission message copied to clipboard.');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleShareLook = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `Violet Muse — ${selectedProduct.title}`,
          text: `Discover the ${selectedProduct.title} at Violet Muse Atelier.`,
          url: window.location.href
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Product link copied to clipboard.');
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== selectedProduct.id)
    .slice(0, 4);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex justify-center items-start p-0 md:p-6 lg:p-10 animate-in fade-in duration-300">
      <div className="relative w-full max-w-6xl bg-[#FFF7FF] min-h-screen md:min-h-0 md:rounded shadow-2xl overflow-hidden my-auto">
        {/* Close Button */}
        <button
          onClick={() => setSelectedProduct(null)}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-white/90 shadow text-[#4B4450] hover:text-[#60378E] flex items-center justify-center transition-colors"
          aria-label="Close product view"
        >
          <span className="material-symbols-outlined text-[24px]">close</span>
        </button>

        {/* Modal Content */}
        <div className="p-6 md:p-10 lg:p-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left Gallery Column */}
            <div className="lg:col-span-6 flex flex-col md:flex-row gap-4 items-center md:items-start">
              {/* Thumbnails */}
              <div className="flex md:flex-col gap-3 order-2 md:order-1 overflow-x-auto max-w-full pb-2 md:pb-0">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`w-16 h-20 md:w-20 md:h-24 rounded-full overflow-hidden border-2 transition-all p-0.5 shrink-0 ${
                      selectedImageIndex === idx
                        ? 'border-[#60378E] scale-105 shadow-md'
                        : 'border-[#CDC3D2] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${selectedProduct.title} view ${idx + 1}`}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </button>
                ))}
              </div>

              {/* Main Image with Signature Elongated Frame */}
              <div className="order-1 md:order-2 flex-1 w-full flex flex-col items-center">
                <div className="relative w-full max-w-[420px] aspect-[9/16] rounded-[240px] overflow-hidden bg-[#F6EAFB] shadow-xl border border-[#E1D6E7]">
                  <img
                    src={images[selectedImageIndex] || selectedProduct.imageUrl}
                    alt={selectedProduct.title}
                    className="w-full h-full object-cover object-center transition-all duration-500"
                  />
                  <div className="absolute top-6 inset-x-0 flex justify-center">
                    <span className="px-3.5 py-1 bg-white/90 backdrop-blur rounded-full text-[10px] uppercase font-semibold text-[#60378E] tracking-widest shadow-sm">
                      Hand-Finished Silk &amp; Satin
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between w-full max-w-[420px] text-xs text-[#7C7481] px-2">
                  <span className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">view_in_ar</span>
                    360° Studio Cut
                  </span>
                  <span>Style Reference #{selectedProduct.sku}</span>
                  <span className="text-[#60378E] font-medium">Tailored Bias Cut</span>
                </div>
              </div>
            </div>

            {/* Right Product Details Column */}
            <div className="lg:col-span-6 flex flex-col justify-start space-y-6">
              {/* Header metadata */}
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#60378E]">
                    {selectedProduct.category} Collection
                  </span>
                  <span className="text-xs text-[#7C7481] flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">flight_takeoff</span>
                    Global Air Priority
                  </span>
                </div>
                <h1 className="font-serif text-3xl md:text-4xl text-[#1F1925] mt-1.5 font-normal">
                  {selectedProduct.title}
                </h1>
              </div>

              {/* Price & Rating */}
              <div className="flex items-baseline justify-between border-b border-[#F0E4F5] pb-4">
                <div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-semibold text-[#1F1925]">
                      ${selectedProduct.price}
                    </span>
                    <span className="text-xs text-[#7C7481] font-medium">USD</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-sm text-[#7C7481] line-through ml-2">
                        ${selectedProduct.originalPrice} USD
                      </span>
                    )}
                  </div>
                  <span className="inline-block mt-1 px-2.5 py-0.5 bg-[#F6EAFB] text-[#60378E] text-[10px] font-semibold uppercase tracking-wider rounded">
                    Tax &amp; Atelier Curation Included
                  </span>
                </div>

                {/* Rating */}
                <div className="text-right">
                  <div className="flex items-center gap-1 text-[#60378E]">
                    <span className="text-amber-500 text-sm">★★★★★</span>
                    <span className="text-xs font-bold">{selectedProduct.rating}</span>
                  </div>
                  <span className="text-[11px] text-[#7C7481]">
                    ({selectedProduct.reviewCount} notes)
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-[#4B4450] leading-relaxed font-light">
                {selectedProduct.description}
              </p>

              {/* In Stock Badge */}
              <div className="flex items-center gap-2 text-xs text-[#1E8E3E] bg-[#E8F5E9] p-2.5 rounded border border-[#C8E6C9]">
                <span className="w-2 h-2 rounded-full bg-[#1E8E3E] animate-pulse"></span>
                <span className="font-medium">
                  In Stock — Ready for International Dispatch within 24 Hours
                </span>
              </div>

              {/* Color Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase font-semibold tracking-wider text-[#1F1925]">
                    Hue: <span className="text-[#60378E]">{selectedColor.name}</span>
                  </span>
                  <span className="text-[#7C7481]">Atelier Pure Dye</span>
                </div>
                <div className="flex items-center gap-3">
                  {selectedProduct.colors.map((c, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(c)}
                      className={`w-8 h-8 rounded-full border-2 transition-transform ${
                        selectedColor.name === c.name
                          ? 'border-[#60378E] scale-110 ring-2 ring-[#E5B9FF]'
                          : 'border-white hover:scale-105'
                      }`}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                    />
                  ))}
                </div>
              </div>

              {/* Size Selector */}
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="uppercase font-semibold tracking-wider text-[#1F1925]">
                    Select Atelier Size: <span className="text-[#60378E]">{selectedSize}</span>
                  </span>
                  <button
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-[#60378E] hover:underline flex items-center gap-1 font-medium"
                  >
                    <span className="material-symbols-outlined text-[16px]">straighten</span>
                    View Size &amp; Measurement Guide
                  </button>
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {selectedProduct.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`py-2.5 text-xs font-semibold uppercase tracking-wider transition-all rounded ${
                        selectedSize === s
                          ? 'bg-[#60378E] text-white shadow'
                          : 'bg-[#FBF0FF] text-[#1F1925] hover:bg-[#F0E4F5] border border-[#E1D6E7]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
                <p className="text-[11px] text-[#7C7481] mt-2 flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px] text-[#60378E]">info</span>
                  True to size. For looser drape, our stylists recommend ordering your standard size.
                </p>
              </div>

              {/* Priority Stylist Checkout Box */}
              <div className="p-4 bg-[#F8F4FB] rounded-xl border border-[#E1D6E7] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-semibold text-[#47245F] tracking-wider">
                    Priority Stylist Checkout
                  </span>
                  <div className="flex items-center gap-1 text-[11px] text-emerald-700">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span className="font-semibold">Stylists Online Now</span>
                  </div>
                </div>

                {/* Main WhatsApp Button */}
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(inquiryMessage)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 bg-[#1E8E3E] hover:bg-[#176F31] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 rounded shadow-md transition-all active:scale-[0.99]"
                >
                  <span className="material-symbols-outlined text-[20px]">chat</span>
                  <span>Order via WhatsApp</span>
                </a>
                <p className="text-[11px] text-[#7C7481] text-center">
                  Have a question or ready to order? Chat with our styling team directly.
                </p>

                {/* Transmission Preview Box */}
                <div className="bg-white p-3.5 rounded border border-[#CDC3D2] text-xs space-y-2">
                  <div className="flex items-center justify-between text-[#60378E] text-[11px]">
                    <span className="font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">send</span>
                      Concierge Transmission Preview
                    </span>
                    <button
                      onClick={handleCopyMessage}
                      className="text-xs hover:underline flex items-center gap-1 text-[#60378E] font-medium"
                    >
                      <span className="material-symbols-outlined text-[14px]">content_copy</span>
                      {copied ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  <p className="text-[#4B4450] text-[11px] leading-relaxed italic bg-[#FBF0FF] p-2.5 rounded">
                    "{inquiryMessage}"
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-[#7C7481] pt-1">
                    <span>Direct Hotline: +1 (555) 019-2834</span>
                    <span className="text-emerald-700 font-medium">Instant Stylist Response</span>
                  </div>
                </div>

                {/* Secondary Wishlist & Share buttons */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    onClick={() => toggleWishlist(selectedProduct.id)}
                    className={`py-2 text-xs font-semibold uppercase tracking-wider border rounded flex items-center justify-center gap-1.5 transition-colors ${
                      wishlisted
                        ? 'bg-[#FBF0FF] text-[#60378E] border-[#60378E]'
                        : 'bg-white text-[#4B4450] border-[#E1D6E7] hover:border-[#60378E]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {wishlisted ? 'favorite' : 'favorite_border'}
                    </span>
                    <span>{wishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}</span>
                  </button>
                  <button
                    onClick={handleShareLook}
                    className="py-2 text-xs font-semibold uppercase tracking-wider bg-white text-[#4B4450] border border-[#E1D6E7] hover:border-[#60378E] rounded flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span className="material-symbols-outlined text-[16px]">share</span>
                    <span>Share Look</span>
                  </button>
                </div>
              </div>

              {/* Expandable Accordions */}
              <div className="border-t border-[#F0E4F5] pt-2 divide-y divide-[#F0E4F5]">
                {/* Accordion 1 */}
                <div>
                  <button
                    onClick={() => setOpenMaterial(!openMaterial)}
                    className="w-full py-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1F1925] hover:text-[#60378E]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#60378E]">styler</span>
                      Material &amp; Care Details
                    </span>
                    <span className="text-sm">{openMaterial ? '−' : '+'}</span>
                  </button>
                  {openMaterial && (
                    <div className="pb-3 text-xs text-[#4B4450] leading-relaxed space-y-1">
                      <p>• {selectedProduct.fabric}</p>
                      <p>• Dry clean gently or hand wash in cold water with silk detergent.</p>
                      <p>• Steam iron on lowest silk setting. Do not bleach or tumble dry.</p>
                    </div>
                  )}
                </div>

                {/* Accordion 2 */}
                <div>
                  <button
                    onClick={() => setOpenFit(!openFit)}
                    className="w-full py-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1F1925] hover:text-[#60378E]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#60378E]">accessibility_new</span>
                      Fit &amp; Model Silhouette
                    </span>
                    <span className="text-sm">{openFit ? '−' : '+'}</span>
                  </button>
                  {openFit && (
                    <div className="pb-3 text-xs text-[#4B4450] leading-relaxed space-y-1">
                      <p>• Model is 178cm / 5'10" and wears size S.</p>
                      <p>• Engineered with delicate bias draping for fluid silhouette harmonization.</p>
                      <p>• Custom bespoke length alterations available through WhatsApp styling desk.</p>
                    </div>
                  )}
                </div>

                {/* Accordion 3 */}
                <div>
                  <button
                    onClick={() => setOpenConcierge(!openConcierge)}
                    className="w-full py-3 flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-[#1F1925] hover:text-[#60378E]"
                  >
                    <span className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[18px] text-[#60378E]">public</span>
                      How WhatsApp Concierge Works
                    </span>
                    <span className="text-sm">{openConcierge ? '−' : '+'}</span>
                  </button>
                  {openConcierge && (
                    <div className="pb-3 text-xs text-[#4B4450] leading-relaxed space-y-1">
                      <p>1. Tap the Order button to connect directly with your dedicated atelier stylist.</p>
                      <p>2. Review sizing recommendations, fabric swatches, or request customized measurements.</p>
                      <p>3. Confirm your order via secure payment link and receive express worldwide courier tracking.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Atelier Vision Quote Section */}
          <div className="mt-14 bg-[#47245F] text-white p-8 md:p-12 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-[11px] uppercase tracking-[0.2em] text-[#E5B9FF] font-semibold">
                The Atelier Note
              </span>
              <h3 className="font-serif text-2xl md:text-3xl font-light italic">
                "Designed to move like liquid moonlight under evening chandeliers."
              </h3>
              <p className="text-xs text-[#EED9FF] leading-relaxed font-light">
                Every dress is draped on the bias in small artisan batches, honoring feminine contours with zero restriction and pure tactile comfort.
              </p>
            </div>
            <button
              onClick={() => setIsVirtualFittingOpen(true)}
              className="px-6 py-3 bg-white text-[#47245F] hover:bg-[#F6EAFB] text-xs font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap shrink-0 flex items-center gap-2 shadow"
            >
              <span className="material-symbols-outlined text-[18px]">videocam</span>
              Book Virtual Fitting
            </button>
          </div>

          {/* You May Also Like */}
          <div className="mt-16">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#60378E] block">
                  Curated Pairings
                </span>
                <h3 className="font-serif text-2xl text-[#1F1925]">You May Also Like</h3>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <div
                  key={p.id}
                  onClick={() => {
                    setSelectedProduct(p);
                    setSelectedImageIndex(0);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="group cursor-pointer flex flex-col items-center text-center"
                >
                  <div className="w-full aspect-[3/4] rounded-full overflow-hidden bg-[#F6EAFB] shadow-sm group-hover:shadow-md transition-shadow">
                    <img
                      src={p.imageUrl}
                      alt={p.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <span className="text-[10px] uppercase tracking-wider text-[#7C7481] mt-3">
                    {p.category}
                  </span>
                  <h4 className="font-serif text-sm text-[#1F1925] group-hover:text-[#60378E] font-medium transition-colors">
                    {p.title}
                  </h4>
                  <span className="text-xs font-semibold text-[#1F1925] mt-0.5">
                    ${p.price} USD
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
