import { green, yellow, cyan, red } from "colorette";

export function logSectionDivider() {
  console.log("------------------------------------------------------");
}

export function logEmptyLine() {
  console.log("");
}

export function logCreationMessage(projectPath: string) {
  logSectionDivider();
  logEmptyLine();
  console.log(green(`🛠️  Creating a new Next.js project in ${projectPath}`));
  logEmptyLine();
  logSectionDivider();
}

export function logInitializationMessage() {
  logSectionDivider();
  logEmptyLine();
  console.log(yellow("🌐 Initializing data..."));
  logEmptyLine();
  logSectionDivider();
}

export function logSuccessMessage() {
  logEmptyLine();
  logEmptyLine();
  logEmptyLine();
  console.log(green("------------------------------------------------------"));
  console.log(green("🎉 Project created successfully!"));
  console.log(green("------------------------------------------------------"));
}

export function logNextSteps(projectPath: string) {
  logEmptyLine();
  logEmptyLine();
  logEmptyLine();
  console.log(yellow("📄 Next steps:"));
  logEmptyLine();
  console.log(cyan(`1. cd ${projectPath}`));
  logEmptyLine();
  console.log(cyan("2. npm run dev"));
  logEmptyLine();
  console.log(
    yellow("Your project is now ready and running at http://localhost:3000")
  );
  logEmptyLine();
  logSectionDivider();
}

export function logErrorMessage(error: Error) {
  logEmptyLine();
  console.log(red("------------------------------------------------------"));
  logEmptyLine();
  console.error(red(`❌ Failed to create project: ${error.message}`));
  console.log(red("------------------------------------------------------"));
}
