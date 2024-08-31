import express, { Router } from "express";
import { TaskController } from "../modules/tasks/task.controller";




const mainRouter: Router = express.Router();
const taskController = new TaskController();

mainRouter.post("/createTask", (req, res) => taskController.createTask(req, res));
mainRouter.post("/updateTask", (req, res) => taskController.updateTask(req, res));
mainRouter.post("/deleteTask", (req, res) => taskController.deleteTask(req, res));
mainRouter.post("/getAllTasks", (req, res) => taskController.getAllTasks(req, res));



export default mainRouter;
