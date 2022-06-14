import { BoweryAutomation } from "../../types";
import { aliasQuery } from "../../utils/graphql.utils";
import Homepage from "./homepage.actions";
import NavigationSection from "./navigationSection.actions";
import { createPayload } from "../../api/report_payloads/462Avenue1NY.payload";

/**
 * ernst: createReport is used everywhere - default logic should be: 
 * api login + api report 
 * -> navigation to dashboard 
 * -> check whether report exist on dashboard 
 * -> navigate there via UI
 * ____
 * UI login + api report
 * -> navigate to login 
 * -> auth via api 
 * -> create report via api
 * -> check whether report exists via api
 * -> re-login via ui
 * -> navigate to report (via report_id, which can be set to _setMap)
 * ___
 * api login + UI report (implemented)
 */

/**
 * Login action
 */
export const loginAction = () => {
    switch (Cypress.env("loginMethod")) {
        case "ui":
            cy.loginByUI(Cypress.config().baseUrl);
            break;
        default:
            cy.loginByApi(Cypress.config().baseUrl);
    }
};

export const navigateToEnv = () => {
    return cy.visit(Cypress.config().baseUrl);
}; 

export const createReport = (reportCreationData: BoweryAutomation.ReportCreationData, payloadFunction = createPayload) => {
    loginAction();
    cy._mapGet("user_id_api").then(_userId => {
        cy.log(`user id is: ${_userId}`);
        const _payload = payloadFunction(reportCreationData, _userId);
        if(Cypress.env("report") == "api"){
            cy._mapGet("token").then(_token => {
                cy.log(`token is: ${_token}`);
                cy.pause();
                cy.createApiReport(
                    reportCreationData, _payload, _token
                );
                cy.pause();
                navigateToEnv();
            });
            
        }
        else {
            Homepage.createReport(reportCreationData);
        }
        salesInterceptions();
    });
};

export const deleteReport = (reportNumber) => {
    cy.stepInfo('Delete report');
    NavigationSection.returnToHomePage();
    Homepage.deleteReport(reportNumber);
};

export const salesInterceptions = () => {
    cy.intercept('POST', '/graphql', req => {
        aliasQuery(req, "searchSalesTransactions");
        aliasQuery(req, "findTransactionByIdAndVersion");
        aliasQuery(req, "findSalesComps");
        aliasQuery(req, "findSingleSalesComp");
        aliasQuery(req, "updateJob");
        aliasQuery(req, "findSalesCompsByEventIds");
    });
};