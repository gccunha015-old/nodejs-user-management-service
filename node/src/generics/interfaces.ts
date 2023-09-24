import { RequestHandler } from "express";

interface IRead<ID, OUTPUT> {
  findAll(): Promise<OUTPUT[]>;
  findById(id: ID): Promise<OUTPUT>;
}

interface IWrite<OUTPUT, INPUT> {
  create(newEntity: INPUT): Promise<OUTPUT>;
  update(entityToUpdate: INPUT): Promise<OUTPUT>;
}

interface IReadWrite<ID, OUTPUT, INPUT>
  extends IRead<ID, OUTPUT>,
    IWrite<OUTPUT, INPUT> {}

export interface IRepository<ID, OUTPUT>
  extends IReadWrite<ID, OUTPUT, OUTPUT> {}

export interface IService<ID, OUTPUT, INPUT>
  extends IReadWrite<ID, OUTPUT, INPUT> {}

export interface IController {
  findById: RequestHandler;
  findAll: RequestHandler;
  create: RequestHandler;
}
