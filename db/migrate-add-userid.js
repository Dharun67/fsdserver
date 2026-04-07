const mongoose = require('mongoose');
require('dotenv').config();

async function migrate() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const collections = [
      'orders',
      'inventories',
      'shipments',
      'products',
      'notifications',
      'activities',
      'suppliers',
      'trucks'
    ];

    console.log('\nCleaning existing data (since userId is required)...');
    for (const collection of collections) {
      const result = await mongoose.connection.db.collection(collection).deleteMany({});
      console.log(`Deleted ${result.deletedCount} documents from ${collection}`);
    }

    console.log('\nMigration completed! All collections are now ready for user-specific data.');
    console.log('Users can now create their own data after logging in.');
    
    await mongoose.connection.close();
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
