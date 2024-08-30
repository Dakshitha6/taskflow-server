import { Request } from "express";

//Verifies a user token using Firebase Admin.
export async function verifyToken(req: Request) {
    try {
      const token = req.headers.authorization?.split(" ")[1];
      if (!token) {
        throw new Error('MISSING_TOKEN');
      }
  
      const firebaseAdmin = req.app.locals.firebaseAdmin;
  
      const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);
  
      if (!decodedToken) {
        throw new Error("Authentication failed");
      }
      return decodedToken;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }