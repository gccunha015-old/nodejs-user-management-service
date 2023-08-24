import { env, setUpProcessEventsHandling } from "./config";
import { app } from "./express";

const server = app.listen(env.PORT, () => {
  console.log(`Server listening on ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
});

setUpProcessEventsHandling(server);
