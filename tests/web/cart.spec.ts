import { test, expect } from '../../fixtures/test';

test.describe('Cart', () => {
  test('adding a product updates the cart badge', async ({ signedIn }) => {
    await signedIn.addToCart('Sauce Labs Backpack');
    await expect(signedIn.cartBadge()).toHaveText('1');
  });

  test('removing the last product clears the cart badge', async ({ signedIn }) => {
    await signedIn.addToCart('Sauce Labs Backpack');
    await signedIn.removeFromCart('Sauce Labs Backpack');
    await expect(signedIn.cartBadge()).toHaveCount(0);
  });

  test('the cart lists exactly the products that were added', async ({ signedIn, cartPage }) => {
    await signedIn.addToCart('Sauce Labs Backpack');
    await signedIn.addToCart('Sauce Labs Bike Light');
    await signedIn.openCart();
    await expect(cartPage.itemNames()).toHaveText(['Sauce Labs Backpack', 'Sauce Labs Bike Light']);
  });
});
