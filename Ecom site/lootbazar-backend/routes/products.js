const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

// Only these fields can be set from the request (prevents mass-assignment)
const pick = (b) => ({
  name: b.name,
  category: b.category,
  price: Number(b.price),
  originalPrice: Number(b.originalPrice || b.price),
  rating: b.rating !== undefined ? Number(b.rating) : undefined,
  reviews: b.reviews !== undefined ? Number(b.reviews) : undefined,
  image: b.image,
  discount: b.discount,
  description: b.description,
});

const clean = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, v]) => v !== undefined));

// GET /api/products?category=fashion&search=hoodie   (public)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category && req.query.category !== 'foryou') {
      filter.category = String(req.query.category);
    }
    if (req.query.search) {
      const safe = String(req.query.search).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      filter.name = { $regex: safe, $options: 'i' };
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/products/:id   (public)
router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
});

// POST /api/products   (admin)
router.post('/', protect, adminOnly, async (req, res) => {
  try {
    const product = await Product.create(clean(pick(req.body)));
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT /api/products/:id   (admin)
router.put('/:id', protect, adminOnly, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: 'Invalid product id' });
    }
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      clean(pick(req.body)),
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE /api/products/:id   (admin)
router.delete('/:id', protect, adminOnly, async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json({ message: 'Invalid product id' });
  }
  const product = await Product.findByIdAndDelete(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json({ message: 'Product deleted', id: req.params.id });
});

module.exports = router;
