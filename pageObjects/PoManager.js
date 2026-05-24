const {LoginPage}=require("../pageObjects/LoginPage");
const {Dashboard}=require("../pageObjects/Dashboard");
const{CartPage}=require("../pageObjects/CartPage");
const{OrderReviewPage}=require("../pageObjects/OrderReviewPage");

class PoManager
{
    constructor(page)
    {
        this.page=page;
        this.loginPage=new LoginPage(page);
        this.dashboard=new Dashboard(page);
        this.cartPage=new CartPage(page);
        this.orderReviewPage=new OrderReviewPage(page);
    }
    getLoginPage()
    {
        return this.loginPage;
    }
    getDashboard()
    {
        return this.dashboard;
    }
    getCartPage()
    {
        return this.cartPage;
    }
    getOrderReviewPage()
    {
        return this.orderReviewPage;
    }

}
module.exports={PoManager};