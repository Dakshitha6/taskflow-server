import express from "express";
import cors from "cors";
import { Config } from "./config/env.config";

// Create an Express application
export const CreateExpressApp = () => {
  const app = express();
 
  app.set("trust proxy", true);
  app.use(express.json()); 
  app.use(express.urlencoded({ extended: true })); 
  
  if (Config.NODE_ENV == "dev") {
    app.use(cors());

  } else {
    app.use(cors());

    // app.use(cors({ origin: Config.CLIENT_URL })); 
  }
  return app;
};

export const app = CreateExpressApp();
