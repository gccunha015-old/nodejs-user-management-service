import { UsersService } from "../service";
import { UsersInMemoryRepository } from "../repository";
import { UserSchema, User } from "../model";
import { CreateUserDto } from "../dtos";

jest.unmock("zod");

jest.unmock("../service");
describe("UsersService", () => {
  const mocks = {
    usersRepository: jest.mocked(new UsersInMemoryRepository()),
  };
  const stubs = {} as { id: string; user: User };
  const service = new UsersService(mocks.usersRepository);

  beforeAll(() => {
    stubs.id = "0";
    stubs.user = {
      externalId: stubs.id,
      email: "test@test.com",
      password: "password",
      createdAt: new Date(),
    };
  });

  describe("findById", () => {
    beforeEach(() => {
      mocks.usersRepository.findById.mockClear();
    });

    it("should return user with valid id", async () => {
      async function arrange() {
        mocks.usersRepository.findById.mockResolvedValueOnce(stubs.user);
      }
      async function act() {
        try {
          return await service.findById(stubs.id);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toStrictEqual(stubs.user);
        expect(mocks.usersRepository.findById).toHaveBeenCalledWith(stubs.id);
      }

      await arrange().then(act).then(assert);
    });

    it("should throw error for invalid id", async () => {
      async function arrange() {
        mocks.usersRepository.findById.mockRejectedValueOnce(new Error());
      }
      async function act() {
        try {
          return await service.findById(stubs.id);
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toBeInstanceOf(Error);
        expect(mocks.usersRepository.findById).toHaveBeenCalledWith(stubs.id);
      }

      await arrange().then(act).then(assert);
    });
  });

  describe("findAll", () => {
    const suiteStubs = {} as { users: User[] };

    beforeAll(() => {
      suiteStubs.users = [
        stubs.user,
        {
          ...stubs.user,
          externalId: "2",
        },
      ];
    });

    beforeEach(() => {
      mocks.usersRepository.findAll.mockClear();
    });

    it("should return all users", async () => {
      async function arrange() {
        mocks.usersRepository.findAll.mockResolvedValueOnce(suiteStubs.users);
      }
      async function act() {
        try {
          return await service.findAll();
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toHaveLength(2);
        expect(mocks.usersRepository.findAll).toHaveBeenCalled();
      }

      await arrange().then(act).then(assert);
    });

    it("should return empty array", async () => {
      async function arrange() {
        mocks.usersRepository.findAll.mockResolvedValueOnce([]);
      }
      async function act() {
        try {
          return await service.findAll();
        } catch (error) {
          return error;
        }
      }
      function assert(actResult: unknown) {
        expect(actResult).toHaveLength(0);
        expect(mocks.usersRepository.findAll).toHaveBeenCalled();
      }

      await arrange().then(act).then(assert);
    });
  });

  // describe("create", () => {
  //   const UserSchemaMock = jest.mocked(UserSchema);
  //   const createUserDtoStub: CreateUserDto = {
  //     email: "test@test.com",
  //     password: "password",
  //   };

  //   beforeEach(() => {
  //     UserSchemaMock.parseAsync.mockClear();
  //     mocks.usersRepository.create.mockClear();
  //   });

  //   it("should create a user", async () => {
  //     async function arrange() {
  //       UserSchemaMock.parseAsync.mockResolvedValueOnce(stubs.user);
  //       mocks.usersRepository.create.mockResolvedValueOnce(stubs.user);
  //     }
  //     async function act() {
  //       try {
  //         return await service.create(createUserDtoStub);
  //       } catch (error) {
  //         return error;
  //       }
  //     }
  //     function assert(actResult: unknown) {
  //       expect(actResult).toStrictEqual(stubs.user);
  //       expect(UserSchemaMock.parseAsync).toHaveBeenCalledWith(
  //         createUserDtoStub
  //       );
  //       expect(mocks.usersRepository.create).toHaveBeenCalledWith(stubs.user);
  //     }

  //     await arrange().then(act).then(assert);
  //   });

  //   it("should throw error for invalid email", async () => {
  //     const createUserDtoWithInvalidEmailStub = {
  //       ...createUserDtoStub,
  //       email: "test",
  //     };
  //     async function arrange() {
  //       UserSchemaMock.parseAsync.mockRejectedValueOnce(new Error());
  //     }
  //     async function act() {
  //       try {
  //         return await service.create(createUserDtoWithInvalidEmailStub);
  //       } catch (error) {
  //         return error;
  //       }
  //     }
  //     function assert(actResult: unknown) {
  //       expect(actResult).toBeInstanceOf(Error);
  //       expect(UserSchemaMock.parseAsync).toHaveBeenCalledWith(
  //         createUserDtoWithInvalidEmailStub
  //       );
  //       expect(mocks.usersRepository.create).not.toHaveBeenCalled();
  //     }

  //     await arrange().then(act).then(assert);
  //   });

  //   it("should throw error for invalid password", async () => {
  //     const stubs = {} as {
  //       createUserDto: CreateUserDto;
  //     };
  //     async function arrange() {
  //       stubs.createUserDto = {
  //         ...createUserDtoStub,
  //         password: "pass",
  //       };
  //       UserSchemaMock.parseAsync.mockRejectedValueOnce(new Error());
  //     }
  //     async function act() {
  //       const { createUserDto } = stubs;
  //       try {
  //         return await service.create(createUserDto);
  //       } catch (error) {
  //         return error;
  //       }
  //     }
  //     function assert(actResult: unknown) {
  //       const { createUserDto } = stubs;
  //       expect(actResult).toBeInstanceOf(Error);
  //       expect(UserSchemaMock.parseAsync).toHaveBeenCalledWith(createUserDto);
  //       expect(mocks.usersRepository.create).not.toHaveBeenCalled();
  //     }

  //     await arrange().then(act).then(assert);
  //   });
  // });
});
