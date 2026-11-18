import { test, expect } from '../../fixtures/test';

const PASSWORD = process.env.DEMO_PASSWORD ?? 'secret_sauce';

test.describe('Login', () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('signs in a valid user and lands on the product list', async ({ page, loginPage, inventoryPage }) => {
    await loginPage.login('standard_user', PASSWORD);
    await expect(page).toHaveURL(/inventory\.html/);
    await expect(inventoryPage.title()).toHaveText('Products');
  });

  test('rejects a wrong password', async ({ page, loginPage }) => {
    await loginPage.login('standard_user', 'wrong-password');
    await expect(loginPage.error()).toContainText('Username and password do not match');
    await expect(page).not.toHaveURL(/inventory\.html/);
  });

  test('blocks a locked-out user with a clear message', async ({ loginPage }) => {
    await loginPage.login('locked_out_user', PASSWORD);
    await expect(loginPage.error()).toContainText('this user has been locked out');
  });

  test('requires a username', async ({ loginPage }) => {
    await loginPage.password().fill(PASSWORD);
    await loginPage.submit().click();
    await expect(loginPage.error()).toContainText('Username is required');
  });

  test('does not let anonymous visitors open the product list', async ({ page, loginPage }) => {
    await page.goto('/inventory.html');
    await expect(loginPage.error()).toContainText('when you are logged in');
  });
});
