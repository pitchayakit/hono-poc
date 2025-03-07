import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import userRoutes from './routes/users.js'
import { errorHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'
import { testConnection } from './config/database.js'
import { syncDatabase } from './models/index.js'

// Initialize database
async function initDatabase() {
  await testConnection();
  await syncDatabase();
}

// Create Hono app instance
const app = new Hono()

// Global middleware
app.use('*', errorHandler)
app.use('*', requestLogger)
app.use('*', cors())

// Root route
app.get('/', (c) => {
  return c.json({
    message: 'Welcome to Hono API',
    version: '1.0.0',
    endpoints: {
      users: '/api/users'
    }
  })
})

// Mount routes
app.route('/api/users', userRoutes)

// Not found handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', message: 'The requested resource does not exist' }, 404)
})

// Start server
const port = process.env.PORT || 3000

// Initialize database and start server
initDatabase().then(() => {
  console.log(`Server is running on port ${port}`)
  
  serve({
    fetch: app.fetch,
    port: parseInt(port)
  })
}).catch(error => {
  console.error('Failed to initialize application:', error)
  process.exit(1)
}) 