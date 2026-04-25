const {test,expect}=require("@playwright/test");
test("get Locators practice",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/angularpractice/");
await page.getByPlaceholder("Password").fill("123456");
await page.getByLabel("Check me out if you Love IceCreams!").check();
await page.getByLabel("Gender").selectOption("Male");
await page.getByLabel("Employed").check();
await page.locator("[type='date']").fill("2023-01-01");
await page.getByRole("button",{name :"Submit"}).click();
await expect(page.getByText(" The Form has been submitted successfully!.")).toBeVisible();
await page.getByRole("link",{name:"Shop"}).click();
await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
await page.getByText(/Checkout/).click();
await expect(page.getByText("Nokia Edge")).toBeVisible();
await page.getByText("Checkout").click();
await page.locator("#country").pressSequentially("India");
await page.locator(".suggestions").waitFor();
await page.getByText("India").click();
await page.locator("[for='checkbox2']").click();
await page.getByRole("button",{name:"Purchase"}).click();
await expect(page.getByText("Success!")).toBeVisible();
await page.pause();

});