import mongoose, { Schema } from "mongoose";

 const TaskSchema = new Schema(
  {
    name:{type:String},
    description:{type:String},
    metadata: {
      createdAt: { type: String },
      createdBy: { type: String},
    },
    progress:{type:String,enum:['inProgress','done','todo']}
  },
  {
    collection: "taskPlanner",
    versionKey: false,
  }
);
export const TaskModel = mongoose.model("Task", TaskSchema);
