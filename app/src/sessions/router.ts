import bcrypt from "bcrypt";
import { Router } from "express";
import { User, users } from "../users";

const sessionsRouter: Router = Router();
const sessions: User[] = [];

sessionsRouter.post("/", async (req, res, nex) => {
  const { name, password } = req.body;
  const user = users.find((u) => u.name === name);
  if (!user) res.status(404).send();
  else {
    try {
      const isCorrectPassword = await bcrypt.compare(password, user.password);
      if (isCorrectPassword) {
        sessions.push(user);
        res.status(200).send();
      } else res.status(401).send();
    } catch (error) {
      res.status(500).send(error);
    }
  }
});

export { sessionsRouter, sessions };
