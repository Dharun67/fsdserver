const mongoose = require('mongoose');

const truckProductSchema = new mongoose.Schema({
  name:  { type: String, required: true },
  count: { type: Number, default: 0 },
  icon:  { type: String, default: '📦' },
}, { _id: false });

const truckSchema = new mongoose.Schema({
  truckId:         { type: String, required: true, unique: true },
  driver:          { type: String, required: true },
  route:           { type: String },
  origin:          { type: String, required: true },
  destination:     { type: String, required: true },
  status:          { type: String, enum: ['on-time', 'delayed', 'delivered'], default: 'on-time' },
  etaTime:         { type: String },   // "HH:MM" 24h
  currentLocation: { type: String },
  products:        [truckProductSchema],
}, { timestamps: true });

module.exports = mongoose.model('Truck', truckSchema);
