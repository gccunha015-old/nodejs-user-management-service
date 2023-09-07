import { Server as HttpServer } from "node:http";
import { Server as HttpsServer } from "node:https";

export class ProcessEventsHandler {
  private readonly _server: HttpServer | HttpsServer;

  constructor(server: HttpServer | HttpsServer) {
    this._server = server;
  }

  public setUpEventsHandling() {
    this._setUpSignalsHandling();
    this._setUpUnexpectedErrorsHandling();
  }

  private _setUpSignalsHandling() {
    process.once("SIGINT", this._gracefulShutdown());
    process.once("SIGTERM", this._gracefulShutdown());
  }

  private _setUpUnexpectedErrorsHandling() {
    process.on("uncaughtException", (error, origin) => {
      console.log(`uncaughtException:\n Error: ${error}\n Origin: ${origin}`);
    });
    process.on("unhandledRejection", (reason) => {
      console.log(`unhandledRejection:\n  Reason: ${reason}`);
    });
  }

  private _gracefulShutdown() {
    return (event: string) => {
      console.log(`\n${event}:`);
      this._server.close(async () => {
        const server =
          this._server instanceof HttpsServer ? "HttpsServer" : "HttpServer";
        console.log(` ${server} closed`);
        //
        console.log(" Database connection closed");
        process.exit(1);
      });
    };
  }
}
