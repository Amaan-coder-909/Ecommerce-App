const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema(
  {
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    name: String,
    price: Number, // price at the time of purchase
    image: String,
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    userEmail: { type: String, required: true },
    items: { type: [orderItemSchema], required: true },
    subtotal: { type: Number, required: true },
    taxes: { type: Number, required: true },
    totalAmount: { type: Number, required: true },
    // Stays 'Pending' until you add a payment gateway (e.g. Razorpay)
    status: {
      type: String,
      enum: ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
    },
  },
  { timestamps: true }
);

orderSchema.pre('validate', function (next) {
  if (!this.orderId) {
    this.orderId = 'ORD-' + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 100);
  }
  next();
});

// Shape matches what Admin.jsx already reads: id, userEmail, items, totalAmount, date, status
orderSchema.set('toJSON', {
  transform: (_doc, ret) => {
    ret.id = ret.orderId;
    ret.date = new Date(ret.createdAt).toISOString().split('T')[0];
    delete ret._id;
    delete ret.__v;
    delete ret.orderId;
    return ret;
  },
});

module.exports = mongoose.model('Order', orderSchema);
