const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  sku:         { type: String, required: true },
  category:    { type: String, required: true },
  price:       { type: Number, default: 0 },
  cost:        { type: Number, default: 0 },
  quantity:    { type: Number, default: 0 },
  unit:        { type: String, default: 'pcs' },
  supplier:    { type: String },
  origin:      { type: String },
  status:      { type: String, enum: ['active', 'inactive', 'discontinued'], default: 'active' },
  description: { type: String },
  tags:        [{ type: String }],
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

productSchema.index({ sku: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Product', productSchema);
