
import {test,expect} from '@playwright/test';

test('Verify Dynamic Table',async({page})=>{
   await page.goto("https://app.thetestingacademy.com/playwright/webtable");
   await page.getByRole('searchbox',{name:"Search employee table"}).fill("Rohan.Mehta");
   await page.locator("tr[data-username='Rohan.Mehta'] >td:nth-child(1)").click();
   });