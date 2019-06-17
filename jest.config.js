// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  verbose: true,
  testURL: 'https://localhost/',
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
  setupFilesAfterEnv: [
    '<rootDir>/extension-app/utils/tests/setup-tests.js',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
    },
  },
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
  ],
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/reducers/root-reducer.js',
    '!src/mock-json-server/**',
    '!src/javascript/**',
    '!src/dist/**',
    '!src/store/**',
    '!src/utils/app-constants.js',
    '!src/utils/envs-constants.js',
    '!src/utils/envs-constants.js',
    '!src/utils/setup-tests.js',
    '!src/utils/setup-url.js',
    '!src/utils/system-constants.js',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
};
