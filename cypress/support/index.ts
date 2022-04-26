/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-namespace */

/// <reference types="cypress" />
import { recordProxiedRequests } from "../../utils/intercept.utils";
import { recordDOM_Snapshot } from "../utils/snapshot.utils";
import "./commands";

require("cypress-xpath");
require("cypress-iframe");
const registerCypressGrep = require('cypress-grep')
registerCypressGrep();

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
});

Cypress.on("fail",(err,test)=>{
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
        loginByApi(url: string): Chainable<Element>
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
      }
    }
  }