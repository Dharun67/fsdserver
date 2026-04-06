const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name:      { type: String, required: true },
  sku:       { type: String, required: true, unique: true },
  quantity:  { type: Number, default: 0 },
  status:    { type: String, enum: ['in-stock','low','out'], default: 'in-stock' },
  category:  { type: String },
  warehouse: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
