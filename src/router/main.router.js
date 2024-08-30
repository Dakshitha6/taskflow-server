"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const create_task_1 = require("./route-handlers/create-task");
const update_task_1 = require("./route-handlers/update-task");
const delete_task_1 = require("./route-handlers/delete-task");
const get_all_tasks_1 = require("./route-handlers/get-all-tasks");
const mainRouter = express_1.default.Router();
mainRouter.use("/createTask", create_task_1.createTask);
mainRouter.use("/updateTask", update_task_1.updateTask);
mainRouter.use("/deleteTask", delete_task_1.deleteTask);
mainRouter.use("/getAllTasks", get_all_tasks_1.getAllTasks);
exports.default = mainRouter;
