// ***********************************************************
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
/// <reference types="cypress" />
const { existsSync, writeFileSync, renameSync } = require("fs");
const mammoth = require("mammoth");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

const grepFilterPlugin = require("cypress-grep/src/plugin");

/**
 * NOTE: (ernst) Sometimes we need call functions recursively (function calls itself).
 * If you try to make INLINED function call itself (how it often described in cy.task examples) - 
 * you will get "`function_name` is not defined" error.  
 * So we better first define function for tasks, and then return it from task 
 * (see `waitForFileExists` task as an example) 
 */

/**
 * WARN: (ernst) functions, called in tasks, 
 * must to return a value, null, or a promise that resolves to a value or null.
 * Otherwise you get the error:
 * `
 * You must return a value, null, or a promise 
 * that resolves to a value or null 
 * to indicate that the task was handled.
 * `
 */

//#region Functions to be used in Cypress' tasks

/**
 * Waiting recursevly file to exist. If file exists - return Promise<true>.
 * If not - resolve Promise with timeout for 1 second (this is our interval for checks),
 * and return function itself.
 * if currentTime == timeout 
 * (notice, that we call function itself with currentTime+1second,
 * so we will make recursion until timeout exceed) - return Promise<false>
 * @param {string} filePath 
 * @param {number} currentTime 
 * @param {number} timeout 
 * @returns {Promise<boolean>} recursive call or Promise<boolean>
 */
const _waitForFileExists = async (filePath, currentTime = 0, timeout = 60000) => {
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
 * ernst: for type - check `cypress/types`, I couldn't import it via JSDoc explicitly
 * 
 * Converts docx file into html via mammoth lib and writes it into cypress/downloads
 * @param {ReportFile} report 
 * @returns {null} for tasks' return type - please check notes above
 */
const _convertDocxToHtml = async (report) => {
  let result = await mammoth.convertToHtml({path: `${report.path}/${report.name}.${report.extension}`});
  writeFileSync(`${report.path}/${report.name}.html`,result.value);
  return null;
}

/**
 * Renames file via fs.renameSync
 * @param {string} oldPath 
 * @param {string} newPath 
 * @returns {null} - for tasks' return type - please check notes above
 */
const _renameFile = (oldPath,newPath) =>{
  renameSync(`./${oldPath}`,`./${newPath}`)
  return null;
}

//#endregion

/**
 * @type {Cypress.PluginConfig}
 * This function is called when a project is opened or re-opened (e.g. due to 
 * the project's config changing).
 * @param {Cypress.PluginEvents}`on` is used to hook into various events Cypress emits
 * @param {Cypress.PluginConfigOptions} `config` is the resolved Cypress config 
 */
// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
 
  addMatchImageSnapshotPlugin(on, config);
  grepFilterPlugin(config);


  on("before:browser:launch", (browser, launchOptions) => {
      if (browser.isHeadless === true) {
        launchOptions.args.push("--window-size=1920,1080");
        return launchOptions;
      }
  });

  //#region Cypress Tasks (more about tasks: https://docs.cypress.io/api/commands/task)
  
  on("task",{
    async waitForFileExists(filePath, currentTime = 0, timeout = 60000){
      return await _waitForFileExists(filePath, currentTime, timeout);
    }
  });

  on("task",{
    async convertDocxToHtml(report){
      // ernst: it's async because it has call of async function from mammoth lib 
      return await _convertDocxToHtml(report);
    }
  });

  on("task",{
    async renameFile({oldPath,newPath}){
      return _renameFile(oldPath,newPath);
    }
  });

  //#endregion

  return config;
};
