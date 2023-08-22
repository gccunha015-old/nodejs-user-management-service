import { FindUserDTO, FindUserDTOSchema } from "./dtos/find";
import { IUserService, IUserRepository } from "./interfaces";

export class UserService implements IUserService {
  private readonly _repository: IUserRepository;

  constructor(repository: IUserRepository) {
    this._repository = repository;
  }

  findAll(): Promise<FindUserDTO[]> {
    return FindUserDTOSchema.parseAsync(this._repository.findAll());
  }
}
