require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const connect = require('./db/connect');

const app = express();

// Allow all origins — works for Vercel, Render, Netlify, Lovable
app.use(cors({ origin: '*', credentials: false }));
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
  app.listen(PORT, () => {
    console.log(`🚀 ChainFlow API → http://localhost:${PORT}`);
    
    // Keep-alive: ping self every 10 minutes to prevent Render sleep
    if (process.env.NODE_ENV === 'production') {
      setInterval(() => {
        const url = process.env.BACKEND_URL || 'https://chainflowbackend.onrender.com';
        fetch(`${url}/api/health`)
          .then(() => console.log('✅ Keep-alive ping successful'))
          .catch(() => console.log('⚠️ Keep-alive ping failed'));
      }, 10 * 60 * 1000); // 10 minutes
    }
  });
}).catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
  process.exit(1);
});
