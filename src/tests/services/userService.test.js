import { jest } from '@jest/globals';
import { userService } from '../../services/userService.js';
import { userAdapter } from '../../adapters/userAdapter.js';

// Mock the userAdapter
jest.mock('../../adapters/userAdapter.js', () => ({
  userAdapter: {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    configure: jest.fn(),
    clearToken: jest.fn(),
    resetToDefaultToken: jest.fn(),
    isConfigured: jest.fn(),
    getBaseUrl: jest.fn()
  }
}));

describe('User Service', () => {
  const mockToken = 'mock-token';
  const mockUserId = '123';
  const mockUsers = [
    { id: '123', name: 'John Doe' },
    { id: '456', name: 'Jane Doe' }
  ];
  const mockUser = { id: '123', name: 'John Doe' };
  const mockBaseUrl = 'http://localhost:1338';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('configuration', () => {
    it('should configure the adapter with token', () => {
      userService.configure(mockToken);
      expect(userAdapter.configure).toHaveBeenCalledWith(mockToken);
    });

    it('should reset to default token', () => {
      userService.resetToDefaultToken();
      expect(userAdapter.resetToDefaultToken).toHaveBeenCalled();
    });

    it('should clear the token', () => {
      userService.clearToken();
      expect(userAdapter.clearToken).toHaveBeenCalled();
    });

    it('should check if configured', () => {
      userAdapter.isConfigured.mockReturnValueOnce(true);
      const result = userService.isConfigured();
      expect(userAdapter.isConfigured).toHaveBeenCalled();
      expect(result).toBe(true);
    });

    it('should get the base URL', () => {
      userAdapter.getBaseUrl.mockReturnValueOnce(mockBaseUrl);
      const result = userService.getBaseUrl();
      expect(userAdapter.getBaseUrl).toHaveBeenCalled();
      expect(result).toBe(mockBaseUrl);
    });
  });

  describe('getAllUsers', () => {
    it('should throw error when adapter is not configured', async () => {
      userAdapter.isConfigured.mockReturnValueOnce(false);
      await expect(userService.getAllUsers()).rejects.toThrow('User adapter is not configured with authentication');
    });

    it('should call userAdapter.getAllUsers', async () => {
      userAdapter.isConfigured.mockReturnValueOnce(true);
      userAdapter.getAllUsers.mockResolvedValueOnce(mockUsers);
      
      const result = await userService.getAllUsers();
      
      expect(userAdapter.getAllUsers).toHaveBeenCalled();
      expect(result).toEqual(mockUsers);
    });
  });

  describe('getUserById', () => {
    it('should throw error when adapter is not configured', async () => {
      userAdapter.isConfigured.mockReturnValueOnce(false);
      await expect(userService.getUserById(mockUserId)).rejects.toThrow('User adapter is not configured with authentication');
    });

    it('should throw error when userId is not provided', async () => {
      userAdapter.isConfigured.mockReturnValueOnce(true);
      await expect(userService.getUserById()).rejects.toThrow('User ID is required');
    });

    it('should call userAdapter.getUserById with userId', async () => {
      userAdapter.isConfigured.mockReturnValueOnce(true);
      userAdapter.getUserById.mockResolvedValueOnce(mockUser);
      
      const result = await userService.getUserById(mockUserId);
      
      expect(userAdapter.getUserById).toHaveBeenCalledWith(mockUserId);
      expect(result).toEqual(mockUser);
    });
  });
}); 