import { Router } from "express";

import { AuthController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const authRouter = Router();

authRouter.get("/", authMiddleware, (_, res) => {
  res.status(200).json({
    message: "Authenticated"
  });
});

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);
authRouter.get("/logout", AuthController.logout);

export { authRouter };
