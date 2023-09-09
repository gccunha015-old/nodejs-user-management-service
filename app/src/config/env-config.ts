import { env as ENV } from "node:process";
import "dotenv/config";

export const env = {
  PROTOCOL: ENV.APP_PROTOCOL || "http",
  HOST: ENV.APP_HOST || "localhost",
  PORT: Number.parseInt(ENV.APP_PORT || "3000"),
  MONGO_URI: `mongodb://${ENV.MONGO_USER}:${ENV.MONGO_PASSWORD}@${ENV.MONGO_HOST}:${ENV.MONGO_PORT}/${ENV.MONGO_DATABASE}`,
};
