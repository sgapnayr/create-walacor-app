#!/usr/bin/env node
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const commander_1 = require("commander");
const prompts_1 = __importDefault(require("prompts"));
const colorette_1 = require("colorette");
const cloneRepo_1 = require("./setup/cloneRepo");
const installDeps_1 = require("./setup/installDeps");
const addEslint_1 = require("./setup/addEslint");
const addPrettier_1 = require("./setup/addPrettier");
const addPlaywright_1 = require("./setup/addPlaywright");
const addCiCd_1 = require("./setup/addCiCd");
const packageJsonTemplate_1 = require("./config/packageJsonTemplate");
const program = new commander_1.Command();
program
    .version("1.0.0")
    .description("🚀 CLI tool to create a Next.js project connected to Walacor database 🌐")
    .argument("<project-name>", "name of the project")
    .action(async (projectName) => {
    const projectPath = path.join(process.cwd(), projectName);
    const templateRepo = "https://github.com/sgapnayr/walacor-template";
    const questions = [
        {
            type: "toggle",
            name: "eslint",
            message: "Would you like to add ESLint?",
            initial: false,
            active: "yes",
            inactive: "no",
        },
        {
            type: "toggle",
            name: "ciCd",
            message: "Would you like to add a CI/CD pipeline?",
            initial: false,
            active: "yes",
            inactive: "no",
        },
        {
            type: "toggle",
            name: "playwright",
            message: "Would you like to add Playwright testing?",
            initial: false,
            active: "yes",
            inactive: "no",
        },
        {
            type: "toggle",
            name: "prettier",
            message: "Would you like to add Prettier?",
            initial: false,
            active: "yes",
            inactive: "no",
        },
    ];
    const response = await (0, prompts_1.default)(questions);
    const { eslint, ciCd, playwright, prettier } = response;
    try {
        console.log("------------------------------------------------------");
        console.log("");
        console.log((0, colorette_1.green)(`🛠️  Creating a new Next.js project in ${projectPath}`));
        console.log("");
        console.log("------------------------------------------------------");
        (0, cloneRepo_1.cloneRepo)(projectPath, templateRepo);
        console.log("------------------------------------------------------");
        console.log("");
        console.log((0, colorette_1.yellow)("🌐 Initializing data..."));
        console.log("");
        console.log("------------------------------------------------------");
        (0, installDeps_1.installDeps)(projectPath);
        if (eslint) {
            (0, addEslint_1.addEslint)(projectPath);
        }
        if (ciCd) {
            (0, addCiCd_1.addCiCd)(projectPath, eslint, playwright);
        }
        if (playwright) {
            (0, addPlaywright_1.addPlaywright)(projectPath);
        }
        if (prettier) {
            (0, addPrettier_1.addPrettier)(projectPath);
        }
        // Update package.json based on user selections
        const packageJsonPath = path.join(projectPath, "package.json");
        const packageJson = { ...packageJsonTemplate_1.basePackageJson };
        // Add additional scripts and dependencies based on selections
        if (eslint) {
            packageJson.scripts["lint"] = "next lint";
            packageJson.scripts["lint:fix"] = "next lint --fix";
            packageJson.devDependencies["eslint"] = "^8.44.0";
            packageJson.devDependencies["eslint-config-next"] = "^14.2.5";
        }
        if (playwright) {
            packageJson.scripts["test:e2e"] = "playwright test";
            packageJson.devDependencies["playwright"] = "^1.45.3";
            packageJson.devDependencies["@playwright/test"] = "^1.45.3";
        }
        packageJson.scripts["type-check"] = "tsc --noEmit";
        if (ciCd) {
            packageJson.scripts["push"] =
                "next lint --fix && next lint && npm run test:e2e && tsc --noEmit && next build && git add . && git commit -m 'walacor-commit' && git push && next dev";
        }
        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
        console.log("");
        console.log("");
        console.log("");
        console.log((0, colorette_1.green)("------------------------------------------------------"));
        console.log((0, colorette_1.green)("🎉 Project created successfully!"));
        console.log((0, colorette_1.green)("------------------------------------------------------"));
        console.log("");
        console.log("");
        console.log("");
        console.log((0, colorette_1.yellow)("📄 Next steps:"));
        console.log("");
        console.log((0, colorette_1.cyan)(`1. cd ${projectPath}`));
        console.log("");
        console.log((0, colorette_1.cyan)("2. npm run dev"));
        console.log("");
        console.log((0, colorette_1.yellow)("Your project is now ready and running at http://localhost:3000"));
        console.log("");
        console.log("------------------------------------------------------");
    }
    catch (error) {
        console.log("");
        console.log((0, colorette_1.red)("------------------------------------------------------"));
        console.log("");
        console.error((0, colorette_1.red)(`❌ Failed to create project: ${error.message}`));
        console.log((0, colorette_1.red)("------------------------------------------------------"));
    }
});
program.parse(process.argv);
