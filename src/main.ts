import { Config } from "./config/env.config";
import { MongooseConnect } from "./config/database.config";
import { InitializeFirebaseAdmin } from "./config/firebase.config";
import { firebaseAuthGuard } from "./middleware/authguard.middleware";
import { app } from "./app";
import mainRouter from "./router/main.router";

//Function to start the Express app
async function startServer() {

  await MongooseConnect(app);

  await InitializeFirebaseAdmin(app);

  app.use(firebaseAuthGuard);

  // Define the main router for routing different endpoints
  app.use("/", mainRouter);

  app.get("/", (req, res) => {
    res.send("Server Running!");
  });

  return app;
}

// Start the server and listen on the configured port
startServer().then((httpServer) => {
    
  httpServer.listen(Config.PORT, () => {
    console.log(`Express is listening at http://localhost:${Config.PORT}`);
  });
});
