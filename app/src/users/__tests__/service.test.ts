import { UsersService } from "../service";
import { CreateUserDTO } from "../dtos";

describe("UsersService", () => {
  const createUserDTO: CreateUserDTO = {
    email: "test",
    password: "pass",
  };

  describe("create", () => {
    const service = new UsersService();
    it("should be mocked", async () => {
      console.log(jest.isMockFunction(service.create));
    });
  });

  // describe("findById", () => {});

  // describe("findAll", () => {});
});
