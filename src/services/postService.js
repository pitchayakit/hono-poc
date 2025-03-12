import { Post } from '../models/index.js';
import { wrapServiceWithErrorHandling } from '../middleware/serviceWrapper.js';
import { userService } from './userService.js';

/**
 * Service for handling post-related operations
 */
const postServiceImplementation = {
  /**
   * Get all posts
   * @returns {Promise<Array>} Promise resolving to a list of all posts with user details
   */
  async getAllPosts() {
    const posts = await Post.findAll();
    
    return posts;
  },

  /**
   * Get a post by ID
   * @param {number} id - Post ID
   * @returns {Promise<Object|null>} Promise resolving to post object with user details or null if not found
   */
  async getPostById(id) {
    const post = await Post.findByPk(id);
    
    if (!post) {
      return null;
    }
    
    // Add user details to the post
    const userData = await userService.getUserById(post.userId);
    const postData = post.toJSON();
    
    return {
      ...postData,
      user: userData
    };
  },

  /**
   * Create a new post
   * @param {Object} postInput - Post data
   * @returns {Promise<Object>} Promise resolving to created post with user details
   */
  async createPost(postInput) {
    const post = await Post.create(postInput);
    
    // Add user details to the created post
    const userData = await userService.getUserById(post.userId);
    const postData = post.toJSON();
    
    return {
      ...postData,
      user: userData
    };
  },

  /**
   * Update a post
   * @param {number} id - Post ID
   * @param {Object} postInput - Post data to update
   * @returns {Promise<Object|null>} Promise resolving to updated post with user details or null if not found
   */
  async updatePost(id, postInput) {
    const post = await Post.findByPk(id);
    if (!post) {
      return null;
    }
    
    const updatedPost = await post.update(postInput);
    
    // Add user details to the updated post
    const userData = await userService.getUserById(updatedPost.userId);
    const postData = updatedPost.toJSON();
    
    return {
      ...postData,
      user: userData
    };
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