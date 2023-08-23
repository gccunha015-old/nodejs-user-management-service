import { env } from "node:process";

export const PROTOCOL = env.PROTOCOL || "http";
export const HOST = env.HOST || "localhost";
export const PORT = Number.parseInt(env.PORT || "3000");
export const BASE_URL = `${PROTOCOL}://${HOST}:${PORT}`;
