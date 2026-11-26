/** Jest config for Security Rules tests. They run in Node against the Firebase emulator. */
module.exports = {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/rules-tests/**/*.test.ts'],
  transform: { '^.+\\.ts$': ['babel-jest', { presets: ['babel-preset-expo'] }] },
};