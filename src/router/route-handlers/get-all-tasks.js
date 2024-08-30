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
exports.getAllTasks = void 0;
const express_1 = __importDefault(require("express"));
const task_model_1 = require("../../modules/tasks/task.model");
exports.getAllTasks = express_1.default.Router();
exports.getAllTasks.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, search } = req.body;
        if (!userId) {
            return res
                .status(400)
                .json({
                message: "userId query parameter is required",
                status: false,
            });
        }
        let matchFilter = { "metadata.createdBy": userId };
        if (search) {
            matchFilter["name"] = {
                $regex: search,
                $options: "i",
            };
        }
        const tasks = yield task_model_1.TaskModel.aggregate([{ $match: matchFilter }, { $sort: { "metadata.createdAt": -1 } },]);
        return res
            .status(200)
            .json({ tasks, message: "Tasks fetched successfully", status: true });
    }
    catch (error) {
        console.error(`Error from getAllTasks: ${error.message}`);
        return res.status(500).json({ message: error.message, status: false });
    }
}));
