const mongoose = require('mongoose');

const shipmentProductSchema = new mongoose.Schema({
  name:     { type: String, required: true },
  sku:      { type: String },
  quantity: { type: Number, default: 0 },
  unit:     { type: String, default: 'pcs' },
}, { _id: false });

const shipmentSchema = new mongoose.Schema({
  code:        { type: String, required: true },
  origin:      { type: String, required: true },
  destination: { type: String, required: true },
  status:      { type: String, enum: ['ordered','packed','shipped','delivered','delayed'], default: 'ordered' },
  eta:         { type: String },
  carrier:     { type: String },
  weight:      { type: String },
  truckNo:     { type: String },
  products:    [shipmentProductSchema],
  isDelayed:   { type: Boolean, default: false },
  delayReason: { type: String },
  alertSent:   { type: Boolean, default: false },
  userId:      { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

shipmentSchema.index({ code: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Shipment', shipmentSchema);
