const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  sku:         { type: String, required: true, unique: true },
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
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
