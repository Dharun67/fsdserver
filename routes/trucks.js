const router = require('express').Router();
const Truck  = require('../models/Truck');
const auth   = require('../middleware/auth');

// GET /api/trucks
router.get('/', auth, async (req, res) => {
  try {
    const { status } = req.query;
    const filter = { userId: req.user.id };
    if (status && status !== 'all') filter.status = status;
    const data = await Truck.find(filter).sort({ createdAt: -1 });
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// GET /api/trucks/:id
router.get('/:id', auth, async (req, res) => {
  try {
    const doc = await Truck.findOne({ _id: req.params.id, userId: req.user.id });
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// POST /api/trucks
router.post('/', auth, async (req, res) => {
  try {
    const doc = await Truck.create({ ...req.body, userId: req.user.id });
    res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Truck ID already exists' });
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/trucks/:id
router.put('/:id', auth, async (req, res) => {
  try {
    const doc = await Truck.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

// DELETE /api/trucks/:id
router.delete('/:id', auth, async (req, res) => {
  try {
    await Truck.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
