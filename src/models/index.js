import { sequelize } from '../config/database.js';
import Post from './Post.js';

// Define relationships between models
// Example: Post.hasMany(Comment);

// Build associations if needed
const buildAssociations = () => {
  // Add your model associations here
  // Example: Post.hasMany(Comment);
  // Comment.belongsTo(Post);
};

// Initialize associations
buildAssociations();

// Export models and sequelize instance
export {
  sequelize,
  Post
};

// For Sequelize CLI compatibility
export default {
  sequelize,
  Post
}; 