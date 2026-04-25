const {test, expect}=require("@playwright/test");
test("Automating calendar",async({page})=>
{
    const monthNumber="7";
    const date="19";
    const year="1998";
    const expectedList=[monthNumber,date,year];
await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
await page.locator(".react-date-picker__inputGroup").click();
await page.locator(".react-calendar__navigation__label").click();
await page.locator(".react-calendar__navigation__label").click();
const previous= page.locator("[class*='prev-button']");
for (let i = 0; i < 3; i++) {
  await previous.click();
} 
await page.getByText(year).click();
await page.locator(".react-calendar__tile.react-calendar__year-view__months__month").nth(Number(monthNumber-1)).click();
await page.locator("//abbr[text()='"+date+"']").click();
const inputs=page.locator(".react-date-picker__inputGroup__input");
for(let i=0;i<expectedList.length;i++)
{
const value=await inputs.nth(i).inputValue();
expect(value).toEqual(expectedList[i]);

}



});