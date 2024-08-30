import express, { Request, Response, Router } from "express";
import { TaskModel } from "../../modules/tasks/task.model";

export const updateTask: Router = express.Router();

updateTask.post("/", async (req: Request, res: Response) => {
  try {
    const { id, name, description, progress } = req.body;

    if (!id) {
      return res
        .status(400)
        .json({ message: "Task ID is required", status: false });
    }

    const updateData: any = {};
   
    if (name) updateData["name"] = name;
    if (description) updateData["description"] = description;
    if (progress) updateData["progress"] = progress;


    const updatedTask = await TaskModel.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

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
  } catch (error: any) {
    console.error(`Error from updateTask: ${error.message}`);
    return res.status(500).json({ message: error.message, status: false });
  }
});
