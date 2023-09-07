import { compare } from "bcrypt";
import { hashString } from "../bcrypt-utils";

jest.unmock("bcrypt");

jest.unmock("../bcrypt-utils");
describe("bcrypt utils", () => {
  describe("hashString", () => {
    it("should return hashed string", async () => {
      const testStubs = {} as { str: string };
      async function arrange() {
        testStubs.str = "hello";
      }
      async function act() {
        return await hashString(testStubs.str);
      }
      async function assert(actResult: string) {
        await expect(compare(testStubs.str, actResult)).resolves.toBe(true);
      }

      await arrange().then(act).then(assert);
    });
  });
});
