module.exports = {
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  transform: {
    '^.+\\.[tj]sx?$': 'babel-jest',
    '^.+\\.css$': 'jest-transform-css',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {},
}
