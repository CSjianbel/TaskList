import { Router } from "express";

import { AuthController } from "../controllers/index.js";

const authRouter = Router();

authRouter.post("/register", AuthController.register);
authRouter.post("/login", AuthController.login);

export { authRouter };
