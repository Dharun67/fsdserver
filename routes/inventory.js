const router    = require('express').Router();
const Inventory = require('../models/Inventory');
const auth      = require('../middleware/auth');

const calcStatus = (qty) => qty === 0 ? 'out' : qty < 150 ? 'low' : 'in-stock';

router.get('/', auth, async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = { userId: req.user.id };
    if (status && status !== 'all') filter.status = status;
    if (search) {
      const re = new RegExp(search, 'i');
      filter.$or = [{ name: re }, { sku: re }, { category: re }];
    }
    const data = await Inventory.find(filter).sort({ createdAt: 1 });
    res.json(data);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

const warehouseMap = { '1': 'WH-01', '2': 'WH-02', '3': 'WH-03' };

router.post('/', auth, async (req, res) => {
  try {
    const qty = Number(req.body.quantity) || 0;
    const warehouse = warehouseMap[String(req.body.warehouse_id)] || req.body.warehouse || 'WH-01';
    const doc = await Inventory.create({ ...req.body, quantity: qty, status: calcStatus(qty), warehouse, userId: req.user.id });
    res.status(201).json(doc);
  } catch (err) {
    if (err.code === 11000) return res.status(409).json({ error: 'SKU already exists' });
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', auth, async (req, res) => {
  try {
    const qty = req.body.quantity !== undefined ? Number(req.body.quantity) : undefined;
    const update = { ...req.body };
    if (qty !== undefined) update.status = calcStatus(qty);
    const doc = await Inventory.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { $set: update },
      { new: true }
    );
    if (!doc) return res.status(404).json({ error: 'Not found' });
    res.json(doc);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    await Inventory.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    res.json({ message: 'Deleted' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

module.exports = router;
