import { execSync } from "child_process";
import * as path from "path";
import { yellow } from "colorette";

export function cloneRepo(projectPath: string, templateRepo: string): void {
  console.log("");
  console.log(yellow("🔄 Cloning the repository..."));
  console.log("");
  execSync(`git clone ${templateRepo} ${projectPath} > /dev/null 2>&1`);
  console.log("");
  console.log(yellow("🧹 Cleaning up..."));
  execSync(`rm -rf ${path.join(projectPath, ".git")}`);
  console.log("");
}
