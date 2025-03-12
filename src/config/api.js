/**
 * API configuration for external services
 */

// User API configuration
export const userApiConfig = {
  baseUrl: process.env.USER_API_URL || 'http://localhost:1338',
  defaultToken: process.env.USER_API_TOKEN || 'your-default-token-here',
};

export { 
  API_ENDPOINTS,
}; 