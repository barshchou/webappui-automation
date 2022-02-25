/// <reference types="cypress" />
import "./commands";

require("cypress-xpath");
require("cypress-iframe");

Cypress.on("uncaught:exception", (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
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
      }
    }
  }