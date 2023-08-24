import { Server as HttpServer } from "node:http";
import { Server as HttpsServer } from "node:https";

export function setUpSignalsHandling(server: HttpServer | HttpsServer) {
  process.once("SIGINT", gracefulShutdown(server));
  process.once("SIGTERM", gracefulShutdown(server));
}

function gracefulShutdown(server: HttpServer | HttpsServer) {
  return (event: string) => {
    console.log(`\n${event}:`);
    server.close(async () => {
      const instance =
        server instanceof HttpServer ? "HttpServer" : "HttpsServer";
      console.log(` ${instance} closed`);
      //
      console.log(" Database connection closed");
      process.exit(1);
    });
  };
}
