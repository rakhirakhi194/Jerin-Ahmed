import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const VirtualFittingModal: React.FC = () => {
  const { isVirtualFittingOpen, setIsVirtualFittingOpen, selectedProduct } = useStore();
  const [height, setHeight] = useState('5\'7" (170cm)');
  const [occasion, setOccasion] = useState('Evening Gala');
  const [fitPreference, setFitPreference] = useState<'Body-skimming' | 'Relaxed fluid' | 'Structured corset'>('Body-skimming');

  if (!isVirtualFittingOpen) return null;

  const consultationMessage = encodeURIComponent(
    `Hello Violet Muse Atelier! I am requesting a Virtual Fitting Consultation for ${selectedProduct?.title || 'an evening gown'}. My height is ${height}, attending a ${occasion}, and I prefer a ${fitPreference} fit. Could you advise on sizing and drape?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white max-w-lg w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#CDC3D2]/50 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsVirtualFittingOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full text-[#7C7481] hover:text-[#1F1925] hover:bg-[#FAF7FC]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#60378E]">
            Bespoke Styling Service
          </span>
          <h3 className="font-serif text-2xl text-[#1F1925] mt-1">
            Virtual Fitting Advisor
          </h3>
          <p className="text-xs text-[#7C7481]">
            Share your profile for tailored silhouette advice with our head atelier stylist.
          </p>
        </div>

        {selectedProduct && (
          <div className="p-3 bg-[#FAF7FC] rounded-2xl border border-[#CDC3D2]/40 flex items-center gap-3 mb-5">
            <img
              src={selectedProduct.imageUrl}
              alt={selectedProduct.title}
              className="w-12 h-14 object-cover rounded-xl bg-[#F6EAFB]"
            />
            <div>
              <div className="text-xs font-semibold text-[#1F1925]">{selectedProduct.title}</div>
              <div className="text-[11px] text-[#60378E]">${selectedProduct.price} USD • {selectedProduct.category}</div>
            </div>
          </div>
        )}

        <div className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
              Your Height & Heel Height
            </label>
            <input
              type="text"
              value={height}
              onChange={(e) => setHeight(e.target.value)}
              placeholder="e.g. 5'6&quot; with 3&quot; stilettos"
              className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
              Occasion & Venue Setting
            </label>
            <input
              type="text"
              value={occasion}
              onChange={(e) => setOccasion(e.target.value)}
              placeholder="e.g. Black Tie Opera / Beachfront Sunset Soirée"
              className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
            />
          </div>

          <div>
            <label className="block font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
              Desired Silhouette Feel
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['Body-skimming', 'Relaxed fluid', 'Structured corset'] as const).map((pref) => (
                <button
                  key={pref}
                  type="button"
                  onClick={() => setFitPreference(pref)}
                  className={`p-2.5 rounded-xl border text-[11px] font-medium transition-all cursor-pointer text-center ${
                    fitPreference === pref
                      ? 'bg-[#60378E] text-white border-[#60378E]'
                      : 'bg-[#FAF7FC] text-[#4B4450] border-[#CDC3D2]'
                  }`}
                >
                  {pref}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-[#CDC3D2]/40">
          <a
            href={`https://wa.me/?text=${consultationMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsVirtualFittingOpen(false)}
            className="w-full py-3.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-full shadow-md flex items-center justify-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Send Details to WhatsApp Stylist</span>
          </a>
        </div>

      </div>
    </div>
  );
};
