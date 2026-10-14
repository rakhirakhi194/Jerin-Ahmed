import React, { useState, useEffect } from 'react';
import { useStore } from '../context/StoreContext';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, products, setSelectedProduct } = useStore();
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  if (!isSearchOpen) return null;

  const matches = query.trim()
    ? products.filter((p) => {
        const q = query.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q)
        );
      })
    : [];

  const quickPicks = ['Lavender Evening', 'Silk Satin', 'Floral Midi', 'Occasionwear', 'Party Mini'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-2xl border border-[#CDC3D2]/50 p-6 overflow-hidden">
        
        {/* Search Input Bar */}
        <div className="relative flex items-center border-b border-[#CDC3D2]/50 pb-4">
          <span className="material-symbols-outlined text-[24px] text-[#60378E] mr-3">
            search
          </span>
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search silhouettes, fabrics, colors, or SKU..."
            className="w-full text-base sm:text-lg text-[#1F1925] placeholder-[#7C7481] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-[#7C7481] hover:text-[#1F1925]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-3 px-3 py-1 rounded-full text-xs font-semibold text-[#7C7481] hover:text-[#1F1925] bg-[#FAF7FC]"
          >
            ESC
          </button>
        </div>

        {/* Quick Picks */}
        {!query && (
          <div className="pt-5 pb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C7481] block mb-2.5">
              Suggested Silhouettes
            </span>
            <div className="flex flex-wrap gap-2">
              {quickPicks.map((pick) => (
                <button
                  key={pick}
                  onClick={() => setQuery(pick)}
                  className="px-3.5 py-1.5 rounded-full bg-[#FAF7FC] hover:bg-[#F6EAFB] border border-[#CDC3D2]/60 text-xs text-[#4B4450] hover:text-[#60378E] transition-colors cursor-pointer"
                >
                  {pick}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {query && (
          <div className="pt-4 max-h-[60vh] overflow-y-auto divide-y divide-[#CDC3D2]/30">
            {matches.length === 0 ? (
              <div className="py-8 text-center text-xs text-[#7C7481]">
                No dresses match "{query}". Try checking the spelling or search by category.
              </div>
            ) : (
              matches.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    setSelectedProduct(product);
                    setIsSearchOpen(false);
                  }}
                  className="py-3 px-2 flex items-center justify-between hover:bg-[#FAF7FC] rounded-2xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-12 h-14 object-cover rounded-xl bg-[#F6EAFB]"
                    />
                    <div>
                      <h4 className="font-serif text-sm font-medium text-[#1F1925] hover:text-[#60378E]">
                        {product.title}
                      </h4>
                      <p className="text-[11px] text-[#7C7481]">
                        {product.category} • SKU: {product.sku}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-serif text-sm font-semibold text-[#1F1925]">
                      ${product.price} USD
                    </span>
                    <span className="block text-[10px] text-emerald-600 font-medium">
                      In Stock
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};
