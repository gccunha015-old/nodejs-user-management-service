import { IRepository } from "../../generics";
import { User } from "../model";

export interface IUserRepository extends IRepository<string, User> {}
