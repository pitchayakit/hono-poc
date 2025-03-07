/**
 * Error handling middleware
 * @param {import('hono').Context} c - Hono context
 * @param {Function} next - Next middleware function
 */
export async function errorHandler(c, next) {
  try {
    await next()
  } catch (error) {
    console.error('Error:', error)
    
    // Handle Sequelize errors
    if (error.name === 'SequelizeValidationError') {
      return c.json({ error: error.errors[0].message }, 400)
    }
    
    if (error.name === 'SequelizeUniqueConstraintError') {
      return c.json({ error: 'A record with this data already exists' }, 409)
    }
    
    if (error.name === 'SequelizeForeignKeyConstraintError') {
      return c.json({ error: 'Invalid reference to another resource' }, 400)
    }
    
    // Default to 500 internal server error
    const status = error.status || 500
    const message = error.status ? error.message : 'Internal Server Error'
    
    return c.json({ error: message }, status)
  }
} 