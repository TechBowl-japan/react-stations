module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
    "^.+\\.js$": "babel-jest",
    "^.+\\.css$": "jest-transform-css"
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
  moduleNameMapper: {
  },
}
