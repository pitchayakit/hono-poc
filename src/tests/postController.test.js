import { postController } from '../controllers/postController.js';
import { postService } from '../services/postService.js';

// Mock the postService
jest.mock('../services/postService.js');

describe('Post Controller', () => {
  let mockContext;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Mock Hono context
    mockContext = {
      json: jest.fn((data, status) => ({ body: data, status: status || 200 })),
      req: {
        param: jest.fn(),
        json: jest.fn()
      }
    };
  });
  
  describe('getAllPosts', () => {
    test('should return all posts', async () => {
      const mockPosts = [{ id: 1, title: 'Test Post', content: 'Test content' }];
      postService.getAllPosts.mockResolvedValue(mockPosts);
      
      const result = await postController.getAllPosts(mockContext);
      
      expect(postService.getAllPosts).toHaveBeenCalled();
      expect(mockContext.json).toHaveBeenCalledWith(mockPosts);
      expect(result.body).toEqual(mockPosts);
    });
  });
  
  describe('getPostById', () => {
    test('should return a post when it exists', async () => {
      const mockPost = { id: 1, title: 'Test Post', content: 'Test content' };
      mockContext.req.param.mockReturnValue('1');
      postService.getPostById.mockResolvedValue(mockPost);
      
      const result = await postController.getPostById(mockContext);
      
      expect(postService.getPostById).toHaveBeenCalledWith(1);
      expect(mockContext.json).toHaveBeenCalledWith(mockPost);
      expect(result.body).toEqual(mockPost);
    });
    
    test('should return 404 when post not found', async () => {
      mockContext.req.param.mockReturnValue('999');
      postService.getPostById.mockResolvedValue(null);
      
      const result = await postController.getPostById(mockContext);
      
      expect(postService.getPostById).toHaveBeenCalledWith(999);
      expect(mockContext.json).toHaveBeenCalledWith({ error: 'Post not found' }, 404);
      expect(result.status).toBe(404);
    });
  });
}); 