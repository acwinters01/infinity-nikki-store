export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  testMatch: ['**/src/tests/**/*.test.(ts|tsx)'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  // globals: {
  //   'ts-jest': {
  //     isolatedModules: true
  //   }
  // }
};