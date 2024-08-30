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
const env_config_1 = require("./config/env.config");
const database_config_1 = require("./config/database.config");
const firebase_config_1 = require("./config/firebase.config");
const authguard_middleware_1 = require("./middleware/authguard.middleware");
const app_1 = require("./app");
const main_router_1 = __importDefault(require("./router/main.router"));
/**
 * Function to start the Express app
 */
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        // Connect to MongoDB using Mongoose
        yield (0, database_config_1.MongooseConnect)(app_1.app);
        // Initialize Firebase admin for authentication
        yield (0, firebase_config_1.InitializeFirebaseAdmin)(app_1.app);
        //Middleware to guard routes with Firebase token authentication
        app_1.app.use(authguard_middleware_1.firebaseAuthGuard);
        // Define the main router for routing different endpoints
        app_1.app.use("/", main_router_1.default);
        // Define a route to handle the root URL
        app_1.app.get("/", (req, res) => {
            res.send("Hello World!");
        });
        return app_1.app;
    });
}
// Start the server and listen on the configured port
startServer().then((httpServer) => {
    httpServer.listen(env_config_1.Config.PORT, () => {
        console.log(`Express is listening at http://localhost:${env_config_1.Config.PORT}`);
    });
});
