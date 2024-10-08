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
exports.addPlaywright = addPlaywright;
const child_process_1 = require("child_process");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
const colorette_1 = require("colorette");
const playwrightTest_1 = require("../config/playwrightTest");
function addPlaywright(projectPath) {
    console.log((0, colorette_1.cyan)("📦 Adding Playwright testing..."));
    (0, child_process_1.execSync)(`cd ${projectPath} && npm install --save-dev playwright 2>/dev/null`);
    fs.mkdirSync(path.join(projectPath, "tests"));
    fs.writeFileSync(path.join(projectPath, "tests", "test-1.spec.ts"), playwrightTest_1.playwrightTest);
    console.log("");
}
