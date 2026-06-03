import {test,expect,chromium} from '@playwright/test';
import * as allure from "allure-js-commons";

test('Validate wrong login flow',async({page})=>{
  await allure.epic("VWO Login");
  await allure.description("Validate wrong login flow");
  await page.goto('https://app.vwo.com/#/login');
  await page.getByRole('textbox', { name: 'Email address' }).click();
  await page.getByRole('textbox', { name: 'Email address' }).fill('test@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('test');
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
  await page.getByText('Your email, password, IP').click();
  await expect(page.getByText('Your email, password, IP')).toBeVisible();
});
