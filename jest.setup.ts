import "@testing-library/jest-dom";
import "whatwg-fetch";
import { server } from "./src/mocks/setup";

// Add TextEncoder polyfill
if (typeof global.TextEncoder === "undefined") {
  global.TextEncoder = require("node:util").TextEncoder;
  global.TextDecoder = require("node:util").TextDecoder;
}

// Mock visibilityState to prevent errors in tests
Object.defineProperty(document, 'visibilityState', {
  value: 'visible',
  writable: true,
});

beforeAll(() => {
  // Polyfill fetch and related globals
  Object.defineProperty(window, "fetch", {
    value: fetch,
    writable: true,
  });

  server.listen();
});

afterEach(() => {
  server.resetHandlers();
});

afterAll(() => {
  server.close();
});