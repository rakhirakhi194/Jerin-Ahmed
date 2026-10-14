import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, INITIAL_PRODUCTS } from '../data/products';

export type ViewType =
  | 'home'
  | 'shop-all'
  | 'new-arrivals'
  | 'dresses'
  | 'collections'
  | 'admin-login'
  | 'admin-dashboard'
  | 'admin-add-product'
  | 'admin-products';

interface StoreContextType {
  products: Product[];
  currentView: ViewType;
  setCurrentView: (view: ViewType) => void;
  selectedCategory: string | null;
  setSelectedCategory: (cat: string | null) => void;
  selectedProduct: Product | null;
  setSelectedProduct: (p: Product | null) => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;
  productToDelete: Product | null;
  setProductToDelete: (p: Product | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  isSizeGuideOpen: boolean;
  setIsSizeGuideOpen: (open: boolean) => void;
  isVirtualFittingOpen: boolean;
  setIsVirtualFittingOpen: (open: boolean) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  currency: string;
  setCurrency: (c: string) => void;
  exportCatalogCSV: () => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem('violet_muse_products');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('violet_muse_wishlist');
      return saved ? JSON.parse(saved) : ['lavender-evening-dress', 'floral-midi-dress'];
    } catch {
      return ['lavender-evening-dress', 'floral-midi-dress'];
    }
  });

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isVirtualFittingOpen, setIsVirtualFittingOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [currency, setCurrency] = useState('USD ($)');

  useEffect(() => {
    try {
      localStorage.setItem('violet_muse_products', JSON.stringify(products));
    } catch (e) {
      console.error(e);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('violet_muse_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error(e);
    }
  }, [wishlist]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from atelier wishlist');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to atelier wishlist');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const addProduct = (newProdData: Omit<Product, 'id'>) => {
    const id = newProdData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    const newProduct: Product = {
      ...newProdData,
      id: id || `dress-${Date.now()}`
    };
    setProducts((prev) => [newProduct, ...prev]);
    showToast(`"${newProduct.title}" successfully added to atelier catalog.`);
  };

  const deleteProduct = (id: string) => {
    const prod = products.find((p) => p.id === id);
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setProductToDelete(null);
    if (selectedProduct?.id === id) {
      setSelectedProduct(null);
    }
    showToast(`"${prod?.title || 'Garment'}" removed from active inventory.`);
  };

  const exportCatalogCSV = () => {
    const headers = ['ID', 'SKU', 'Title', 'Category', 'Price (USD)', 'Stock Count', 'Rating', 'Fabric'];
    const rows = products.map((p) => [
      p.id,
      p.sku,
      `"${p.title.replace(/"/g, '""')}"`,
      p.category,
      p.price,
      p.stockCount,
      p.rating,
      `"${p.fabric.replace(/"/g, '""')}"`
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `violet_muse_catalog_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Catalog exported as CSV.');
  };

  return (
    <StoreContext.Provider
      value={{
        products,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        selectedProduct,
        setSelectedProduct,
        wishlist,
        toggleWishlist,
        isInWishlist,
        addProduct,
        deleteProduct,
        productToDelete,
        setProductToDelete,
        isSearchOpen,
        setIsSearchOpen,
        isWishlistOpen,
        setIsWishlistOpen,
        isSizeGuideOpen,
        setIsSizeGuideOpen,
        isVirtualFittingOpen,
        setIsVirtualFittingOpen,
        toastMessage,
        showToast,
        currency,
        setCurrency,
        exportCatalogCSV
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
