import express, { Express } from "express";
import { usersRouter } from "../users";
// import { sessionsRouter } from "../sessions";

const app: Express = express();

app.use(express.json());
app.use("/users", usersRouter);
// app.use("/sessions", sessionsRouter);

export { app };
