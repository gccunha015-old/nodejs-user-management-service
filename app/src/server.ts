import { env, ProcessEventsHandler } from "./config";
import { app } from "./express";
import { mongoClient } from "./database";

const server = app.listen(env.PORT, () => {
  console.log(`Server listening on ${env.PROTOCOL}://${env.HOST}:${env.PORT}`);
});

const processEventsHandler = new ProcessEventsHandler(server, mongoClient);
processEventsHandler.setUpEventsHandling();
