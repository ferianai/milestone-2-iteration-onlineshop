import nextJest from "next/jest";
import type { Config } from "jest";

const createJestConfig = nextJest({
  dir: "./",
});

const customJestConfig: Config = {
  coverageProvider: 'v8',
  // testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testEnvironment: "jest-environment-jsdom",  
  testEnvironmentOptions: {
    customExportConditions: [""], 
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  modulePaths: ["<rootDir>/src"],
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{js,jsx,ts,tsx}",
    "!**/*.d.ts",
    "!**/node_modules/**",
    "!**/*.type.ts",
    "!<rootDir>/.next/**",
    "!<rootDir>/coverage/**",
    "!<rootDir>/*.config.ts",
    "!<rootDir>/src/middleware.ts",
    "!<rootDir>/src/lib/**",
    "!<rootDir>/src/midlewares/**",
    "!<rootDir>/src/types/**",
    "!<rootDir>/src/mocks/**",
    "!<rootDir>/src/styles/**",
    "!<rootDir>/src/context/**",
    "!<rootDir>/src/pages/api/**",
    "!<rootDir>/src/pages/shop/**",
    "!<rootDir>/src/pages/setting/**",
    "!<rootDir>/src/pages/_app.tsx",
    "!<rootDir>/src/pages/_document.tsx",
    "!<rootDir>/src/pages/404.tsx",
    "!<rootDir>/src/pages/index.tsx",
    "!<rootDir>/src/pages/product/[id]/**",
    "!<rootDir>/src/pages/auth/**",
    "!<rootDir>/src/pages/cart/**",
    "!<rootDir>/src/pages/payment/**",
    "!<rootDir>/src/views/**",
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest", 
  },
  // testMatch: ["**/__tests__/**/*.test.[jt]s?(x)"],

};

export default createJestConfig(customJestConfig);
