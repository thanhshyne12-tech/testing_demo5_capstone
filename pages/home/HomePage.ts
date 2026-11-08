import { Locator, Page } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly userMenuButton: Locator

  constructor(page: Page) {
    this.page = page;
    this.userMenuButton= page.getByRole('button').filter({ hasText: /^$/ });
  }

  async goto() {
    await this.page.goto('/');
  }

   async openUserMenu() {
    await this.userMenuButton.click();
  }
}