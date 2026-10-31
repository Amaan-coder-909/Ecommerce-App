import React, { useState, useEffect } from "react";
import Login from "./Login";
import Admin from "./Admin";

// --- INLINE SVG ICONS ---
const ShoppingBagIcon = ({ className = "h-6 w-6" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.7}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 8h14l1 13H4L5 8Z" />
    <path d="M9 9V6a3 3 0 0 1 6 0v3" />
  </svg>
);
 
const SearchIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);
 
const HeartIcon = ({ className = "w-5 h-5", fill = "none" }) => (
  <svg className={className} fill={fill} viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
  </svg>
);
 
const XIcon = ({ className = "w-5 h-5" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);
 
const StarIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);
 
const RefreshIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);
 
const PlusIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
);
 
const MinusIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
  </svg>
);
 
const TrashIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
);
 
const EyeIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);
 
const ZapIcon = ({ className = "w-4 h-4" }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);
 
// --- INITIAL PRODUCT DATA CATALOG ---
const INITIAL_PRODUCTS = [
  // FASHION
  { id: "f1", name: "Oversized Cyberpunk Hoodie", category: "fashion", price: 2499, originalPrice: 4999, rating: 4.8, reviews: 342, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Premium heavyweight cotton fleece, reflective futuristic graphic print with drop-shoulder oversized fit." },
  { id: "f2", name: "Urban Tactical Cargo Pants", category: "fashion", price: 1899, originalPrice: 3299, rating: 4.6, reviews: 215, image: "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=600", discount: "42% OFF", description: "Water-resistant multi-pocket utility cargo trousers with adjustable ankle strap bindings." },
  { id: "f3", name: "Retro High-Top Sneakers", category: "fashion", price: 3499, originalPrice: 5999, rating: 4.9, reviews: 512, image: "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=600", discount: "41% OFF", description: "Classic high-top silhouette featuring responsive air-cushioned soles and genuine suede overlays." },
  { id: "f4", name: "Minimalist Leather Bomber Jacket", category: "fashion", price: 4999, originalPrice: 8999, rating: 4.7, reviews: 180, image: "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=600", discount: "44% OFF", description: "Sleek faux leather jacket with ribbed cuffs, heavy-duty metallic zippers, and satin interior lining." },
  { id: "f5", name: "Vintage Oversized Graphic Tee", category: "fashion", price: 899, originalPrice: 1799, rating: 4.5, reviews: 620, image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "240 GSM bio-washed combed cotton t-shirt featuring washed vintage aesthetic print." },
  { id: "f6", name: "Polarized Shield Sunglasses", category: "fashion", price: 1299, originalPrice: 2499, rating: 4.4, reviews: 140, image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=600", discount: "48% OFF", description: "UV400 protective wrap-around rimless shield shades with anti-glare coated lenses." },
 
  // MOBILES
  { id: "m1", name: "LootX Pro Max 5G (256GB)", category: "mobiles", price: 64999, originalPrice: 79999, rating: 4.9, reviews: 1240, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600", discount: "18% OFF", description: "Flagship 6.7-inch 120Hz LTPO OLED display, Snapdragon 8 Gen 3 chipset, and 200MP Quad-camera camera." },
  { id: "m2", name: "CyberPhone Ultra Flip 5G", category: "mobiles", price: 54999, originalPrice: 69999, rating: 4.6, reviews: 430, image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&q=80&w=600", discount: "21% OFF", description: "Compact foldable AMOLED outer screen, ultra-thin flexible glass display, and dual camera setup." },
  { id: "m3", name: "AeroGamer 8 Pro 16GB", category: "mobiles", price: 42999, originalPrice: 52999, rating: 4.8, reviews: 890, image: "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?auto=format&fit=crop&q=80&w=600", discount: "18% OFF", description: "Dedicated liquid cooling system, shoulder air triggers, 165Hz refresh rate, and fast 120W charging." },
  { id: "m4", name: "Nova Lite 5G Budget Beast", category: "mobiles", price: 14999, originalPrice: 19999, rating: 4.4, reviews: 2100, image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&q=80&w=600", discount: "25% OFF", description: "Massive 6000mAh battery, 50MP AI primary lens, Dimensity 7000 series chip, and stereo speakers." },
  { id: "m5", name: "PixelVibe 7a Clean Edition", category: "mobiles", price: 32999, originalPrice: 41999, rating: 4.7, reviews: 670, image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&q=80&w=600", discount: "21% OFF", description: "Stock Android experience with computational photography capabilities and AI real-time translation." },
  { id: "m6", name: "TitanPad Fold 12.9 Cellular", category: "mobiles", price: 89999, originalPrice: 109999, rating: 4.9, reviews: 185, image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&q=80&w=600", discount: "18% OFF", description: "Hybrid foldable tablet phone with stylus support, M2 class processor, and magnetic keyboard connectivity." },
 
  // ELECTRONICS
  { id: "e1", name: "Wireless Active Noise Cancelling Headphones", category: "electronics", price: 8999, originalPrice: 14999, rating: 4.8, reviews: 940, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=600", discount: "40% OFF", description: "Hybrid ANC up to -45dB, 40mm dynamic titanium drivers, 60-hour playtime, and spatial audio support." },
  { id: "e2", name: "Mechanical Gaming Keyboard RGB", category: "electronics", price: 3499, originalPrice: 6999, rating: 4.7, reviews: 1120, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Hot-swappable tactile switches, per-key RGB backlighting, aircraft-grade aluminum top plate." },
  { id: "e3", name: "UltraWide Curved Gaming Monitor 34\"", category: "electronics", price: 28999, originalPrice: 39999, rating: 4.9, reviews: 310, image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&q=80&w=600", discount: "27% OFF", description: "1500R curvature WQHD 165Hz 1ms panel with HDR400 and AMD FreeSync Premium." },
  { id: "e4", name: "True Wireless Earbuds with OLED Case", category: "electronics", price: 2999, originalPrice: 5999, rating: 4.5, reviews: 830, image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Smart touch screen interactive charging case, dual mic ENC clear calling, low latency game mode." },
  { id: "e5", name: "Smart Fitness Watch Ultra", category: "electronics", price: 4499, originalPrice: 8999, rating: 4.6, reviews: 750, image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Rugged alloy casing, SpO2 sensor, continuous heart rate monitor, dual-frequency GPS tracking." },
  { id: "e6", name: "4K Action Camera 60FPS Waterproof", category: "electronics", price: 7499, originalPrice: 12999, rating: 4.6, reviews: 290, image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&q=80&w=600", discount: "42% OFF", description: "Electronic image stabilization 4.0, dual color LCD screens, 30m waterproof without case housing." },
 
  // HOME
  { id: "h1", name: "Smart Touchless Coffee Maker", category: "home", price: 5999, originalPrice: 9999, rating: 4.7, reviews: 260, image: "https://images.unsplash.com/photo-1517668808822-9a428a635838?auto=format&fit=crop&q=80&w=600", discount: "40% OFF", description: "WiFi voice-controlled programmable espresso & drip brewer with thermal stainless carafe." },
  { id: "h2", name: "Ergonomic Mesh Office Chair", category: "home", price: 8499, originalPrice: 14999, rating: 4.8, reviews: 540, image: "https://images.unsplash.com/photo-1580481072645-022f9a6d1270?auto=format&fit=crop&q=80&w=600", discount: "43% OFF", description: "Adjustable 3D armrests, dynamic lumbar support contour, high elasticity breathable mesh back." },
  { id: "h3", name: "Minimalist Nordic Desk Lamp", category: "home", price: 1499, originalPrice: 2999, rating: 4.5, reviews: 310, image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Dimmable eye-care LED warm lighting, wireless phone charging pad base, brushed aluminum finish." },
  { id: "h4", name: "HEPA Air Purifier with Aroma Diffuser", category: "home", price: 6999, originalPrice: 11999, rating: 4.8, reviews: 420, image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=600", discount: "41% OFF", description: "3-stage true HEPA filtration system removing 99.97% airborne particles and pet dander." },
  { id: "h5", name: "Robot Vacuum Cleaner LiDAR Navigation", category: "home", price: 18999, originalPrice: 29999, rating: 4.9, reviews: 190, image: "https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&q=80&w=600", discount: "36% OFF", description: "Simultaneous vacuuming and mopping, 4000Pa suction power, custom room mapping via app." },
  { id: "h6", name: "Ambient RGB Corner Floor Lamp", category: "home", price: 2299, originalPrice: 4599, rating: 4.6, reviews: 680, image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "16 million customizable color modes, music sync visualization, compact corner footprint design." },
 
  // BEAUTY
  { id: "b1", name: "Hydrating Hyaluronic Serum", category: "beauty", price: 799, originalPrice: 1599, rating: 4.8, reviews: 1420, image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Concentrated 2% Multi-Molecular Hyaluronic Acid + B5 for deep plurging moisture retention." },
  { id: "b2", name: "Ionic High-Speed Hair Dryer", category: "beauty", price: 3999, originalPrice: 7999, rating: 4.9, reviews: 610, image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "110,000 RPM brushless motor, magnetic styling nozzles, smart heat control preventing damage." },
  { id: "b3", name: "Organic Botanical Facial Oil", category: "beauty", price: 1199, originalPrice: 2199, rating: 4.6, reviews: 280, image: "https://images.unsplash.com/photo-1608248597261-84de2597058f?auto=format&fit=crop&q=80&w=600", discount: "45% OFF", description: "Cold-pressed rosehip and jojoba seed blend rich in essential fatty acids and natural antioxidants." },
  { id: "b4", name: "Matte Velvet Liquid Lipstick Set", category: "beauty", price: 999, originalPrice: 1999, rating: 4.5, reviews: 950, image: "https://images.unsplash.com/photo-1586495777744-4413f21062fa?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Long-lasting 16 hour non-transfer formula set featuring 4 universally flattering nude red shades." },
  { id: "b5", name: "Rose Quartz LED facial Sculptor", category: "beauty", price: 2499, originalPrice: 4999, rating: 4.7, reviews: 340, image: "https://images.unsplash.com/photo-1512290900676-26c2a4d4b51b?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Sonic vibration micro-current gua sha device with red light therapy mode for face contours." },
  { id: "b6", name: "Exfoliating AHA/BHA Peeling Solution", category: "beauty", price: 699, originalPrice: 1299, rating: 4.7, reviews: 1890, image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600", discount: "46% OFF", description: "10-minute facial wash-off mask for unclogging pores, smoothing skin texture, and radiance." }
];
 
export default function App() {
  // Navigation & Auth States
  const [currentView, setCurrentView] = useState("login"); // 'login' | 'store' | 'admin'
  const [currentUser, setCurrentUser] = useState(null);
  
  // Shared Data States (Passed to Admin and Store)
  const [products, setProducts] = useState(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([
    { email: "admin@gmail.com", role: "admin" }
  ]);

  const [activeTab, setActiveTab] = useState("foryou");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState(null);
 
  // Toast trigger function
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };
 
  // Cart operations
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to cart!`);
  };
 
  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };
 
  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast("Item removed from cart");
  };
 
  const handleCheckout = () => {
    if (cart.length === 0) return;

    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const taxes = Math.round(subtotal * 0.18);
    const totalAmount = subtotal + taxes;

    // Create new order object for Admin tracking
    const newOrder = {
      id: 'ORD-' + Math.floor(1000 + Math.random() * 9000),
      userEmail: currentUser?.email || "guest@lootbazar.com",
      items: [...cart],
      totalAmount: totalAmount,
      date: new Date().toISOString().split('T')[0],
      status: 'Paid'
    };

    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setIsCartOpen(false);
    showToast("Order placed successfully on LootBazar!");
  };
 
  const toggleWishlist = (product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast("Removed from Wishlist");
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast("Added to Wishlist!");
        return [...prev, product];
      }
    });
  };

  // Login handler
  const handleLoginUser = (userData) => {
    setCurrentUser(userData);
    // Add to users list if not exists
    if (!users.some(u => u.email === userData.email)) {
      setUsers(prev => [...prev, userData]);
    }

    if (userData.role === 'admin' || userData.email === 'admin@gmail.com') {
      setCurrentView('admin');
      showToast("Welcome to Admin Panel!");
    } else {
      setCurrentView('store');
      showToast("Logged in successfully!");
    }
  };

  // --- VIEW RENDERING SWITCHER ---
  if (currentView === "login") {
    return (
      <Login 
        onLogin={handleLoginUser} 
        onSwitchToUser={() => setCurrentView("store")} 
      />
    );
  }

  if (currentView === "admin") {
    return (
      <Admin 
        products={products}
        setProducts={setProducts}
        orders={orders}
        users={users}
        onLogout={() => {
          setCurrentUser(null);
          setCurrentView("login");
        }}
        onGoToStore={() => setCurrentView("store")}
      />
    );
  }

  // --- STORE VIEW ---
  return (
    <div className="min-h-screen bg-[#0B0B0F] text-[#F9FAFB] font-sans selection:bg-[#8B5CF6] selection:text-white pb-20">
      
      {/* Top Bar for Admin Switch if Logged in as Admin */}
      {currentUser?.role === 'admin' && (
        <div className="bg-[#14141B] border-b border-[#2A2A36] px-4 py-2 text-xs flex justify-between items-center z-50 sticky top-0">
          <span className="text-[#8B5CF6] font-bold">Admin Mode Active ({currentUser.email})</span>
          <div className="space-x-3">
            <button 
              onClick={() => setCurrentView("admin")} 
              className="px-3 py-1 bg-[#8B5CF6] text-white font-bold rounded-lg hover:bg-[#7c4dff]"
            >
              Go to Admin Panel
            </button>
            <button 
              onClick={() => { setCurrentUser(null); setCurrentView("login"); }} 
              className="text-[#71717A] hover:text-red-400 font-semibold"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1F1F2A] text-white px-5 py-3 rounded-xl border border-[#2A2A36] shadow-2xl flex items-center space-x-3 animate-bounce">
          <ZapIcon className="w-5 h-5 text-[#FF6B35]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
 
      {/* Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={cart.reduce((sum, i) => sum + i.quantity, 0)}
        wishlistCount={wishlist.length}
        setIsCartOpen={setIsCartOpen}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
 
      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        {activeTab === "foryou" ? (
          <ForYouPage
            products={products}
            onAddToCart={addToCart}
            onQuickView={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            searchQuery={searchQuery}
          />
        ) : (
          <CategoryPage
            products={products}
            category={activeTab}
            onAddToCart={addToCart}
            onQuickView={setSelectedProduct}
            wishlist={wishlist}
            onToggleWishlist={toggleWishlist}
            searchQuery={searchQuery}
          />
        )}
      </main>
 
      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={addToCart}
          isWishlisted={wishlist.some((item) => item.id === selectedProduct.id)}
          onToggleWishlist={toggleWishlist}
        />
      )}
 
      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
 
// --- NAVBAR COMPONENT ---
function Navbar({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  setIsCartOpen,
  searchQuery,
  setSearchQuery,
}) {
  const categories = [
    { id: "foryou", label: "For You" },
    { id: "fashion", label: "Fashion" },
    { id: "mobiles", label: "Mobiles" },
    { id: "electronics", label: "Electronics" },
    { id: "home", label: "Home" },
    { id: "beauty", label: "Beauty" },
  ];
 
  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#14141B]/95 backdrop-blur-md border-b border-[#2A2A36]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
 
          {/* Logo */}
          <div
            onClick={() => setActiveTab("foryou")}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#8B5CF6] to-[#FF6B35] flex items-center justify-center font-black text-xl text-white shadow-lg shadow-[#8B5CF6]/20 group-hover:scale-105 transition-transform">
              L
            </div>
            <span className="text-2xl font-black tracking-wider text-white">
              Loot<span className="text-[#FF6B35]">Bazar</span>
            </span>
          </div>
 
          {/* Navigation Category Tabs */}
          <div className="hidden lg:flex items-center space-x-1 bg-[#0B0B0F]/60 p-1.5 rounded-xl border border-[#2A2A36]">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${activeTab === cat.id
                  ? "bg-[#8B5CF6] text-white shadow-md shadow-[#8B5CF6]/30"
                  : "text-[#71717A] hover:text-white hover:bg-[#1F1F2A]"
                  }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
 
          {/* Search bar & Action Icons */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* Search Input */}
            <div className="relative hidden sm:block">
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#71717A] w-4 h-4" />
              <input
                type="text"
                placeholder="Search LootBazar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-44 md:w-60 bg-[#1F1F2A] border border-[#2A2A36] text-sm text-white placeholder-[#71717A] pl-9 pr-4 py-2 rounded-xl focus:outline-none focus:border-[#8B5CF6] transition-all"
              />
            </div>
 
            {/* Wishlist Button */}
            <button className="relative p-2 text-[#71717A] hover:text-[#FF6B35] hover:bg-[#1F1F2A] rounded-xl transition-all">
              <HeartIcon className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>
 
            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 bg-[#8B5CF6] hover:bg-[#7c4dff] text-white rounded-xl transition-all shadow-lg shadow-[#8B5CF6]/25 flex items-center gap-2"
            >
              <ShoppingBagIcon className="w-5 h-5" />
              <span className="text-xs font-bold hidden md:inline">Cart</span>
              {cartCount > 0 && (
                <span className="bg-[#FF6B35] text-white text-[11px] font-extrabold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
 
        {/* Mobile Navigation Tabs */}
        <div className="lg:hidden flex items-center space-x-2 py-2 overflow-x-auto no-scrollbar border-t border-[#2A2A36]">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`px-3 py-1 rounded-lg text-xs font-medium whitespace-nowrap ${activeTab === cat.id
                ? "bg-[#8B5CF6] text-white"
                : "bg-[#1F1F2A] text-[#71717A]"
                }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
 
// --- FOR YOU PAGE (SHUFFLES RANDOMLY ON REFRESH & BUTTON CLICK) ---
function ForYouPage({ products, onAddToCart, onQuickView, wishlist, onToggleWishlist, searchQuery }) {
  const [shuffledProducts, setShuffledProducts] = useState([]);
 
  const handleShuffle = () => {
    const shuffled = [...products].sort(() => Math.random() - 0.5);
    setShuffledProducts(shuffled.slice(0, 12));
  };
 
  useEffect(() => {
    handleShuffle();
  }, [products]);
 
  const filtered = shuffledProducts.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#14141B] via-[#1F1F2A] to-[#14141B] border border-[#2A2A36] p-8 sm:p-12">
        <div className="max-w-xl space-y-4">
          <span className="px-3 py-1 bg-[#FF6B35]/10 border border-[#FF6B35]/30 text-[#FF6B35] text-xs font-bold tracking-widest uppercase rounded-full">
            Personalized For You
          </span>
          <h1 className="text-3xl sm:text-5xl font-black text-white leading-tight">
            Discover <span className="text-[#8B5CF6]">Loot-Worthy</span> Deals
          </h1>
          <p className="text-[#71717A] text-sm sm:text-base">
            Every visit delivers fresh curated recommendations randomly picked across fashion, tech, home aesthetics, and beauty essentials.
          </p>
          <div className="pt-2 flex flex-wrap gap-4">
            <button
              onClick={handleShuffle}
              className="flex items-center space-x-2 bg-[#1F1F2A] hover:bg-[#2A2A36] text-white px-5 py-2.5 rounded-xl border border-[#2A2A36] font-semibold text-sm transition-all"
            >
              <RefreshIcon className="w-4 h-4 text-[#8B5CF6]" />
              <span>Shuffle Suggestions</span>
            </button>
          </div>
        </div>
      </div>
 
      {/* Grid */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Recommended Products</h2>
            <p className="text-xs text-[#71717A]">Curated algorithm feed based on trending purchases</p>
          </div>
          <button
            onClick={handleShuffle}
            className="text-xs text-[#8B5CF6] hover:underline flex items-center gap-1"
          >
            <RefreshIcon className="w-3.5 h-3.5" /> Re-shuffle
          </button>
        </div>
 
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              onQuickView={onQuickView}
              isWishlisted={wishlist.some((item) => item.id === product.id)}
              onToggleWishlist={onToggleWishlist}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
 
// --- CATEGORY PAGE ---
function CategoryPage({
  products,
  category,
  onAddToCart,
  onQuickView,
  wishlist,
  onToggleWishlist,
  searchQuery,
}) {
  const [sortBy, setSortBy] = useState("default");
 
  let items = products.filter((p) => p.category === category);
 
  if (searchQuery) {
    items = items.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }
 
  if (sortBy === "lowToHigh") {
    items = [...items].sort((a, b) => a.price - b.price);
  } else if (sortBy === "highToLow") {
    items = [...items].sort((a, b) => b.price - a.price);
  } else if (sortBy === "rating") {
    items = [...items].sort((a, b) => b.rating - a.rating);
  }
 
  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#2A2A36] pb-6">
        <div>
          <h1 className="text-3xl font-extrabold capitalize text-white tracking-wide">
            {category} Collection
          </h1>
          <p className="text-xs text-[#71717A] mt-1">
            Showing {items.length} verified products in stock
          </p>
        </div>
 
        {/* Sorting Dropdown */}
        <div className="flex items-center space-x-3">
          <span className="text-xs text-[#71717A]">Sort By:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#1F1F2A] border border-[#2A2A36] text-white text-xs rounded-xl px-3 py-2 focus:outline-none focus:border-[#8B5CF6]"
          >
            <option value="default">Featured</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>
 
      {/* Product Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {items.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            onQuickView={onQuickView}
            isWishlisted={wishlist.some((item) => item.id === product.id)}
            onToggleWishlist={onToggleWishlist}
          />
        ))}
      </div>
    </div>
  );
}
 
// --- PRODUCT CARD COMPONENT ---
function ProductCard({ product, onAddToCart, onQuickView, isWishlisted, onToggleWishlist }) {
  return (
    <div className="group bg-[#14141B] hover:bg-[#1F1F2A] border border-[#2A2A36] rounded-2xl overflow-hidden transition-all duration-300 hover:border-[#8B5CF6]/50 flex flex-col justify-between">
      <div>
        {/* Image Box */}
        <div className="relative aspect-square overflow-hidden bg-[#0B0B0F]">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
 
          {/* Discount Badge */}
          <span className="absolute top-3 left-3 bg-[#FF6B35] text-white text-[11px] font-black px-2.5 py-1 rounded-md shadow-md">
            {product.discount || "SPECIAL"}
          </span>
 
          {/* Quick Actions (Wishlist & View) */}
          <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onToggleWishlist(product)}
              className="p-2 bg-[#14141B]/80 hover:bg-[#14141B] text-white rounded-xl backdrop-blur-md transition-colors"
            >
              <HeartIcon
                className="w-4 h-4"
                fill={isWishlisted ? "#FF6B35" : "none"}
              />
            </button>
            <button
              onClick={() => onQuickView(product)}
              className="p-2 bg-[#14141B]/80 hover:bg-[#14141B] text-white rounded-xl backdrop-blur-md transition-colors"
            >
              <EyeIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
 
        {/* Details Box */}
        <div className="p-4 space-y-2">
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs">
            <span className="text-[#71717A] uppercase font-bold tracking-wider text-[10px]">
              {product.category}
            </span>
            <div className="flex items-center text-amber-400 font-semibold space-x-1">
              <StarIcon className="w-3.5 h-3.5" />
              <span>{product.rating || 4.5}</span>
              <span className="text-[#71717A] text-[10px]">({product.reviews || 10})</span>
            </div>
          </div>
 
          {/* Title */}
          <h3 className="font-semibold text-sm text-white line-clamp-1 group-hover:text-[#8B5CF6] transition-colors">
            {product.name}
          </h3>
 
          {/* Pricing */}
          <div className="flex items-baseline space-x-2 pt-1">
            <span className="text-lg font-black text-[#F9FAFB]">
              ₹{Number(product.price).toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-[#71717A] line-through">
                ₹{Number(product.originalPrice).toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </div>
 
      {/* Buttons Action Group */}
      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        {/* Add To Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className="w-full bg-[#8B5CF6] hover:bg-[#7c4dff] text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center space-x-1 shadow-md shadow-[#8B5CF6]/20"
        >
          <ShoppingBagIcon className="w-3.5 h-3.5" />
          <span>Add</span>
        </button>
 
        {/* Buy Now Button */}
        <button
          onClick={() => {
            onAddToCart(product);
          }}
          className="w-full bg-[#FF6B35] hover:bg-[#e05a2b] text-white text-xs font-bold py-2.5 rounded-xl transition-all shadow-md shadow-[#FF6B35]/20"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
}
 
// --- QUICK VIEW MODAL ---
function ProductModal({ product, onClose, onAddToCart, isWishlisted, onToggleWishlist }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="bg-[#14141B] border border-[#2A2A36] rounded-3xl max-w-2xl w-full overflow-hidden relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-[#1F1F2A] hover:bg-[#2A2A36] text-white rounded-full transition-colors"
        >
          <XIcon className="w-5 h-5" />
        </button>
 
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Modal Image */}
          <div className="bg-[#0B0B0F] aspect-square md:aspect-auto">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
 
          {/* Modal Specs */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <span className="bg-[#FF6B35]/10 text-[#FF6B35] text-xs font-extrabold px-3 py-1 rounded-full border border-[#FF6B35]/30">
                {product.discount || "SPECIAL"}
              </span>
              <h2 className="text-xl font-black text-white">{product.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-amber-400">
                <StarIcon className="w-4 h-4" />
                <span className="font-bold">{product.rating || 4.5}</span>
                <span className="text-[#71717A]">({product.reviews || 10} customer reviews)</span>
              </div>
              <p className="text-xs text-[#71717A] leading-relaxed">{product.description || "No description provided."}</p>
            </div>
 
            <div className="space-y-4 pt-4 border-t border-[#2A2A36]">
              <div className="flex items-baseline space-x-3">
                <span className="text-2xl font-black text-[#F9FAFB]">
                  ₹{Number(product.price).toLocaleString()}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-[#71717A] line-through">
                    ₹{Number(product.originalPrice).toLocaleString()}
                  </span>
                )}
              </div>
 
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="bg-[#8B5CF6] hover:bg-[#7c4dff] text-white font-bold text-xs py-3 rounded-xl transition-all"
                >
                  Add To Cart
                </button>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className="bg-[#1F1F2A] hover:bg-[#2A2A36] text-white font-bold text-xs py-3 rounded-xl border border-[#2A2A36] transition-all flex items-center justify-center gap-2"
                >
                  <HeartIcon className="w-4 h-4" fill={isWishlisted ? "#FF6B35" : "none"} />
                  <span>Wishlist</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
 
// --- CART DRAWER COMPONENT ---
function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemove, onCheckout }) {
  if (!isOpen) return null;
 
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxes = Math.round(subtotal * 0.18);
  const total = subtotal + taxes;
 
  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#14141B] border-l border-[#2A2A36] text-[#F9FAFB] flex flex-col justify-between shadow-2xl">
 
          {/* Drawer Header */}
          <div className="p-6 border-b border-[#2A2A36] flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShoppingBagIcon className="w-5 h-5 text-[#8B5CF6]" />
              <h2 className="text-lg font-bold text-white">Your Shopping Cart</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-[#1F1F2A] text-[#71717A] hover:text-white rounded-xl transition-colors"
            >
              <XIcon className="w-5 h-5" />
            </button>
          </div>
 
          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ShoppingBagIcon className="w-12 h-12 text-[#71717A] mx-auto opacity-50" />
                <p className="text-sm text-[#71717A]">Your cart is currently empty</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#1F1F2A] border border-[#2A2A36] p-3.5 rounded-2xl flex space-x-4 items-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-xl object-cover bg-[#0B0B0F]"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-[#F9FAFB] font-extrabold mt-1">
                      ₹{item.price.toLocaleString()}
                    </p>
 
                    {/* Quantity Selector */}
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 bg-[#14141B] hover:bg-[#2A2A36] text-white rounded-lg transition-colors"
                      >
                        <MinusIcon className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold text-white">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 bg-[#14141B] hover:bg-[#2A2A36] text-white rounded-lg transition-colors"
                      >
                        <PlusIcon className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
 
                  {/* Remove Button */}
                  <button
                    onClick={() => onRemove(item.id)}
                    className="p-2 text-[#71717A] hover:text-red-400 transition-colors"
                  >
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
 
          {/* Checkout Section */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-[#2A2A36] bg-[#0B0B0F]/50 space-y-3">
              <div className="space-y-1.5 text-xs text-[#71717A]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white font-medium">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>GST Tax (18%)</span>
                  <span className="text-white font-medium">₹{taxes.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-white pt-2 border-t border-[#2A2A36]">
                  <span>Total Amount</span>
                  <span className="text-[#FF6B35]">₹{total.toLocaleString()}</span>
                </div>
              </div>
 
              <button
                onClick={onCheckout}
                className="w-full bg-[#FF6B35] hover:bg-[#e05a2b] text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-[#FF6B35]/25 text-xs tracking-wider uppercase"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}