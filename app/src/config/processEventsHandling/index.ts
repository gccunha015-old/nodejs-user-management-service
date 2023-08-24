import { Server as HttpServer } from "node:http";
import { Server as HttpsServer } from "node:https";
import { setUpSignalsHandling } from "./signals";
import { setUpUnexpectedErrorsHandling } from "./unexpectedErrors";

export function setUpProcessEventsHandling(server: HttpServer | HttpsServer) {
  setUpSignalsHandling(server);
  setUpUnexpectedErrorsHandling();
}
