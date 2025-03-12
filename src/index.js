import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { cors } from 'hono/cors'
import postRoutes from './routes/posts.js'
import { errorHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'

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
      posts: '/api/posts',
      users: '/api/users'
    }
  })
})

// Mount routes
app.route('/api/posts', postRoutes)

// Not found handler
app.notFound((c) => {
  return c.json({ error: 'Not Found', message: 'The requested resource does not exist' }, 404)
})

// Start server
const port = process.env.PORT || 3000

// Start server directly - database initialization is handled via migrations
console.log(`Server is running on port ${port}`)
serve({
  fetch: app.fetch,
  port: parseInt(port)
}) 