import { IService } from "../../generics";
import { CreateUserDTO, FindUserDTO } from "../dtos";

export interface IUserService
  extends IService<string, FindUserDTO, CreateUserDTO> {}
