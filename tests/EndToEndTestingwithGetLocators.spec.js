const {test,expect}=require("@playwright/test");
test("End-End Testing with Get Locators",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
await page.getByPlaceholder("email@example.com").fill("johnseena@gmail.com");
await page.getByPlaceholder("enter your passsword").fill("johnseenA@123");
await page.getByRole("button",{name:"Login"}).click();
await page.locator(".card-body").filter({hasText:"ADIDAS ORIGINAL"}).getByRole("button",{name:"Add To Cart"}).click();
await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();
await page.getByText("ADIDAS ORIGINAL").isVisible();
await page.getByRole("button",{name:"Checkout"}).click();
await page.locator("[name='coupon']").fill("rahulshettyacademy");
await page.getByRole("button",{name:"Apply Coupon"}).click();
await expect(page.getByText("* Coupon Applied")).toBeVisible();
await page.getByPlaceholder("Select Country").pressSequentially("ind");
await page.locator(".ta-results").waitFor();
await expect(page.locator(".ta-results")).toBeVisible();
 await page.getByRole("button",{name :"India"}).nth(1).click();
 await page.getByText("PLACE ORDER").click();
 await expect(page.getByText("Thankyou for the order.")).toBeVisible();


});