// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom", // uses jest-environment-jsdom
  transform: {
    "^.+\\.[jt]sx?$": "babel-jest", // compile your JSX via Babel
  },
  moduleFileExtensions: ["js", "jsx", "json"],
  setupFiles: ["<rootDir>/jest.setup.cjs"], // ← add this
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
  testMatch: ["**/__test__/**/*.test.[jt]s?(x)"],
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  collectCoverage: true, // Optional: to collect on every run without --coverage
  collectCoverageFrom: [
    // Important: define what to include
    "src/**/*.{js,jsx}",
    "!src/main.jsx",
    "!src/vite-env.d.ts",
    "!src/data/**",
    "!src/assets/**",
    "!src/App.jsx", // Usually App.jsx is mostly setup, adjust if you have logic here
    "!src/components/groups/**", // If groups component is not yet testable
    "!**/__test__/**",
  ],
  coverageReporters: ["json", "lcov", "text", "html"], // Ensure 'json' and/or 'lcov'
  coverageDirectory: "coverage", // Specifies output directory
};
