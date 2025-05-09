// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",            // uses jest-environment-jsdom
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest"    // compile your JSX via Babel
  },
  moduleFileExtensions: ["js", "jsx", "json"],
  setupFiles: ["<rootDir>/jest.setup.cjs"],       // ← add this
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testMatch: ["**/__test__/**/*.test.[jt]s?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy"
  }
};