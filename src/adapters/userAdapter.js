/**
 * Adapter for handling user-related API calls
 */
import axios from 'axios';
import { userApiConfig } from '../config/api.js';

// Get API URL from config
const API_URL = userApiConfig.baseUrl;

// Token configuration - initialize with default token from config
let authToken = userApiConfig.defaultToken;

/**
 * Creates a configured axios instance with authentication
 * @returns {Object} Configured axios instance
 */
function createApiClient() {
  if (!authToken) {
    throw new Error('Authentication token not configured');
  }
  
  return axios.create({
    baseURL: API_URL,
    headers: {
      'Authorization': `Bearer ${authToken}`,
      'Content-Type': 'application/json'
    }
  });
}

/**
 * User adapter for external API calls
 */
export const userAdapter = {
  /**
   * Configure the adapter with authentication token
   * @param {string} token - Bearer token for authentication
   */
  configure(token) {
    if (!token) {
      throw new Error('Authentication token is required');
    }
    authToken = token;
  },
  
  /**
   * Reset to default token from configuration
   */
  resetToDefaultToken() {
    authToken = userApiConfig.defaultToken;
  },
  
  /**
   * Clear the configured token
   */
  clearToken() {
    authToken = null;
  },
  
  /**
   * Check if adapter is configured with token
   * @returns {boolean} True if token is configured
   */
  isConfigured() {
    return !!authToken;
  },

  /**
   * Get current base URL
   * @returns {string} The base URL
   */
  getBaseUrl() {
    return API_URL;
  },

  /**
   * Fetch all users from the API
   * @returns {Promise<Array>} Promise resolving to array of users
   */
  async getAllUsers() {
    const apiClient = createApiClient();
    const endpoint = userApiConfig.endpoints.getAllUsers;
    const response = await apiClient.get(endpoint);
    return response.data;
  },

  /**
   * Fetch a specific user by ID
   * @param {string|number} userId - User ID
   * @returns {Promise<Object>} Promise resolving to user object
   */
  async getUserById(userId) {
    if (!userId) {
      throw new Error('User ID is required');
    }
    const apiClient = createApiClient();
    const endpoint = userApiConfig.endpoints.getUserById(userId);
    const response = await apiClient.get(endpoint);
    return response.data;
  }
}; 