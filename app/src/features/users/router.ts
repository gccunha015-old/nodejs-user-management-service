import { Router } from "express";
import { usersController } from "./controller";

export const usersRouter = Router();

usersRouter.get(
  "/:id",
  async (req, res, nex) => await usersController.findById(req, res, nex)
);
usersRouter.get(
  "/",
  async (req, res, nex) => await usersController.findAll(req, res, nex)
);
usersRouter.post(
  "/",
  async (req, res, nex) => await usersController.create(req, res, nex)
);
