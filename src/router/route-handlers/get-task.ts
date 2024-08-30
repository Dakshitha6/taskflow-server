import express, { Request, Response, Router } from "express";
import { TaskModel } from "../../modules/tasks/task.model";

export const getTaskById: Router = express.Router();

getTaskById.post("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required" ,status:false});
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" ,status:false});
    }

    return res.status(200).json({message: "Task fetched successfully", task,status:true });
  } catch (error: any) {
    console.error(`Error from getTaskById: ${error.message}`);
    return res.status(500).json({ message: error.message ,status:false});
  }
});
