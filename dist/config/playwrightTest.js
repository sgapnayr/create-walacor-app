"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.playwrightTest = void 0;
exports.playwrightTest = `
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://admindoc.walacor.com/admin-documentation/latest/the-platform-application-an-introduction');
});
`;
