"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTask = void 0;
const express_1 = __importDefault(require("express"));
const task_model_1 = require("../../modules/tasks/task.model");
exports.createTask = express_1.default.Router();
exports.createTask.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { name, description, createdBy, progress } = req.body;
        if (description == "" || !description) {
            description = "No Description added";
        }
        const newTask = new task_model_1.TaskModel({
            name,
            description,
            metadata: { createdBy: createdBy, createdAt: new Date().toISOString() },
            progress,
        });
        yield newTask.save();
        return res.status(201).json({ message: "Task created successfully", task: newTask, status: true });
    }
    catch (error) {
        console.error(`Error from createTask: ${error.message}`);
        return res.status(500).json({ message: error.message, status: false });
    }
}));
