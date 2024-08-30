"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongooseConnect = MongooseConnect;
const mongoose_1 = __importDefault(require("mongoose"));
const env_config_1 = require("./env.config");
// Connects to the MongoDB database using Mongoose and stores the connection in Express app locals.
function MongooseConnect(app) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const dbConnection = yield mongoose_1.default.connect(`${env_config_1.Config.MONGO_URI}/voosh`);
            app.locals.mongooseConnection = dbConnection;
            console.log("Mongoose => connected \x1b[36m%s\x1b[0m", "successfully");
            const dbInstance = app.locals.mongooseConnection;
        }
        catch (error) {
            console.error(`Mongoose => Connection failed: ${error.message}`);
            throw error;
        }
    });
}
