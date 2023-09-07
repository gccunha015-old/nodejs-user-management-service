import { env as ENV } from "node:process";
import "dotenv/config";

export const env = {
  PROTOCOL: ENV.PROTOCOL || "http",
  HOST: ENV.HOST || "localhost",
  PORT: Number.parseInt(ENV.PORT || "3000"),
};
