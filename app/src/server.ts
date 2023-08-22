import { env } from "node:process";
import "./config";
import { app } from "./express";

app.listen(env.PORT, () => {
  console.log(`Server listening on ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
});
