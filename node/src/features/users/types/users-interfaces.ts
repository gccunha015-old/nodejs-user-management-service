import { IRepository, IService, IController } from "../../../generics";
import { CreateUserDto, FindUserDto, UpdateUserDto } from "./users-dtos";
import { User } from "./users-model";

export interface IUsersRepository extends IRepository<string, User> {}
export interface IUsersService
  extends IService<string, CreateUserDto | UpdateUserDto, FindUserDto> {}
export interface IUsersController extends IController {}
