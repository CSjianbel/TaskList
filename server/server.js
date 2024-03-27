import express from "express";
import cors from "cors";
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

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { authRouter } from "./routers/index.js";

app.use("/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
