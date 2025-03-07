import { User } from '../models/index.js';
import { wrapServiceWithErrorHandling } from '../middleware/serviceWrapper.js';

/**
 * Service for handling user-related operations
 */
const userServiceImplementation = {
  /**
   * Get all users
   * @returns {Promise<Array>} Promise resolving to a list of all users
   */
  async getAllUsers() {
    return await User.findAll();
  },

  /**
   * Get a user by ID
   * @param {number} id - User ID
   * @returns {Promise<Object|null>} Promise resolving to user object or null if not found
   */
  async getUserById(id) {
    return await User.findByPk(id);
  },

  /**
   * Create a new user
   * @param {Object} userInput - User data
   * @returns {Promise<Object>} Promise resolving to created user
   */
  async createUser(userInput) {
    return await User.create(userInput);
  },

  /**
   * Update a user
   * @param {number} id - User ID
   * @param {Object} userInput - User data to update
   * @returns {Promise<Object|null>} Promise resolving to updated user or null if not found
   */
  async updateUser(id, userInput) {
    const user = await User.findByPk(id);
    if (!user) {
      return null;
    }
    
    return await user.update(userInput);
  },

  /**
   * Delete a user
   * @param {number} id - User ID
   * @returns {Promise<boolean>} Promise resolving to true if deleted, false if not found
   */
  async deleteUser(id) {
    const rowsDeleted = await User.destroy({ where: { id } });
    return rowsDeleted > 0;
  }
};

// Wrap the service with error handling
export const userService = wrapServiceWithErrorHandling(userServiceImplementation); 