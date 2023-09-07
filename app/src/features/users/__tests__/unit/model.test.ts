import { randomUUID } from "node:crypto";
import { ZodError, ZodIssue } from "zod";
import { uuidSchema } from "../../../../utils";
import { User, userSchema } from "../../model";

jest.unmock("zod");
jest.unmock("bcrypt");

jest.deepUnmock("../../model");
describe("user model", () => {
  describe("userSchema", () => {
    const spies = {} as { uuidSchema: { parseAsync: jest.SpyInstance } };

    beforeAll(() => {
      // mocks.uuidSchema = jest.mocked(uuidSchema);
      spies.uuidSchema = { parseAsync: jest.spyOn(uuidSchema, "parseAsync") };
    });

    describe("parseAsync", () => {
      const suiteStubs = {} as { data: User };

      beforeAll(() => {
        suiteStubs.data = {
          externalId: randomUUID(),
          createdAt: new Date(),
          email: "test@test.com",
          password: "password",
        };
      });

      it("should return valid user", async () => {
        async function arrange() {
          // mocks.uuidSchema.parseAsync.mockResolvedValueOnce(
          //   suiteStubs.data.externalId
          // );
          spies.uuidSchema.parseAsync.mockResolvedValueOnce(
            suiteStubs.data.externalId
          );
        }
        async function act() {
          try {
            return await userSchema.parseAsync(suiteStubs.data);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          console.log(actResult);
          expect(actResult).toStrictEqual(suiteStubs.data);
        }

        await arrange().then(act).then(assert);
      });

      // it("should create externalId and createdAt and return valid user", async () => {
      //   const testStubs = {} as { data: { email: string; password: string } };
      //   async function arrange() {
      //     const { email, password } = suiteStubs.data;
      //     testStubs.data = { email, password };
      //   }
      //   async function act() {
      //     try {
      //       return await userSchema.parseAsync(testStubs.data);
      //     } catch (error) {
      //       return error;
      //     }
      //   }
      //   async function assert(actResult: unknown) {
      //     expect(actResult).toHaveProperty("externalId");
      //     expect(actResult).toHaveProperty("createdAt");
      //     expect(actResult).toMatchObject<Pick<User, "email" | "password">>(
      //       testStubs.data
      //     );
      //   }

      //   await arrange().then(act).then(assert);
      // });

      // it("should throw ZodError for invalid email", async () => {
      //   const testStubs = {} as { data: User };
      //   async function arrange() {
      //     testStubs.data = {
      //       ...suiteStubs.data,
      //       email: "not an email",
      //     };
      //   }
      //   async function act() {
      //     try {
      //       return await userSchema.parseAsync(testStubs.data);
      //     } catch (error) {
      //       return error;
      //     }
      //   }
      //   async function assert(actResult: unknown) {
      //     expect(actResult).toBeInstanceOf(ZodError);
      //     const issue = (actResult as ZodError).issues[0];
      //     expect(issue).toMatchObject<Pick<ZodIssue, "path">>({
      //       path: ["email"],
      //     });
      //     expect(issue.message).toMatch(/(I|i)nvalid/);
      //   }

      //   await arrange().then(act).then(assert);
      // });

      // it("should throw ZodError for small password", async () => {
      //   const testStubs = {} as { data: User };
      //   async function arrange() {
      //     testStubs.data = {
      //       ...suiteStubs.data,
      //       password: "pass",
      //     };
      //   }
      //   async function act() {
      //     try {
      //       return await userSchema.parseAsync(testStubs.data);
      //     } catch (error) {
      //       return error;
      //     }
      //   }
      //   async function assert(actResult: unknown) {
      //     expect(actResult).toBeInstanceOf(ZodError);
      //     const issue = (actResult as ZodError).issues[0];
      //     expect(issue).toMatchObject<Pick<ZodIssue, "path">>({
      //       path: ["password"],
      //     });
      //     expect(issue.message).toMatch(/8/);
      //   }

      //   await arrange().then(act).then(assert);
      // });
    });
  });
});
