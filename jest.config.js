module.exports = {
  setupTestFrameworkScriptFile: '<rootDir>/jest.setup.js',
  testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
  collectCoverageFrom: [
    'components/**/*.{js,jsx}',
    'pages/*.{js,jsx}',
    'lib/*.{js,jsx}',
    '!<rootDir>/pages/_*',
    '!<rootDir>/components/icons/*.{js,jsx}',
  ],
}
