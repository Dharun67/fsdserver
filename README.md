# TrackFlow - Supply Chain Management Backend

RESTful API backend for supply chain management system built with Node.js, Express, and MongoDB.

## Features

- 🔐 **JWT Authentication** - Secure user authentication
- 👤 **User Isolation** - Each user's data is completely isolated
- 📦 **Inventory API** - Manage inventory items and stock levels
- 🚚 **Shipment API** - Track shipments and deliveries
- 📋 **Order API** - Create and manage orders
- 🏢 **Supplier API** - Manage supplier relationships
- 🚛 **Truck API** - Track delivery vehicles
- 📊 **Dashboard API** - Get summary statistics
- 🔔 **Notifications** - Real-time alerts and notifications

## Tech Stack

- **Node.js** - Runtime environment
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **bcrypt** - Password hashing

## Prerequisites

- Node.js 16+
- MongoDB 4.4+

## Installation

```bash
# Install dependencies
npm install
```

## Environment Variables

Create a `.env` file in the root directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trackflow
JWT_SECRET=your_super_secret_jwt_key_change_this
NODE_ENV=development
```

## Database Setup

```bash
# Start MongoDB
mongod

# Run migration to clean old data (IMPORTANT!)
node db/migrate-add-userid.js
```

## Development

```bash
# Start server
npm start

# Start with nodemon (auto-reload)
npm run dev
```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

```
POST /api/auth/register - Register new user
POST /api/auth/login    - Login user
GET  /api/auth/me       - Get current user
```

### Orders

```
GET    /api/orders     - Get all orders (user-specific)
GET    /api/orders/:id - Get order by ID
POST   /api/orders     - Create new order
PUT    /api/orders/:id - Update order
DELETE /api/orders/:id - Delete order
```

### Shipments

```
GET    /api/shipments     - Get all shipments (user-specific)
GET    /api/shipments/:id - Get shipment by ID
POST   /api/shipments     - Create new shipment
PUT    /api/shipments/:id - Update shipment
DELETE /api/shipments/:id - Delete shipment
```

### Inventory

```
GET    /api/inventory     - Get all inventory items (user-specific)
POST   /api/inventory     - Create new item
PUT    /api/inventory/:id - Update item
DELETE /api/inventory/:id - Delete item
```

### Products

```
GET    /api/products     - Get all products (user-specific)
GET    /api/products/:id - Get product by ID
POST   /api/products     - Create new product
PUT    /api/products/:id - Update product
DELETE /api/products/:id - Delete product
```

### Suppliers

```
GET    /api/suppliers     - Get all suppliers (user-specific)
POST   /api/suppliers     - Create new supplier
PUT    /api/suppliers/:id - Update supplier
```

### Trucks

```
GET    /api/trucks     - Get all trucks (user-specific)
GET    /api/trucks/:id - Get truck by ID
POST   /api/trucks     - Create new truck
PUT    /api/trucks/:id - Update truck
DELETE /api/trucks/:id - Delete truck
```

### Dashboard

```
GET /api/dashboard/summary       - Get dashboard statistics
GET /api/dashboard/chart         - Get chart data
GET /api/dashboard/notifications - Get notifications
GET /api/dashboard/activity      - Get recent activity
```

## Authentication

All endpoints (except `/api/auth/register` and `/api/auth/login`) require authentication.

Include JWT token in request headers:

```
Authorization: Bearer <your_jwt_token>
```

## Data Isolation

Each user's data is completely isolated:
- Users can only see their own orders, shipments, inventory, etc.
- All queries are automatically filtered by `userId`
- Users cannot access or modify other users' data

## Database Models

### User
- name, email, password, role, company

### Order
- code, customer, items, total, status, destination, userId

### Shipment
- code, origin, destination, status, eta, carrier, products, userId

### Inventory
- name, sku, quantity, status, category, warehouse, userId

### Product
- name, sku, category, price, cost, quantity, supplier, userId

### Supplier
- code, name, country, contact, category, rating, userId

### Truck
- truckId, driver, route, origin, destination, status, userId

## Error Handling

API returns standard HTTP status codes:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `409` - Conflict (duplicate)
- `500` - Server Error

Error response format:

```json
{
  "error": "Error message here"
}
```

## Security Features

- ✅ Password hashing with bcrypt
- ✅ JWT token authentication
- ✅ User data isolation
- ✅ Protected routes with auth middleware
- ✅ Input validation
- ✅ CORS enabled

## Migration Guide

If you have existing data without `userId` fields:

```bash
node db/migrate-add-userid.js
```

This will clean all existing data. See `USER-ISOLATION-README.md` for details.

## Project Structure

```
fsdserver/
├── db/
│   ├── connect.js           # MongoDB connection
│   ├── schema.sql           # Database schema reference
│   ├── seed.js              # Seed data
│   └── migrate-add-userid.js # Migration script
├── middleware/
│   └── auth.js              # JWT authentication middleware
├── models/
│   ├── User.js
│   ├── Order.js
│   ├── Shipment.js
│   ├── Inventory.js
│   ├── Product.js
│   ├── Supplier.js
│   ├── Truck.js
│   ├── Notification.js
│   └── Activity.js
├── routes/
│   ├── auth.js
│   ├── orders.js
│   ├── shipments.js
│   ├── inventory.js
│   ├── products.js
│   ├── suppliers.js
│   ├── trucks.js
│   └── dashboard.js
├── index.js                 # Entry point
├── package.json
└── .env
```

## Testing

```bash
# Test with curl
curl http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"password123"}'
```

## Deployment

### Environment Variables

Set these in production:

```env
PORT=5000
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/trackflow
JWT_SECRET=your_production_secret_key
NODE_ENV=production
```

### Heroku

```bash
heroku create your-app-name
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_secret
git push heroku main
```

### Docker

```bash
docker build -t trackflow-api .
docker run -p 5000:5000 --env-file .env trackflow-api
```

## Troubleshooting

### MongoDB Connection Issues

- Ensure MongoDB is running
- Check `MONGODB_URI` in `.env`
- Verify network connectivity

### Authentication Errors

- Check JWT_SECRET is set
- Verify token format in headers
- Check token expiration

### Data Not Showing

- Ensure user is logged in
- Check userId is being set correctly
- Run migration if upgrading from old version

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT License
