const router   = require('express').Router();
const Supplier = require('../models/Supplier');
const auth     = require('../middleware/auth');

router.get('/', auth, async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = { userId: req.user.id };
    if (status && status !== 'all') filter.status = status;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ name: re }, { country: re }, { category: re }];
    }
    const data = await Supplier.find(filter).sort({ createdAt: 1 });
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.post('/', auth, async (req, res) => {
  try {
    const doc = await Supplier.create({ ...req.body, userId: req.user.id });
    res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'Supplier code already exists' });
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const doc = await Supplier.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: req.body },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
