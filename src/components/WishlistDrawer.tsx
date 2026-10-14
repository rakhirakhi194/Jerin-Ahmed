import React from 'react';
import { useStore } from '../context/StoreContext';

export const WishlistDrawer: React.FC = () => {
  const {
    isWishlistOpen,
    setIsWishlistOpen,
    wishlist,
    products,
    toggleWishlist,
    setSelectedProduct
  } = useStore();

  if (!isWishlistOpen) return null;

  const wishlistedProducts = products.filter((p) => wishlist.includes(p.id));
  const totalPrice = wishlistedProducts.reduce((sum, p) => sum + p.price, 0);

  const getMultiItemWaUrl = () => {
    const titles = wishlistedProducts.map((p) => `• ${p.title} ($${p.price} USD)`).join('\n');
    const msg = encodeURIComponent(
      `Hello Violet Muse Atelier! I would like to consult on my saved wishlist items:\n\n${titles}\n\nTotal Estimated: $${totalPrice} USD. Please advise on custom fitting and dispatch dates.`
    );
    return `https://wa.me/?text=${msg}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-sm flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between">
        
        {/* Drawer Header */}
        <div className="p-6 border-b border-[#CDC3D2]/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[22px] text-[#60378E]">
              favorite
            </span>
            <h2 className="font-serif text-xl text-[#1F1925]">
              Atelier Wishlist ({wishlistedProducts.length})
            </h2>
          </div>
          <button
            onClick={() => setIsWishlistOpen(false)}
            className="p-2 rounded-full text-[#7C7481] hover:text-[#1F1925] hover:bg-[#FAF7FC]"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Wishlist Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 divide-y divide-[#CDC3D2]/30">
          {wishlistedProducts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-[#F6EAFB] text-[#60378E] flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[28px]">favorite_border</span>
              </div>
              <h3 className="font-serif text-lg text-[#1F1925] mb-1">Your Wishlist is Empty</h3>
              <p className="text-xs text-[#7C7481] max-w-xs mx-auto">
                Explore our curated silhouettes and tap the heart icon to save gowns for your upcoming engagements.
              </p>
            </div>
          ) : (
            wishlistedProducts.map((product) => (
              <div key={product.id} className="pt-4 first:pt-0 flex items-center justify-between gap-3">
                <div
                  className="flex items-center gap-3 cursor-pointer group"
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsWishlistOpen(false);
                  }}
                >
                  <img
                    src={product.imageUrl}
                    alt={product.title}
                    className="w-14 h-18 object-cover rounded-xl bg-[#F6EAFB] border border-[#CDC3D2]/40"
                  />
                  <div>
                    <h4 className="font-serif text-sm font-medium text-[#1F1925] group-hover:text-[#60378E] transition-colors leading-snug">
                      {product.title}
                    </h4>
                    <p className="text-xs font-semibold text-[#60378E] mt-0.5">
                      ${product.price} USD
                    </p>
                    <span className="text-[10px] text-[#7C7481] uppercase tracking-wider">
                      {product.category}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => toggleWishlist(product.id)}
                  title="Remove from wishlist"
                  className="p-2 text-[#7C7481] hover:text-[#BA1A1A] transition-colors"
                >
                  <span className="material-symbols-outlined text-[18px]">delete</span>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer with WhatsApp Multi-item Checkout */}
        {wishlistedProducts.length > 0 && (
          <div className="p-6 border-t border-[#CDC3D2]/40 bg-[#FAF7FC] space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-[#7C7481] uppercase tracking-wider font-semibold">Total Estimated</span>
              <span className="font-serif text-lg font-semibold text-[#1F1925]">${totalPrice} USD</span>
            </div>

            <a
              href={getMultiItemWaUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-full shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Consult Concierge with All Saved</span>
            </a>

            <p className="text-[10px] text-center text-[#7C7481]">
              Live fitting advisor will verify availability for all selected silhouettes.
            </p>
          </div>
        )}

      </div>
    </div>
  );
};
