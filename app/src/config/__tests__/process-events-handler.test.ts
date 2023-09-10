import { Server } from "node:http";
import { once, EventEmitter } from "node:events";
import { MongoClient } from "mongodb";
import { mongoClient } from "../../database";
import { ProcessEventsHandler } from "../process-events-handler";

import {} from "node:process";

jest.unmock("../process-events-handler");
describe("Unit Testing | ProcessEventsHandler", () => {
  const spies = {} as {
    process: {
      once: jest.SpyInstance;
      on: jest.SpyInstance;
      listeners: jest.SpyInstance;
    };
    console: { log: jest.SpyInstance };
  };
  const mocks = {} as {
    httpServer: jest.MockedObjectDeep<Server>;
    databaseClient: jest.MockedObjectDeep<MongoClient>;
  };
  const sut = {} as { processEventsHandler: ProcessEventsHandler };

  beforeAll(() => {
    spies.process = {
      once: jest.spyOn(process, "once"),
      on: jest.spyOn(process, "on"),
      listeners: jest.spyOn(process, "listeners"),
    };
    spies.console = { log: jest.spyOn(console, "log") };
    mocks.httpServer = jest.mocked(new Server());
    mocks.databaseClient = jest.mocked(mongoClient);
    sut.processEventsHandler = new ProcessEventsHandler(
      mocks.httpServer,
      mocks.databaseClient
    );
  });

  describe("setUpEventsHandling", () => {
    beforeAll(() => {
      sut.processEventsHandler.setUpEventsHandling();
    });

    describe("should call _setUpSignalsHandling", () => {
      it("that calls process.once with SIGINT and SIGTERM", () => {
        const sigintListeners = process.listeners("SIGINT");
        const sigtermListeners = process.listeners("SIGTERM");
        console.log(sigintListeners);
      });

      // it("when SIGINT is emited should call _gracefulShutdown internal closure", async () => {
      //   const eventEmitter = new EventEmitter();
      //   process.nextTick(() => {
      //     eventEmitter.emit("SIGINT");
      //   });
      //   await once(eventEmitter, "SIGINT");
      //   expect(spies.console.log).toHaveBeenCalledTimes(3);
      // });
    });

    // describe("should call _setUpUnexpectedErrorsHandling", () => {
    //   it("that calls process.on with uncaughtException and unhandledRejection", () => {
    //     const processOnCalls = spies.process.on.mock.calls;
    //     expect(processOnCalls[0][0]).toBe("uncaughtException");
    //     expect(processOnCalls[1][0]).toBe("unhandledRejection");
    //   });
    // });
  });
});
