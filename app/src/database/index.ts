import { MongoClient } from "mongodb";
import { env } from "../config";

export const mongoClient = new MongoClient(env.MONGO_URI, {
  authSource: "admin",
});
mongoClient.connect();
export const database = mongoClient.db();
