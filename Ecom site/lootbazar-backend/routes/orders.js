const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/Order');
const Product = require('../models/Product');
const { protect, adminOnly } = require('../middleware/auth');

const router = express.Router();

const GST_RATE = 0.18;

// POST /api/orders   (logged-in user)
// body: { items: [{ id: "<productId>", quantity: 2 }, ...] }
// Prices are read from the DB, NEVER trusted from the client.
router.post('/', protect, async (req, res) => {
  try {
    const items = Array.isArray(req.body.items) ? req.body.items : [];
    if (items.length === 0) return res.status(400).json({ message: 'Cart is empty' });
    if (items.length > 50) return res.status(400).json({ message: 'Too many items' });

    const ids = items.map((i) => i.id);
    if (!ids.every((id) => mongoose.isValidObjectId(id))) {
      return res.status(400).json({ message: 'Invalid product id in cart' });
    }

    const products = await Product.find({ _id: { $in: ids } });
    const byId = new Map(products.map((p) => [p._id.toString(), p]));

    const orderItems = [];
    for (const i of items) {
      const product = byId.get(String(i.id));
      const quantity = Number(i.quantity);
      if (!product) return res.status(400).json({ message: 'A product in your cart no longer exists' });
      if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) {
        return res.status(400).json({ message: 'Invalid quantity' });
      }
      orderItems.push({
        product: product._id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity,
      });
    }

    const subtotal = orderItems.reduce((s, i) => s + i.price * i.quantity, 0);
    const taxes = Math.round(subtotal * GST_RATE);
    const totalAmount = subtotal + taxes;

    const order = await Order.create({
      user: req.user._id,
      userEmail: req.user.email,
      items: orderItems,
      subtotal,
      taxes,
      totalAmount,
    });

    res.status(201).json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/orders/my   (logged-in user: own orders)
router.get('/my', protect, async (req, res) => {
  const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
  res.json(orders);
});

// GET /api/orders   (admin: all orders)
router.get('/', protect, adminOnly, async (_req, res) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  res.json(orders);
});

// PATCH /api/orders/:orderId/status   (admin)  body: { status }
router.patch('/:orderId/status', protect, adminOnly, async (req, res) => {
  const allowed = Order.schema.path('status').enumValues;
  if (!allowed.includes(req.body.status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }
  const order = await Order.findOneAndUpdate(
    { orderId: req.params.orderId },
    { status: req.body.status },
    { new: true }
  );
  if (!order) return res.status(404).json({ message: 'Order not found' });
  res.json(order);
});

module.exports = router;
