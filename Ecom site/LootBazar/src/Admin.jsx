import React, { useState } from 'react';

const Admin = ({ products, setProducts, orders, users, onLogout, onGoToStore }) => {
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'orders' | 'users'
  
  // Product Form State (Add / Edit)
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'fashion',
    price: '',
    originalPrice: '',
    rating: 4.5,
    reviews: 10,
    image: '',
    discount: '20% OFF',
    description: ''
  });

  const categories = ['fashion', 'mobiles', 'electronics', 'home', 'beauty'];

  // Handle Form Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // CREATE / UPDATE Product
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.image) return;

    if (editingId) {
      // Update
      setProducts(prev =>
        prev.map(p => (p.id === editingId ? { ...formData, id: editingId, price: Number(formData.price), originalPrice: Number(formData.originalPrice) } : p))
      );
      setEditingId(null);
    } else {
      // Create
      const newProduct = {
        ...formData,
        id: 'prod_' + Date.now(),
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice || formData.price)
      };
      setProducts(prev => [newProduct, ...prev]);
    }

    // Reset Form
    setFormData({
      name: '',
      category: 'fashion',
      price: '',
      originalPrice: '',
      rating: 4.5,
      reviews: 10,
      image: '',
      discount: '20% OFF',
      description: ''
    });
  };

  // EDIT Trigger
  const handleEdit = (product) => {
    setEditingId(product.id);
    setFormData(product);
    setActiveTab('products');
  };

  // DELETE Product
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== id));
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F9FAFB] font-sans pb-12">
      
      {/* Top Navigation */}
      <header className="bg-[#14141B] border-b border-[#2A2A36] sticky top-0 z-30 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-tr from-[#8B5CF6] to-[#FF6B35] rounded-xl flex items-center justify-center text-white font-black text-xl">
            L
          </div>
          <div>
            <h1 className="text-xl font-black text-white">
              Loot<span className="text-[#FF6B35]">Bazar</span> <span className="text-[#8B5CF6] text-xs px-2 py-0.5 rounded-md bg-[#8B5CF6]/10 border border-[#8B5CF6]/30 ml-2">ADMIN</span>
            </h1>
            <p className="text-[11px] text-[#71717A]">Control Panel & Live Store Sync</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onGoToStore}
            className="px-4 py-2 bg-[#1F1F2A] hover:bg-[#2A2A36] border border-[#2A2A36] text-white text-xs font-bold rounded-xl transition-all"
          >
            View Live Store →
          </button>
          <button
            onClick={onLogout}
            className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/30 text-xs font-bold rounded-xl transition-all"
          >
            Logout
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-[#14141B] border border-[#2A2A36] p-5 rounded-2xl">
            <p className="text-xs text-[#71717A] uppercase font-bold">Total Products</p>
            <p className="text-2xl font-black text-[#F9FAFB] mt-1">{products.length}</p>
          </div>
          <div className="bg-[#14141B] border border-[#2A2A36] p-5 rounded-2xl">
            <p className="text-xs text-[#71717A] uppercase font-bold">Total Checkouts</p>
            <p className="text-2xl font-black text-[#8B5CF6] mt-1">{orders.length}</p>
          </div>
          <div className="bg-[#14141B] border border-[#2A2A36] p-5 rounded-2xl">
            <p className="text-xs text-[#71717A] uppercase font-bold">Total Revenue</p>
            <p className="text-2xl font-black text-[#FF6B35] mt-1">
              ₹{orders.reduce((sum, o) => sum + o.totalAmount, 0).toLocaleString()}
            </p>
          </div>
          <div className="bg-[#14141B] border border-[#2A2A36] p-5 rounded-2xl">
            <p className="text-xs text-[#71717A] uppercase font-bold">Registered Users</p>
            <p className="text-2xl font-black text-white mt-1">{users.length}</p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-[#2A2A36] space-x-6">
          <button
            onClick={() => setActiveTab('products')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'products'
                ? 'border-[#8B5CF6] text-[#8B5CF6]'
                : 'border-transparent text-[#71717A] hover:text-white'
            }`}
          >
            Product Management (CRUD)
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'orders'
                ? 'border-[#8B5CF6] text-[#8B5CF6]'
                : 'border-transparent text-[#71717A] hover:text-white'
            }`}
          >
            User Checkouts & Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={`pb-3 text-sm font-bold border-b-2 transition-all ${
              activeTab === 'users'
                ? 'border-[#8B5CF6] text-[#8B5CF6]'
                : 'border-transparent text-[#71717A] hover:text-white'
            }`}
          >
            User Directory ({users.length})
          </button>
        </div>

        {/* TAB 1: PRODUCT CRUD */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Form Side */}
            <div className="bg-[#14141B] border border-[#2A2A36] p-6 rounded-3xl h-fit space-y-4">
              <h2 className="text-lg font-bold text-white">
                {editingId ? '✏️ Edit Product' : '➕ Add New Product'}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#71717A]">Title</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Wireless Gaming Mouse"
                    className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#71717A]">Category</label>
                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#8B5CF6] capitalize"
                    >
                      {categories.map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#71717A]">Discount Badge</label>
                    <input
                      type="text"
                      name="discount"
                      value={formData.discount}
                      onChange={handleChange}
                      placeholder="e.g. 30% OFF"
                      className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#71717A]">Sale Price (₹)</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      placeholder="2999"
                      className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-[#71717A]">Original Price (₹)</label>
                    <input
                      type="number"
                      name="originalPrice"
                      value={formData.originalPrice}
                      onChange={handleChange}
                      placeholder="4999"
                      className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#71717A]">Image URL</label>
                  <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    placeholder="https://images.unsplash.com/..."
                    className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs px-3 py-2.5 rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                    required
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#71717A]">Description</label>
                  <textarea
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Short product specs..."
                    className="w-full bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs px-3 py-2 rounded-xl focus:outline-none focus:border-[#8B5CF6]"
                  ></textarea>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="submit"
                    className="flex-1 bg-[#8B5CF6] hover:bg-[#7c4dff] text-white text-xs font-bold py-3 rounded-xl transition-all shadow-md shadow-[#8B5CF6]/20"
                  >
                    {editingId ? 'Update Product' : 'Save & Publish to Store'}
                  </button>
                  {editingId && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(null);
                        setFormData({
                          name: '',
                          category: 'fashion',
                          price: '',
                          originalPrice: '',
                          rating: 4.5,
                          reviews: 10,
                          image: '',
                          discount: '20% OFF',
                          description: ''
                        });
                      }}
                      className="px-4 bg-[#1F1F2A] text-[#71717A] hover:text-white text-xs rounded-xl"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Live Products List */}
            <div className="lg:col-span-2 bg-[#14141B] border border-[#2A2A36] rounded-3xl p-6 overflow-hidden space-y-4">
              <h2 className="text-lg font-bold text-white">Live Catalog ({products.length})</h2>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1F1F2A] text-[#71717A] uppercase text-[10px] font-bold">
                    <tr>
                      <th className="p-3">Product</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2A2A36]">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-[#1F1F2A]/50 transition-colors">
                        <td className="p-3 flex items-center space-x-3">
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover bg-[#0B0B0F]" />
                          <span className="font-semibold text-white line-clamp-1">{p.name}</span>
                        </td>
                        <td className="p-3 uppercase text-[10px] font-bold text-[#8B5CF6]">{p.category}</td>
                        <td className="p-3 font-bold text-[#F9FAFB]">₹{p.price.toLocaleString()}</td>
                        <td className="p-3 text-right space-x-2">
                          <button
                            onClick={() => handleEdit(p)}
                            className="px-2.5 py-1 bg-[#1F1F2A] hover:bg-[#2A2A36] text-[#8B5CF6] font-bold rounded-lg"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(p.id)}
                            className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 font-bold rounded-lg"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* TAB 2: USER CHECKOUTS / ORDERS TABLE */}
        {activeTab === 'orders' && (
          <div className="bg-[#14141B] border border-[#2A2A36] rounded-3xl p-6 overflow-x-auto space-y-4">
            <h2 className="text-lg font-bold text-white">User Checkout History</h2>

            {orders.length === 0 ? (
              <p className="text-xs text-[#71717A] py-8 text-center">No orders have been placed yet.</p>
            ) : (
              <table className="w-full text-left text-xs">
                <thead className="bg-[#1F1F2A] text-[#71717A] uppercase text-[10px] font-bold">
                  <tr>
                    <th className="p-3">Order ID</th>
                    <th className="p-3">User Email</th>
                    <th className="p-3">Items Purchased</th>
                    <th className="p-3">Total Checkout</th>
                    <th className="p-3">Date</th>
                    <th className="p-3">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#2A2A36]">
                  {orders.map((o) => (
                    <tr key={o.id} className="hover:bg-[#1F1F2A]/50 transition-colors">
                      <td className="p-3 font-mono text-[#8B5CF6] font-bold">{o.id}</td>
                      <td className="p-3 text-white font-medium">{o.userEmail}</td>
                      <td className="p-3 text-[#71717A]">
                        {o.items.map(item => `${item.name} (${item.quantity}x)`).join(', ')}
                      </td>
                      <td className="p-3 font-black text-[#FF6B35]">₹{o.totalAmount.toLocaleString()}</td>
                      <td className="p-3 text-[#71717A]">{o.date}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 bg-green-500/10 text-green-400 border border-green-500/30 rounded-full text-[10px] font-bold">
                          {o.status || 'Paid'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* TAB 3: USER DIRECTORY */}
        {activeTab === 'users' && (
          <div className="bg-[#14141B] border border-[#2A2A36] rounded-3xl p-6 overflow-x-auto space-y-4">
            <h2 className="text-lg font-bold text-white">Registered Users & Activity</h2>

            <table className="w-full text-left text-xs">
              <thead className="bg-[#1F1F2A] text-[#71717A] uppercase text-[10px] font-bold">
                <tr>
                  <th className="p-3">User Email</th>
                  <th className="p-3">Total Orders</th>
                  <th className="p-3">Total Spent</th>
                  <th className="p-3">Role</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#2A2A36]">
                {users.map((u, idx) => {
                  const userOrders = orders.filter(o => o.userEmail === u.email);
                  const totalSpent = userOrders.reduce((sum, o) => sum + o.totalAmount, 0);

                  return (
                    <tr key={idx} className="hover:bg-[#1F1F2A]/50 transition-colors">
                      <td className="p-3 text-white font-bold">{u.email}</td>
                      <td className="p-3 text-[#71717A] font-semibold">{userOrders.length} orders</td>
                      <td className="p-3 text-[#FF6B35] font-black">₹{totalSpent.toLocaleString()}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          u.role === 'admin'
                            ? 'bg-[#8B5CF6]/10 text-[#8B5CF6] border border-[#8B5CF6]/30'
                            : 'bg-[#1F1F2A] text-[#71717A]'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;