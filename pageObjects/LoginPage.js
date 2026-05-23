class LoginPage{
    constructor(page)
    {
   this.page=page;
   this.SignInButton= page.locator("#login");
    this.UserName= page.locator("#userEmail");
    this.Password= page.locator("#userPassword");
   this.cards= page.locator(".card-body");
    this.toastContainer= page.locator("#toast-container");
    }
   async goTo()
    {
        await this.page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    }
    async LoginToApplication(username,password)
    {
        await this.UserName.fill(username);
        await this.Password.fill(password);
        await this.SignInButton.click();
        await this.cards.first().waitFor();


    }
    
    async getToastMessage() {
  return await this.toastContainer.textContent();
}


}
module.exports = { LoginPage };