const { expect } = require('@playwright/test');
class OrderReviewPage
{
    constructor(page)
    {
        this.page=page;
        this.selectMonth= page.locator("[class='input ddl']").nth(0);
        this.selectDate=page.locator("[class='input ddl']").nth(1);
        this.coupon=page.locator("[name='coupon']");
       this.applyCoupon=page.locator(".btn.btn-primary.mt-1");
       this.couponConfirmation=page.locator(".mt-1.ng-star-inserted");
      this.countryInput= page.locator("[placeholder*='Select Country']");
      this.countryDropdown=page.locator(".ta-results");
      this.username=page.locator(".user__name [type='text']").first();
      this.submitButton = page.locator(".action__submit");
    }

    async selectMonthAndDate(month, date) {
        await this.selectMonth.selectOption(month);
        await this.selectDate.selectOption(date);
    }

    async applyCouponCode(code) {
        await this.coupon.fill(code);
        await this.applyCoupon.click();
        await this.couponConfirmation.waitFor();
        await expect(this.couponConfirmation).toBeVisible();
        return await this.couponConfirmation.textContent();

    }
    async selectCountry(countryName) {
        await this.countryInput.pressSequentially(countryName);
        await this.countryDropdown.waitFor();
        const optionsCount = await this.countryDropdown.locator("button").count();
        for(let i=0;i<optionsCount;i++)
  {
   const text=await this.countryDropdown.locator("button").nth(i).textContent();
   if(text===" India")
   {
    await this.countryDropdown.locator("button").nth(i).click();
    break;
   }
  }

  
    }
      async verifyEmail(expectedEmail) {
    await expect(this.username).toHaveText(expectedEmail);
  }

  async submitOrder() {
    await this.submitButton.click();
  }
}
module.exports={OrderReviewPage};