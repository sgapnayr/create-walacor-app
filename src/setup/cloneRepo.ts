import { simpleGit, SimpleGit } from "simple-git";
import * as path from "path";
import { yellow } from "colorette";
import fs from "fs-extra";

export async function cloneRepo(
  projectPath: string,
  templateRepo: string
): Promise<void> {
  const git: SimpleGit = simpleGit();

  try {
    console.log("");
    console.log(yellow("🔄 Cloning the repository..."));
    console.log("");

    await git.clone(templateRepo, projectPath);

    console.log("");
    console.log(yellow("🧹 Cleaning up..."));

    // Remove the .git directory
    await fs.remove(path.join(projectPath, ".git"));

    console.log("");
  } catch (error) {
    console.error("Failed to clone repository: ", error);
  }
}
