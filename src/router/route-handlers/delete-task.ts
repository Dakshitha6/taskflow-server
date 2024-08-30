import express, { Request, Response, Router } from "express";
import { TaskModel } from "../../modules/tasks/task.model";

export const deleteTask: Router = express.Router();

deleteTask.post("/", async (req: Request, res: Response) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "Task ID is required",status:false });
    }

    const deletedTask = await TaskModel.findByIdAndDelete(id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found",status:false });
    }

    return res.status(200).json({ message: "Task deleted successfully", task: deletedTask,status:true });
  } catch (error: any) {
    console.error(`Error from deleteTask: ${error.message}`);
    return res.status(500).json({ message: error.message ,status:false});
  }
});
