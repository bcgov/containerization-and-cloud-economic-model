module.exports = {
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.js',
    '!**/node_modules/**',
    '!frontend/**/*.*',
    '!src/components/*.*',
    '!src/db/**',
    '!src/docs/**',
    '!src/forms/**/*.*',
    'src/forms/attestations/middleware/searchParameters.js',
    'src/forms/attestations/controller.js',
    'src/forms/attestations/router.js',
    'src/forms/common/router.js',
    'src/forms/form/middleware/searchParameters.js',
    'src/forms/teammanagement/router.js',
  ],
  moduleFileExtensions: ['js', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },
  testMatch: [
    '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testPathIgnorePatterns: ['frontend'],
  testResultsProcessor: 'jest-sonar-reporter',
  testURL: 'http://localhost/',

};
