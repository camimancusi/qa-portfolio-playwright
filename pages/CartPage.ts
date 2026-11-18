import { Page } from '@playwright/test';

export class CartPage {
  constructor(private readonly page: Page) {}

  items = () => this.page.getByTestId('inventory-item');
  itemNames = () => this.page.getByTestId('inventory-item-name');
  checkoutButton = () => this.page.getByRole('button', { name: 'Checkout' });
  continueShopping = () => this.page.getByRole('button', { name: 'Continue Shopping' });

  async checkout() {
    await this.checkoutButton().click();
  }
}
