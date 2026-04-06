const router = require('express').Router();
const Order  = require('../models/Order');
const auth   = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};
    if (status && status !== 'all') filter.status = status;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ code: re }, { customer: re }, { destination: re }];
    }
    const data = await Order.find(filter).sort({ createdAt: -1 });
    const formatted = data.map((o) => ({
      ...o.toObject(),
      total: `$${Number(o.total).toLocaleString()}`,
    }));
    res.json(formatted);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const doc = await Order.findById(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json({ ...doc.toObject(), total: `$${Number(doc.total).toLocaleString()}` });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const doc = await Order.create(req.body);
    res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Order code already exists' });
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const doc = await Order.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
