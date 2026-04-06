const router       = require('express').Router();
const Shipment     = require('../models/Shipment');
const Inventory    = require('../models/Inventory');
const Order        = require('../models/Order');
const Notification = require('../models/Notification');
const { Activity, ChartMonthly, ChartCategory } = require('../models/Activity');
const auth         = require('../middleware/auth');

// GET /api/dashboard/summary
router.get('/summary', auth, async (req, res) => {
  try {
    const [totalShipments, delivered, pendingOrders, inventoryItems] = await Promise.all([
      Shipment.countDocuments(),
      Shipment.countDocuments({ status: 'delivered' }),
      Order.countDocuments({ status: { $in: ['pending', 'processing'] } }),
      Inventory.countDocuments(),
    ]);
    res.json({ totalShipments, delivered, pendingOrders, inventoryItems });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/dashboard/chart
router.get('/chart', auth, async (req, res) => {
  try {
    const [shipmentsByMonth, ordersByCategory] = await Promise.all([
      ChartMonthly.find().sort({ _id: 1 }),
      ChartCategory.find().sort({ _id: 1 }),
    ]);
    res.json({ shipmentsByMonth, ordersByCategory });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/dashboard/notifications
router.get('/notifications', auth, async (req, res) => {
  try {
    const data = await Notification.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/dashboard/notifications/read-all
router.patch('/notifications/read-all', auth, async (req, res) => {
  try {
    await Notification.updateMany({}, { $set: { read: true } });
    res.json({ message: 'All marked as read' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// PATCH /api/dashboard/notifications/:id/read
router.patch('/notifications/:id/read', auth, async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(req.params.id, { $set: { read: true } });
    res.json({ message: 'Marked as read' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/dashboard/activity
router.get('/activity', auth, async (req, res) => {
  try {
    const data = await Activity.find().sort({ createdAt: -1 }).limit(10);
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
