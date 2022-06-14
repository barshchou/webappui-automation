// ***********************************************************
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************
/// <reference types="cypress" />

const { existsSync, writeFileSync, readFile } = require("fs");
const mammoth = require("mammoth");
const glob = require("glob");
const request = require('supertest');
const util = require("util");
const io = require("socket.io-client");

const {
  addMatchImageSnapshotPlugin,
} = require("cypress-image-snapshot/plugin");

const grepFilterPlugin = require("cypress-grep/src/plugin");

//#region helper functions, not used as task functions
const readFileAsync = util.promisify(readFile);

//#endregion

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
  let result = await mammoth.convertToHtml({path: report});
  writeFileSync(`${report}.html`,result.value);
  return null;
}

/**
 * Get relative path to the file (report docx file or converted html in our case)
 * @param {reportName} _reportName - generated `testData.reportCreationData.reportNumber` in test fixture
 * @param {"docx" | "html"} _docx_html - look for file which ends with "docx" or "html" extension
 * @returns first relative path from array of matches 
 * @see https://www.npmjs.com/package/glob
 */
 const _getFilePath = async (_reportName, _docx_html, currentTime = 0, timeout = 60000) =>{
  let file = glob.sync(`cypress/downloads/${_reportName}**.${_docx_html}`)[0];
  if (file != undefined) {
    return file;  
  }
  await new Promise((resolve, reject) =>{
    setTimeout(() => resolve(true), 1000)
  });
  return _getFilePath(_reportName, _docx_html, currentTime + 1000, timeout);
}

/**
 * Login by api
 * @returns response from `/user/login` endpoint
 */
const _loginApi = async (_envUrl) => {
  let cypressEnvJson = JSON.parse(
    await readFileAsync("./cypress.env.json",{encoding:"utf-8"})
  );

  const response = await request(_envUrl)
  .post('/user/login')
  .send({
    username:process.env.CYPRESS_USERNAME ?? cypressEnvJson.USERNAME,
    password:process.env.CYPRESS_PASSWORD ?? cypressEnvJson.PASSWORD
  })
  .expect('Content-Type', /json/)
  .expect(200);

  return response;
}

/**
 * 
 * @param {*} _reportCreationData 
 * @param {*} _payloadFn 
 * @returns 
 */
 const _createReportApi = async (_reportCreationData, _payload, _token, _envUrl) => {
    let reportId = "not report id";
    
    console.log(_reportCreationData+"\n");
    console.log(_payload+"\n");
    console.log(_token);

    const socket = io.connect(_envUrl);
    const _connect = new Promise((res,rej)=>
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
      
      console.log(report._id);
      console.log(report.report_number);
      
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
        launchOptions.args.push("--window-size=1920,1080");
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
    async loginApi(_envUrl){
      return await _loginApi(_envUrl);
    }
  });
  //#endregion

  return config;
};