import { ZodError, ZodIssue } from "zod";
import { User, userSchema } from "../../users-model";

jest.unmock("zod");

jest.unmock("../../users-model");
describe("user model", () => {
  describe("userSchema", () => {
    describe("parseAsync", () => {
      const suiteStubs = {} as { data: User };

      beforeAll(() => {
        suiteStubs.data = {
          externalId: "",
          createdAt: new Date(),
          email: "",
          password: "password",
        };
      });

      it("when input has valid password, should return valid user", async () => {
        async function arrange() {}
        async function act() {
          try {
            return await userSchema.parseAsync(suiteStubs.data);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          const { password } = suiteStubs.data;
          expect(actResult).toMatchObject<Pick<User, "password">>({
            password,
          });
          expect(actResult).toHaveProperty("externalId");
          expect(actResult).toHaveProperty("createdAt");
          expect(actResult).toHaveProperty("email");
        }

        await arrange().then(act).then(assert);
      });

      it("when input has small password, should throw ZodError", async () => {
        const testStubs = {} as { data: User };
        async function arrange() {
          testStubs.data = {
            ...suiteStubs.data,
            password: "pass",
          };
        }
        async function act() {
          try {
            return await userSchema.parseAsync(testStubs.data);
          } catch (error) {
            return error;
          }
        }
        async function assert(actResult: unknown) {
          expect(actResult).toBeInstanceOf(ZodError);
          const issue = (actResult as ZodError).issues[0];
          expect(issue).toMatchObject<Pick<ZodIssue, "path">>({
            path: ["password"],
          });
          expect(issue.message).toMatch(/at least/);
        }

        await arrange().then(act).then(assert);
      });
    });
  });
});
