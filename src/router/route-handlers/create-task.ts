import express, { Request, Response, Router } from "express";
import { TaskModel } from "../../modules/tasks/task.model";

export const createTask: Router = express.Router();

createTask.post("/", async (req: Request, res: Response) => {
  try {
    let { name, description, createdBy, progress } = req.body;

    if(description=="" || !description){
      description="No Description added";
    }
    const newTask = new TaskModel({
      name,
      description,
      metadata: { createdBy:createdBy,createdAt:new Date().toISOString()},
      progress,
    });

    await newTask.save();

    return res.status(201).json({ message: "Task created successfully", task: newTask ,status:true});
  } catch (error: any) {
    console.error(`Error from createTask: ${error.message}`);
    return res.status(500).json({ message: error.message,status:false });
  }
});
