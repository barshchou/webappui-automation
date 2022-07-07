import { defineConfig } from 'cypress';
import grepFilterPlugin from "cypress-grep/src/plugin";
import { addMatchImageSnapshotPlugin } from '@simonsmith/cypress-image-snapshot/plugin';
import api from "./cypress/api";
import { ENVS, evalUrl } from './utils/env.utils';

export default defineConfig({
  chromeWebSecurity: false,
  defaultCommandTimeout: 100000,
  viewportWidth: 1920,
  viewportHeight: 1080,
  watchForFileChanges: false,
  videoCompression: 15,
  videoUploadOnPasses: false,
  projectId: 'EDvaU4',
  e2e: {
    // baseUrl is staging, but it will be reset downbelow
    baseUrl: ENVS.staging,
    
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      // setup and validate `baseUrl` in runtime
      config.baseUrl = evalUrl(config);

      // ernst: don't remove, this is for debug in CI
      // eslint-disable-next-line no-console
      console.log(`\nBaseUrl is: ${config.baseUrl}\n`);

      // configuring cypress-grep plugin
      grepFilterPlugin(config);

      // configuring cypress-image-snapshot plugin
      addMatchImageSnapshotPlugin(on, config);

      on("task", {
        async loginApi({ _envUrl, _username, _password }){
          return await api._loginApi(_envUrl, _username, _password);
        }
      });

      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return require('./cypress/plugins/index.js')(on, config);
    },
    excludeSpecPattern: '*.studio.*',
    specPattern: 'cypress/integration/**/*.spec.{js,jsx,ts,tsx}',
  },
});
