// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html
module.exports = {
  globals: {
    'process.env.currEnv': 'TEST',
  },
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
    'extension-app/**/*.js',
  ],
  testResultsProcessor: 'jest-sonar-reporter',
  transform: {
    '^.+\\.js$': 'babel-jest',
    '^.+\\.hbs$': '<rootDir>/extension-app/utils/tests/jest-raw-loader.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/extension-app/utils/tests/jest-static-loader.js',
  },
};
