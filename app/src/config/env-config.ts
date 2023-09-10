import { env as ENV } from "node:process";
import "dotenv/config";
import { Env } from "./types";

export const env: Env = {
  APP_NAME: "nodejs-authentication-service",
  PROTOCOL: ENV.APP_PROTOCOL || "http",
  HOST: ENV.APP_HOST || "localhost",
  PORT: Number.parseInt(ENV.APP_PORT || "3000"),
  BASE_URL: "",
  MONGO_URI: `mongodb://${ENV.MONGO_USER}:${ENV.MONGO_PASSWORD}@${ENV.MONGO_HOST}:${ENV.MONGO_PORT}/${ENV.MONGO_DATABASE}`,
};

env.BASE_URL = `${env.PROTOCOL}://${env.HOST}:${env.PORT}`;
