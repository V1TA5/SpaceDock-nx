import { test, expect } from '@playwright/test';

test.describe('All Routes', () => {
  test('Home page loads', async ({ page }) => {
    await page.goto('/');
    expect(page.url()).toContain('localhost:5080/');
    expect(await page.title()).toBe('SpaceDock');
  });

  test('Games page loads', async ({ page }) => {
    await page.goto('/games');
    expect(page.url()).toContain('/games');
  });

  test('Search page loads', async ({ page }) => {
    await page.goto('/search?q=kerbal');
    expect(page.url()).toContain('/search');
  });

  test('Mods list page loads', async ({ page }) => {
    await page.goto('/mods/all');
    expect(page.url()).toContain('/mods/all');
  });

  test('Mod detail page loads', async ({ page }) => {
    await page.goto('/mods/1');
    expect(page.url()).toContain('/mods/1');
  });

  test('Profile page loads', async ({ page }) => {
    await page.goto('/profile/RocketMan');
    expect(page.url()).toContain('/profile/RocketMan');
  });

  test('Login page loads', async ({ page }) => {
    await page.goto('/login');
    expect(page.url()).toContain('/login');
  });

  test('Register page loads', async ({ page }) => {
    await page.goto('/register');
    expect(page.url()).toContain('/register');
  });

  test('Blog index page loads', async ({ page }) => {
    await page.goto('/blog');
    expect(page.url()).toContain('/blog');
  });

  test('About page loads', async ({ page }) => {
    await page.goto('/about');
    expect(page.url()).toContain('/about');
  });

  test('Privacy page loads', async ({ page }) => {
    await page.goto('/privacy');
    expect(page.url()).toContain('/privacy');
  });

  test('Random mod page loads', async ({ page }) => {
    await page.goto('/random-mod');
    expect(page.url()).toContain('/random-mod');
  });

  test('Contact page loads', async ({ page }) => {
    await page.goto('/contact');
    expect(page.url()).toContain('/contact');
  });

  test('404 page loads', async ({ page }) => {
    await page.goto('/nonexistent-page-12345');
    expect(page.url()).toContain('/nonexistent-page-12345');
  });

  test('Admin main page loads', async ({ page }) => {
    await page.goto('/admin');
    expect(page.url()).toContain('/admin');
  });
});
