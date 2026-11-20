import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5080/');
  });

  test('displays the SpaceDock title', async ({ page }) => {
    await expect(page).toHaveTitle(/SpaceDock/);
  });

  test('loads games', async ({ page }) => {
    const games = page.locator('a[data-discover="true"]');
    await expect(games.first()).toBeVisible();
  });

  test('has game cards with titles', async ({ page }) => {
    const cards = page.locator('h3');
    await expect(cards.first()).toBeVisible();
  });
});
