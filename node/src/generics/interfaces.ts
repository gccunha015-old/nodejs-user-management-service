import { RequestHandler } from "express";

interface IRead<ID, OUTPUT> {
  findAll(): Promise<OUTPUT[]>;
  findById(id: ID): Promise<OUTPUT>;
}

interface IWrite<INPUT, OUTPUT> {
  create(entityToCreate: INPUT): Promise<OUTPUT>;
  update(entityToUpdate: INPUT): Promise<OUTPUT>;
}

interface IReadWrite<ID, INPUT, OUTPUT>
  extends IRead<ID, OUTPUT>,
    IWrite<INPUT, OUTPUT> {}

export interface IRepository<ID, OUTPUT>
  extends IReadWrite<ID, OUTPUT, OUTPUT> {}

export interface IService<ID, INPUT, OUTPUT>
  extends Pick<IReadWrite<ID, INPUT, OUTPUT>, "create"> {
  update(id: ID, entityToUpdate: INPUT): Promise<OUTPUT>;
}

export interface IController {
  findById: RequestHandler;
  findAll: RequestHandler;
  create: RequestHandler;
  update: RequestHandler;
}
