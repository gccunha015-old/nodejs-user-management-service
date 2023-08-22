import express from "express";
import { usersRouter } from "../users/index.js";
import { sessionsRouter } from "../sessions/index.js";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
app.use("/sessions", sessionsRouter);

export { app };
