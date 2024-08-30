import express, { Router } from "express";
import { createTask } from "./route-handlers/create-task";
import { updateTask } from "./route-handlers/update-task";
import { deleteTask } from "./route-handlers/delete-task";
import { getAllTasks } from "./route-handlers/get-all-tasks";



const mainRouter: Router = express.Router();
mainRouter.use("/createTask", createTask);
mainRouter.use("/updateTask", updateTask);
mainRouter.use("/deleteTask", deleteTask);
mainRouter.use("/getAllTasks", getAllTasks);



export default mainRouter;
