const { test ,expect} = require("@playwright/test")
test("Alert popup", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.once("dialog", dialog => dialog.accept());
    await page.locator("#alertbtn").click();
    page.once("dialog", dialog => dialog.dismiss());
    await page.locator("#confirmbtn").click();

});

test("Element Displayed", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.locator("[value='Show']").click();
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("[value='Hide']").click();
     await expect(page.locator("#displayed-text")).toBeHidden();



});
