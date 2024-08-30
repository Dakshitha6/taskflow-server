import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../shared/functions/authentication";


//Middleware to guard routes with Firebase token authentication.
export const firebaseAuthGuard = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {


  try {
     if (req.path === "/"   ) {
      return next();
    }
    
    // Verify the token using Firebase
    const decodedToken = await verifyToken(req);
    res.locals.decodedToken = decodedToken;

   

    return next();
  } catch (error: any) {
    console.log(`Error from AuthGuard : ${error.message}`);
    return res.status(500).json("AUTHENTICATION_ERROR");
  }
};
