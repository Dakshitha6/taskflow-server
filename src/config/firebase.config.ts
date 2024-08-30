import { Application } from "express";
import admin from "firebase-admin";
import { Config } from "./env.config";

//Initializes Firebase Admin SDK based on the environment.
export async function InitializeFirebaseAdmin(app: Application) {
  try {
   
      const serviceAccount = require(Config.FIREBASE_CONFIG_PATH);

      // Initialize Firebase Admin SDK with the loaded service account credentials
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
    
    app.locals.firebaseAdmin = admin;
    console.log("Firebase Admin initialized \x1b[36m%s\x1b[0m", "successfully");
  } catch (error: any) {
    console.log(`Firebase Admin initialization error => , ${error}`);
  }
}
