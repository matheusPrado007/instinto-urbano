module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
  testMatch: ['<rootDir>/tests/unit/**/*.test.(ts|tsx)'],
  transformIgnorePatterns: [
    '/node_modules/(?!react-leaflet)/',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+\\.js$': 'babel-jest',
  },
};
