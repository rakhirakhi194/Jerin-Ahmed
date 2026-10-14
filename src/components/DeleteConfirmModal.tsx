import React from 'react';
import { useStore } from '../context/StoreContext';

export const DeleteConfirmModal: React.FC = () => {
  const { productToDelete, setProductToDelete, deleteProduct } = useStore();

  if (!productToDelete) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white max-w-md w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#CDC3D2]/50 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Warning Icon */}
        <div className="w-14 h-14 rounded-full bg-[#FFEDEA] text-[#BA1A1A] flex items-center justify-center mx-auto mb-4 border border-[#BA1A1A]/20">
          <span className="material-symbols-outlined text-[28px]">delete_forever</span>
        </div>

        <div className="text-center mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#BA1A1A] block mb-1">
            Permanent Action
          </span>
          <h3 className="font-serif text-2xl text-[#1F1925]">
            Delete Garment?
          </h3>
          <p className="text-xs text-[#4B4450] font-light mt-2 leading-relaxed">
            Are you sure you want to permanently remove{' '}
            <strong className="text-[#1F1925] font-semibold">"{productToDelete.title}"</strong> (SKU: {productToDelete.sku}) from the atelier catalog?
          </p>
        </div>

        {/* Garment Preview Card */}
        <div className="flex items-center gap-3 p-3 bg-[#FAF7FC] rounded-2xl border border-[#CDC3D2]/40 mb-6">
          <img
            src={productToDelete.imageUrl}
            alt={productToDelete.title}
            className="w-12 h-14 object-cover rounded-xl bg-[#F6EAFB]"
          />
          <div className="text-left text-xs">
            <div className="font-medium text-[#1F1925]">{productToDelete.title}</div>
            <div className="text-[11px] text-[#7C7481]">{productToDelete.category} • ${productToDelete.price} USD</div>
            <div className="text-[10px] text-[#BA1A1A] mt-0.5">{productToDelete.stockCount} units remaining in stock</div>
          </div>
        </div>

        {/* Buttons */}
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setProductToDelete(null)}
            className="py-3 px-4 bg-[#FAF7FC] hover:bg-[#CDC3D2]/30 text-[#4B4450] text-xs font-semibold uppercase tracking-wider rounded-full transition-colors cursor-pointer"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => deleteProduct(productToDelete.id)}
            className="py-3 px-4 bg-[#BA1A1A] hover:bg-[#93000A] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md transition-all cursor-pointer"
          >
            Confirm Delete
          </button>
        </div>

      </div>
    </div>
  );
};
