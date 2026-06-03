
import {test,expect,chromium} from '@playwright/test';

test('Validate wrong login flow',async({page})=>{
  await page.goto('https://vwo.com/free-trial/');
  await page.getByRole('textbox', { name: 'Business Email ' }).click();
  await page.getByRole('textbox', { name: 'Business Email ' }).fill('test@gmail.com');
  await page.getByRole('checkbox', { name: 'I agree to VWO\'s Privacy' }).check();
  await page.getByRole('button', {name: 'Create a Free Trial Account' }).click();
  await expect(page.getByText('gmail.com doesn\'t look like a')).toBeVisible();
});