import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';

export const ShopView: React.FC = () => {
  const { products, selectedCategory, setSelectedCategory, setCurrentView } = useStore();
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [maxPrice, setMaxPrice] = useState<number>(180);
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [gridColumns, setGridColumns] = useState<'3' | '4'>('4');

  const categories = ['All', 'Occasionwear', 'Everyday', 'Floral', 'Party'] as const;

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Category filter
        if (selectedCategory && selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Price filter
        if (p.price > maxPrice) {
          return false;
        }
        // In stock filter
        if (onlyInStock && !p.inStock) {
          return false;
        }
        // Search filter
        if (localSearch.trim()) {
          const q = localSearch.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchSku = p.sku.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchFabric = p.fabric.toLowerCase().includes(q);
          if (!matchTitle && !matchSku && !matchDesc && !matchFabric) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return b.id.localeCompare(a.id);
        return 0; // featured default
      });
  }, [products, selectedCategory, maxPrice, onlyInStock, localSearch, sortBy]);

  const resetFilters = () => {
    setSelectedCategory(null);
    setMaxPrice(180);
    setOnlyInStock(false);
    setLocalSearch('');
    setSortBy('featured');
  };

  const hasActiveFilters = !!selectedCategory || maxPrice < 180 || onlyInStock || !!localSearch.trim();

  return (
    <div className="bg-[#FAF7FC] min-h-screen py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb & Header */}
        <div className="border-b border-[#CDC3D2]/40 pb-8 mb-8">
          <div className="flex items-center gap-2 text-xs text-[#7C7481] uppercase tracking-wider mb-3">
            <button onClick={() => setCurrentView('home')} className="hover:text-[#60378E] cursor-pointer">
              Atelier Home
            </button>
            <span>/</span>
            <span className="text-[#1F1925] font-medium">
              {selectedCategory ? `${selectedCategory} Collection` : 'All Dresses'}
            </span>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl sm:text-4xl text-[#1F1925]">
                {selectedCategory ? `${selectedCategory} Collection` : 'Atelier Garments'}
              </h1>
              <p className="text-sm text-[#4B4450] font-light mt-1.5 max-w-xl">
                Discover bespoke silhouettes crafted in pure mulberry silk, French corded lace, and ethereal plissé textures.
              </p>
            </div>
            <div className="text-xs text-[#7C7481] uppercase tracking-widest font-medium">
              Showing {filteredProducts.length} of {products.length} Garments
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-2 mt-6">
            {categories.map((cat) => {
              const isSelected = (!selectedCategory && cat === 'All') || selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat === 'All' ? null : cat)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-[#60378E] text-white shadow-sm'
                      : 'bg-white text-[#4B4450] hover:text-[#1F1925] border border-[#CDC3D2]/60 hover:border-[#60378E]'
                  }`}
                >
                  {cat === 'All' ? 'All Silhouettes' : cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#CDC3D2]/50 mb-8 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Search within shop */}
          <div className="relative flex-1 max-w-md">
            <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#7C7481]">
              search
            </span>
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search by silhouette, fabric, or keyword..."
              className="w-full pl-10 pr-4 py-2 bg-[#FAF7FC] border border-[#CDC3D2]/60 rounded-full text-xs text-[#1F1925] placeholder-[#7C7481] focus:outline-none focus:border-[#60378E]"
            />
            {localSearch && (
              <button
                onClick={() => setLocalSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7C7481] hover:text-[#1F1925]"
              >
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}
          </div>

          {/* Sort & In-stock & Price filters */}
          <div className="flex flex-wrap items-center gap-4 text-xs">
            {/* Price slider */}
            <div className="flex items-center gap-2">
              <span className="text-[#4B4450] font-medium">Max:</span>
              <input
                type="range"
                min="40"
                max="180"
                step="5"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#60378E] cursor-pointer"
              />
              <span className="font-semibold text-[#60378E]">${maxPrice}</span>
            </div>

            {/* In stock toggle */}
            <label className="flex items-center gap-1.5 cursor-pointer text-[#4B4450]">
              <input
                type="checkbox"
                checked={onlyInStock}
                onChange={(e) => setOnlyInStock(e.target.checked)}
                className="rounded text-[#60378E] focus:ring-[#60378E]"
              />
              <span>In Stock Only</span>
            </label>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[#4B4450]">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#FAF7FC] border border-[#CDC3D2]/60 rounded-full px-3 py-1.5 text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E] cursor-pointer"
              >
                <option value="featured">Featured Curations</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
                <option value="newest">Newest Releases</option>
              </select>
            </div>

            {/* Layout switch */}
            <div className="hidden sm:flex items-center gap-1 border-l border-[#CDC3D2]/50 pl-3">
              <button
                onClick={() => setGridColumns('3')}
                title="3 Columns"
                className={`p-1.5 rounded-lg ${
                  gridColumns === '3' ? 'bg-[#F6EAFB] text-[#60378E]' : 'text-[#7C7481] hover:text-[#1F1925]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">view_column</span>
              </button>
              <button
                onClick={() => setGridColumns('4')}
                title="4 Columns"
                className={`p-1.5 rounded-lg ${
                  gridColumns === '4' ? 'bg-[#F6EAFB] text-[#60378E]' : 'text-[#7C7481] hover:text-[#1F1925]'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">grid_view</span>
              </button>
            </div>

            {hasActiveFilters && (
              <button
                onClick={resetFilters}
                className="text-xs text-[#BA1A1A] hover:underline font-medium cursor-pointer ml-auto sm:ml-0"
              >
                Reset Filters
              </button>
            )}
          </div>
        </div>

        {/* Product Grid or Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-[#CDC3D2]/40 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[#F6EAFB] text-[#60378E] flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-[28px]">search_off</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1F1925] mb-2">No Silhouettes Match</h3>
            <p className="text-sm text-[#4B4450] font-light mb-6">
              We couldn't find any dresses matching your current filter criteria. Try adjusting your price range or search terms.
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-2.5 bg-[#60378E] text-white rounded-full text-xs font-semibold tracking-wider uppercase"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 ${
              gridColumns === '3' ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
            } gap-8 sm:gap-10`}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} variant="oval" />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
