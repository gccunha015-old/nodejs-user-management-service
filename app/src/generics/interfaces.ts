import { NextFunction, Request, Response } from "express";

interface IRead<ID, ENTITY> {
  findAll(): Promise<ENTITY[]>;
  findById(id: ID): Promise<ENTITY>;
}

interface IWrite<ENTITY, NEW_ENTITY> {
  create(newEntity: NEW_ENTITY): Promise<ENTITY>;
}

interface IReadWrite<ID, ENTITY, NEW_ENTITY>
  extends IRead<ID, ENTITY>,
    IWrite<ENTITY, NEW_ENTITY> {}

export interface IRepository<ID, ENTITY>
  extends IReadWrite<ID, ENTITY, ENTITY> {}

export interface IService<ID, ENTITY, CREATE_DTO>
  extends IReadWrite<ID, ENTITY, CREATE_DTO> {}

export interface IController {
  findAll(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
  findById(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
  create(
    request: Request,
    response: Response,
    next: NextFunction
  ): Promise<void>;
}
