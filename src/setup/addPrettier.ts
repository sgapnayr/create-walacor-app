import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { cyan } from "colorette";
import { prettierConfig } from "../config/prettierConfig";

export function addPrettier(projectPath: string): void {
  console.log(cyan("📦 Adding Prettier..."));
  execSync(`cd ${projectPath} && npm install --save-dev prettier`);
  fs.writeFileSync(
    path.join(projectPath, ".prettierrc"),
    JSON.stringify(prettierConfig, null, 2)
  );
  console.log("");
}
