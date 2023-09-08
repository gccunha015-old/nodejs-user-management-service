import { userSchema, findUserDtoSchema } from "../../zod-schemas";
import { UsersInMemoryRepository } from "../../users-repository";
import { UsersService } from "../../users-service";

jest.unmock("../../users-service");
describe("Users service unit testing", () => {
  const input = {} as { id: string };
  const mocks = {} as {
    userSchema: jest.MockedObjectDeep<typeof userSchema>;
    findUserDtoSchema: jest.MockedObjectDeep<typeof findUserDtoSchema>;
    usersRepository: jest.MockedObjectDeep<UsersInMemoryRepository>;
  };
  const sut = {} as { service: UsersService };

  beforeAll(() => {
    input.id = "0";
    mocks.userSchema = jest.mocked(userSchema);
    mocks.findUserDtoSchema = jest.mocked(findUserDtoSchema);
    mocks.usersRepository = jest.mocked(new UsersInMemoryRepository());
    sut.service = new UsersService(mocks.usersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("should call it's dependencies", async () => {
      async function arrange() {}
      async function act() {
        await sut.service.findById(input.id);
      }
      async function assert() {
        expect(mocks.usersRepository.findById).toHaveBeenCalledWith(input.id);
        expect(mocks.findUserDtoSchema.parseAsync).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });
});
