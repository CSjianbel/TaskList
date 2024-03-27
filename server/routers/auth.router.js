import { Router } from "express";

import { AuthController } from "../controllers/index.js";
import { authMiddleware } from "../middlewares/index.js";

const authRouter = Router();

authRouter.get("/", authMiddleware, AuthController.authenticated);
authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export { authRouter };
