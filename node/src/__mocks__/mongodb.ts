export class UUID {
  toHexString = jest.fn();
}
export class FindCursor {
  toArray = jest.fn();
}
export class Collection {
  findOne = jest.fn();
  find = jest.fn().mockImplementation(() => new FindCursor());
  insertOne = jest.fn();
  updateOne = jest.fn();
}
export class Db {
  collection = jest.fn().mockImplementation(() => new Collection());
}
export class MongoClient {
  db = jest.fn().mockImplementation(() => new Db());
  close = jest.fn();
}
