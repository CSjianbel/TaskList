import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.users;

const authMiddleware = async (req, res, next) => {
  try {
    console.log(req.headers.authorization);
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("sammy");
      throw new Error("Unauthorized");
    }

    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      console.log("here");
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
