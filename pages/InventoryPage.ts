import { Page } from '@playwright/test';

export class InventoryPage {
  constructor(private readonly page: Page) {}

  title = () => this.page.getByTestId('title');
  items = () => this.page.getByTestId('inventory-item');
  itemNames = () => this.page.getByTestId('inventory-item-name');
  itemPrices = () => this.page.getByTestId('inventory-item-price');
  sortSelect = () => this.page.getByTestId('product-sort-container');
  cartBadge = () => this.page.getByTestId('shopping-cart-badge');
  cartLink = () => this.page.getByTestId('shopping-cart-link');

  item = (name: string) => this.items().filter({ hasText: name });

  async goto() {
    await this.page.goto('/inventory.html');
  }

  async addToCart(name: string) {
    await this.item(name).getByRole('button', { name: 'Add to cart' }).click();
  }

  async removeFromCart(name: string) {
    await this.item(name).getByRole('button', { name: 'Remove' }).click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortSelect().selectOption(option);
  }

  async prices(): Promise<number[]> {
    const texts = await this.itemPrices().allTextContents();
    return texts.map((t) => Number(t.replace('$', '')));
  }

  async openCart() {
    await this.cartLink().click();
  }
}
