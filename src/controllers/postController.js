import { postService } from '../services/postService.js'

/**
 * Controller for handling post-related HTTP requests
 */
export const postController = {
  /**
   * Get all posts
   * @param {import('hono').Context} c - Hono context
   */
  async getAllPosts(c) {
    const posts = await postService.getAllPosts()
    return c.json(posts)
  },

  /**
   * Get a post by ID
   * @param {import('hono').Context} c - Hono context
   */
  async getPostById(c) {
    const id = parseInt(c.req.param('id'))
    const post = await postService.getPostById(id)
    
    if (!post) {
      return c.json({ error: 'Post not found' }, 404)
    }
    
    return c.json(post)
  },

  /**
   * Create a new post
   * @param {import('hono').Context} c - Hono context
   */
  async createPost(c) {
    const body = await c.req.json()
    
    if (!body.title || !body.content) {
      return c.json({ error: 'Title and content are required' }, 400)
    }
    
    const newPost = await postService.createPost(body)
    return c.json(newPost, 201)
  },

  /**
   * Update a post
   * @param {import('hono').Context} c - Hono context
   */
  async updatePost(c) {
    const id = parseInt(c.req.param('id'))
    const body = await c.req.json()
    
    const updatedPost = await postService.updatePost(id, body)
    
    if (!updatedPost) {
      return c.json({ error: 'Post not found' }, 404)
    }
    
    return c.json(updatedPost)
  },

  /**
   * Delete a post
   * @param {import('hono').Context} c - Hono context
   */
  async deletePost(c) {
    const id = parseInt(c.req.param('id'))
    const deleted = await postService.deletePost(id)
    
    if (!deleted) {
      return c.json({ error: 'Post not found' }, 404)
    }
    
    return c.json({ message: 'Post deleted successfully' })
  }
} 