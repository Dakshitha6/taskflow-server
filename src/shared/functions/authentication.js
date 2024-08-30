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
exports.verifyToken = verifyToken;
//Verifies a user token using Firebase Admin.
function verifyToken(req) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        try {
            const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(" ")[1];
            if (!token) {
                throw new Error('MISSING_TOKEN');
            }
            const firebaseAdmin = req.app.locals.firebaseAdmin;
            const decodedToken = yield firebaseAdmin.auth().verifyIdToken(token);
            if (!decodedToken) {
                throw new Error("Authentication failed");
            }
            return decodedToken;
        }
        catch (error) {
            throw new Error(error.message);
        }
    });
}
