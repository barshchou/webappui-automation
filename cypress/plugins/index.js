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
const { existsSync, writeFileSync, renameSync } = require("fs");
const mammoth = require("mammoth");
const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

const grepFilterPlugin = require("cypress-grep/src/plugin");

/**
 * NOTE: Sometimes we need call functions recursively (function calls itself).
 * If you try to make INLINED function call itself (how it often described in cy.task examples) - 
 * you will get "`function_name` is not defined" error.  
 * So we better first define function for tasks, and then return it from task 
 * (see `waitForFileExists` task as an example) 
 */
//#region Functions to be used in Cypress' tasks

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
 * @typedef { BoweryReports.ReportFile } ReportFile
 */
/**
 * 
 * @param {ReportFile} report 
 * @returns 
 */
const _convertDocxToHtml = async (report) => {
  let result = await mammoth.convertToHtml({path: `${report.path}/${report.name}.${report.extension}`});
  writeFileSync(`./${report.path}/${report.name}.html`,result.value);
  /**
   * ernst: returning null in order to avoid error:
   * `
   * You must return a value, null, or a promise 
   * that resolves to a value or null 
   * to indicate that the task was handled.
   * `
   */
  return null;
}

const _renameHtmlReportFile = (path,oldName,newName) =>{
  renameSync(`./${path}/${oldName}.html`,`./${path}/${newName}.html`)
  return null;
}

//#endregion

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

  //#region Cypress Tasks (more about tasks: https://docs.cypress.io/api/commands/task)
  on("task",{
    async waitForFileExists(filePath, currentTime = 0, timeout = 5000){
      return await _waitForFileExists(filePath, currentTime = 0, timeout = 5000);
    }
  });

  on("task",{
    async convertDocxToHtml(report){
      return await _convertDocxToHtml(report);
    }
  });

  on("task",{
    async renameHtmlReportFile({path,oldName,newName}){
      return _renameHtmlReportFile(path,oldName,newName);
    }
  });

  //#endregion
  return config;
};
