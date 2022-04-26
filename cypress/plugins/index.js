/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { existsSync } = require("fs");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

const grepFilterPlugin = require("cypress-grep/src/plugin");

const _waitForFileExists = async (filePath, currentTime = 0, timeout = 5000) => {
  if (existsSync(filePath)) {
    return true;  
  }
  if (currentTime === timeout){
     return false; 
  }
  await new Promise((resolve, reject) =>{
    setTimeout(() => resolve(true), 1000)
  });
  return _waitForFileExists(filePath, currentTime + 1000, timeout);
}
/**
 * @type {Cypress.PluginConfig}
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  grepFilterPlugin(config);
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config

  on("before:browser:launch", (browser, launchOptions) => {
      if (browser.isHeadless === true) {
        launchOptions.args.push("--window-size=1920,1080");
        return launchOptions;
      }
  });
  on("task",{
    async waitForFileExists(filePath, currentTime = 0, timeout = 5000){
      // TODO: add renameFile function from ${reportId}.docx to ${Cypress.spec.name}.docx
      return await _waitForFileExists(filePath, currentTime = 0, timeout = 5000);
    }
  })
  return config;
};
