import express, { Request, Response, Router } from "express";
import { TaskModel } from "../../modules/tasks/task.model";

export const getAllTasks: Router = express.Router();

getAllTasks.post("/", async (req: Request, res: Response) => {
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

    let matchFilter: any = { "metadata.createdBy": userId };
    if (search) {
      matchFilter["name"] = {
        $regex: search,
        $options: "i",
      };
    }

    const tasks = await TaskModel.aggregate([ { $match: matchFilter },  { $sort: { "metadata.createdAt": -1 } },]);

    return res
      .status(200)
      .json({ tasks, message: "Tasks fetched successfully", status: true });
  } catch (error: any) {
    console.error(`Error from getAllTasks: ${error.message}`);
    return res.status(500).json({ message: error.message, status: false });
  }
});
