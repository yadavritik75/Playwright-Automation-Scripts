// YourOrdersPage.js
const { expect } = require('@playwright/test');

class YourOrdersPage {
  constructor(page) {
    this.page = page;
    this.ordersTable = page.locator("table[class*='table table']");
    this.orderRows = page.locator("tbody tr");
  }

  async searchOrderAndSelect(orderId) {
    // ensure table is visible after navigation
    await expect(this.ordersTable).toBeVisible();

    const rowsCount = await this.orderRows.count();
    for (let i = 0; i < rowsCount; i++) {
      const rowOrderId = await this.orderRows.nth(i).locator("th").textContent();
      if (orderId.trim().includes(rowOrderId.trim())) {
        await expect(this.orderRows.nth(i).locator("button:has-text('View')")).toBeVisible();
        await this.orderRows.nth(i).locator("button:has-text('View')").click();
        break;
      }
    }
  }
}

module.exports = { YourOrdersPage };
