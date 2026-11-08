import { test, expect } from '@playwright/test';
import fs from 'fs';

import { HomePage } from '../../../pages/home/HomePage';
import { LoginPage } from '../../../pages/auth/LoginPage';

test('Đăng nhập thành công với tài khoản hợp lệ', async ({ page }) => {
  const homePage = new HomePage(page);
  const loginPage = new LoginPage(page);

  const account = JSON.parse(
    fs.readFileSync(
      'test-data/auth/account.json',
      'utf-8'
    )
  );

  await homePage.goto();

  await homePage.openUserMenu();

  await loginPage.openLogin();

  await loginPage.fillEmail(account.email);

  await loginPage.fillPassword(account.password);

  await loginPage.submitLogin();

  // assertion 
  await expect(
  page.getByText('Đăng nhập thành công', { exact: true })
).toBeVisible();


});