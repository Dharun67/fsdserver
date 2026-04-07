const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  code:        { type: String, required: true },
  customer:    { type: String, required: true },
  items:       { type: Number, default: 1 },
  total:       { type: Number, default: 0 },
  status:      { type: String, enum: ['pending','processing','shipped','delivered'], default: 'pending' },
  destination: { type: String },
  order_date:  { type: String },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

orderSchema.index({ code: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Order', orderSchema);
