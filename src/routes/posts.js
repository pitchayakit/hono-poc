import { Hono } from 'hono'
import { postController } from '../controllers/postController.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

const posts = new Hono()

// Apply auth middleware to all post routes
posts.use('*', authMiddleware)

// Get all posts
posts.get('/', postController.getAllPosts)

// Get post by ID
posts.get('/:id', postController.getPostById)

// Create a new post
posts.post('/', postController.createPost)

// Update a post
posts.put('/:id', postController.updatePost)

// Delete a post
posts.delete('/:id', postController.deletePost)

export default posts 