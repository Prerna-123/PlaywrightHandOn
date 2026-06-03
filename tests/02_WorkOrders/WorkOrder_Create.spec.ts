import { test, expect } from '@playwright/test';

const BASE_URL = 'https://assetessentials.dudesolutions.com/DudeSolutionsTestOIDC';
const LOGIN_URL = 'https://v1-identity.dudesolutions.io/app/login/username';

test.describe('Work Orders', () => {

  test('Create a new work order with asset and user, then verify it is saved', async ({ page }) => {

    // ── Step 1: Login ──────────────────────────────────────────────────────────
    await test.step('Login with valid credentials', async () => {
      await page.goto(LOGIN_URL);

      await page.getByText('account_circleUsername').click();
      await page.getByRole('textbox', { name: 'Username' }).fill('ADM21331OIDC_AdminUser001');
      await page.getByRole('button', { name: 'Continue' }).click();

      await page.getByRole('textbox', { name: 'Enter password' }).click();
      await page.getByRole('textbox', { name: 'Enter password' }).fill('Aeerocks1!');
      await page.getByRole('textbox', { name: 'Enter password' }).press('Enter');

      await page.getByRole('button', { name: 'Sign In' }).click();
    });

    // ── Step 2: Navigate to the application ───────────────────────────────────
    await test.step('Navigate to Asset Essentials home page', async () => {
      await page.goto(`${BASE_URL}/Home/Index`);
      await expect(page.locator('.switchBtn')).toBeVisible();
    });

    // ── Step 3: Navigate to Work Orders list ──────────────────────────────────
    await test.step('Open Work Orders module', async () => {
      await page.getByRole('button', { name: 'Work Orders' }).click();
      await page.getByRole('link',   { name: 'Work Orders' }).click();

      await expect(page.getByRole('heading', { name: 'Work Orders' })).toBeVisible();
      await expect(page.getByRole('button',  { name: ' New' })).toBeVisible();
    });

    // ── Step 4: Create a new work order ───────────────────────────────────────
    await test.step('Fill in new work order details', async () => {
      await page.getByRole('button', { name: ' New' }).click();
      await page.getByRole('textbox', { name: 'Work Requested' }).getByRole('paragraph').click();
      await page.getByRole('textbox', { name: 'Work Requested' }).fill('TEst1234');
    });

    // ── Step 5: Add an asset to the work order ────────────────────────────────
    await test.step('Add asset to the work order', async () => {
      await page.getByRole('button', { name: 'Add Asset', exact: true }).click();

      await expect(page.locator('td').filter({ hasText: /^Name$/ })).toBeVisible();

      await page.getByRole('textbox', { name: 'Filter for Name column.' }).click();
      await page.locator('#cbRowgdvAssetPicker_WorkOrder90_S_D').click();
      await page.getByRole('button', { name: ' Select' }).click();
    });

    // ── Step 6: Add a user (assignee) to the work order ───────────────────────
    await test.step('Add user to the work order', async () => {
      await page.getByRole('button', { name: 'Add User', exact: true }).click();

      await expect(page.getByRole('link', { name: 'First Name header column.' })).toBeVisible();

      await page.getByRole('textbox', { name: 'Filter for First Name column' }).click();
      await page.getByRole('textbox', { name: 'Filter for First Name column' }).fill('Admin1');
      await page.getByRole('textbox', { name: 'Filter for First Name column' }).press('Enter');

      await expect(page.getByRole('cell', { name: 'Admin1' }).nth(1)).toBeVisible();

      await page.locator('#cbRowgdvCommonUserPicker_WorkOrder2_S_D').click();
      await page.getByRole('button', { name: ' Select', exact: true }).click();
    });

    // ── Step 7: Save and exit the work order ──────────────────────────────────
    await test.step('Save and exit the work order', async () => {
      await page.getByRole('button', { name: 'Save actions' }).click();
      await page.getByText('Save & Exit').click();
    });

    // ── Step 8: Verify the work order appears in the list ─────────────────────
    await test.step('Verify saved work order is visible in the grid', async () => {
      await page.getByRole('textbox', { name: 'Filter for Work Order #' }).click();
      await page.getByRole('textbox', { name: 'Filter for Work Order #' }).fill('0000001063');
      await page.getByRole('textbox', { name: 'Filter for Work Order #' }).press('Enter');

      await expect(page.getByRole('link', { name: '0000001063' })).toBeVisible();
    });

  });

});
