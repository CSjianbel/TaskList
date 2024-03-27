import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../models/index.js";
import { JWT_SECRET } from "../config/index.js";

const User = db.users;

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log({ username, password });

    if (!username) {
      return res.status(400).json({
        message: "Missing parameter: {username}",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Missing parameter: {password}",
      });
    }

    // Hash password
    const hashedPass = await hash(password, 10);

    const user = await User.create({
      username: username,
      password: hashedPass,
    });

    res.status(200).json({ user });
  } catch (err) {
    console.error(`Failed to register user ${err}`);
    res.status(500).json({
      error: err,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username) {
      return res.status(400).json({
        message: "Missing parameter: {username}",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Missing parameter: {password}",
      });
    }

    const user = await User.findOne({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "No user exists with the provided username",
      });
    }

    const match = await compare(password, user.password);
    if (!match) {
      return res.status(400).json({
        message: "Authentication failed!",
      });
    }

    const token = jwt.sign(
      { userId: user.id, username: username },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error(`Failed to login user ${err}`);
    res.status(500).json({
      error: err,
    });
  }
};

const AuthController = { login, register };

export default AuthController;
