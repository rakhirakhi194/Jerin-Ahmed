import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';

export const SizeGuideModal: React.FC = () => {
  const { isSizeGuideOpen, setIsSizeGuideOpen } = useStore();
  const [unit, setUnit] = useState<'in' | 'cm'>('in');

  if (!isSizeGuideOpen) return null;

  const sizeChartInches = [
    { size: 'XS', us: '0 - 2', uk: '4 - 6', bust: '31 - 32', waist: '24 - 25', hip: '34 - 35', length: '58' },
    { size: 'S', us: '4 - 6', uk: '8 - 10', bust: '33 - 34', waist: '26 - 27', hip: '36 - 37', length: '58.5' },
    { size: 'M', us: '8 - 10', uk: '12 - 14', bust: '35 - 36', waist: '28 - 29', hip: '38 - 39', length: '59' },
    { size: 'L', us: '12 - 14', uk: '16 - 18', bust: '37 - 39', waist: '30 - 32', hip: '40 - 42', length: '59.5' },
    { size: 'XL', us: '16', uk: '20', bust: '40 - 42', waist: '33 - 35', hip: '43 - 45', length: '60' },
  ];

  const sizeChartCm = [
    { size: 'XS', us: '0 - 2', uk: '4 - 6', bust: '79 - 82', waist: '61 - 64', hip: '86 - 89', length: '147' },
    { size: 'S', us: '4 - 6', uk: '8 - 10', bust: '84 - 87', waist: '66 - 69', hip: '91 - 94', length: '148' },
    { size: 'M', us: '8 - 10', uk: '12 - 14', bust: '89 - 92', waist: '71 - 74', hip: '96 - 99', length: '150' },
    { size: 'L', us: '12 - 14', uk: '16 - 18', bust: '94 - 99', waist: '76 - 81', hip: '101 - 107', length: '151' },
    { size: 'XL', us: '16', uk: '20', bust: '102 - 107', waist: '84 - 89', hip: '109 - 114', length: '152' },
  ];

  const activeChart = unit === 'in' ? sizeChartInches : sizeChartCm;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white max-w-2xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#CDC3D2]/50 relative">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSizeGuideOpen(false)}
          className="absolute top-6 right-6 p-2 rounded-full text-[#7C7481] hover:text-[#1F1925] hover:bg-[#FAF7FC]"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="mb-6">
          <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#60378E]">
            Atelier Measurements
          </span>
          <h3 className="font-serif text-2xl text-[#1F1925] mt-1">
            Size & Silhouette Guide
          </h3>
          <p className="text-xs text-[#7C7481]">
            Our gowns are designed for modern couture drape with bias-cut flexibility.
          </p>
        </div>

        {/* Unit Toggle */}
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#CDC3D2]/40">
          <span className="text-xs text-[#4B4450]">Select preferred measurement unit:</span>
          <div className="flex bg-[#FAF7FC] rounded-full p-1 border border-[#CDC3D2]">
            <button
              onClick={() => setUnit('in')}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                unit === 'in' ? 'bg-[#60378E] text-white' : 'text-[#7C7481]'
              }`}
            >
              Inches (in)
            </button>
            <button
              onClick={() => setUnit('cm')}
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                unit === 'cm' ? 'bg-[#60378E] text-white' : 'text-[#7C7481]'
              }`}
            >
              Centimeters (cm)
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#1F1925]">
            <thead className="bg-[#FAF7FC] text-[#7C7481] uppercase font-semibold">
              <tr>
                <th className="py-2.5 px-3">Size</th>
                <th className="py-2.5 px-3">US / UK</th>
                <th className="py-2.5 px-3">Bust</th>
                <th className="py-2.5 px-3">Waist</th>
                <th className="py-2.5 px-3">Hips</th>
                <th className="py-2.5 px-3">Dress Length</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#CDC3D2]/30">
              {activeChart.map((row) => (
                <tr key={row.size} className="hover:bg-[#FAF7FC]">
                  <td className="py-2.5 px-3 font-semibold text-[#60378E]">{row.size}</td>
                  <td className="py-2.5 px-3">{row.us} ({row.uk})</td>
                  <td className="py-2.5 px-3">{row.bust} {unit}</td>
                  <td className="py-2.5 px-3">{row.waist} {unit}</td>
                  <td className="py-2.5 px-3">{row.hip} {unit}</td>
                  <td className="py-2.5 px-3">{row.length} {unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 pt-4 border-t border-[#CDC3D2]/40 text-center">
          <p className="text-xs text-[#7C7481] mb-3">
            In between sizes? Our WhatsApp tailors provide custom proportion adjustments prior to shipment.
          </p>
          <a
            href="https://wa.me/?text=Hello%20Violet%20Muse!%20I%20would%20like%20custom%20size%20recommendations."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#F6EAFB] text-[#60378E] hover:bg-[#60378E] hover:text-white rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
          >
            <span className="material-symbols-outlined text-[16px]">straighten</span>
            <span>Consult Tailor on WhatsApp</span>
          </a>
        </div>

      </div>
    </div>
  );
};
