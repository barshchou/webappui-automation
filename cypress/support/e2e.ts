/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-namespace */
import { recordProxiedRequests } from "../../utils/intercept.utils";
import { recordDOMSnapshot } from "../utils/snapshot.utils";
import "./commands";
import "cypress-real-events/support";
import { BoweryAutomation } from "../types/boweryAutomation.type";

require("cypress-xpath");
require("cypress-iframe");
require('dd-trace/ci/cypress/support');
const registerCypressGrep = require('cypress-grep');
registerCypressGrep();

Cypress.on("uncaught:exception", () => {
    /*
     * returning false here prevents Cypress from
     * failing the test
     */
    return false;
});

after(() => {
    // check whether test was from smoke suite by its relative path
    if (Cypress.spec.relative.includes("smoke")) {
        cy.log("Smoke test, does not deleting report");
        cy.logNode("Smoke test, does not deleting report");
        return;
    } else {
        cy.deleteApiReport();
    }
});

Cypress.on("fail", (err, runnable) => {
    const createCustomErrorMessage = (error, steps, runnableObj) => {
        let lastStep = "Last logged step:\n";
        steps.forEach(step => {
            lastStep += `${step}\n`;
        });

        console.log("err", err);
        console.log("runnable", runnable);
        const messageArr = [
            `Test Suite: ${runnableObj.parent.title}`, // describe('...')
            `Test: ${runnableObj.title}`, // it('...')
            "----------",
            `${error.message}`,
            `\n${lastStep}`
        ];

        return messageArr.join('\n');
    };

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
    
    recordDOMSnapshot();
    recordProxiedRequests();
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

        loginByUI(url: string, username: string, password: string): Chainable<Element>

        /**
         * Description of step which will describe code below. 
         * @param message 
         */
        stepInfo(message: string): void

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
         * Deletes report(s) using `DELETE` method and `/report/:id` route. 
         * Takes `report_id`'s from `_map`, iterates over them and execute request (see code in `./commands.ts`)
         * 
         * Note_1: code of this methods starts in *WebApp* repo, search for 
         * `router.delete('/:id', userController.isAuthenticated, controller.delete)` in `./routes/report/index.js`
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

        /**
         * Add message to node js' `console.log` method
         */
        logNode: (message: string) => void;
      }
    }
  }