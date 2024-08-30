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
exports.InitializeFirebaseAdmin = InitializeFirebaseAdmin;
const firebase_admin_1 = __importDefault(require("firebase-admin"));
const env_config_1 = require("./env.config");
//Initializes Firebase Admin SDK based on the environment.
function InitializeFirebaseAdmin(app) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const serviceAccount = require(env_config_1.Config.FIREBASE_CONFIG_PATH);
            // Initialize Firebase Admin SDK with the loaded service account credentials
            firebase_admin_1.default.initializeApp({
                credential: firebase_admin_1.default.credential.cert(serviceAccount),
            });
            app.locals.firebaseAdmin = firebase_admin_1.default;
            console.log("Firebase Admin initialized \x1b[36m%s\x1b[0m", "successfully");
        }
        catch (error) {
            console.log(`Firebase Admin initialization error => , ${error}`);
        }
    });
}
