import * as fs from "fs";
import * as path from "path";
import { cyan } from "colorette";

export function addCiCd(
  projectPath: string,
  eslint: boolean,
  playwright: boolean
): void {
  console.log(cyan("📦 Adding CI/CD pipeline..."));
  let ciConfig = `
name: CI

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

permissions:
  contents: read
  security-events: write

jobs:
  setup:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18.x

      - name: Cache Node.js modules
        id: cache-node-modules
        uses: actions/cache@v2
        with:
          path: ~/.npm
          key: \${{ runner.os }}-node-\${{ hashFiles('package-lock.json') }}
          restore-keys: |
            \${{ runner.os }}-node-

      - name: Install dependencies
        run: npm ci
        `;

  if (eslint) {
    ciConfig += `
  lint:
    runs-on: ubuntu-latest
    needs: setup

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18.x

      - name: Use cached Node.js modules
        run: npm ci

      - name: Lint code
        run: npm run lint
        `;
  }

  if (eslint || playwright) {
    ciConfig += `
  lint-fix:
    runs-on: ubuntu-latest
    needs: [type-check${eslint ? ", lint" : ""}${playwright ? ", test" : ""}]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18.x

      - name: Use cached Node.js modules
        run: npm ci

      - name: Lint code and fix issues
        run: npm run lint -- --fix
        `;
  }

  ciConfig += `
  type-check:
    runs-on: ubuntu-latest
    needs: setup

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18.x

      - name: Use cached Node.js modules
        run: npm ci

      - name: Type check
        run: npm run type-check
        `;

  if (playwright) {
    ciConfig += `
  test:
    runs-on: ubuntu-latest
    needs: setup

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18.x

      - name: Use cached Node.js modules
        run: npm ci

      - name: Install Playwright
        run: npx playwright install

      - name: Install Playwright Browsers
        run: npx playwright install-deps

      - name: Run Playwright tests
        run: npm run test:e2e
        `;
  }

  ciConfig += `
  build:
    runs-on: ubuntu-latest
    needs: [type-check${eslint ? ", lint-fix" : ""}]

    steps:
      - name: Checkout repository
        uses: actions/checkout@v2

      - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: 18.x

      - name: Use cached Node.js modules
        run: npm ci

      - name: Build project
        run: npm run build
        `;

  fs.mkdirSync(path.join(projectPath, ".github/workflows"), {
    recursive: true,
  });
  fs.writeFileSync(
    path.join(projectPath, ".github/workflows/ci.yml"),
    ciConfig
  );
  console.log("");
}
