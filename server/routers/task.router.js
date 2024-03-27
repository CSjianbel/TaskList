import { Router } from "express";

const taskRouter = Router();

taskRouter.get("/", (req, res) => {
  res.send(req.user);
});

export { taskRouter };
