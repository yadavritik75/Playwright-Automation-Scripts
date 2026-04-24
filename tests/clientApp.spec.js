const {test, expect}=require("@playwright/test");
test.only("get product text",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
await page.locator("#username").fill("rahulshettyacademy");
await page.locator("#password").fill("Learning@830$3mK2");
await page.locator("span.checkmark").nth(0).click();
const dropDown= page.locator("[data-style='btn-info']");
await dropDown.selectOption("Consultant");
console.log(await page.locator("[name='terms']").isChecked()); // Returns True/False
await page.locator("[name='terms']").click();
await expect(page.locator("[name='terms']")).toBeChecked(); // toBeChecked() is used for Assertion
await page.locator("[name='terms']").uncheck(); // uncheck the checkbox
expect(await page.locator("[name='terms']").isChecked()).toBeFalsy(); // False False 
await page.locator("[name='signin']").click();
const text=await page.locator(".card-body h4").first().textContent();
const allText=await page.locator(".card-body h4").allTextContents(); // allTextContents have not wait mechanism
console.log(text);
console.log(allText);

});
test("window  Handling",async({browser})=>
{
    const context=await browser.newContext();
    const page=await context.newPage();
await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
const documentLink= page.locator("[href*='documents-request']");
await expect(documentLink).toHaveAttribute("class","blinkingText");
const[newPage]=await Promise.all([
context.waitForEvent('page'),
 documentLink.click()
]);
await newPage.locator("p.red").waitFor();
const text= await newPage.locator("p.red").textContent();
console.log(text);
const email=text.split("@")[1].split(" ")[0];
console.log(email);
await page.locator("#username").waitFor();
await page.locator("#username").fill(email);
await page.pause();
});