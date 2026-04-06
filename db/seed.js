require('dotenv').config();
const bcrypt   = require('bcryptjs');
const connect  = require('./connect');
const User     = require('../models/User');
const Shipment = require('../models/Shipment');
const Inventory= require('../models/Inventory');
const Order    = require('../models/Order');
const Supplier = require('../models/Supplier');
const Notification = require('../models/Notification');
const { Activity, ChartMonthly, ChartCategory } = require('../models/Activity');
const Truck = require('../models/Truck');

async function seed() {
  await connect();
  console.log('🌱 Clearing old data...');
  await Promise.all([
    User.deleteMany(), Shipment.deleteMany(), Inventory.deleteMany(),
    Order.deleteMany(), Supplier.deleteMany(), Notification.deleteMany(),
    Activity.deleteMany(), ChartMonthly.deleteMany(), ChartCategory.deleteMany(),
    Truck.deleteMany(),
  ]);

  const hash = await bcrypt.hash('password123', 10);

  console.log('🌱 Seeding Tamil Nadu users...');
  await User.insertMany([
    { name: 'Arjun Murugan',    email: 'arjun@chainflow.com',      password: hash, role: 'admin',       company: 'ChainFlow TN Pvt Ltd' },
    { name: 'Priya Selvam',     email: 'priya@tnsupplier.com',     password: hash, role: 'supplier',    company: 'Chennai Freight Co' },
    { name: 'Karthik Rajan',    email: 'karthik@tndistrib.com',    password: hash, role: 'distributor', company: 'Coimbatore Logistics' },
    { name: 'Deepa Venkatesh',  email: 'deepa@tnretail.com',       password: hash, role: 'retailer',    company: 'Madurai Traders' },
    { name: 'Suresh Pandian',   email: 'suresh@tirupur.com',       password: hash, role: 'supplier',    company: 'Tirupur Textiles Ltd' },
    { name: 'Kavitha Nair',     email: 'kavitha@salem.com',        password: hash, role: 'distributor', company: 'Salem Steel Distributors' },
  ]);

  console.log('🌱 Seeding Tamil Nadu suppliers...');
  await Supplier.insertMany([
    { code: 'SUP-TN-001', name: 'Chennai Port Freight Co',     country: 'India', contact: '+91 44 2345 6789', category: 'Freight',    rating: 4.8, status: 'active',   shipments: 124, on_time: '97%' },
    { code: 'SUP-TN-002', name: 'Tirupur Textile Exports',     country: 'India', contact: '+91 421 234 5678', category: 'Textiles',   rating: 4.6, status: 'active',   shipments: 98,  on_time: '95%' },
    { code: 'SUP-TN-003', name: 'Coimbatore Auto Parts Ltd',   country: 'India', contact: '+91 422 345 6789', category: 'Auto Parts', rating: 4.5, status: 'active',   shipments: 76,  on_time: '93%' },
    { code: 'SUP-TN-004', name: 'Madurai Agro Exports',        country: 'India', contact: '+91 452 234 5678', category: 'Agro',       rating: 4.3, status: 'active',   shipments: 54,  on_time: '91%' },
    { code: 'SUP-TN-005', name: 'Salem Steel & Iron Works',    country: 'India', contact: '+91 427 234 5678', category: 'Steel',      rating: 4.7, status: 'active',   shipments: 87,  on_time: '96%' },
    { code: 'SUP-TN-006', name: 'Erode Handloom Suppliers',    country: 'India', contact: '+91 424 234 5678', category: 'Textiles',   rating: 4.1, status: 'active',   shipments: 43,  on_time: '89%' },
    { code: 'SUP-TN-007', name: 'Thoothukudi Port Logistics',  country: 'India', contact: '+91 461 234 5678', category: 'Freight',    rating: 4.4, status: 'active',   shipments: 61,  on_time: '92%' },
    { code: 'SUP-TN-008', name: 'Vellore Leather Exports',     country: 'India', contact: '+91 416 234 5678', category: 'Leather',    rating: 3.9, status: 'inactive', shipments: 18,  on_time: '84%' },
  ]);

  console.log('🌱 Seeding Tamil Nadu shipments...');
  await Shipment.insertMany([
    { code: 'SHP-TN-001', origin: 'Chennai, TN',    destination: 'Mumbai, MH',       status: 'delivered', eta: '2026-03-28', carrier: 'Chennai Port Freight Co',    weight: '3,200 kg' },
    { code: 'SHP-TN-002', origin: 'Tirupur, TN',    destination: 'Delhi, DL',        status: 'shipped',   eta: '2026-04-12', carrier: 'Tirupur Textile Exports',    weight: '1,800 kg' },
    { code: 'SHP-TN-003', origin: 'Coimbatore, TN', destination: 'Pune, MH',         status: 'packed',    eta: '2026-04-18', carrier: 'Coimbatore Auto Parts Ltd',  weight: '4,500 kg' },
    { code: 'SHP-TN-004', origin: 'Madurai, TN',    destination: 'Hyderabad, TS',    status: 'ordered',   eta: '2026-04-25', carrier: 'Madurai Agro Exports',       weight: '2,100 kg' },
    { code: 'SHP-TN-005', origin: 'Salem, TN',      destination: 'Bengaluru, KA',    status: 'shipped',   eta: '2026-04-10', carrier: 'Salem Steel & Iron Works',   weight: '6,700 kg' },
    { code: 'SHP-TN-006', origin: 'Chennai, TN',    destination: 'Kolkata, WB',      status: 'delivered', eta: '2026-03-30', carrier: 'Chennai Port Freight Co',    weight: '1,200 kg' },
    { code: 'SHP-TN-007', origin: 'Erode, TN',      destination: 'Ahmedabad, GJ',    status: 'shipped',   eta: '2026-04-14', carrier: 'Erode Handloom Suppliers',   weight: '950 kg'   },
    { code: 'SHP-TN-008', origin: 'Thoothukudi, TN',destination: 'Kochi, KL',        status: 'packed',    eta: '2026-04-08', carrier: 'Thoothukudi Port Logistics', weight: '2,800 kg' },
    { code: 'SHP-TN-009', origin: 'Vellore, TN',    destination: 'Chennai, TN',      status: 'delivered', eta: '2026-04-02', carrier: 'Vellore Leather Exports',    weight: '750 kg'   },
    { code: 'SHP-TN-010', origin: 'Tirunelveli, TN',destination: 'Visakhapatnam, AP',status: 'ordered',   eta: '2026-04-30', carrier: 'Chennai Port Freight Co',    weight: '3,400 kg' },
    { code: 'SHP-TN-011', origin: 'Coimbatore, TN', destination: 'Singapore',        status: 'shipped',   eta: '2026-04-20', carrier: 'Coimbatore Auto Parts Ltd',  weight: '5,100 kg' },
    { code: 'SHP-TN-012', origin: 'Chennai, TN',    destination: 'Dubai, UAE',       status: 'packed',    eta: '2026-04-22', carrier: 'Chennai Port Freight Co',    weight: '4,200 kg' },
  ]);

  console.log('🌱 Seeding Tamil Nadu inventory...');
  await Inventory.insertMany([
    { name: 'Cotton Fabric Rolls',         sku: 'TN-CF-001', quantity: 3200, status: 'in-stock', category: 'Textiles',   warehouse: 'WH-Tirupur'    },
    { name: 'Auto Engine Components',      sku: 'TN-AE-002', quantity: 145,  status: 'low',      category: 'Auto Parts', warehouse: 'WH-Coimbatore' },
    { name: 'Basmati Rice Bags (50kg)',    sku: 'TN-BR-003', quantity: 0,    status: 'out',      category: 'Agro',       warehouse: 'WH-Madurai'    },
    { name: 'Steel Rods (12mm)',           sku: 'TN-SR-004', quantity: 1850, status: 'in-stock', category: 'Steel',      warehouse: 'WH-Salem'      },
    { name: 'Leather Shoe Uppers',         sku: 'TN-LS-005', quantity: 80,   status: 'low',      category: 'Leather',    warehouse: 'WH-Vellore'    },
    { name: 'Silk Saree Fabric',           sku: 'TN-SS-006', quantity: 620,  status: 'in-stock', category: 'Textiles',   warehouse: 'WH-Kanchipuram'},
    { name: 'Granite Blocks (Black)',      sku: 'TN-GB-007', quantity: 2400, status: 'in-stock', category: 'Minerals',   warehouse: 'WH-Chennai'    },
    { name: 'Turmeric Powder (1kg)',       sku: 'TN-TP-008', quantity: 0,    status: 'out',      category: 'Agro',       warehouse: 'WH-Erode'      },
    { name: 'Pump Motor Sets',             sku: 'TN-PM-009', quantity: 310,  status: 'in-stock', category: 'Machinery',  warehouse: 'WH-Coimbatore' },
    { name: 'Handloom Bedsheets',          sku: 'TN-HB-010', quantity: 95,   status: 'low',      category: 'Textiles',   warehouse: 'WH-Erode'      },
    { name: 'Cashew Nuts (Export Grade)',  sku: 'TN-CN-011', quantity: 1100, status: 'in-stock', category: 'Agro',       warehouse: 'WH-Thoothukudi'},
    { name: 'Cement Bags (50kg)',          sku: 'TN-CB-012', quantity: 4500, status: 'in-stock', category: 'Materials',  warehouse: 'WH-Chennai'    },
  ]);

  console.log('🌱 Seeding Tamil Nadu orders...');
  await Order.insertMany([
    { code: 'ORD-TN-1001', customer: 'Reliance Retail, Mumbai',      items: 15, total: 185000, status: 'delivered',  destination: 'Mumbai, MH',       order_date: '2026-03-25' },
    { code: 'ORD-TN-1002', customer: 'Fab India, Delhi',             items: 8,  total: 92000,  status: 'shipped',    destination: 'Delhi, DL',        order_date: '2026-04-01' },
    { code: 'ORD-TN-1003', customer: 'Tata Motors, Pune',            items: 32, total: 540000, status: 'processing', destination: 'Pune, MH',         order_date: '2026-04-03' },
    { code: 'ORD-TN-1004', customer: 'BigBasket, Bengaluru',         items: 5,  total: 48000,  status: 'pending',    destination: 'Bengaluru, KA',    order_date: '2026-04-05' },
    { code: 'ORD-TN-1005', customer: 'Decathlon India, Hyderabad',   items: 20, total: 215000, status: 'shipped',    destination: 'Hyderabad, TS',    order_date: '2026-03-30' },
    { code: 'ORD-TN-1006', customer: 'Amazon India, Kolkata',        items: 12, total: 134000, status: 'delivered',  destination: 'Kolkata, WB',      order_date: '2026-03-22' },
    { code: 'ORD-TN-1007', customer: 'Flipkart, Bengaluru',          items: 25, total: 310000, status: 'processing', destination: 'Bengaluru, KA',    order_date: '2026-04-04' },
    { code: 'ORD-TN-1008', customer: 'Nalli Silks, Chennai',         items: 6,  total: 78000,  status: 'delivered',  destination: 'Chennai, TN',      order_date: '2026-03-20' },
    { code: 'ORD-TN-1009', customer: 'Gulf Exports LLC, Dubai',      items: 18, total: 425000, status: 'shipped',    destination: 'Dubai, UAE',       order_date: '2026-04-06' },
    { code: 'ORD-TN-1010', customer: 'Singapore Textiles Pte',       items: 10, total: 198000, status: 'pending',    destination: 'Singapore',        order_date: '2026-04-07' },
  ]);

  console.log('🌱 Seeding Tamil Nadu notifications...');
  await Notification.insertMany([
    { type: 'warning', title: 'Low Stock — Auto Parts',     message: 'Auto Engine Components at WH-Coimbatore running low (145 units)',  time: '10 min ago',  read: false },
    { type: 'success', title: 'Delivery Complete',          message: 'SHP-TN-001 delivered to Mumbai from Chennai',                       time: '1 hour ago',  read: false },
    { type: 'error',   title: 'Shipment Delayed',           message: 'SHP-TN-005 Salem to Bengaluru delayed due to highway closure',      time: '2 hours ago', read: false },
    { type: 'warning', title: 'Out of Stock — Rice',        message: 'Basmati Rice Bags out of stock at WH-Madurai',                      time: '3 hours ago', read: false },
    { type: 'info',    title: 'New Order — Tata Motors',    message: 'ORD-TN-1003 placed by Tata Motors, Pune — ₹5,40,000',              time: '4 hours ago', read: true  },
    { type: 'success', title: 'Delivery Complete',          message: 'SHP-TN-006 delivered to Kolkata from Chennai',                      time: '6 hours ago', read: true  },
    { type: 'warning', title: 'Low Stock — Leather',        message: 'Leather Shoe Uppers at WH-Vellore critically low (80 units)',       time: '8 hours ago', read: true  },
    { type: 'info',    title: 'New Supplier Registered',    message: 'Thoothukudi Port Logistics added as freight partner',               time: '1 day ago',   read: true  },
  ]);

  console.log('🌱 Seeding Tamil Nadu activity...');
  await Activity.insertMany([
    { action: 'Order placed',        detail: 'ORD-TN-1003 by Tata Motors, Pune — ₹5,40,000',      icon: 'package'   },
    { action: 'Shipment delivered',  detail: 'SHP-TN-001 Chennai → Mumbai successfully delivered', icon: 'check'     },
    { action: 'Inventory updated',   detail: 'Steel Rods (12mm) restocked at WH-Salem (+500 units)',icon: 'warehouse' },
    { action: 'Delay reported',      detail: 'SHP-TN-005 Salem → Bengaluru delayed by 1 day',      icon: 'alert'     },
    { action: 'Order shipped',       detail: 'ORD-TN-1009 dispatched to Dubai via Chennai Port',   icon: 'truck'     },
    { action: 'New supplier added',  detail: 'Thoothukudi Port Logistics registered',              icon: 'user'      },
    { action: 'Shipment packed',     detail: 'SHP-TN-008 Thoothukudi → Kochi ready for dispatch',  icon: 'package'   },
    { action: 'Order delivered',     detail: 'ORD-TN-1008 Nalli Silks Chennai order completed',    icon: 'check'     },
  ]);

  console.log('🌱 Seeding Tamil Nadu chart data...');
  await ChartMonthly.insertMany([
    { month: 'Jan', shipped: 58,  delivered: 54 },
    { month: 'Feb', shipped: 72,  delivered: 68 },
    { month: 'Mar', shipped: 85,  delivered: 79 },
    { month: 'Apr', shipped: 61,  delivered: 52 },
    { month: 'May', shipped: 94,  delivered: 88 },
    { month: 'Jun', shipped: 78,  delivered: 73 },
  ]);
  await ChartCategory.insertMany([
    { category: 'Textiles',   value: 32 },
    { category: 'Auto Parts', value: 22 },
    { category: 'Agro',       value: 18 },
    { category: 'Steel',      value: 15 },
    { category: 'Leather',    value: 8  },
    { category: 'Others',     value: 5  },
  ]);

  console.log('✅ Tamil Nadu seed complete!');

  console.log('🌱 Seeding Tamil Nadu trucks...');
  await Truck.insertMany([
    {
      truckId: 'TRK-TN-001', driver: 'Ravi Kumar', route: 'Chennai → Coimbatore',
      origin: 'Chennai', destination: 'Coimbatore', status: 'on-time',
      etaTime: '18:00', currentLocation: 'Salem Toll',
      products: [
        { name: 'TV',              count: 20, icon: '📺' },
        { name: 'Fridge',          count: 39, icon: '🧊' },
        { name: 'Washing Machine', count: 12, icon: '🫧' },
      ],
    },
    {
      truckId: 'TRK-TN-002', driver: 'Murugan S', route: 'Madurai → Trichy',
      origin: 'Madurai', destination: 'Trichy', status: 'delayed',
      etaTime: '09:00', currentLocation: 'Dindigul',
      products: [
        { name: 'TV',        count: 15, icon: '📺' },
        { name: 'AC',        count: 8,  icon: '❄️' },
        { name: 'Microwave', count: 25, icon: '📡' },
      ],
    },
    {
      truckId: 'TRK-TN-003', driver: 'Senthil P', route: 'Tirunelveli → Chennai',
      origin: 'Tirunelveli', destination: 'Chennai', status: 'delivered',
      etaTime: '08:00', currentLocation: 'Chennai Hub',
      products: [
        { name: 'Fridge', count: 30, icon: '🧊' },
        { name: 'TV',     count: 18, icon: '📺' },
      ],
    },
    {
      truckId: 'TRK-TN-004', driver: 'Arjun V', route: 'Vellore → Salem',
      origin: 'Vellore', destination: 'Salem', status: 'delayed',
      etaTime: '11:00', currentLocation: 'Krishnagiri',
      products: [
        { name: 'AC',     count: 22, icon: '❄️' },
        { name: 'Fridge', count: 10, icon: '🧊' },
        { name: 'TV',     count: 5,  icon: '📺' },
      ],
    },
  ]);

  console.log('✅ Seed complete!');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
