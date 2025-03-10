import { sequelize } from '../config/database.js';
import User from './User.js';

// Define relationships between models
// Example: User.hasMany(Post);

// Build associations if needed
const buildAssociations = () => {
  // Add your model associations here
  // Example: User.hasMany(Post);
  // Post.belongsTo(User);
};

// Initialize associations
buildAssociations();

// Export models and sequelize instance
export {
  sequelize,
  User
};

// For Sequelize CLI compatibility
export default {
  sequelize,
  User
}; 