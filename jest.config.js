module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ['ts', 'js', 'tsx'],
  transform: {
    '^.+\\.[tj]sx?$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.json',
    },
  },
}
