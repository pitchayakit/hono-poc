import { sequelize } from '../config/database.js';
import User from './User.js';

// Define relations between models (if needed)
// Example: User.hasMany(Post);

// Function to sync database with models
async function syncDatabase() {
  try {
    await sequelize.sync({ alter: process.env.NODE_ENV === 'development' });
    console.log('Database synchronized successfully');
    
    // Create initial data if needed
    if (process.env.NODE_ENV === 'development') {
      await createInitialData();
    }
  } catch (error) {
    console.error('Error synchronizing database:', error);
  }
}

// Function to create initial data for development
async function createInitialData() {
  try {
    // Check if users exist
    const count = await User.count();
    
    if (count === 0) {
      console.log('Creating initial users...');
      await User.bulkCreate([
        { name: 'John Doe', email: 'john@example.com' },
        { name: 'Jane Smith', email: 'jane@example.com' },
        { name: 'Bob Johnson', email: 'bob@example.com' }
      ]);
      console.log('Initial users created successfully');
    } else {
      console.log('Users already exist, skipping initial data creation');
    }
  } catch (error) {
    console.error('Error creating initial data:', error);
  }
}

// Export models and sync function
export {
  User,
  syncDatabase
}; 