import {test,expect} from '@playwright/test';

test('Verify Dynamic Table',async({page})=>{
   await page.goto("https://awesomeqa.com/webtable1.html");
   const rows= page.locator('table[summary="Sample Table"] > tbody> tr');
   const rowsCount=await rows.count();
   for(let i=0;i<rowsCount;i++){
    const value= await rows.nth(i).locator('td').allInnerTexts();
    console.log(`Row ${i+1}`,value);
   }
})