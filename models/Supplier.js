const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  code:      { type: String, required: true, unique: true },
  name:      { type: String, required: true },
  country:   { type: String },
  contact:   { type: String },
  category:  { type: String },
  rating:    { type: Number, default: 4.0 },
  status:    { type: String, enum: ['active','inactive'], default: 'active' },
  shipments: { type: Number, default: 0 },
  on_time:   { type: String, default: '90%' },
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
