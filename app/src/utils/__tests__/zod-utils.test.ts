import { randomUUID } from "node:crypto";
import { ZodError } from "zod";
import { uuidSchema } from "../zod-utils";

jest.unmock("zod");

jest.unmock("../zod-utils");
describe("zod utils", () => {
  describe("uuidSchema", () => {
    describe("parseAsync", () => {
      it("when input is an uuid, should return it", async () => {
        const testStubs = {} as { uuid: string };
        async function arrange() {
          testStubs.uuid = randomUUID();
        }
        async function act() {
          try {
            return await uuidSchema.parseAsync(testStubs.uuid);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toBe(testStubs.uuid);
        }

        await arrange().then(act).then(assert);
      });

      it("when input isn't an uuid, should throw ZodError", async () => {
        const testStubs = {} as { uuid: string };
        async function arrange() {
          testStubs.uuid = "not-an-uuid";
        }
        async function act() {
          try {
            return await uuidSchema.parseAsync(testStubs.uuid);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toBeInstanceOf(ZodError);
          expect((actResult as ZodError).issues[0].message).toMatch(
            /(I|i)nvalid uuid/
          );
        }

        await arrange().then(act).then(assert);
      });
    });
  });
});
