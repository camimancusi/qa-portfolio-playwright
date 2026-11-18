import { Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  username = () => this.page.getByPlaceholder('Username');
  password = () => this.page.getByPlaceholder('Password');
  submit = () => this.page.getByRole('button', { name: 'Login' });
  error = () => this.page.getByTestId('error');

  async goto() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.username().fill(username);
    await this.password().fill(password);
    await this.submit().click();
  }
}
