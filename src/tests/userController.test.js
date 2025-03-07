import { userController } from '../controllers/userController.js';
import { userService } from '../services/userService.js';

// Mock the userService
jest.mock('../services/userService.js', () => ({
  userService: {
    getAllUsers: jest.fn(),
    getUserById: jest.fn(),
    createUser: jest.fn()
  }
}));

describe('User Controller', () => {
  let mockContext;
  
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
    
    // Create a mock Hono context
    mockContext = {
      json: jest.fn().mockReturnThis(),
      text: jest.fn().mockReturnThis(),
      req: {
        param: jest.fn(),
        json: jest.fn()
      }
    };
  });
  
  test('getAllUsers should return users from service', async () => {
    const mockUsers = [
      { id: 1, name: 'Test User', email: 'test@example.com' }
    ];
    
    userService.getAllUsers.mockReturnValue(mockUsers);
    
    await userController.getAllUsers(mockContext);
    
    expect(userService.getAllUsers).toHaveBeenCalled();
    expect(mockContext.json).toHaveBeenCalledWith(mockUsers);
  });
  
  test('getUserById should return a user when found', async () => {
    const mockUser = { id: 1, name: 'Test User', email: 'test@example.com' };
    
    mockContext.req.param.mockReturnValue('1');
    userService.getUserById.mockReturnValue(mockUser);
    
    await userController.getUserById(mockContext);
    
    expect(userService.getUserById).toHaveBeenCalledWith(1);
    expect(mockContext.json).toHaveBeenCalledWith(mockUser);
  });
  
  test('getUserById should return 404 when user not found', async () => {
    mockContext.req.param.mockReturnValue('999');
    userService.getUserById.mockReturnValue(null);
    
    await userController.getUserById(mockContext);
    
    expect(userService.getUserById).toHaveBeenCalledWith(999);
    expect(mockContext.json).toHaveBeenCalledWith({ error: 'User not found' }, 404);
  });
}); 