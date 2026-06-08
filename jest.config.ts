import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["."],
  testMatch: ["**/?(*.)+(spec|test).ts"],
};

export default config;