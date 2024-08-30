import { Application } from "express";
import mongoose from "mongoose";

import { Config } from "./env.config";

// Connects to the MongoDB database using Mongoose and stores the connection in Express app locals.
 
export async function MongooseConnect(app: Application): Promise<void> {
  try {
    const dbConnection = await mongoose.connect(`${Config.MONGO_URI}/voosh`);

    app.locals.mongooseConnection = dbConnection;
    console.log("Mongoose => connected \x1b[36m%s\x1b[0m", "successfully");

    const dbInstance = app.locals.mongooseConnection;

  } catch (error:any) {
    console.error(`Mongoose => Connection failed: ${error.message}`);
    throw error;  
  }
}
