require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connect = require('./db/connect');

const app = express();

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:5174',
  'http://localhost:8080',
  'http://127.0.0.1:5173',
  'http://127.0.0.1:8080',
  process.env.CLIENT_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth',      require('./routes/auth'));
app.use('/api/shipments', require('./routes/shipments'));
app.use('/api/inventory', require('./routes/inventory'));
app.use('/api/orders',    require('./routes/orders'));
app.use('/api/suppliers', require('./routes/suppliers'));
app.use('/api/dashboard', require('./routes/dashboard'));
app.use('/api/products',  require('./routes/products'));
app.use('/api/trucks',    require('./routes/trucks'));

app.get('/api/health', (_, res) => res.json({ status: 'ok', db: 'mongodb', time: new Date() }));
app.use((_, res) => res.status(404).json({ error: 'Route not found' }));

const PORT = process.env.PORT || 5000;

connect().then(() => {
  app.listen(PORT, () => console.log(`🚀 ChainFlow India API → http://localhost:${PORT}`));
}).catch((err) => {
  console.error('❌ Failed to start server:', err.message);
  process.exit(1);
});
