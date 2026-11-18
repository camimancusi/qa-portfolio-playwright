import { test, expect } from '../../fixtures/test';

test.describe('Product sorting', () => {
  test('sorts products by price, low to high', async ({ signedIn }) => {
    await signedIn.sortBy('lohi');
    const prices = await signedIn.prices();
    expect(prices).toEqual([...prices].sort((a, b) => a - b));
  });

  test('sorts products by price, high to low', async ({ signedIn }) => {
    await signedIn.sortBy('hilo');
    const prices = await signedIn.prices();
    expect(prices).toEqual([...prices].sort((a, b) => b - a));
  });

  test('sorts products by name, Z to A', async ({ signedIn }) => {
    await signedIn.sortBy('za');
    const names = await signedIn.itemNames().allTextContents();
    expect(names).toEqual([...names].sort().reverse());
  });
});
