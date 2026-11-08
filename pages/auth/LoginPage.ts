import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;

  readonly loginButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly submitLoginButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loginButton = page.getByRole('button', {
      name: 'Đăng nhập'
    });

    this.emailInput = page.getByRole('textbox', {
      name: 'Email'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Mật khẩu'
    });

    this.submitLoginButton = page.getByRole('button', {
      name: 'Đăng nhập'
    });
  }

  async openLogin() {
    await this.loginButton.click();
  }

  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async submitLogin() {
    await this.submitLoginButton.click();
  }
}