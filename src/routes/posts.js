import { Hono } from 'hono'
import { postController } from '../controllers/postController.js'

const posts = new Hono()

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