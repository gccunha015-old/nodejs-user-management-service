import type { Config } from "@jest/types";

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ["./jest/setup.jest.ts"],
  cache: true,
  verbose: false,
  automock: true,
  bail: 1,
  rootDir: ".",
  roots: ["src"],
  haste: { forceNodeFilesystemAPI: true, throwOnModuleCollision: true },
  // collectCoverage: true
};

export default config;
