import { test, expect } from '../../fixtures/test';

test.describe('Checkout', () => {
  test.beforeEach(async ({ signedIn, cartPage }) => {
    await signedIn.addToCart('Sauce Labs Backpack');
    await signedIn.addToCart('Sauce Labs Onesie');
    await signedIn.openCart();
    await cartPage.checkout();
  });

  test('completes a purchase end to end', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('Camila', 'Tester', '1000');
    await checkoutPage.finishButton().click();
    await expect(checkoutPage.completeHeader()).toHaveText('Thank you for your order!');
  });

  test('the item total equals the sum of the product prices', async ({ checkoutPage }) => {
    await checkoutPage.fillInformation('Camila', 'Tester', '1000');
    const prices = (await checkoutPage.itemPrices().allTextContents()).map((t) => Number(t.replace('$', '')));
    const expected = prices.reduce((sum, p) => sum + p, 0).toFixed(2);
    await expect(checkoutPage.subtotal()).toHaveText(`Item total: $${expected}`);
  });

  test('requires the first name before continuing', async ({ page, checkoutPage }) => {
    await checkoutPage.lastName().fill('Tester');
    await checkoutPage.postalCode().fill('1000');
    await checkoutPage.continueButton().click();
    await expect(checkoutPage.error()).toContainText('First Name is required');
    await expect(page).toHaveURL(/checkout-step-one/);
  });
});
