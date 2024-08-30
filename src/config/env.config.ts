import dotenv from "dotenv";
import path from "path"

// Load environment variables from a .env file specific to the current NODE_ENV
dotenv.config({
    path: path.join(__dirname, `../environments/.env.${process.env.NODE_ENV}`),
  });

  export const Config={
    NODE_ENV:process.env.NODE_ENV || "dev",
    CLIENT_URL:process.env.CLIENT_URL|| "",
    PORT:process.env.PORT || 5001,
    MONGO_URI:process.env.MONGO_URI || "",
    FIREBASE_ADMIN_PROJECT_ID:process.env.FIREBASE_ADMIN_PROJECT_ID || "",
    FIREBASE_CONFIG_PATH:process.env.FIREBASE_CONFIG_PATH || "",
  }