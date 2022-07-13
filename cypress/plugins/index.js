// ***********************************************************
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
/// <reference types="cypress" />

const { existsSync, writeFileSync } = require("fs");
const mammoth = require("mammoth");
const glob = require("glob");
const request = require('supertest');
const io = require("socket.io-client");

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
  await new Promise((resolve) =>{
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
  let result = await mammoth.convertToHtml({path: report});
  writeFileSync(`${report}.html`,result.value);
  return null;
}

/**
 * Get relative path to the file (report docx file or converted html in our case)
 * @param _reportName - generated `testData.reportCreationData.reportNumber` in test fixture
 * @param {"docx" | "html"} _docx_html - look for file which ends with "docx" or "html" extension
 * @param currentTime
 * @param timeout
 * @returns first relative path from array of matches 
 * @see https://www.npmjs.com/package/glob
 */
 const _getFilePath = async (_reportName, _docx_html, currentTime = 0, timeout = 60000) =>{
  let file = glob.sync(`cypress/downloads/**${_reportName}**.${_docx_html}`)[0];
  if (file != undefined) {
    return file;  
  }
  await new Promise((resolve) =>{
    setTimeout(() => resolve(true), 1000)
  });
  return _getFilePath(_reportName, _docx_html, currentTime + 1000, timeout);
}

/**
 * Login by api
 * @returns response from `/user/login` endpoint
 */
const _loginApi = async (_envUrl, _username, _password) => {
  const response = await request(_envUrl)
  .post('/user/login')
  .send({
    username:_username,
    password:_password
  })
  .expect('Content-Type', /json/)
  .expect(200);

  return response;
}

/**
 * Creates report with api. Uses websockets in order to be able to wait uncertain amount of time
 * (with http - it could fail due to response timeout).
 * 
 * The flow is next:
 * Connect to remote server
 * -> create promise, which we will wait to resolved
 * In this promise we do next: 
 *  -> wait on `connect` event
 *  -> when `connect` is emmited - wait on `init` event (we need to wait synchronously, exaclty after `connect` event)
 *  -> when `init` is emmited - resolving callback with data from `init` event
 *  -> resolving promise with `resolve` fn and socketId param
 * 
 * We "await" until our promise will be resolved with `socketId` value.
 * Then we wait with promise once more until event `report:created` will be emitted.
 * 
 * Since we wrap this event into promise, the data which will be resolved there
 * will be our report with necessary props (reportId and reportNumber)
 */
 const _createReportApi = async (_reportCreationData, _payload, _token, _envUrl) => {
    let reportId = "not report id";
    const socket = io.connect(_envUrl);
    const _connect = new Promise((res)=>
      // ernst: we have to chain sockets in order to have synchronous order of execution,
      // without it - we will not be able to wait until socket id will be generated and resolved by promise 
      socket.on('connect', () => console.log('Socket opened')).on('init', async socketId => {
        
        console.log(socketId)
        
        await request(_envUrl)
        .post('/report')
        .set('Accept', 'application/json')
        .send(_payload)
        .set('Authorization', `Bearer ${_token}`)
        .set('SocketId', `${socketId}`)
        .expect(200);

        res(socketId);
      })
    ) 
    console.log("socketid is "+await _connect);
    
    const subscription = new Promise((res, rej) =>
        socket.on('report:created', (data) => {
          if (!data || data.report_number !== _payload.reportNumber) {
            rej(new Error('Report was not found!'));
          } else {
            res(data);
          }
        })
      )

      const report = await subscription;
      
      console.log("Report id: "+ report._id);
      console.log("Report number: "+report.report_number);
      
      reportId = report._id;
   
    return reportId;

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
        launchOptions.args.push("--window-size=1920,1200");
        return launchOptions;
      }
  });

  //#region Cypress Tasks (more about tasks: https://docs.cypress.io/api/commands/task)
  
  on("task",{
    async waitForFileExists(filePath){
      return await _waitForFileExists(filePath);
    }
  });

  on("task",{
    async convertDocxToHtml(report){
      // ernst: it's async because it has call of async function from mammoth lib 
      return await _convertDocxToHtml(report);
    }
  });

  on("task",{
    async getFilePath({_reportName, _docx_html}){
      return await _getFilePath(_reportName, _docx_html);
    }
  });

  on("task",{
    async createReportApi({_reportCreationData, _payload, _token, _envUrl}){
      return await _createReportApi(_reportCreationData, _payload, _token, _envUrl);
    }
  });

  on("task",{
    async loginApi({_envUrl, _username, _password}){
      return await _loginApi(_envUrl, _username, _password);
    }
  });
  //#endregion

  return config;
};
