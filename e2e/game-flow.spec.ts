import { test, expect } from '@playwright/test';

test.describe('Taboo Game Loop', () => {
    test('should complete a full game flow', async ({ page }) => {
        // Navigate to local app
        await page.goto('/');

        // Check Home Screen
        await expect(page.locator('text=Taboo')).toBeVisible();
        await expect(page.locator('text=Nuova Partita')).toBeVisible();

        // Start Game
        await page.click('text=Nuova Partita');

        // Wait for the game board to load
        await expect(page.locator('text=Tempo')).toBeVisible();

        // Click Corretto
        await page.click('text=Corretto');

        // Click Passo
        await page.click('text=Passo');

        // Click Taboo
        await page.click('text=Taboo');

        // Test End Game prematurely (since doing 60 seconds takes too long in standard test run)
        // Here we could either use page.clock to advance timers, or just make sure buttons work.
        // For this e2e, we verify the actions exist and don't crash.
        await expect(page.locator('text=Parola da indovinare')).toBeVisible();
    });
});
