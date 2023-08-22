import { NextFunction, Request, Response } from "express";

interface IRead<ID, ENTITY> {
  findAll(): Promise<ENTITY[]>;
  findById(id: ID): Promise<ENTITY | undefined>;
}

interface IWrite<ENTITY, NEW_ENTITY> {
  create(newEntity: NEW_ENTITY): Promise<ENTITY | undefined>;
}

interface IReadWrite<ID, ENTITY, NEW_ENTITY>
  extends IRead<ID, ENTITY>,
    IWrite<ENTITY, NEW_ENTITY> {}

export interface IRepository<ID, ENTITY>
  extends IReadWrite<ID, ENTITY, ENTITY> {}

export interface IService<ID, FIND_DTO, CREATE_DTO>
  extends IReadWrite<ID, FIND_DTO, CREATE_DTO> {}

export interface IController {
  findAll(req: Request, res: Response, nex?: NextFunction): Promise<void>;
  findById(req: Request, res: Response, nex?: NextFunction): Promise<void>;
  create(req: Request, res: Response, nex?: NextFunction): Promise<void>;
}
