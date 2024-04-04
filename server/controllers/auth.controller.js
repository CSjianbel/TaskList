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

    const existingUser = await User.findOne({
      where: {
        username: username,
      },
    });

    if (existingUser) {
      throw new Error("username already exists");
    }

    const user = await User.create({
      username: username,
      password: hashedPass,
    });

    res.status(200).json({ user });
  } catch (err) {
    const message = `Failed to register user ${err.message}`;
    console.error(message);
    res.status(400).json({
      message: message,
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

    res.cookie('jwt', token, {
      httpOnly: true, sameSite: 'None', secure: true,
      maxAge: 24 * 60 * 60 * 1000
    });

    res.status(200).json({ 
      message: "Successfully logged in!" 
    });
  } catch (err) {
    const message = `Failed to login user ${err.message}`;
    console.error(message);
    res.status(400).json({
      message: message,
    });
  }
};

const logout = (req, res) => {
  try {
    res.clearCookie('jwt');
    res.status(200).json({
      message: "Successfully logged out!"
    });
  } catch (err) {
    const message = `Failed to logout user ${err.message}`;
    console.error(message);
    res.status(400).json({
      message: message,
    });
  }
}

const AuthController = { login, register, logout };
export default AuthController;
