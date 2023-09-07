import { NextFunction, Response } from "express";

export const expressMocks = {
  response: {
    status: jest.fn().mockReturnThis(),
    location: jest.fn().mockReturnThis(),
    json: jest.fn().mockReturnThis(),
  } as Partial<Response> as jest.MockedObjectDeep<Response>,
  nextFunction: jest.fn() as jest.MockedFunction<NextFunction>,
};
