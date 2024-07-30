"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addCiCd = addCiCd;
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const colorette_1 = require("colorette");
function addCiCd(projectPath, eslint, playwright) {
    console.log((0, colorette_1.cyan)("📦 Adding CI/CD pipeline..."));
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
    fs.writeFileSync(path.join(projectPath, ".github/workflows/ci.yml"), ciConfig);
    console.log("");
}
