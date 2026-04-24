const { test, expect } = require("@playwright/test");
test("End-End Testing",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
const productName="ADIDAS ORIGINAL";
const couponConfirmation=page.locator(".mt-1.ng-star-inserted");
const products=page.locator(".card-body");
await page.locator("#userEmail").fill("johnseena@gmail.com");
     await page.locator("#userPassword").fill("johnseenA@123");
     await page.locator("#login").click();
     console.log(await page.locator("#toast-container").textContent());
     await expect(page.locator("#toast-container")).toContainText("Login Successfully");
     await page.locator(".card-body").first().waitFor();
    const count= await products.count();
     for(let i=0;i<count;i++)
     {
       if (await products.nth(i).locator("b").textContent()===productName)
       {
         await products.nth(i).locator("text= Add To Cart").click();
         break;
       }
     }
     await page.locator("[routerlink*='cart']").click();
     await page.locator("div li").first().waitFor();
     const bool=await page.locator(".cartSection h3").isVisible(); //("h3:has-text('Zara coat 4')")
     expect(bool).toBeTruthy();
     await page.locator("[type='button']").nth(1).click();
    const dropdown= await page.locator("[class='input ddl']").nth(0);
    await dropdown.selectOption("05");
    const dropdown1= await page.locator("[class='input ddl']").nth(1);
    await dropdown1.selectOption("05");
    await page.locator("[name='coupon']").fill("rahulshettyacademy");
    await page.locator(".btn.btn-primary.mt-1").click();
    await couponConfirmation.waitFor();
    const message=await couponConfirmation.textContent();
    await expect(page.locator(".mt-1.ng-star-inserted")).toBeVisible(); //toBeVisible used for assertion & is visible is  a locator method
    console.log(message);

  await page.locator("[placeholder*='Select Country']").pressSequentially("Ind");
  const countryDropdown= page.locator(".ta-results");
  await countryDropdown.waitFor();
  const optionsCount=await countryDropdown.locator("button").count();
  for(let i=0;i<optionsCount;i++)
  {
   const text=await countryDropdown.locator("button").nth(i).textContent();
   if(text===" India")
   {
    await countryDropdown.locator("button").nth(i).click();
    break;
   }
  }
  await page.locator(".action__submit").click();
  await page.locator(".hero-primary").waitFor();
  const orderConfirmation=await page.locator(".hero-primary").textContent();
  console.log(orderConfirmation);
  await expect(page.locator(".hero-primary")).toBeVisible();
await page.pause();





     



});