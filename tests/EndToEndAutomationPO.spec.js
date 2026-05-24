const { test, expect } = require("@playwright/test");
const {PoManager}=require("../pageObjects/PoManager");
test("End-End Testing",async({page})=>
{
const username="johnseena@gmail.com";
const password="johnseenA@123";
const productName="ADIDAS ORIGINAL";
const couponConfirmation=page.locator(".mt-1.ng-star-inserted");

const poManager=new PoManager(page);
const loginPage=poManager.getLoginPage();
await loginPage.goTo();
await loginPage.LoginToApplication(username,password);
const toastMessage=await loginPage.getToastMessage();
console.log(toastMessage);
 await expect(loginPage.toastContainer).toContainText("Login Successfully");
const dashboard= poManager.getDashboard();
await dashboard.searchProductAddToCart(productName); 
await dashboard.navigateToCart();

  const cartPage = poManager.getCartPage();
  const bool = await cartPage.verifyProductInCart(productName);
  expect(bool).toBeTruthy();
  await cartPage.CheckOut();
  const orderReviewPage=poManager.getOrderReviewPage();
  await orderReviewPage.selectMonthAndDate("10","20");
  const couponMessage=await orderReviewPage.applyCouponCode("rahulshettyacademy");
  console.log(couponMessage);
  await orderReviewPage.selectCountry("India");
  await orderReviewPage.verifyEmail(username);
  await orderReviewPage.submitOrder();

  await page.locator(".hero-primary").waitFor();
  const orderConfirmation=await page.locator(".hero-primary").textContent();
  console.log(orderConfirmation);
  await expect(page.locator(".hero-primary")).toBeVisible();
 const orderId= await page.locator("label.ng-star-inserted").textContent();
 console.log(orderId);
 await page.locator("button[routerlink*='myorders']").click();
 await page.locator("table[class*='table table']").first().waitFor();
 const orderRows= await page.locator("tbody tr"); // locator for all rows in the table
 for(let i=0;i<await orderRows.count();i++)
 {
 const rowOrderId= await orderRows.nth(i).locator("th").textContent();
 if(orderId.trim().includes(rowOrderId.trim()))
 {
 await expect(orderRows.nth(i).locator("button:has-text('View')")).toBeVisible();
 await orderRows.nth(i).locator("button:has-text('View')").click();
 break;
 }
 
 }


});