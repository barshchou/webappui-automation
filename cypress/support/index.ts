/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-namespace */

import { recordProxiedRequests } from "../../utils/intercept.utils";
import { recordDOM_Snapshot } from "../utils/snapshot.utils";
import "./commands";
import "cypress-real-events/support";
import { BoweryAutomation } from "../types/boweryAutomation.type";

require("cypress-xpath");
require("cypress-iframe");
require('dd-trace/ci/cypress/support');
const registerCypressGrep = require('cypress-grep');
registerCypressGrep();

Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

Cypress.on("fail", (err, runnable) => {
  const createCustomErrorMessage = (error, steps, runnableObj) => {
    let lastSteps = "Last logged step:\n";
    steps.forEach(step => {
      lastSteps += `${step}\n`;
    });

    const messageArr = [
      `Test Suite: ${runnableObj.parent.title}`, // describe('...')
      `Test: ${runnableObj.title}`, // it('...')
      "----------",
      `${error.message}`,
      `\n${lastSteps}`
    ];

    return messageArr.join('\n');
  };

  recordDOM_Snapshot();
  recordProxiedRequests();
  let customError = err;

  const customErrorMessage = createCustomErrorMessage(
    err,
    Cypress.env("stepInfo") || [ "no steps provided..." ],
    runnable,
  );

  const updatedError = (changeValue: object) => {
    return customError = { ...customError, ...changeValue };
  };

  const includesErrorMessage = (text: string) => customError.message.includes(text);

  customError.message = customErrorMessage;

  switch (customError.name) {
    case "AssertionError":
      if (includesErrorMessage("Expected to find element")) {
        updatedError({ name: "Element not found" });
      } else if (includesErrorMessage("to have")) {
        updatedError({ name: "Validation error" });
      }
      break;
      
    default: 
       customError;
  }
  throw customError;
});

declare global {
    namespace Cypress {
      interface Chainable {
        
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        loginByApi(url: string, username: any, password: any): Cypress.Chainable<Cypress.Response<any>>

        /**
         * 
         * @param value 
         */
        loginByUI(url: string, username: string, password: string): Chainable<Element>

        /**
         * Description of step which will desribe code below. 
         * @param message 
         */
        stepInfo(message:string): void

        /**
         * Create report through API
         * @param reportCreationData Data of a report to pass to testData (base on data that has smoke tests in WebApp)
         * @param payload Function, that returns payload object
         * @param token jwt token retrieved during login
         * @param envUrl url where the api request will go (basically, it's a Cypress' `baseUrl`)
         */
        createApiReport(
          reportCreationData: BoweryAutomation.ReportCreationData, 
          payload: any, 
          token: string,
          envUrl: string): void

        _mapSet(key: any, value: any): void  
        _mapGet(key: any): Cypress.Chainable<any>
        
        /**
         * @param {string} subject element to drag
         * @param {string} target element to drop into
         */
        dragAndDrop: (subject:string, target:string) => void;
      }
    }
  }