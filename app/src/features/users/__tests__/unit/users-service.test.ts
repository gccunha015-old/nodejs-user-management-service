import { userSchema, findUserDtoTransform } from "../../zod-parsers";
import { UsersRepository } from "../../users-repository";
import { UsersService } from "../../users-service";
import { CreateUserDto, User } from "../../types";

jest.unmock("../../users-service");
describe("Unit Testing | UsersService", () => {
  const mocks = {} as {
    findUserDtoTransform: jest.MockedObjectDeep<typeof findUserDtoTransform>;
    usersRepository: jest.MockedObjectDeep<UsersRepository>;
  };
  const sut = {} as { service: UsersService };

  beforeAll(() => {
    mocks.findUserDtoTransform = jest.mocked(findUserDtoTransform);
    mocks.usersRepository = jest.mocked(new UsersRepository());
    sut.service = new UsersService(mocks.usersRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("findById", () => {
    it("should call usersRepository.findById and findUserDtoTransform.parseAsync", async () => {
      const input = {} as { id: string };
      async function arrange() {
        input.id = "0";
      }
      async function act() {
        await sut.service.findById(input.id);
      }
      async function assert() {
        expect(mocks.usersRepository.findById).toHaveBeenLastCalledWith(
          input.id
        );
        expect(mocks.findUserDtoTransform.parseAsync).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("findAll", () => {
    describe("should call usersRepository.findAll 1 time and findUserDtoTransform.parseAsync", () => {
      it.each`
        usersRepositoryReturn
        ${[]}
        ${[{}]}
        ${[{}, {}]}
      `(
        "$usersRepositoryReturn.length time(s)",
        async ({
          usersRepositoryReturn,
        }: {
          usersRepositoryReturn: User[];
        }) => {
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
            expect(mocks.findUserDtoTransform.parseAsync).toHaveBeenCalledTimes(
              usersRepositoryReturn.length
            );
          }

          await arrange().then(act).then(assert);
        }
      );
    });
  });

  describe("create", () => {
    const suiteMocks = {} as {
      userSchema: jest.MockedObjectDeep<typeof userSchema>;
    };

    beforeAll(() => {
      suiteMocks.userSchema = jest.mocked(userSchema);
    });

    it("should call userSchema.parseAsync, usersRepository.create and findUserDtoTransform.parseAsync", async () => {
      const input = {} as { createUserDto: CreateUserDto };
      async function arrange() {
        input.createUserDto = {} as CreateUserDto;
      }
      async function act() {
        await sut.service.create(input.createUserDto);
      }
      async function assert() {
        expect(suiteMocks.userSchema.parseAsync).toHaveBeenLastCalledWith(
          input.createUserDto
        );
        expect(mocks.usersRepository.create).toHaveBeenCalledTimes(1);
        expect(mocks.findUserDtoTransform.parseAsync).toHaveBeenCalledTimes(1);
      }

      await arrange().then(act).then(assert);
    });
  });
});
