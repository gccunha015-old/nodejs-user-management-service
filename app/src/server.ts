import { env, ProcessEventsHandler } from "./config";
import { app } from "./express";

const server = app.listen(env.PORT, () => {
  console.log(`Server listening on ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
});

const processEventsHandler = new ProcessEventsHandler(server);
processEventsHandler.setUpEventsHandling();
