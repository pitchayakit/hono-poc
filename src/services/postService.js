import { Post } from '../models/index.js';
import { wrapServiceWithErrorHandling } from '../middleware/serviceWrapper.js';

/**
 * Service for handling post-related operations
 */
const postServiceImplementation = {
  /**
   * Get all posts
   * @returns {Promise<Array>} Promise resolving to a list of all posts
   */
  async getAllPosts() {
    return await Post.findAll();
  },

  /**
   * Get a post by ID
   * @param {number} id - Post ID
   * @returns {Promise<Object|null>} Promise resolving to post object or null if not found
   */
  async getPostById(id) {
    return await Post.findByPk(id);
  },

  /**
   * Create a new post
   * @param {Object} postInput - Post data
   * @returns {Promise<Object>} Promise resolving to created post
   */
  async createPost(postInput) {
    return await Post.create(postInput);
  },

  /**
   * Update a post
   * @param {number} id - Post ID
   * @param {Object} postInput - Post data to update
   * @returns {Promise<Object|null>} Promise resolving to updated post or null if not found
   */
  async updatePost(id, postInput) {
    const post = await Post.findByPk(id);
    if (!post) {
      return null;
    }
    
    return await post.update(postInput);
  },

  /**
   * Delete a post
   * @param {number} id - Post ID
   * @returns {Promise<boolean>} Promise resolving to true if deleted, false if not found
   */
  async deletePost(id) {
    const rowsDeleted = await Post.destroy({ where: { id } });
    return rowsDeleted > 0;
  }
};

// Wrap the service with error handling
export const postService = wrapServiceWithErrorHandling(postServiceImplementation); 