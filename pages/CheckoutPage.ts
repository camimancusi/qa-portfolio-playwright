import { Page } from '@playwright/test';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  firstName = () => this.page.getByPlaceholder('First Name');
  lastName = () => this.page.getByPlaceholder('Last Name');
  postalCode = () => this.page.getByPlaceholder('Zip/Postal Code');
  continueButton = () => this.page.getByRole('button', { name: 'Continue' });
  finishButton = () => this.page.getByRole('button', { name: 'Finish' });
  error = () => this.page.getByTestId('error');
  itemPrices = () => this.page.getByTestId('inventory-item-price');
  subtotal = () => this.page.getByTestId('subtotal-label');
  completeHeader = () => this.page.getByTestId('complete-header');

  async fillInformation(first: string, last: string, zip: string) {
    await this.firstName().fill(first);
    await this.lastName().fill(last);
    await this.postalCode().fill(zip);
    await this.continueButton().click();
  }
}
