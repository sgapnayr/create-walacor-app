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
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloneRepo = cloneRepo;
const child_process_1 = require("child_process");
const path = __importStar(require("path"));
const colorette_1 = require("colorette");
function cloneRepo(projectPath, templateRepo) {
    console.log("");
    console.log((0, colorette_1.yellow)("🔄 Cloning the repository..."));
    console.log("");
    (0, child_process_1.execSync)(`git clone ${templateRepo} ${projectPath}`);
    console.log("");
    console.log((0, colorette_1.yellow)("🧹 Cleaning up..."));
    (0, child_process_1.execSync)(`rm -rf ${path.join(projectPath, ".git")}`);
    console.log("");
}
