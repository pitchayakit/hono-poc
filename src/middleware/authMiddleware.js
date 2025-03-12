import { CognitoJwtVerifier } from 'aws-jwt-verify';

// Create the Cognito JWT verifier outside the handler for better caching
const jwtVerifier = CognitoJwtVerifier.create({
  userPoolId: process.env.COGNITO_USER_POOL_ID,
  tokenUse: 'access', // or 'id' depending on your needs
  clientId: process.env.COGNITO_CLIENT_ID,
});

/**
 * Authentication middleware to verify and decode Cognito JWT tokens
 * 
 * @param {Object} c - Hono context object
 * @param {Function} next - Next middleware function
 * @returns {Promise<*>} - Next middleware result or error response
 */
async function authMiddleware(c, next) {
  try {
    // Get the authorization header
    const authHeader = c.req.header('Authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({
        error: 'Unauthorized',
        message: 'Authentication required'
      }, 401);
    }
    
    // Extract the token
    const token = authHeader.split(' ')[1];

    if (!token) {
      return c.json({
        error: 'Unauthorized',
        message: 'Authentication token is missing'
      }, 401);
    }
    
    // Verify the Cognito token
    const decodedToken = await jwtVerifier.verify(token);

    // Attach the user info to the request context for use in route handlers
    c.set('user', decodedToken);
    
    // Continue to the next middleware or route handler
    return await next();
  } catch (error) {
    console.error('Authentication error:', error);
    
    // Handle different types of verification errors
    if (error.name === 'TokenExpiredError') {
      return c.json({
        error: 'Unauthorized',
        message: 'Token has expired'
      }, 401);
    }
    
    if (error.name === 'JwtInvalidClaimError') {
      return c.json({
        error: 'Unauthorized',
        message: 'Invalid token claims'
      }, 401);
    }
    
    // For other errors, return a generic authentication error
    return c.json({
      error: 'Unauthorized',
      message: 'Invalid authentication token'
    }, 401);
  }
}

// Preload the JWKS to improve performance
// This is optional but recommended for production
const hydrateJwtVerifier = async () => {
  try {
    await jwtVerifier.hydrate();
    console.log('JWT verifier hydrated successfully');
  } catch (error) {
    console.error('Failed to hydrate JWT verifier:', error);
  }
};

// Initialize the verifier
hydrateJwtVerifier();

export { authMiddleware }; 