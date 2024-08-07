module.exports = {
    testEnvironment: 'jest-fixed-jsdom',
    testEnvironmentOptions: {
      customExportConditions: [''],
    },
    setupFilesAfterEnv: ['./jest.setup.js']
  }