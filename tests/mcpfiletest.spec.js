const { test, expect } = require('@playwright/test');

test('MCP file login flow - Rahul Shetty Academy', async ({ page }) => {
  const url = 'https://rahulshettyacademy.com/loginpagePractise/';
  await page.goto(url, { waitUntil: 'networkidle' });

  // 1. Enter username
  await page.locator('#username').waitFor({ state: 'visible' });
  await page.locator('#username').fill('rahulshettyacademy');

  // 2. Enter password
  await page.locator('#password').fill('Learning@830$3mK2');

  // 3. Select the "User" radio button
  // use the visible styled checkmark to be stable with the page styling
  await page.locator('span.checkmark').nth(0).waitFor({ state: 'visible' });
  await page.locator('span.checkmark').nth(0).click();

  // 4. If a confirmation modal appears, accept it and continue.
  // Try common modal selectors and click the affirmative button if visible.
  try {
    const modal = page.locator('dialog, .modal, .modal-content, .modal-dialog').first();
    if (await modal.isVisible({ timeout: 2000 })) {
      // attempt to click an OK/Continue button inside the modal
      const okBtn = modal.getByRole('button', { name: /ok|okay|continue|yes|close/i }).first();
      await okBtn.click({ timeout: 2000 });
    }
  } catch (e) {
    // no modal appeared or modal not matching selectors — continue
  }

  // 5. From the Role dropdown, select "Student".
  const role = page.getByRole('combobox');
  await role.waitFor({ state: 'visible' });
  await role.selectOption({ label: 'Student' });

  // 6. Check the Terms and Conditions checkbox.
  const terms = page.locator("[name='terms']");
  await terms.waitFor({ state: 'visible' });
  await terms.check();
  await expect(terms).toBeChecked();

  // 7. Click the "Sign In" button.
  await page.locator("[name='signin']").click();

  // 8. Verify successful login and redirection to shop/home page.
  // Wait for the shop card elements to appear.
  let loginSuccessful = false;
  try {
    await page.waitForLoadState('networkidle');
    const cardHeader = page.locator('.card-body h4').first();
    await expect(cardHeader).toBeVisible({ timeout: 5000 });
    loginSuccessful = true;
  } catch (err) {
    loginSuccessful = false;
  }

  // 9. Capture and report result
  console.log('Login successful:', loginSuccessful);
  expect(loginSuccessful).toBeTruthy();
});
