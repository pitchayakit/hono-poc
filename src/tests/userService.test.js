import { userService } from '../services/userService.js';

describe('User Service', () => {
  test('getAllUsers should return an array of users', () => {
    const users = userService.getAllUsers();
    
    expect(Array.isArray(users)).toBe(true);
    expect(users.length).toBeGreaterThan(0);
    expect(users[0]).toHaveProperty('id');
    expect(users[0]).toHaveProperty('name');
    expect(users[0]).toHaveProperty('email');
  });

  test('getUserById should return a user when given a valid ID', () => {
    const user = userService.getUserById(1);
    
    expect(user).not.toBeNull();
    expect(user.id).toBe(1);
    expect(user).toHaveProperty('name');
    expect(user).toHaveProperty('email');
  });

  test('getUserById should return null when given an invalid ID', () => {
    const user = userService.getUserById(999);
    
    expect(user).toBeNull();
  });

  test('createUser should add a new user and return it', () => {
    const initialUsers = userService.getAllUsers();
    const initialCount = initialUsers.length;
    
    const newUser = userService.createUser({
      name: 'Test User',
      email: 'test@example.com'
    });
    
    const updatedUsers = userService.getAllUsers();
    
    expect(updatedUsers.length).toBe(initialCount + 1);
    expect(newUser).toHaveProperty('id');
    expect(newUser.name).toBe('Test User');
    expect(newUser.email).toBe('test@example.com');
    
    // Find the user we just created
    const foundUser = userService.getUserById(newUser.id);
    expect(foundUser).not.toBeNull();
    expect(foundUser.name).toBe('Test User');
  });
}); 