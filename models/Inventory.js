const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  name:      { type: String, required: true },
  sku:       { type: String, required: true },
  quantity:  { type: Number, default: 0 },
  status:    { type: String, enum: ['in-stock','low','out'], default: 'in-stock' },
  category:  { type: String },
  warehouse: { type: String },
  userId:    { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

inventorySchema.index({ sku: 1, userId: 1 }, { unique: true });

module.exports = mongoose.model('Inventory', inventorySchema);
