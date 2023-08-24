import express from "express";
import { usersRouter } from "../features";

const app = express();

app.use(express.json());
app.use("/users", usersRouter);
// app.use("/sessions", sessionsRouter);

export { app };
