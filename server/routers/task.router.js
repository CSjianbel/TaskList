import { Router } from "express";

import { TaskController } from "../controllers/index.js";

const taskRouter = Router();

taskRouter.post("/", TaskController.create);
taskRouter.get("/", TaskController.list);
taskRouter.get("/:id", TaskController.get);
taskRouter.put("/", TaskController.update);
taskRouter.delete("/:id", TaskController.drop);

export { taskRouter };
