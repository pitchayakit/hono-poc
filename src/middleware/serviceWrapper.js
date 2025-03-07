/**
 * Higher-order function that wraps service methods to handle errors
 * @param {Function} serviceMethod - The service method to wrap
 * @param {string} errorMessage - Default error message
 * @returns {Function} Wrapped service method with error handling
 */
function withErrorHandling(serviceMethod, errorMessage) {
  return async (...args) => {
    try {
      return await serviceMethod(...args);
    } catch (error) {
      console.error(`${errorMessage}:`, error);
      throw new Error(errorMessage);
    }
  };
}

/**
 * Wraps all methods of a service object with error handling
 * @param {Object} service - Service object with methods to wrap
 * @returns {Object} New service object with wrapped methods
 */
export function wrapServiceWithErrorHandling(service) {
  const wrappedService = {};
  
  for (const [key, method] of Object.entries(service)) {
    if (typeof method === 'function') {
      // Create a specific error message based on the method name
      const errorPrefix = key.startsWith('get') ? 'Failed to fetch' :
                          key.startsWith('create') ? 'Failed to create' :
                          key.startsWith('update') ? 'Failed to update' :
                          key.startsWith('delete') ? 'Failed to delete' :
                          'Failed to process';
      
      // Extract resource name from method (e.g., 'User' from 'getUser')
      const resourceName = key.replace(/^(get|create|update|delete)/, '');
      const formattedResourceName = resourceName.charAt(0).toLowerCase() + resourceName.slice(1);
      
      const errorMessage = `${errorPrefix} ${formattedResourceName}`;
      
      wrappedService[key] = withErrorHandling(method, errorMessage);
    } else {
      // Copy non-function properties as is
      wrappedService[key] = method;
    }
  }
  
  return wrappedService;
} 