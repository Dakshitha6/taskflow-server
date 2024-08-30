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
Object.defineProperty(exports, "__esModule", { value: true });
exports.firebaseAuthGuard = void 0;
const authentication_1 = require("../shared/functions/authentication");
//Middleware to guard routes with Firebase token authentication.
const firebaseAuthGuard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (req.path === "/") {
            return next();
        }
        // Verify the token using Firebase
        const decodedToken = yield (0, authentication_1.verifyToken)(req);
        res.locals.decodedToken = decodedToken;
        return next();
    }
    catch (error) {
        console.log(`Error from AuthGuard : ${error.message}`);
        return res.status(500).json("AUTHENTICATION_ERROR");
    }
});
exports.firebaseAuthGuard = firebaseAuthGuard;
