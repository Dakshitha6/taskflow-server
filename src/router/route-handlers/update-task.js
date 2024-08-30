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
exports.updateTask = void 0;
const express_1 = __importDefault(require("express"));
const task_model_1 = require("../../modules/tasks/task.model");
exports.updateTask = express_1.default.Router();
exports.updateTask.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, name, description, progress } = req.body;
        if (!id) {
            return res
                .status(400)
                .json({ message: "Task ID  is required", status: false });
        }
        const updateData = {};
        if (name)
            updateData["name"] = name;
        if (description)
            updateData["description"] = description;
        if (progress)
            updateData["progress"] = progress;
        const updatedTask = yield task_model_1.TaskModel.findByIdAndUpdate(id, { $set: updateData }, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found", status: false });
        }
        return res
            .status(200)
            .json({
            message: "Task updated successfully",
            task: updatedTask,
            status: true,
        });
    }
    catch (error) {
        console.error(`Error from updateTask: ${error.message}`);
        return res.status(500).json({ message: error.message, status: false });
    }
}));
