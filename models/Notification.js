const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  type:    { type: String, enum: ['info','success','warning','error'], default: 'info' },
  title:   { type: String, required: true },
  message: { type: String },
  time:    { type: String },
  read:    { type: Boolean, default: false },
  userId:  { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
