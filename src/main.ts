import http from "http";

import { Config } from "./config/env.config";
import { MongooseConnect } from "./config/database.config";
import { InitializeFirebaseAdmin } from "./config/firebase.config";
import { firebaseAuthGuard } from "./middleware/authguard.middleware";
import { app } from "./app";
import mainRouter from "./router/main.router";
import { application } from "express";

//Function to start the Express app

async function startServer() {

  // Connect to MongoDB using Mongoose
  await MongooseConnect(app);

  // Initialize Firebase admin for authentication
  await InitializeFirebaseAdmin(app);

  //Middleware to guard routes with Firebase token authentication
  app.use(firebaseAuthGuard);

  // Define the main router for routing different endpoints
  app.use("/", mainRouter);

  // Define a route to handle the root URL
  app.get("/", (req, res) => {
    
    res.send("Hello World!");
  });

  return app;
}

// Start the server and listen on the configured port
startServer().then((httpServer) => {
    
  httpServer.listen(Config.PORT, () => {
    console.log(`Express is listening at http://localhost:${Config.PORT}`);
  });
});
