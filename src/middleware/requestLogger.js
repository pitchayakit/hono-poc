/**
 * Request logging middleware
 * @param {import('hono').Context} c - Hono context
 * @param {Function} next - Next middleware function
 */
export async function requestLogger(c, next) {
  const method = c.req.method
  const path = c.req.path
  const start = Date.now()
  
  console.log(`[${new Date().toISOString()}] ${method} ${path} - Request received`)
  
  await next()
  
  const end = Date.now()
  const responseTime = end - start
  const status = c.res.status
  
  console.log(`[${new Date().toISOString()}] ${method} ${path} - Response sent (${status}) in ${responseTime}ms`)
} 