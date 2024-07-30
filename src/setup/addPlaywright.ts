import { execSync } from "child_process";
import * as fs from "fs";
import * as path from "path";
import { cyan } from "colorette";
import { playwrightTest } from "../config/playwrightTest";

export function addPlaywright(projectPath: string): void {
  console.log(cyan("📦 Adding Playwright testing..."));
  execSync(
    `cd ${projectPath} && npm install --save-dev playwright 2>/dev/null`
  );
  fs.mkdirSync(path.join(projectPath, "tests"));
  fs.writeFileSync(
    path.join(projectPath, "tests", "test-1.spec.ts"),
    playwrightTest
  );
  console.log("");
}
