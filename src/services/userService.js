import { userAdapter } from '../adapters/userAdapter.js';
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
    if (!userAdapter.isConfigured()) {
      throw new Error('User adapter is not configured with authentication');
    }
    return await userAdapter.getAllUsers();
  },

  /**
   * Get a user by ID
   * @param {string|number} userId - User ID
   * @returns {Promise<Object|null>} Promise resolving to user object or null if not found
   */
  async getUserById(userId) {
    if (!userAdapter.isConfigured()) {
      throw new Error('User adapter is not configured with authentication');
    }
    if (!userId) {
      throw new Error('User ID is required');
    }
    return await userAdapter.getUserById(userId);
  },
};

// Wrap the service with error handling
export const userService = wrapServiceWithErrorHandling(userServiceImplementation); 