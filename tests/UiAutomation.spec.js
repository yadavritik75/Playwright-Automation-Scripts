const{test, expect}=require("@playwright/test");
test("Register User",async({browser})=>
    {
        const context=await browser.newContext();
       const page= await context.newPage();
       await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
       await page.locator(".text-reset").click();
       await page.locator("#firstName").fill("John");
       await page.locator("#lastName").fill("seena");
       await page.locator("#userEmail").fill("johnseena@gmail.com");
       await page.locator("#userMobile").fill("9897654321");
       await page.locator(".custom-select").selectOption('Doctor'); // this used when select class present
       await page.locator("[value='Male']").click();
       await page.locator("#userPassword").fill("johnseenA@123");
       await page.locator("#confirmPassword").fill("johnseenA@123");
       await page.locator("[type='checkbox']").click();
       await page.locator(".btn.btn-block").click();

    });
    test("Login",async({page})=>
    {
     await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
     await page.locator("#userEmail").fill("johnseena@gmail.com");
     await page.locator("#userPassword").fill("johnseenA@123");
     await page.locator("#login").click();
     console.log(await page.locator("#toast-container").textContent());
     await expect(page.locator("#toast-container")).toContainText("Login Successfully");
    

    } );