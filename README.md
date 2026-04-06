# ChainFlow Backend — fsdserver

Node.js + Express + MongoDB backend for the ChainFlow Tamil Nadu Supply Chain System.

## Tech Stack
- Node.js + Express
- MongoDB Atlas + Mongoose
- JWT Authentication
- bcryptjs for password hashing

## Project Structure
```
fsdserver/
├── db/
│   ├── connect.js      # MongoDB connection
│   └── seed.js         # Tamil Nadu seed data
├── middleware/
│   └── auth.js         # JWT auth middleware
├── models/
│   ├── User.js
│   ├── Shipment.js
│   ├── Inventory.js
│   ├── Order.js
│   ├── Supplier.js
│   ├── Notification.js
│   ├── Activity.js
│   ├── Truck.js
│   └── Product.js
├── routes/
│   ├── auth.js         # login, register, me
│   ├── dashboard.js    # summary, chart, notifications, activity
│   ├── shipments.js    # CRUD
│   ├── inventory.js    # CRUD
│   ├── orders.js       # CRUD
│   ├── suppliers.js    # CRUD
│   ├── trucks.js       # CRUD
│   └── products.js     # CRUD
├── index.js            # Express app entry point
├── package.json
└── .env.example        # Environment variable template
```

## Setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create `.env` file
```
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/chainflow
JWT_SECRET=your_strong_secret_here
JWT_EXPIRES_IN=7d
```

### 3. Seed the database
```bash
npm run seed
```

### 4. Start the server
```bash
npm run dev      # development
npm start        # production
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login |
| GET | /api/auth/me | Get current user |
| PUT | /api/auth/me | Update profile |
| PUT | /api/auth/change-password | Change password |
| GET | /api/dashboard/summary | KPI counts |
| GET | /api/dashboard/chart | Chart data |
| GET | /api/dashboard/notifications | Notifications |
| PATCH | /api/dashboard/notifications/read-all | Mark all read |
| GET | /api/dashboard/activity | Activity feed |
| GET/POST | /api/shipments | List / Create |
| PUT/DELETE | /api/shipments/:id | Update / Delete |
| GET/POST | /api/inventory | List / Create |
| PUT/DELETE | /api/inventory/:id | Update / Delete |
| GET/POST | /api/orders | List / Create |
| PUT/DELETE | /api/orders/:id | Update / Delete |
| GET/POST | /api/suppliers | List / Create |
| GET/POST | /api/trucks | List / Create |

## Demo Accounts (after seed)
| Email | Password | Role |
|-------|----------|------|
| arjun@chainflow.com | password123 | Admin |
| priya@tnsupplier.com | password123 | Supplier |
| karthik@tndistrib.com | password123 | Distributor |
| deepa@tnretail.com | password123 | Retailer |

## Deployment (Render)
1. Connect this repo to Render
2. Set environment variables in Render dashboard
3. Start command: `node index.js`
