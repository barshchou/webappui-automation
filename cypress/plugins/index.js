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
 * 
 * @returns 
 */
const _loginApi = async () => {
  let cypressEnvJson = JSON.parse(
    await readFileAsync("./cypress.env.json",{encoding:"utf-8"})
  );

  const response = await request("https://bowery-staging.herokuapp.com")
  .post('/user/login')
  .send({
    username:cypressEnvJson.USERNAME,
    password:cypressEnvJson.PASSWORD
  })
  .expect('Content-Type', /json/)
  .expect(200);

  /**
   * ernst: when you will be resolving value through `.then(()=>{})` - it WILL NOT return 
   * value of `request.Response` type. It will return this:
   * {
    "req": {
        "method": "POST",
        "url": "https://bowery-staging.herokuapp.com/user/login",
        "data": {
            "username": "ernst.dzeravianka@boweryvaluation.com",
            "password": "login"
        },
        "headers": {
            "content-type": "application/json"
        }
    },
    "header": {
      ...
    },
    "status": 200,
    "text": "{\"token\":\"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfaWQiOiI2MjJmODQ4MzljZTU5ZjVkZWNjMTg5NGIiLCJ1c2VybmFtZSI6ImVybnN0LmR6ZXJhdmlhbmthQGJvd2VyeXZhbHVhdGlvbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCRaTktqNXp1RER4Rmh0NDBuWDRFcVFPeTE5ZUZYLlc0WXJjNU1CNDNaV1F1VXRpYVFCajRrbSIsImF2YXRhciI6eyJfaWQiOiI2Mjk0YmRiOWEzZDc2NzAwM2JlZmQ4YTIiLCJjZG5VcmwiOiJodHRwczovL2xoMy5nb29nbGV1c2VyY29udGVudC5jb20vYS9BQVRYQUp6ZEdmYTFiUGFkb21KenE4d3VLaGg1aF9hSkhHM3IwVEcweUVDaz1zOTYtYyJ9LCJvcmdhbml6YXRpb25JZCI6IjU4MThjMjVmNjdhYzE1MTEwMDk1YWZjNCIsImFjdGl2YXRlZCI6dHJ1ZSwicm9sZXMiOlswXSwibmFtZSI6eyJfaWQiOiI2Mjk2MDk1MDU3NjEzYjAwNGI5NWY4MzkiLCJmaXJzdCI6IkVybnN0IiwibGFzdCI6IkR6ZXJhdmlhbmthIn0sImlzUm9ib3QiOmZhbHNlLCJnb29nbGVJZCI6IjExMzE2NzUxMzgyOTUzOTkwNjY1MyIsInBlcm1pc3Npb25zIjpbImNvbnRlbnRFZGl0b3IiLCJvcmdhbml6YXRpb25TZXR0aW5ncy52aWV3Iiwib3JnYW5pemF0aW9uU2V0dGluZ3MuZWRpdCJdLCJ0cyI6MTY1Mzk5OTk1MzAzM30.pzNy6xg30GbUguQQBYRHdEk1TP1M1sH-fSpv40R-opQ\",\"user\":{\"permissions\":[\"contentEditor\",\"organizationSettings.view\",\"organizationSettings.edit\"],\"groups\":[\"Product Design & Tech\"],\"isRobot\":false,\"roles\":[0],\"_id\":\"622f84839ce59f5decc1894b\",\"username\":\"ernst.dzeravianka@boweryvaluation.com\",\"name\":{\"_id\":\"6296095057613b004b95f839\",\"first\":\"Ernst\",\"last\":\"Dzeravianka\"},\"activated\":true,\"organizationId\":\"5818c25f67ac15110095afc4\",\"password\":\"$2a$08$ZNKj5zuDDxFht40nX4EqQOy19eFX.W4Yrc5MB43ZWQuUtiaQBj4km\",\"__v\":2,\"appraisalCertifications\":[],\"googleId\":\"113167513829539906653\",\"avatar\":{\"_id\":\"6294bdb9a3d767003befd8a2\",\"cdnUrl\":\"https://lh3.googleusercontent.com/a/AATXAJzdGfa1bPadomJzq8wuKhh5h_aJHG3r0TG0yECk=s96-c\"},\"ts\":1653999953033,\"fullName\":\"Ernst Dzeravianka\",\"id\":\"622f84839ce59f5decc1894b\"}}"
}
  `text` property - is a stringified response.body
  I don't know why it resolve this value instead of `request.Response` but however.
   */
  return response;
}

/**
 * 
 * @param {*} _reportCreationData 
 * @param {*} _payloadFn 
 * @returns 
 */
 const _createReportApi = async (_reportCreationData, _payloadFn) => {
   console.log(_reportCreationData);
   console.log(_payloadFn);

  readFile('./cypress.env.json', 'utf8', function (err, data) {
    if (err) throw err;
    cypressEnv = JSON.parse(data);
    console.log(cypressEnv.USERNAME);
    console.log(cypressEnv.PASSWORD);
  });
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
    async createReportApi({_reportCreationData, _payloadFn}){
      return await _createReportApi(_reportCreationData, _payloadFn);
    }
  });

  on("task",{
    async loginApi(){
      return await _loginApi();
    }
  });
  //#endregion

  return config;
};