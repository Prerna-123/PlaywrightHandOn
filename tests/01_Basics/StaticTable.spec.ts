import {test,expect} from '@playwright/test';

test('Verify Satic Table',async({page})=>{
   await page.goto("https://awesomeqa.com/webtable.html");
   const rows=  page.locator('#customers  tr',{hasText:'Helen Bennett'});
   const country=await rows.locator('td').nth(2).innerText();
   console.log('Country is :',country);
})