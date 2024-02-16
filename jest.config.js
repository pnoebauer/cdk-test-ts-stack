module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {}, // Remove the globals section
  // Move the ts-jest configuration to directly under ts-jest within the transform section
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: {
        module: 'commonjs' // Force all TypeScript files to be treated as CommonJS modules
      }
    }],
  },
};
