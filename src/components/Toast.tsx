import React from 'react';
import { useStore } from '../context/StoreContext';

export const Toast: React.FC = () => {
  const { toastMessage } = useStore();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#1F1925] text-white px-5 py-3 rounded-full shadow-2xl border border-white/20 flex items-center gap-3 text-xs tracking-wide">
        <span className="w-2 h-2 rounded-full bg-[#E5B9FF] animate-pulse"></span>
        <span>{toastMessage}</span>
      </div>
    </div>
  );
};
