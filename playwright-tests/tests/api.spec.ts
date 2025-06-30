import { test, expect } from '@playwright/test';

test.describe('Users API', () => {
  // Test to get all users
  test('should be able to get a list of users', async ({ request }) => {
    const response = await request.get('/api/users');

    console.log(response.url());

    // Assert that the request was successful
    expect(response.ok()).toBeTruthy();

    // Assert that the response body is an array
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBeTruthy();
  });

  // Test to create a new user
  test('should be able to create a new user', async ({ request }) => {
    const newUser = {
      name: 'John Doe',
      email: `john.doe.${Date.now()}@example.com`,
    };

    const response = await request.post('/api/users', {
      data: newUser,
    });

    // Assert that the request was successful (e.g., 201 Created)
    expect(response.status()).toBe(201);
    expect(response.ok()).toBeTruthy();

    // Assert that the response contains the created user's data
    const responseBody = await response.json();
    expect(responseBody.name).toBe(newUser.name);
    expect(responseBody.email).toBe(newUser.email);
    expect(responseBody.id).toBeDefined();
  });
});