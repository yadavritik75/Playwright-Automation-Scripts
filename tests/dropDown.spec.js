const {test,expect}=require("@playwright/test")
test("dynamic dropdowns",async({page})=>
{
    await page.goto("https://rahulshettyacademy.com/dropdownsPractise/")
    await page.locator("#ctl00_mainContent_ddl_originStation1_CTXT").click()
    await page.locator("[text='Goa (GOI)']").click()
    await page.locator("[text='Dehradun (DED)']").click()
    await page.locator("[class*='ui-state-active']").click()
    await page.locator("#divpaxinfo").click()
    const adult=await page.locator("#hrefIncAdt")
   const child= await page.locator("#hrefIncChd")
   const infant=await page.locator("#hrefIncInf")
    let i=0
    while(i<3)
    {
        i++
       await  adult.click()
       await child.click()
       await infant.click()
    }
    await page.locator("[value='Done']").click()
    //Static dropdown
  const currencyDropDown=  await page.locator("#ctl00_mainContent_DropDownListCurrency")
  currencyDropDown.selectOption("USD")
  //AutoSuggestive dropdowns
  /*
  await page.locator("#autosuggest").pressSequentially("ind")
  await page.locator("li.ui-menu-item").first().waitFor()
  const countries=await page.locator("#ui-id-1")
  const optionsCount=await countries.locator("//a[text()='India']").count()
  for(let i=0;i<optionsCount;i++)
  {
   const text= await countries.locator("//a[text()='India']").nth(i).textContent()
   if(text=="India")
   {
       await countries.locator("//a[text()='India']").nth(i).click()
       break
   }
  }
*/
 //AutoSuggestive dropdowns using hasText
 await page.locator("#autosuggest").pressSequentially("ind")
  await page.locator("#ui-id-1").waitFor()
  await expect(page.locator("#ui-id-1")).toBeVisible()
  await page.locator("#ui-id-1 a", { hasText: "India" }).nth(1).click();


// page level TakesScreenshot
await page.screenshot({path:"screenshot.png"})
// specific webElement Screenshot
await page.locator("#autosuggest").screenshot({path:"screenshot.png"})

});
test.only("visual testing",async({page})=>
{
//visual testing
await page.goto("https://www.google.com/")
await expect(await page.screenshot()).toMatchSnapshot("landing.png")
});