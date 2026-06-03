import {test,chromium} from '@playwright/test'

test('Verify multicontext one browser', async({browser})=>{
    const context1= await browser.newContext();
    const context2= await browser.newContext();

    const page1= await context1.newPage();
    const page2= await context1.newPage();
    const page3= await context1.newPage();

    await page1.goto("https://www.google.com/");
    await page2.goto("https://courses.thetestingacademy.com/");
    await page3.goto("https://www.linkedin.com/feed/");

    await context1.close();
    await context2.close();

})