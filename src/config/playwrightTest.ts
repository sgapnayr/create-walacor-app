export const playwrightTest = `
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://admindoc.walacor.com/admin-documentation/latest/the-platform-application-an-introduction');
});
`;
