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
const registerCypressGrep = require('cypress-grep');
registerCypressGrep();

Cypress.on("uncaught:exception", () => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

after(() => {
  let isSmoke = Cypress.spec.relative.includes("smoke");
  if(isSmoke){
    cy.log("Smoke test, does not deleting report");
    return;
  }
  else{
    cy.deleteApiReport();
  }
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

        /**
         * Deletes report using `DELETE` method and `/report/:id` route.
         * 
         * Note_1: code of this methods starts in *WebApp* repo, search for `router.delete('/:id', userController.isAuthenticated, controller.delete)`
         * in `./routes/report/index.js`
         * 
         * Note_2: this functionality in *WebApp* might changed due to migration 
         * from old code to nestjs codebase (in a years to come),
         * so just keep that in mind.
         */
        deleteApiReport(): void

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