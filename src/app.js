"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.CreateExpressApp = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const env_config_1 = require("./config/env.config");
// Create an Express application
const CreateExpressApp = () => {
    const app = (0, express_1.default)();
    app.set("trust proxy", true);
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    if (env_config_1.Config.NODE_ENV == "dev") {
        app.use((0, cors_1.default)());
    }
    else {
        app.use((0, cors_1.default)());
        // app.use(cors({ origin: Config.CLIENT_URL })); 
    }
    return app;
};
exports.CreateExpressApp = CreateExpressApp;
exports.app = (0, exports.CreateExpressApp)();
