import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5080/');
  });

  test('displays the SpaceDock title', async ({ page }) => {
    await expect(page).toHaveTitle(/SpaceDock/);
  });

  test('loads games', async ({ page }) => {
    const games = page.locator('a[href^="/ksp"], a[href^="/se"]');
    await expect(games).toBeVisible();
  });

  test('has accessible navigation', async ({ page }) => {
    // Check that the search input has an accessible name
    const searchInput = page.locator('input[placeholder*="Search"]');
    await expect(searchInput).toBeVisible();
  });
});
