import { TaskModel } from "./task.model";

export class TaskService {
  static async createTask(name: string, description: string, createdBy: string, progress: string) {
    try {
      if (!description || description.trim() === "") {
        description = "No description added";
      }

      const newTask = new TaskModel({
        name,
        description,
        metadata: { createdBy: createdBy, createdAt: new Date().toISOString() },
        progress,
      });

      return await newTask.save();
    } catch (error: any) {
      console.error(`Error in TaskService.createTask: ${error.message}`);
      throw new Error(`Unable to create task: ${error.message}`);
    }
  }

  static async updateTask(id: string, name?: string, description?: string, progress?: string) {
    try {
      if (!id) {
        throw new Error("Task ID is required");
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
        throw new Error("Task not found");
      }

      return updatedTask;
    } catch (error: any) {
      console.error(`Error in TaskService.updateTask: ${error.message}`);
      throw new Error(`Unable to update task: ${error.message}`);
    }
  }

  static async deleteTask(id: string) {
    try {
      if (!id) {
        throw new Error("Task ID is required");
      }

      const deletedTask = await TaskModel.findByIdAndDelete(id);

      if (!deletedTask) {
        throw new Error("Task not found");
      }

      return deletedTask;
    } catch (error: any) {
      console.error(`Error in TaskService.deleteTask: ${error.message}`);
      throw new Error(`Unable to delete task: ${error.message}`);
    }
  }


  static async getAllTasks(userId: string, search?: string) {
    try {
      if (!userId) {
        throw new Error("userId query parameter is required");
      }

      let matchFilter: any = { "metadata.createdBy": userId };

      if (search) {
        matchFilter["name"] = {
          $regex: search,
          $options: "i",
        };
      }

      const tasks = await TaskModel.aggregate([
        { $match: matchFilter },
        { $sort: { "metadata.createdAt": -1 } },
      ]);

      return tasks;
    } catch (error: any) {
      console.error(`Error in TaskService.getAllTasks: ${error.message}`);
      throw new Error(`Unable to fetch tasks: ${error.message}`);
    }
  }
}
