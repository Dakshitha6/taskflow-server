import { Request, Response, NextFunction } from "express";

//Middleware to guard routes with Firebase token authentication.
export const firebaseAuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.path === "/") {
      return next();
    }

    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      throw new Error("MISSING_TOKEN");
    }

    const firebaseAdmin = req.app.locals.firebaseAdmin;

    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    if (!decodedToken) {
      throw new Error("Authentication failed");
    }
    res.locals.decodedToken = decodedToken;

    return next();
  } catch (error: any) {
    console.log(`Error from AuthGuard : ${error.message}`);
    return res.status(500).json("AUTHENTICATION_ERROR");
  }
};
