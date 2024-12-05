#!/usr/bin/env node

import * as path from "path";
import * as fs from "fs";
import { Command } from "commander";
import prompts, { PromptObject } from "prompts";

import { cloneRepo } from "./setup/cloneRepo";
import { installDeps } from "./setup/installDeps";
import { addEslint } from "./setup/addEslint";
import { addPrettier } from "./setup/addPrettier";
import { addPlaywright } from "./setup/addPlaywright";
import { addCiCd } from "./setup/addCiCd";
import { basePackageJson } from "./config/packageJsonTemplate";
import * as logger from "./logger";

const program = new Command();

interface PackageJson {
  name: string;
  version: string;
  private: boolean;
  scripts: { [key: string]: string };
  dependencies: { [key: string]: string };
  devDependencies: { [key: string]: string };
  resolutions: { [key: string]: string };
}

program
  .version("1.0.0")
  .description(
    "🚀 CLI tool to create a Next.js project connected to Walacor database 🌐"
  )
  .argument("<project-name>", "name of the project")
  .action(async (projectName: string) => {
    const projectPath = path.join(process.cwd(), projectName);
    const templateRepo = "https://github.com/walacor/typescript-sdk";

    const questions: PromptObject[] = [
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

    const response = await prompts(questions);

    const { eslint, ciCd, playwright, prettier } = response;

    try {
      logger.logCreationMessage(projectPath);

      cloneRepo(projectPath, templateRepo);

      logger.logInitializationMessage();

      installDeps(projectPath);

      if (eslint) {
        addEslint(projectPath);
      }

      if (ciCd) {
        addCiCd(projectPath, eslint, playwright);
      }

      if (playwright) {
        addPlaywright(projectPath);
      }

      if (prettier) {
        addPrettier(projectPath);
      }

      const packageJsonPath = path.join(projectPath, "package.json");
      const packageJson: PackageJson = { ...basePackageJson };

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

      logger.logSuccessMessage();
      logger.logNextSteps(projectPath);
    } catch (error) {
      logger.logErrorMessage(error as Error);
    }
  });

program.parse(process.argv);
