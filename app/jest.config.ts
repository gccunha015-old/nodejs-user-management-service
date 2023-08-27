import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  verbose: false,
  automock: true,
  bail: 1,
  // collectCoverage: true
};

export default config;
