import { Page, Locator } from '@playwright/test';
import fs from 'fs';

export class RegisterPage {
  readonly page: Page;

  // Locators
  readonly registerButton: Locator;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly phoneInput: Locator;
  readonly birthdayInput: Locator;
  readonly genderSelect: Locator;
  readonly submitRegisterButton: Locator;
  readonly closeLoginModalButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // Nút mở form đăng ký
    this.registerButton = page.getByRole('button', {
      name: 'Đăng ký'
    });

    // Name
    this.nameInput = page.getByRole('textbox', {
      name: 'Name'
    });

    // Email
    this.emailInput = page.getByRole('textbox', {
      name: 'Email'
    });

    // Password
    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    // Phone
    this.phoneInput = page.getByRole('textbox', {
      name: 'Phone number'
    });

    // Birthday
    this.birthdayInput = page.getByPlaceholder('Chọn ngày sinh');

    // Gender
    this.genderSelect = page.getByRole('combobox', {
      name: 'Gender'
    });

    // Nút submit đăng ký
    this.submitRegisterButton = page.getByRole('button', {
      name: 'Đăng ký'
    });
    this.closeLoginModalButton = page
  .getByRole('dialog')
  .filter({
    hasText: 'Đăng nhậpEmailMật khẩuĐăng ký'
  })
  .getByLabel('Close', {
    exact: true
  });
  }

  // Mở form Register
  async openRegister() {
    await this.registerButton.click();
  }

  // Nhập Name
  async fillName(name: string) {
    await this.nameInput.fill(name);
  }

  // Nhập Email
  async fillEmail(email: string) {
    await this.emailInput.fill(email);
  }

  // Nhập Password
  async fillPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  // Nhập Phone
  async fillPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  // Nhập Birthday
  async fillBirthday(birthday: string) {
    await this.birthdayInput.click();
    await this.birthdayInput.fill(birthday);
    await this.birthdayInput.press('Enter');
  }

  // Chọn Gender
async selectGender(gender: string) {
  await this.genderSelect.click();

  await this.page
    .getByText(gender, { exact: true })
    .click();
}


  // Submit đăng ký
  async submitRegister() {
    await this.submitRegisterButton.click();
  }
async closeLoginModal() {
  await this.closeLoginModalButton.click();
}
  
}