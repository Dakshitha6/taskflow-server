import express from "express";
import cors from "cors";
import { Config } from "./config/env.config";

// Create an Express application
export const CreateExpressApp = () => {
  const app = express();
 
  app.set("trust proxy", true); // Enables proxy support
  app.use(express.json()); // Parse JSON requests
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded requests
  
  // Enable CORS for the specified origin
  if (Config.NODE_ENV == "dev") {
    app.use(cors());
  } else {
    app.use(cors({ origin: Config.CLIENT_URL })); 
  }
  return app;
};

export const app = CreateExpressApp();
