const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  action: { type: String, required: true },
  detail: { type: String },
  icon:   { type: String, default: 'package' },
  time:   { type: String },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

const chartMonthlySchema = new mongoose.Schema({
  month:     { type: String },
  shipped:   { type: Number, default: 0 },
  delivered: { type: Number, default: 0 },
});

const chartCategorySchema = new mongoose.Schema({
  category: { type: String },
  value:    { type: Number, default: 0 },
});

module.exports = {
  Activity:      mongoose.model('Activity', activitySchema),
  ChartMonthly:  mongoose.model('ChartMonthly', chartMonthlySchema),
  ChartCategory: mongoose.model('ChartCategory', chartCategorySchema),
};
