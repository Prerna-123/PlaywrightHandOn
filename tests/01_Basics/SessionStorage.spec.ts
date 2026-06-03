import { test, expect, chromium } from '@playwright/test';

const BASE_URL = 'https://assetessentials.dudesolutions.com/DudeSolutionsTestOIDC';
const LOGIN_URL = 'https://v1-identity.dudesolutions.io/app/login/username';


  test('Create a new work order with asset and user, then verify it is saved',async({browser})=>{
    const context= await browser.newContext();
    const page= await context.newPage();
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
      await page.waitForTimeout(10000);
      await context.storageState({path:"./user-session.json"});
      console.log("Session saved");
      await page.waitForTimeout(10000);
      await browser.close();
    });
});