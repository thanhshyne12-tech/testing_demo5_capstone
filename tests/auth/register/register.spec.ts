import { test, expect } from '@playwright/test';
import fs from 'fs';

import { HomePage } from '../../../pages/home/HomePage';
import { RegisterPage } from '../../../pages/auth/RegisterPage';

test('Đăng ký thành công với toàn bộ dữ liệu hợp lệ', async ({ page }) => {

  const homePage = new HomePage(page);
  const registerPage = new RegisterPage(page);

  // Tạo account mới mỗi lần chạy test
  const email = `test_${Date.now()}@gmail.com`;
  const password = '123456';

  // Bước 1: Mở trang chủ
  await homePage.goto();

  // Bước 2: Mở menu user
  await homePage.openUserMenu();

  // Bước 3: Mở form đăng ký
  await registerPage.openRegister();

  // Bước 4: Nhập toàn bộ dữ liệu hợp lệ
  await registerPage.fillName('User');

  await registerPage.fillEmail(email);

  await registerPage.fillPassword(password);

  await registerPage.fillPhone('0901234567');

  await registerPage.fillBirthday('16/10/2000');

  await registerPage.selectGender('Nam');

  // Bước 5: Submit đăng ký
  await registerPage.submitRegister();
  await registerPage.closeLoginModal();

 

  // Bước 6: Assertion
await expect(
  page.getByText('Đăng ký thành công', { exact: true })
).toBeVisible();
 // Bước 7: Lưu account vừa tạo
fs.writeFileSync(
  'test-data/auth/account.json',
  JSON.stringify(
    {
      email,
      password
    },
    null,
    2
  )
);
});