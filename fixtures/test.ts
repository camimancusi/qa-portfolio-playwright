import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

type Pages = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  cartPage: CartPage;
  checkoutPage: CheckoutPage;
  /** Starts the test already signed in, without clicking through the login form. */
  signedIn: InventoryPage;
};

export const test = base.extend<Pages>({
  loginPage: async ({ page }, use) => use(new LoginPage(page)),
  inventoryPage: async ({ page }, use) => use(new InventoryPage(page)),
  cartPage: async ({ page }, use) => use(new CartPage(page)),
  checkoutPage: async ({ page }, use) => use(new CheckoutPage(page)),
  signedIn: async ({ page, context, baseURL }, use) => {
    // The demo store keeps the session in a cookie, so state is seeded directly:
    // faster and less flaky than logging in through the UI in every test.
    const { hostname } = new URL(baseURL!);
    await context.addCookies([{ name: 'session-username', value: 'standard_user', domain: hostname, path: '/' }]);
    const inventory = new InventoryPage(page);
    await inventory.goto();
    await expect(inventory.title()).toHaveText('Products');
    await use(inventory);
  },
});

export { expect };
