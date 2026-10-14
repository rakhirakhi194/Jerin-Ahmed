import React, { useState, useMemo } from 'react';
import { useAuth } from '../context/AuthContext';
import { useStore } from '../context/StoreContext';
import { Product } from '../data/products';

export const AdminDashboardView: React.FC = () => {
  const { user, isAdmin, logout, loginAsAdminDirect } = useAuth();
  const {
    products,
    addProduct,
    deleteProduct,
    setProductToDelete,
    setCurrentView,
    setSelectedProduct,
    exportCatalogCSV,
    showToast
  } = useStore();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<'All' | 'Occasionwear' | 'Everyday' | 'Floral' | 'Party'>('All');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Product Form State
  const [newTitle, setNewTitle] = useState('');
  const [newSku, setNewSku] = useState('');
  const [newCategory, setNewCategory] = useState<'Occasionwear' | 'Everyday' | 'Floral' | 'Party'>('Occasionwear');
  const [newPrice, setNewPrice] = useState<number>(89);
  const [newOriginalPrice, setNewOriginalPrice] = useState<number>(120);
  const [newStock, setNewStock] = useState<number>(12);
  const [newFabric, setNewFabric] = useState('100% Mulberry Silk Satin');
  const [newDescription, setNewDescription] = useState('An ethereal silhouette tailored with bias-cut fluidity and delicate artisan finishing.');
  const [newImageUrl, setNewImageUrl] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuB0krDZxU0HVzXoVwtOTRKnKoAEni-Rs7SMdbcwgsnaGBm87vuTHWgHTZK9wA0sJKkJIYvf2pCmxUH-RgcxvJ1B4WnwOuoWgo5jyUeWcCW8SaHiXLvv-tFIz98WTb4SiLPzUkxOyTi2GG45VRxwPLhjyXFxVQfmuZEp5MAyq83IxqhuTGcsEi3Vah86aHDzYfbvvQixaGNTeHGROUgq0W_u5vG6yVCshHsZZpAPVIR1Yoqh7GEkJ9Up');
  const [newBadge, setNewBadge] = useState<Product['badge']>('New');
  const [selectedSizes, setSelectedSizes] = useState<('XS' | 'S' | 'M' | 'L' | 'XL')[]>(['XS', 'S', 'M', 'L']);

  // PRESET LUXURY IMAGES TO EASILY SELECT
  const PRESET_IMAGES = [
    {
      name: 'Mulberry Lavender',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0krDZxU0HVzXoVwtOTRKnKoAEni-Rs7SMdbcwgsnaGBm87vuTHWgHTZK9wA0sJKkJIYvf2pCmxUH-RgcxvJ1B4WnwOuoWgo5jyUeWcCW8SaHiXLvv-tFIz98WTb4SiLPzUkxOyTi2GG45VRxwPLhjyXFxVQfmuZEp5MAyq83IxqhuTGcsEi3Vah86aHDzYfbvvQixaGNTeHGROUgq0W_u5vG6yVCshHsZZpAPVIR1Yoqh7GEkJ9Up'
    },
    {
      name: 'Petal Rosé',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqnBELiYV5tNHJZZhNCfgtAsk_YJvODlMpIEzQm1-8ijaANNlQ7fPl-Wb_ZXJe9dn5FMPi4Fahchvlq4PxKA3_gCuY9MPb6SP1OVerUEacz-3py7mtazYN64JoyNa3IuiwPn7S64aV-f6K6zdfIMph5jScE4B2_Qeox4hvW2wbDKdRP0hxnzEnnLhhMf4rxdnGuGSAdkkhHF2OeuX0qE7OH6SrDiqjiQB0wJksI1MdLXHinyo2JzfR'
    },
    {
      name: 'Plum Noir Slip',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA_LupJXH_hZ008HY_Ni8O5zaoofh3dX0BFaxqXQoU0SZxMm1-tFCc0qIlVUamZDcProaINW4G1XNy44ptpC4qC0PCmaI4tEexpPnu6Euc-0gMvzrfLLgz7Rd6uz0M5xuXplZ5kLcflpnTt1q9qQQeYKoXsXR_Os56i3J4aq3qoCTLdHxvyQpTD_GMd_J95HBPfyWL4uEZiCrK6vKFw8PqWCiFnBeBfha6_telFNahqxX6k9sy0FKGp'
    },
    {
      name: 'Golden Orchid',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBOj-kXZ_8m3VpU8nlqSEska9k3iCrL_BKnyh9a19aGoLeZx3F91qm288KhCP-mrBorDgZMgP0dTSamZ6I8T1LC97lO89leiPwSujsKK6of_tkitvuyIQPxNi9NnIpSOxTqQ8TJ4zO9l686QCRr3t9trRMOcp4gsyY2opFz47RRmEtO336hm1eF4Hjqw1kmqCyxxn5gbN_JwyRdWIKOgPw_OkVJDJzYNHBYxc4HoAZCP2AwpE81DAXL'
    }
  ];

  // 1. SECURITY RESTRICTION: NORMAL USERS & GUESTS CANNOT VIEW DASHBOARD
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] bg-[#FAF7FC] flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl border border-[#CDC3D2]/60 text-center relative overflow-hidden">
          <div className="w-16 h-16 rounded-full bg-[#FFEDEA] text-[#BA1A1A] flex items-center justify-center mx-auto mb-4 border border-[#BA1A1A]/20">
            <span className="material-symbols-outlined text-[32px]">shield_lock</span>
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#BA1A1A] block mb-1">
            Access Restricted
          </span>
          <h2 className="font-serif text-2xl text-[#1F1925] mb-2">
            Atelier Portal Locked
          </h2>

          <p className="text-sm text-[#4B4450] font-light leading-relaxed mb-6">
            {user ? (
              <>
                You are currently signed in as <span className="font-medium text-[#1F1925]">{user.name}</span> ({user.role}).
                The Atelier Director Dashboard is strictly reserved for verified administrators and master tailors.
              </>
            ) : (
              <>
                Unauthenticated session detected. The Violet Muse Director Dashboard is restricted to staff members.
              </>
            )}
          </p>

          <div className="space-y-3">
            <button
              onClick={() => setCurrentView('admin-login')}
              className="w-full py-3 bg-[#60378E] hover:bg-[#4C2479] text-white text-xs font-semibold uppercase tracking-[0.16em] rounded-full shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">lock_open</span>
              <span>Log In as Atelier Director</span>
            </button>

            <button
              onClick={() => {
                loginAsAdminDirect();
                showToast('Switched to Elena Vance (Atelier Director)');
              }}
              className="w-full py-3 bg-[#F6EAFB] hover:bg-[#E5B9FF]/50 text-[#60378E] border border-[#7950A8]/30 text-xs font-semibold uppercase tracking-[0.14em] rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>👑 Instant Admin Bypass (Review Mode)</span>
            </button>

            <button
              onClick={() => setCurrentView('home')}
              className="w-full py-2.5 text-xs text-[#7C7481] hover:text-[#1F1925] transition-colors cursor-pointer"
            >
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 2. ADMIN IS AUTHENTICATED -> DISPLAY FULL ATELIER DASHBOARD
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (categoryFilter !== 'All' && p.category !== categoryFilter) return false;
      if (searchTerm.trim()) {
        const q = searchTerm.toLowerCase();
        return (
          p.title.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.fabric.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [products, categoryFilter, searchTerm]);

  // Metrics
  const totalGarments = products.length;
  const inStockCount = products.filter((p) => p.inStock && p.stockCount > 0).length;
  const lowStockCount = products.filter((p) => p.stockCount < 5).length;
  const totalValue = products.reduce((sum, p) => sum + p.price * p.stockCount, 0);

  // Category breakdowns
  const categoryCounts = {
    Occasionwear: products.filter((p) => p.category === 'Occasionwear').length,
    Floral: products.filter((p) => p.category === 'Floral').length,
    Everyday: products.filter((p) => p.category === 'Everyday').length,
    Party: products.filter((p) => p.category === 'Party').length
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const sku = newSku.trim() || `VM-${newCategory.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`;

    addProduct({
      sku,
      title: newTitle.trim(),
      category: newCategory,
      price: Number(newPrice) || 89,
      originalPrice: newOriginalPrice ? Number(newOriginalPrice) : undefined,
      rating: 5.0,
      reviewCount: 1,
      badge: newBadge,
      imageUrl: newImageUrl,
      additionalImages: [newImageUrl],
      colors: [
        { name: 'Classic Violet', hex: '#60378E' },
        { name: 'Soft Lilac', hex: '#E5B9FF' }
      ],
      sizes: selectedSizes.length > 0 ? selectedSizes : ['XS', 'S', 'M', 'L'],
      description: newDescription,
      fabric: newFabric,
      inStock: newStock > 0,
      stockCount: Number(newStock) || 0,
      dateAdded: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    });

    setIsAddModalOpen(false);
    // Reset inputs
    setNewTitle('');
    setNewSku('');
  };

  const toggleSizeSelection = (size: 'XS' | 'S' | 'M' | 'L' | 'XL') => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  return (
    <div className="bg-[#FAF7FC] min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Top Atelier Bar */}
        <div className="bg-white p-6 rounded-3xl border border-[#CDC3D2]/50 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#60378E]">
                Director Session • Verified
              </span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl text-[#1F1925] mt-1">
              Atelier Inventory & Catalog
            </h1>
            <p className="text-xs text-[#7C7481]">
              Manage live storefront dresses, stock levels, pricing, and bespoke inquiries.
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setCurrentView('home')}
              className="px-4 py-2 bg-[#F6EAFB] hover:bg-[#E5B9FF]/50 text-[#60378E] text-xs font-semibold rounded-full border border-[#7950A8]/30 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Storefront View</span>
            </button>

            <button
              onClick={exportCatalogCSV}
              className="px-4 py-2 bg-white hover:bg-[#FAF7FC] text-[#4B4450] text-xs font-semibold rounded-full border border-[#CDC3D2] transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">download</span>
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-5 py-2 bg-[#60378E] hover:bg-[#4C2479] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">add</span>
              <span>+ Add Garment</span>
            </button>

            <button
              onClick={() => {
                logout();
                setCurrentView('home');
              }}
              title="Sign Out"
              className="p-2 text-[#7C7481] hover:text-[#BA1A1A] transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">logout</span>
            </button>
          </div>
        </div>

        {/* Metric KPI Cards (Image 15) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Card 1: Total Inventory */}
          <div className="bg-white p-5 rounded-2xl border border-[#CDC3D2]/50 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C7481] block">
                Total Garments
              </span>
              <div className="font-serif text-3xl text-[#1F1925] mt-1 font-semibold">
                {totalGarments}
              </div>
              <div className="text-[11px] text-emerald-600 mt-1 flex items-center gap-1 font-medium">
                <span className="material-symbols-outlined text-[14px]">trending_up</span>
                <span>Active editorial catalog</span>
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F6EAFB] text-[#60378E] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">checkroom</span>
            </div>
          </div>

          {/* Card 2: Live In-Stock */}
          <div className="bg-white p-5 rounded-2xl border border-[#CDC3D2]/50 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C7481] block">
                Live In-Stock
              </span>
              <div className="font-serif text-3xl text-[#60378E] mt-1 font-semibold">
                {inStockCount}
              </div>
              <div className="text-[11px] text-[#7C7481] mt-1">
                Available for instant dispatch
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">inventory_2</span>
            </div>
          </div>

          {/* Card 3: Low Stock Warning */}
          <div className="bg-white p-5 rounded-2xl border border-[#CDC3D2]/50 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C7481] block">
                Stock Attention
              </span>
              <div className="font-serif text-3xl text-[#BA1A1A] mt-1 font-semibold">
                {lowStockCount}
              </div>
              <div className="text-[11px] text-[#BA1A1A] mt-1 font-medium">
                Garments with &lt; 5 units
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-red-50 text-[#BA1A1A] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">notification_important</span>
            </div>
          </div>

          {/* Card 4: Inventory Valuation */}
          <div className="bg-white p-5 rounded-2xl border border-[#CDC3D2]/50 shadow-sm flex items-start justify-between">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#7C7481] block">
                Atelier Value
              </span>
              <div className="font-serif text-3xl text-[#1F1925] mt-1 font-semibold">
                ${totalValue.toLocaleString()}
              </div>
              <div className="text-[11px] text-[#7C7481] mt-1">
                Gross stock value (USD)
              </div>
            </div>
            <div className="w-10 h-10 rounded-xl bg-[#F6EAFB] text-[#60378E] flex items-center justify-center">
              <span className="material-symbols-outlined text-[20px]">payments</span>
            </div>
          </div>
        </div>

        {/* Category Distribution Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-[#CDC3D2]/50 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-lg text-[#1F1925]">Collection Breakdown</h3>
            <span className="text-xs text-[#7C7481]">Curated across 4 couture pillars</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {Object.entries(categoryCounts).map(([cat, count]) => {
              const pct = Math.round((count / totalGarments) * 100);
              return (
                <div key={cat} className="p-3.5 rounded-xl bg-[#FAF7FC] border border-[#CDC3D2]/40">
                  <div className="flex items-center justify-between text-xs font-medium text-[#1F1925] mb-1">
                    <span>{cat}</span>
                    <span className="text-[#60378E] font-semibold">{count} pcs</span>
                  </div>
                  <div className="w-full bg-[#EADCF3] rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-[#60378E] h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    ></div>
                  </div>
                  <div className="text-[10px] text-[#7C7481] mt-1 text-right">{pct}% of catalog</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product Management Table */}
        <div className="bg-white rounded-3xl border border-[#CDC3D2]/50 shadow-sm overflow-hidden">
          {/* Table Controls Bar */}
          <div className="p-5 border-b border-[#CDC3D2]/40 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Search */}
            <div className="relative w-full sm:w-80">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[18px] text-[#7C7481]">
                search
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by title, SKU, fabric..."
                className="w-full pl-10 pr-4 py-2 bg-[#FAF7FC] border border-[#CDC3D2]/60 rounded-full text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
              />
            </div>

            {/* Category tabs */}
            <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
              {(['All', 'Occasionwear', 'Everyday', 'Floral', 'Party'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setCategoryFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors cursor-pointer ${
                    categoryFilter === cat
                      ? 'bg-[#60378E] text-white'
                      : 'bg-[#FAF7FC] text-[#4B4450] hover:text-[#1F1925]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1F1925]">
              <thead className="bg-[#FAF7FC] border-b border-[#CDC3D2]/40 text-[#7C7481] uppercase tracking-wider font-semibold">
                <tr>
                  <th className="py-3.5 px-6">Garment Silhouette</th>
                  <th className="py-3.5 px-4">SKU</th>
                  <th className="py-3.5 px-4">Category</th>
                  <th className="py-3.5 px-4">Price (USD)</th>
                  <th className="py-3.5 px-4">Stock Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#CDC3D2]/30">
                {filteredProducts.map((product) => {
                  const isLow = product.stockCount < 5;
                  return (
                    <tr key={product.id} className="hover:bg-[#FAF7FC]/80 transition-colors">
                      {/* Title & Thumbnail */}
                      <td className="py-3 px-6">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.imageUrl}
                            alt={product.title}
                            className="w-11 h-14 object-cover rounded-lg bg-[#F6EAFB] border border-[#CDC3D2]/40 cursor-pointer"
                            onClick={() => setSelectedProduct(product)}
                          />
                          <div>
                            <div
                              onClick={() => setSelectedProduct(product)}
                              className="font-serif font-medium text-sm text-[#1F1925] hover:text-[#60378E] cursor-pointer"
                            >
                              {product.title}
                            </div>
                            <div className="text-[11px] text-[#7C7481] line-clamp-1 max-w-[220px]">
                              {product.fabric}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className="py-3 px-4 font-mono text-[11px] text-[#4B4450]">
                        {product.sku}
                      </td>

                      {/* Category */}
                      <td className="py-3 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#F6EAFB] text-[#60378E] text-[10px] font-semibold uppercase tracking-wider">
                          {product.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="py-3 px-4 font-medium">
                        ${product.price}
                        {product.originalPrice && (
                          <span className="text-[10px] text-[#7C7481] line-through ml-1.5">
                            ${product.originalPrice}
                          </span>
                        )}
                      </td>

                      {/* Stock Status */}
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold ${
                            product.stockCount === 0
                              ? 'bg-red-100 text-red-800'
                              : isLow
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-emerald-100 text-emerald-800'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              product.stockCount === 0
                                ? 'bg-red-600'
                                : isLow
                                ? 'bg-amber-600'
                                : 'bg-emerald-600'
                            }`}
                          ></span>
                          <span>
                            {product.stockCount === 0
                              ? 'Sold Out'
                              : `${product.stockCount} in stock`}
                          </span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right">
                        <div className="inline-flex items-center gap-1.5">
                          {/* Inspect / Preview */}
                          <button
                            onClick={() => setSelectedProduct(product)}
                            title="Preview Garment PDP"
                            className="p-1.5 rounded-lg text-[#7C7481] hover:text-[#60378E] hover:bg-[#F6EAFB] transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">visibility</span>
                          </button>

                          {/* Delete Confirmation */}
                          <button
                            onClick={() => setProductToDelete(product)}
                            title="Delete Garment"
                            className="p-1.5 rounded-lg text-[#7C7481] hover:text-[#BA1A1A] hover:bg-red-50 transition-colors cursor-pointer"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12 text-[#7C7481] text-xs">
              No garments found matching "{searchTerm}".
            </div>
          )}
        </div>

      </div>

      {/* ADD NEW PRODUCT MODAL (Image 19) */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#CDC3D2]/50 p-6 sm:p-8 my-8 relative">
            
            {/* Close button */}
            <button
              onClick={() => setIsAddModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-[#7C7481] hover:text-[#1F1925] hover:bg-[#FAF7FC]"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="mb-6">
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#60378E]">
                Garment Atelier Profile
              </span>
              <h2 className="font-serif text-2xl text-[#1F1925] mt-1">
                Add New Dress to Collection
              </h2>
              <p className="text-xs text-[#7C7481]">
                Configure specifications, pricing, fabric composition, and photography.
              </p>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              {/* Row 1: Title & SKU */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                    Garment Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Dahlia Jacquard Maxi"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                    SKU Code (Auto or Custom)
                  </label>
                  <input
                    type="text"
                    value={newSku}
                    onChange={(e) => setNewSku(e.target.value)}
                    placeholder="e.g. VM-OCC-782"
                    className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs font-mono text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                  />
                </div>
              </div>

              {/* Row 2: Category & Badge */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                    Collection Category *
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                  >
                    <option value="Occasionwear">Occasionwear</option>
                    <option value="Everyday">Everyday</option>
                    <option value="Floral">Floral</option>
                    <option value="Party">Party</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                    Editorial Badge
                  </label>
                  <select
                    value={newBadge || ''}
                    onChange={(e) => setNewBadge(e.target.value as any || undefined)}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                  >
                    <option value="">None</option>
                    <option value="New">New</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Trending">Trending</option>
                    <option value="Atelier Drop">Atelier Drop</option>
                    <option value="Limited Piece">Limited Piece</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Price, Original Price, Stock */}
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                    Price ($ USD) *
                  </label>
                  <input
                    type="number"
                    required
                    min="1"
                    value={newPrice}
                    onChange={(e) => setNewPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                    Compare Price ($)
                  </label>
                  <input
                    type="number"
                    value={newOriginalPrice}
                    onChange={(e) => setNewOriginalPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                    Stock Units *
                  </label>
                  <input
                    type="number"
                    required
                    min="0"
                    value={newStock}
                    onChange={(e) => setNewStock(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                  />
                </div>
              </div>

              {/* Fabric composition */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                  Fabric & Artisan Material
                </label>
                <input
                  type="text"
                  value={newFabric}
                  onChange={(e) => setNewFabric(e.target.value)}
                  placeholder="e.g. 100% Mulberry Silk Crepe with satin lining"
                  className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                  Editorial Description
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full px-3.5 py-2 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E]"
                />
              </div>

              {/* Image URL & Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1">
                  Photography Asset URL *
                </label>
                <input
                  type="url"
                  required
                  value={newImageUrl}
                  onChange={(e) => setNewImageUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-[#FAF7FC] border border-[#CDC3D2] rounded-xl text-xs text-[#1F1925] focus:outline-none focus:border-[#60378E] mb-2"
                />
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#7C7481] uppercase font-semibold">Quick Presets:</span>
                  <div className="flex gap-2">
                    {PRESET_IMAGES.map((img, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setNewImageUrl(img.url)}
                        className={`text-[10px] px-2.5 py-1 rounded-full border cursor-pointer ${
                          newImageUrl === img.url
                            ? 'bg-[#60378E] text-white border-[#60378E]'
                            : 'bg-[#FAF7FC] text-[#4B4450] border-[#CDC3D2]'
                        }`}
                      >
                        {img.name}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sizes */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#4B4450] mb-1.5">
                  Available Sizing
                </label>
                <div className="flex gap-2">
                  {(['XS', 'S', 'M', 'L', 'XL'] as const).map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => toggleSizeSelection(s)}
                      className={`w-9 h-9 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                        selectedSizes.includes(s)
                          ? 'bg-[#60378E] text-white shadow-sm'
                          : 'bg-[#FAF7FC] text-[#4B4450] border border-[#CDC3D2]'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-[#CDC3D2]/40">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-5 py-2.5 text-xs text-[#4B4450] hover:text-[#1F1925] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#60378E] hover:bg-[#4C2479] text-white text-xs font-semibold uppercase tracking-wider rounded-full shadow-md cursor-pointer"
                >
                  Save & Publish Dress
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
