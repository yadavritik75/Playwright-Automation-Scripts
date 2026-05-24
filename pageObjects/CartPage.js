const { expect } = require('@playwright/test');
class CartPage
{
    constructor(page)
    {
        this.page=page;
       this.CartProduct= page.locator("div li");
       this.cartSection= page.locator(".cartSection h3");
       this.checkoutButton= page.locator("[type='button']").nth(1);
       
    }

  async verifyProductInCart(productName)
    {
        await this.CartProduct.first().waitFor();
       const bool=   await this.cartSection.isVisible();
      return bool;
        
    }
   async  CheckOut()
    {
        await this.checkoutButton.click();
    }

}
module.exports={CartPage};