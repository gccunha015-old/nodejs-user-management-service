import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  cache: true,
  verbose: false,
  automock: true,
  bail: 1,
  setupFilesAfterEnv: ["./set-up-after-env.jest.ts"],
  // collectCoverage: true
};

export default config;
