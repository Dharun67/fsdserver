const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  code:      { type: String, required: true },
  name:      { type: String, required: true },
  country:   { type: String },
  contact:   { type: String },
  category:  { type: String },
  rating:    { type: Number, default: 4.0 },
  status:    { type: String, enum: ['active','inactive'], default: 'active' },
  shipments: { type: Number, default: 0 },
  on_time:   { type: String, default: '90%' },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

supplierSchema.index({ code: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Supplier', supplierSchema);
