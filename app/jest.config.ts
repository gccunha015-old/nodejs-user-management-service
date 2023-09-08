import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  cache: true,
  verbose: false,
  automock: true,
  bail: 1,
  setupFiles: ["./jest/setup.jest.ts"],
  // collectCoverage: true
};

export default config;
