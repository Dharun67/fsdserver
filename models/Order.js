const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  code:        { type: String, required: true, unique: true },
  customer:    { type: String, required: true },
  items:       { type: Number, default: 1 },
  total:       { type: Number, default: 0 },
  status:      { type: String, enum: ['pending','processing','shipped','delivered'], default: 'pending' },
  destination: { type: String },
  order_date:  { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
