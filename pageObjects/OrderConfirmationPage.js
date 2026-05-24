class OrderConfirmationPage {
    constructor(page) {
        this.page = page;
       this.confirmationText= page.locator(".hero-primary");
      this.OrderID= page.locator("label.ng-star-inserted");
      this.Orders=page.locator("button[routerlink*='myorders']");
    }

    async getConfirmationText() {
        return await this.confirmationText.textContent();

    }

    async getOrderId() {
        return await this.OrderID.textContent();
    }
       // OrderConfirmationPage.js
async navigateToOrders() {
  await Promise.all([
    this.page.waitForURL('**/myorders'),   // wait until Orders page URL loads
    this.Orders.click()
  ]);
}

}
module.exports = { OrderConfirmationPage };