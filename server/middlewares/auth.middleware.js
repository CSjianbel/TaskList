import jwt from "jsonwebtoken";
import db from "../models/index.js";

const User = db.users;

const authMiddleware = async (req, res, next) => {
  try {
    if (!req.cookies.token) {
      throw new Error("Unauthorized");
    }

    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { id: decoded.userId } });

    if (!user) {
      throw new Error("User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};

export default authMiddleware;
