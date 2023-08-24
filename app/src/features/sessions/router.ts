import bcrypt from "bcrypt";
import { Router } from "express";
import { User, usersService } from "../users";

export const sessionsRouter: Router = Router();
export const sessions: User[] = [];

// sessionsRouter.post("/", async (req, res, nex) => {
//   const { email, password } = req.body;
//   const user = await usersService.findById();
//   if (!user) res.status(404).send();
//   else {
//     try {
//       const isCorrectPassword = await bcrypt.compare(password, user.password);
//       if (isCorrectPassword) {
//         sessions.push(user);
//         res.status(200).send();
//       } else res.status(401).send();
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   }
// });
