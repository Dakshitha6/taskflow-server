"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
// Load environment variables from a .env file specific to the current NODE_ENV
dotenv_1.default.config({
    path: path_1.default.join(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
});
exports.Config = {
    NODE_ENV: process.env.NODE_ENV || "dev",
    CLIENT_URL: process.env.CLIENT_URL || "",
    PORT: process.env.PORT || 5001,
    MONGO_URI: process.env.MONGO_URI || "",
    FIREBASE_ADMIN_PROJECT_ID: process.env.FIREBASE_ADMIN_PROJECT_ID || "",
    FIREBASE_CONFIG_PATH: process.env.FIREBASE_CONFIG_PATH || "",
};
