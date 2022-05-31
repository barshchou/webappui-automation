/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-namespace */

import { recordProxiedRequests } from "../../utils/intercept.utils";
import { recordDOM_Snapshot } from "../utils/snapshot.utils";
import "./commands";
import "cypress-real-events/support";

require("cypress-xpath");
require("cypress-iframe");
const registerCypressGrep = require('cypress-grep');
registerCypressGrep();

Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

Cypress.on("fail", (err) => {
  recordDOM_Snapshot();
  recordProxiedRequests();
  throw err;
});

declare global {
    namespace Cypress {
      interface Chainable {
        /**
         * Custom command to select DOM element by data-cy attribute.
         * @example cy.dataCy('greeting')
         */
        loginByApi(url: string): Cypress.Chainable<Cypress.Response<any>>
        
        /**
         * 
         * @param value 
         */
        loginByUI(url: string): Chainable<Element>
        /**
         * 
         * @param value 
         */
        login(): Chainable<Element>
        /**
         * Description of step which will desribe code below. 
         * @param message 
         */
        stepInfo(message:string): void

        /**
         * Create report through API
         * @param reportCreationData Data of a report to pass to testData
         * @param payload Function, that returns payload object
         */
        createApiReport(reportCreationData: BoweryAutomation.ReportCreationData, payload: any, token: any): void

        _mapSet(key: any, value: any): void  
        _mapGet(key: any): Cypress.Chainable<any>
      }
    }
  }