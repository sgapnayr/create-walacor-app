"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installDeps = installDeps;
const child_process_1 = require("child_process");
const colorette_1 = require("colorette");
function installDeps(projectPath) {
    console.log("");
    console.log((0, colorette_1.cyan)("📦 Installing dependencies..."));
    console.log("");
    (0, child_process_1.execSync)(`cd ${projectPath} && npm install 2>/dev/null`);
    console.log("");
}
