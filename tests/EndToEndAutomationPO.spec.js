const { test, expect } = require("@playwright/test");
const {PoManager}=require("../pageObjects/PoManager");
const dataSet=JSON.parse(JSON.stringify(require("../utils/placeOrderTestData.json")));
test("End-End Testing",async({page})=>
{
const username="johnseena@gmail.com";
const password="johnseenA@123";
const productName="ADIDAS ORIGINAL";


const poManager=new PoManager(page);
const loginPage=poManager.getLoginPage();
await loginPage.goTo();
await loginPage.LoginToApplication(dataSet.username,dataSet.password);
const toastMessage=await loginPage.getToastMessage();
console.log(toastMessage);
 await expect(loginPage.toastContainer).toContainText("Login Successfully");
const dashboard= poManager.getDashboard();
await dashboard.searchProductAddToCart(dataSet.productName); 
await dashboard.navigateToCart();

  const cartPage = poManager.getCartPage();
  const bool = await cartPage.verifyProductInCart(dataSet.productName);
  expect(bool).toBeTruthy();
  await cartPage.CheckOut();
  const orderReviewPage=poManager.getOrderReviewPage();
  await orderReviewPage.selectMonthAndDate("10","20");
  const couponMessage=await orderReviewPage.applyCouponCode("rahulshettyacademy");
  console.log(couponMessage);
  await orderReviewPage.selectCountry("India");
  await orderReviewPage.verifyEmail(dataSet.username);
  await orderReviewPage.submitOrder();

const orderConfirmationPage=poManager.getOrderConfirmationPage();
const confirmationText=await orderConfirmationPage.getConfirmationText();
console.log(confirmationText);
await expect(confirmationText).toContain("Thankyou for the order.");
const orderId=await orderConfirmationPage.getOrderId();
console.log(orderId);
await orderConfirmationPage.navigateToOrders();
const YourOrdersPage=poManager.getOrdersPage();
await YourOrdersPage.searchOrderAndSelect(orderId);
});