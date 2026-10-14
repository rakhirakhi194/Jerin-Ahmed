import React from 'react';
import { Product } from '../data/products';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  variant?: 'oval' | 'arch' | 'standard';
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'oval' }) => {
  const { setSelectedProduct, toggleWishlist, isInWishlist } = useStore();
  const wishlisted = isInWishlist(product.id);

  const getWaMessage = () => {
    return encodeURIComponent(
      `Hello Violet Muse Atelier! I am inquiring about the ${product.title} ($${product.price} USD, SKU: ${product.sku}). Please confirm size availability.`
    );
  };

  return (
    <div className="group flex flex-col">
      {/* Visual Frame */}
      <div
        className={`relative w-full aspect-[3/4] overflow-hidden bg-[#F6EAFB] transition-all duration-500 group-hover:shadow-lg cursor-pointer ${
          variant === 'oval'
            ? 'rounded-full'
            : variant === 'arch'
            ? 'rounded-[160px]'
            : 'rounded-[180px]'
        }`}
        onClick={() => setSelectedProduct(product)}
      >
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
        />

        {/* Badge */}
        {product.badge && (
          <span
            className={`absolute top-6 left-1/2 -translate-x-1/2 z-10 px-3.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-full shadow-sm ${
              product.badge === 'Bestseller'
                ? 'bg-[#60378E] text-white'
                : product.badge === 'New'
                ? 'bg-[#7950A8] text-white'
                : 'bg-[#744F8D] text-white'
            }`}
          >
            {product.badge}
          </span>
        )}

        {/* Wishlist Button */}
        <button
          aria-label="Add to Wishlist"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-6 right-8 z-10 w-9 h-9 rounded-full bg-white/90 backdrop-blur text-[#4B4450] hover:text-[#BA1A1A] flex items-center justify-center transition-colors shadow-sm"
        >
          <span
            className={`material-symbols-outlined text-[18px] transition-colors ${
              wishlisted ? 'text-[#BA1A1A] font-fill' : ''
            }`}
            style={{ fontVariationSettings: wishlisted ? "'FILL' 1" : "'FILL' 0" }}
          >
            favorite
          </span>
        </button>

        {/* WhatsApp Order CTA button on card */}
        <a
          href={`https://wa.me/?text=${getWaMessage()}`}
          target="_blank"
          rel="noopener noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="absolute bottom-6 inset-x-8 py-2.5 bg-white/95 backdrop-blur text-[#60378E] text-center text-xs uppercase tracking-wider font-semibold rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 hover:bg-[#60378E] hover:text-white"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span>Order via WhatsApp</span>
        </a>
      </div>

      {/* Metadata & Title */}
      <div className="pt-5 flex items-start justify-between cursor-pointer" onClick={() => setSelectedProduct(product)}>
        <div>
          <h3 className="font-serif text-lg text-[#1F1925] group-hover:text-[#60378E] transition-colors leading-snug">
            {product.title}
          </h3>

          {/* Color swatches */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2">
              {product.colors.map((c, i) => (
                <span
                  key={i}
                  title={c.name}
                  className="w-3.5 h-3.5 rounded-full ring-1 ring-[#CDC3D2] border border-white"
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price */}
        <div className="text-right">
          <span className="font-serif text-lg text-[#1F1925] font-semibold block">
            ${product.price} USD
          </span>
          {product.originalPrice && (
            <span className="text-xs text-[#7C7481] line-through block">
              ${product.originalPrice} USD
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
