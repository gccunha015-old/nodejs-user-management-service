import { IRepository } from "../../../generics";
import { User } from "../users-model";

export interface IUsersRepository extends IRepository<string, User> {}
