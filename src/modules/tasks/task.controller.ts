import { Request, Response } from "express";
import { TaskService } from "./task.service";

export class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      const { name, description, createdBy, progress } = req.body;
      const newTask = await TaskService.createTask(name, description, createdBy, progress);

      return res.status(201).json({ message: "Task created successfully", task: newTask, status: true });
    } catch (error: any) {
      console.error(`Error from TaskController.createTask: ${error.message}`);
      return res.status(500).json({ message: error.message, status: false });
    }
  }

  async updateTask(req: Request, res: Response) {
    try {
      const { id, name, description, progress } = req.body;
      const updatedTask = await TaskService.updateTask(id, name, description, progress);

      return res.status(200).json({ message: "Task updated successfully", task: updatedTask, status: true });
    } catch (error: any) {
      console.error(`Error from TaskController.updateTask: ${error.message}`);
      return res.status(500).json({ message: error.message, status: false });
    }
  }

  async deleteTask(req: Request, res: Response) {
    try {
      const { id } = req.body;
      const deletedTask = await TaskService.deleteTask(id);

      return res.status(200).json({ message: "Task deleted successfully", task: deletedTask, status: true });
    } catch (error: any) {
      console.error(`Error from TaskController.deleteTask: ${error.message}`);
      return res.status(500).json({ message: error.message, status: false });
    }
  }

  async getAllTasks(req: Request, res: Response) {
    try {
      const { userId, search } = req.body;
      const tasks = await TaskService.getAllTasks(userId, search);

      return res.status(200).json({ tasks, message: "Tasks fetched successfully", status: true });
    } catch (error: any) {
      console.error(`Error from TaskController.getAllTasks: ${error.message}`);
      return res.status(500).json({ message: error.message, status: false });
    }
  }
}
