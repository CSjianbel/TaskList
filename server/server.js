import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

import db from "./models/index.js";

import { PORT } from "./config/index.js";

const app = express();

db.sequelize
  .sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

import { authMiddleware } from "./middlewares/index.js";
import { authRouter, taskRouter } from "./routers/index.js";

app.use("/auth", authRouter);
app.use("/task", authMiddleware, taskRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
