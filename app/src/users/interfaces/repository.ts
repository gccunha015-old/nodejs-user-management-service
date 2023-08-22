import { IRepository } from "../../generics";
import { User } from "../model";

export interface IUsersRepository extends IRepository<string, User> {}
