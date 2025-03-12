import { postService } from '../../services/postService.js';

describe('Post Service', () => {
  test('getAllPosts should return an array of posts', () => {
    const posts = postService.getAllPosts();
    
    expect(Array.isArray(posts)).toBe(true);
    expect(posts.length).toBeGreaterThan(0);
    expect(posts[0]).toHaveProperty('id');
    expect(posts[0]).toHaveProperty('title');
    expect(posts[0]).toHaveProperty('content');
  });

  test('getPostById should return a post when given a valid ID', () => {
    const post = postService.getPostById(1);
    
    expect(post).not.toBeNull();
    expect(post.id).toBe(1);
    expect(post).toHaveProperty('title');
    expect(post).toHaveProperty('content');
  });

  test('getPostById should return null when given an invalid ID', () => {
    const post = postService.getPostById(999);
    
    expect(post).toBeNull();
  });

  test('createPost should add a new post and return it', () => {
    const initialPosts = postService.getAllPosts();
    const initialCount = initialPosts.length;
    
    const newPost = postService.createPost({
      title: 'Test Post',
      content: 'This is a test post content.'
    });
    
    const updatedPosts = postService.getAllPosts();
    
    expect(updatedPosts.length).toBe(initialCount + 1);
    expect(newPost).toHaveProperty('id');
    expect(newPost.title).toBe('Test Post');
    expect(newPost.content).toBe('This is a test post content.');
    
    // Find the post we just created
    const foundPost = postService.getPostById(newPost.id);
    expect(foundPost).not.toBeNull();
    expect(foundPost.title).toBe('Test Post');
  });
}); 