import { NextFunction, Request, Response } from "express";

interface IRead<ID, ENTITY> {
  findAll(): Promise<ENTITY[]>;
  findById(id: ID): Promise<ENTITY | undefined>;
}

interface IWrite<NEW_ENTITY, ENTITY> {
  create(newEntity: NEW_ENTITY): Promise<ENTITY | undefined>;
}

export interface IRepository<ID, ENTITY> extends IRead<ID, ENTITY> {}

export interface IService<ID, FIND_DTO, CREATE_DTO>
  extends IRead<ID, FIND_DTO>,
    IWrite<CREATE_DTO, FIND_DTO> {}

export interface IController {
  findAll(req: Request, res: Response, nex?: NextFunction): Promise<void>;
  findById(req: Request, res: Response, nex?: NextFunction): Promise<void>;
  create(req: Request, res: Response, nex?: NextFunction): Promise<void>;
}
