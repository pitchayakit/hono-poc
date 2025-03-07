import { Hono } from 'hono'
import { userController } from '../controllers/userController.js'

const users = new Hono()

// Get all users
users.get('/', userController.getAllUsers)

// Get user by ID
users.get('/:id', userController.getUserById)

// Create a new user
users.post('/', userController.createUser)

// Update a user
users.put('/:id', userController.updateUser)

// Delete a user
users.delete('/:id', userController.deleteUser)

export default users 