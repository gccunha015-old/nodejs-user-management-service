import bcrypt from "bcrypt";
import { Router } from "express";

const usersRouter = Router();
const users = [];

usersRouter.get("/", (req, res) => res.json(users));
usersRouter.post("/", async (req, res) => {
  try {
    const { name, password } = req.body;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = { name, password: hashedPassword };
    users.push(user);
    res.status(201).json(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

export { usersRouter, users };
