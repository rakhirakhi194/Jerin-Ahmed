import React, { useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { StoreProvider, useStore } from './context/StoreContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomeView } from './components/HomeView';
import { ShopView } from './components/ShopView';
import { AdminLoginView } from './components/AdminLoginView';
import { AdminDashboardView } from './components/AdminDashboardView';
import { PDPModal } from './components/PDPModal';
import { SearchModal } from './components/SearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { VirtualFittingModal } from './components/VirtualFittingModal';
import { DeleteConfirmModal } from './components/DeleteConfirmModal';
import { Toast } from './components/Toast';

const MainContent: React.FC = () => {
  const { currentView } = useStore();

  // Scroll to top on view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF7FC] text-[#1F1925] selection:bg-[#E5B9FF] selection:text-[#1F1925]">
      {/* Top Header */}
      <Header />

      {/* Main View Router */}
      <main className="flex-1">
        {currentView === 'home' && <HomeView />}
        {(currentView === 'shop-all' ||
          currentView === 'new-arrivals' ||
          currentView === 'dresses' ||
          currentView === 'collections') && <ShopView />}
        {currentView === 'admin-login' && <AdminLoginView />}
        {(currentView === 'admin-dashboard' ||
          currentView === 'admin-add-product' ||
          currentView === 'admin-products') && <AdminDashboardView />}
      </main>

      {/* Global Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <PDPModal />
      <SearchModal />
      <WishlistDrawer />
      <SizeGuideModal />
      <VirtualFittingModal />
      <DeleteConfirmModal />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <StoreProvider>
        <MainContent />
      </StoreProvider>
    </AuthProvider>
  );
}
