import { IService } from "../../generics";
import { CreateUserDTO, FindUserDTO } from "../dtos";

export interface IUsersService
  extends IService<string, FindUserDTO, CreateUserDTO> {}
