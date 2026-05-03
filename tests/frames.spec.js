const{test}=require("@playwright/test")
test("frames practice",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
const frames=await page.frameLocator("#courses-iframe");
await frames.locator("a[href*='.com/courses']").first().click();
await frames.locator("div[class*='pb-8'] h2").first().waitFor();
await frames.locator("div[class*='pb-8'] h2").filter({hasText:"Learn Agentic AI – Build Multi-Agent Automation Workflows"}).click();
await page.pause();
});

test.only("frames practice getText",async({page})=>
{
await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
const frames=await page.frameLocator("#courses-iframe");
await frames.locator("[href*='lifetime-access']").nth(1).click();
const text=await frames.locator("[class='text'] h2").textContent();
const formattedtext=text.split(" ")[1];
console.log(formattedtext);
await page.pause();
});