import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { cyan } from "colorette";
import { eslintConfig } from "../config/eslintConfig";

export function addEslint(projectPath: string): void {
  console.log(cyan("📦 Adding ESLint..."));
  execSync(`cd ${projectPath} && npm install eslint --save-dev`);
  fs.writeFileSync(
    path.join(projectPath, ".eslintrc.json"),
    JSON.stringify(eslintConfig, null, 2)
  );
  console.log("");
}
