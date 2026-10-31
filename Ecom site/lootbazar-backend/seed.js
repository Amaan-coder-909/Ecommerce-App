// Run once:  npm run seed
// Creates the admin user + starter products.
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const Product = require('./models/Product');

// TODO: paste your full INITIAL_PRODUCTS array from App.jsx here.
// Delete the `id` field from each item (MongoDB makes its own id).
const products = [
  { name: "Oversized Cyberpunk Hoodie", category: "fashion", price: 2499, originalPrice: 4999, rating: 4.8, reviews: 342, image: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Premium heavyweight cotton fleece, reflective futuristic graphic print with drop-shoulder oversized fit." },
  { name: "LootX Pro Max 5G (256GB)", category: "mobiles", price: 64999, originalPrice: 79999, rating: 4.9, reviews: 1240, image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600", discount: "18% OFF", description: "Flagship 6.7-inch 120Hz LTPO OLED display, Snapdragon 8 Gen 3 chipset, and 200MP Quad-camera camera." },
  { name: "Mechanical Gaming Keyboard RGB", category: "electronics", price: 3499, originalPrice: 6999, rating: 4.7, reviews: 1120, image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&q=80&w=600", discount: "50% OFF", description: "Hot-swappable tactile switches, per-key RGB backlighting, aircraft-grade aluminum top plate." },
];

(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const email = (process.env.ADMIN_EMAIL || 'admin@gmail.com').toLowerCase();
    const password = process.env.ADMIN_PASSWORD;
    if (!password || password.length < 6) {
      throw new Error('Set ADMIN_PASSWORD (min 6 chars) in .env first');
    }

    const existing = await User.findOne({ email });
    if (existing) {
      console.log('Admin already exists:', email);
    } else {
      await User.create({ email, password, role: 'admin' });
      console.log('Admin created:', email);
    }

    if ((await Product.countDocuments()) === 0) {
      await Product.insertMany(products);
      console.log(`Seeded ${products.length} products`);
    } else {
      console.log('Products already exist, skipping');
    }
  } catch (err) {
    console.error(err.message);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
})();
