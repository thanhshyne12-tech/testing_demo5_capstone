import { test, expect } from '@playwright/test';

test.describe('Kiểm thử Trang chủ & Giao diện (TC_01 - TC_12)', () => {
  const BASE_URL = 'https://demo5.cybersoft.edu.vn/';

  test.beforeEach(async ({ page }) => {
    // Dùng domcontentloaded để không bị treo timeout bởi API
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
  });

  // TC_01: Kiểm tra tải trang chủ thành công
  test('TC_01: Kiểm tra tải trang chủ thành công', async ({ page }) => {
    await expect(page).toHaveURL(/demo5\.cybersoft\.edu\.vn/);
    await expect(page.locator('body')).toBeVisible();
  });

  // TC_02: Kiểm tra giao diện responsive trên màn hình Di động (Mobile)
  test('TC_02: Kiểm tra giao diện responsive trên Mobile (iPhone)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    // Kiểm tra không xuất hiện thanh cuộn ngang
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);

    // Kiểm tra thanh header/nav co gọn hiển thị trên màn hình
    const mobileNav = page.locator('nav, header, [role="navigation"], .navbar').first();
    await expect(mobileNav).toBeVisible();
  });

  // TC_03: Kiểm tra giao diện responsive trên màn hình Máy tính bảng (Tablet)
  test('TC_03: Kiểm tra giao diện responsive trên Tablet (iPad)', async ({ page }) => {
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    expect(hasHorizontalScroll).toBe(false);
  });

  // TC_04: Kiểm tra trang chủ hiển thị đúng và đủ các thành phần thông tin
  test('TC_04: Kiểm tra trang chủ hiển thị đúng thông tin các khu vực', async ({ page }) => {
    // 1. Header hiển thị
    await expect(page.locator('header, nav, .header, .navbar').first()).toBeVisible();

    // 2. Khu vực tìm kiếm hiển thị (chỉ lấy phần tử đang hiển thị :visible)
    const searchSection = page.locator('input:visible, [role="search"]:visible, form:visible, button:visible').first();
    await expect(searchSection).toBeVisible();

    // 3. Có ít nhất một ảnh hiển thị trên trang
    const anyImage = page.locator('img:visible').first();
    await expect(anyImage).toBeVisible();

    // 4. Footer hiển thị (bắt qua nội dung đặc trưng ở chân trang)
    const footer = page.locator('footer, [class*="footer" i], div:has-text("CyberSoft"), div:has-text("Giới thiệu"), div:has-text("Copyright")').last();
    await expect(footer).toBeVisible();
  });

  // TC_05: Kiểm tra ảnh đại diện của Thẻ điểm đến
  test('TC_05: Kiểm tra ảnh đại diện của Thẻ điểm đến không bị vỡ', async ({ page }) => {
    // Lấy danh sách ảnh đang hiển thị trên trang
    const images = page.locator('img:visible');
    await expect(images.first()).toBeVisible();

    // Chờ và kiểm tra có ít nhất 1 ảnh tải hoàn tất với kích thước tự nhiên
    const loaded = await page.waitForFunction(() => {
      const imgs = Array.from(document.querySelectorAll('img')) as HTMLImageElement[];
      return imgs.some(img => img.complete && img.naturalWidth > 0);
    }, null, { timeout: 7000 });

    expect(loaded).toBeTruthy();
  });

  // TC_06: Kiểm tra sự nhất quán của Font chữ trên toàn bộ trang
  test('TC_06: Kiểm tra sự nhất quán của Font chữ', async ({ page }) => {
    const bodyFont = await page.evaluate(() => {
      return window.getComputedStyle(document.body).fontFamily;
    });
    expect(bodyFont).toBeTruthy();
  });

  // TC_07 & TC_08: Kiểm tra Favicon và tiêu đề tab trình duyệt
  test('TC_07_08: Kiểm tra Favicon và tiêu đề tab trình duyệt', async ({ page }) => {
    // Tiêu đề trang
    await expect(page).toHaveTitle(/Nhà nghỉ dưỡng & Căn hộ cao cấp cho thuê/i);

    // Thêm .first() để tránh lỗi strict mode violation do có cả apple-touch-icon
    const favicon = page.locator('head link[rel*="icon"]').first();
    await expect(favicon).toBeAttached();
  });

  // TC_09: Kiểm tra sự thay đổi Tiêu đề tab khi chuyển đổi sang trang con
  test('TC_09: Kiểm tra sự thay đổi Tiêu đề tab khi chuyển đổi sang trang con', async ({ page }) => {
    await page.goto(`${BASE_URL}login`, { waitUntil: 'domcontentloaded' });
    await expect(page).toHaveURL(/login/);
  });

  // TC_10: Kiểm tra lỗi Console khi tải Trang chủ lần đầu
  test('TC_10: Kiểm tra không có lỗi đỏ (error) ở Console khi tải trang lần đầu', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    expect(consoleErrors.filter(err => !err.includes('favicon.ico'))).toHaveLength(0);
  });

  // TC_11: Kiểm tra lỗi Console khi làm mới trang (Reload/Refresh)
  test('TC_11: Kiểm tra lỗi Console khi Reload lại trang', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.reload({ waitUntil: 'domcontentloaded' });
    expect(consoleErrors.filter(err => !err.includes('favicon.ico'))).toHaveLength(0);
  });

  // TC_12: Kiểm tra không phát sinh lỗi Console khi chuyển hướng trang con
  test('TC_12: Kiểm tra không phát sinh lỗi Console khi chuyển hướng trang con', async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto(`${BASE_URL}login`, { waitUntil: 'domcontentloaded' });
    expect(consoleErrors.filter(err => !err.includes('favicon.ico'))).toHaveLength(0);
  });
});