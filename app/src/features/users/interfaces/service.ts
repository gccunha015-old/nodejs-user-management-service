import { IService } from "../../../generics";
import { CreateUserDto } from "../dtos";
import { User } from "../model";

export interface IUsersService extends IService<string, User, CreateUserDto> {}
