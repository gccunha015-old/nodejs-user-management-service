import { Server } from "node:http";
import { MongoClient } from "mongodb";
import { mongoClient } from "../../database";
import { ProcessEventsHandler } from "../process-events-handler";

jest.unmock("../process-events-handler");
describe("Unit Testing | ProcessEventsHandler", () => {
  const spies = {} as {
    process: {
      once: jest.SpyInstance;
      on: jest.SpyInstance;
      exit: jest.SpyInstance;
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
      once: jest.spyOn(process, "once").mockImplementation(),
      on: jest.spyOn(process, "on").mockImplementation(),
      exit: jest.spyOn(process, "exit").mockImplementation(),
    };
    spies.console = { log: jest.spyOn(console, "log").mockImplementation() };
    mocks.httpServer = jest.mocked(new Server());
    mocks.databaseClient = jest.mocked(mongoClient);
    sut.processEventsHandler = new ProcessEventsHandler(
      mocks.httpServer,
      mocks.databaseClient
    );
  });

  describe("setUpEventsHandling", () => {
    const suiteCalls = {} as { process: { once: [string, Function][] } };

    beforeAll(() => {
      sut.processEventsHandler.setUpEventsHandling();
      suiteCalls.process = { once: spies.process.once.mock.calls };
    });

    describe("should call _setUpSignalsHandling", () => {
      // it("that calls process.once with SIGINT and SIGTERM", () => {
      //   const callsSignals = suiteCalls.process.once.map(([signal]) => signal);
      //   expect(callsSignals[0]).toBe("SIGINT");
      //   expect(callsSignals[1]).toBe("SIGTERM");
      // });

      it("when SIGINT is emited should call _gracefulShutdown internal closure", async () => {
        const callsListeners = suiteCalls.process.once.map(
          ([_, listener]) => listener
        );
        try {
          await callsListeners[0]();
        } catch (error: unknown) {
          spies.console.log.mockRestore();
          console.log(error);
        }
        // expect(spies.console.log).toHaveBeenCalledTimes(3);
      });
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
