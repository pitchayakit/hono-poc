import { userService } from '../services/userService.js'

/**
 * Controller for handling user-related HTTP requests
 */
export const userController = {
  /**
   * Get all users
   * @param {import('hono').Context} c - Hono context
   */
  async getAllUsers(c) {
    const users = await userService.getAllUsers()
    return c.json(users)
  },

  /**
   * Get a user by ID
   * @param {import('hono').Context} c - Hono context
   */
  async getUserById(c) {
    const id = parseInt(c.req.param('id'))
    const user = await userService.getUserById(id)
    
    if (!user) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json(user)
  },

  /**
   * Create a new user
   * @param {import('hono').Context} c - Hono context
   */
  async createUser(c) {
    const body = await c.req.json()
    
    if (!body.name || !body.email) {
      return c.json({ error: 'Name and email are required' }, 400)
    }
    
    const newUser = await userService.createUser(body)
    return c.json(newUser, 201)
  },

  /**
   * Update a user
   * @param {import('hono').Context} c - Hono context
   */
  async updateUser(c) {
    const id = parseInt(c.req.param('id'))
    const body = await c.req.json()
    
    const updatedUser = await userService.updateUser(id, body)
    
    if (!updatedUser) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json(updatedUser)
  },

  /**
   * Delete a user
   * @param {import('hono').Context} c - Hono context
   */
  async deleteUser(c) {
    const id = parseInt(c.req.param('id'))
    const deleted = await userService.deleteUser(id)
    
    if (!deleted) {
      return c.json({ error: 'User not found' }, 404)
    }
    
    return c.json({ message: 'User deleted successfully' })
  }
} 