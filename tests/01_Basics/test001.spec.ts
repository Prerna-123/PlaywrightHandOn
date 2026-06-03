import {test,expect} from '@playwright/test';

test('Verify the url',async({page})=>{
   await page.goto("https://app.vwo.com");
   await expect(page).toHaveTitle("Login - VWO");
})