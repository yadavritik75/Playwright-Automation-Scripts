const{test,expect}=require("@playwright/test"); 
test("Booking And Event Creation",async({page})=>
{
    const showTitle="Kapil Sharma Show";
await page.goto("https://eventhub.rahulshettyacademy.com");
await page.locator("[name='email']").fill("ritik@gmail.com");
await page.locator("[name='password']").fill("jaihanumaN@123");
await page.locator("#login-btn").click();
await page.getByText("Browse Events →").waitFor();
const bool= await page.getByText("Browse Events →").isVisible();
console.log(bool);
await page.getByText("Browse Events →").click();
await page.getByRole("button",{name:"Add New Event"}).click();
await page.getByPlaceholder("Event title").fill(showTitle);
await page.getByPlaceholder("Describe the event…").fill("Comedy Show by Kapil sharma in Delhi");
const category=await page.locator("#category");
category.selectOption("Festival");
await page.locator("#city").fill("Delhi");
await page.locator("#venue").fill("APJ Abdul kalam confrence Hall Rajiv chowk");
await page.locator("[type='datetime-local']").fill("2026-07-12T10:30"); //YYYY-MM-DDTHH:mm
await page.getByLabel("Price ($)").fill("50");
await page.locator("#total-seats").fill("500");
await page.getByLabel("Image URL (optional)").fill("https://www.netflix.com/title/81737430");
await page.getByRole("button",{name:"+ Add Event"}).click();
await expect(page.getByText("Event created!")).toBeVisible();
// Navigate to events
await page.locator("#nav-events").click();
// - Get all event cards (locate by data-testid="event-card")
const eventCards= await page.locator("[data-testid='event-card']");
// - Assert the first card is visible (confirms page loaded)
await page.locator("[data-testid='event-card']").first().waitFor();
// - From all cards, filter for the one that contains your event title text
const card = eventCards
  .filter({ hasText: showTitle });
// - Assert the matched card is visible 
await expect(card).toBeVisible();
// - Read the seat count text from that card (locate element containing text seat, parse integer from its inner text) — store this as seatsBeforeBooking

await page.pause();






});