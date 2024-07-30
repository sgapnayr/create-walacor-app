import { execSync } from "child_process";
import { cyan } from "colorette";

export function installDeps(projectPath: string): void {
  console.log("");
  console.log(cyan("📦 Installing dependencies..."));
  console.log("");
  execSync(`cd ${projectPath} && npm install 2>/dev/null`);
  console.log("");
}
