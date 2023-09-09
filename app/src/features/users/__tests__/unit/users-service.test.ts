import { userSchema, findUserDtoSchema } from "../../zod-schemas";
import { UsersInMemoryRepository } from "../../users-repository";
import { UsersService } from "../../users-service";
import { CreateUserDto, User } from "../../types";

jest.unmock("../../users-service");
describe("Unit Testing | UsersService", () => {
  const mocks = {} as {
    findUserDtoSchema: jest.MockedObjectDeep<typeof findUserDtoSchema>;
    usersRepository: jest.MockedObjectDeep<UsersInMemoryRepository>;
  };
  const sut = {} as { service: UsersService };

  beforeAll(() => {
    mocks.findUserDtoSchema = jest.mocked(findUserDtoSchema);
    mocks.usersRepository = jest.mocked(new UsersInMemoryRepository());
    sut.service = new UsersService(mocks.usersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("should call usersRepository.findById and findUserDtoSchema.parseAsync", async () => {
      const input = {} as { id: string };
      async function arrange() {
        input.id = "0";
      }
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

  describe("findAll", () => {
    describe.each`
      usersRepositoryReturn
      ${[]}
      ${[{}]}
      ${[{}, {}]}
    `(
      "when usersRepository.findAll returns $usersRepositoryReturn.length user(s)",
      ({ usersRepositoryReturn }: { usersRepositoryReturn: User[] }) => {
        it(`should call findUserDtoSchema.parseAsync ${usersRepositoryReturn.length} time(s)`, async () => {
          async function arrange() {
            mocks.usersRepository.findAll.mockResolvedValueOnce(
              usersRepositoryReturn
            );
          }
          async function act() {
            await sut.service.findAll();
          }
          async function assert() {
            expect(mocks.usersRepository.findAll).toHaveBeenCalledTimes(1);
            expect(mocks.findUserDtoSchema.parseAsync).toHaveBeenCalledTimes(
              usersRepositoryReturn.length
            );
          }

          await arrange().then(act).then(assert);
        });
      }
    );
  });

  describe("create", () => {
    const suiteMocks = {} as {
      userSchema: jest.MockedObjectDeep<typeof userSchema>;
    };

    beforeAll(() => {
      suiteMocks.userSchema = jest.mocked(userSchema);
    });

    it("should call userSchema.parseAsync, usersRepository.create and findUserDtoSchema.parseAsync", async () => {
      const input = {} as { createUserDto: CreateUserDto };
      async function arrange() {
        input.createUserDto = {} as CreateUserDto;
      }
      async function act() {
        await sut.service.create(input.createUserDto);
      }
      async function assert() {
        expect(suiteMocks.userSchema.parseAsync).toHaveBeenCalledWith(
          input.createUserDto
        );
        expect(mocks.usersRepository.create).toHaveBeenCalledTimes(1);
        expect(mocks.findUserDtoSchema.parseAsync).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });
});
