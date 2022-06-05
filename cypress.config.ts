import { defineConfig } from 'cypress'

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 100000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  watchForFileChanges: false,
  videoCompression: 15,
  videoUploadOnPasses: false,
  experimentalStudio: true,
  projectId: 'EDvaU4',
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    excludeSpecPattern: '*.studio.*',
    specPattern: 'cypress/e2e/**/*.{js,jsx,ts,tsx}',
  },
})
