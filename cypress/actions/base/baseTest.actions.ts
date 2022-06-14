import { BoweryAutomation } from "../../types";
import { aliasQuery } from "../../utils/graphql.utils";
import NavigationSection from "./navigationSection.actions";
import { createPayload } from "../../api/report_payloads/462Avenue1NY.payload";
import mapKeysUtils from "../../utils/mapKeys.utils";
import { _HomePage } from ".";

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
    salesInterceptions();

    const envUrl = Cypress.config().baseUrl;
    loginAction();
    cy._mapGet("user_id_api").then(_userId => {
        cy.log(`user id is: ${_userId}`);
        const _payload = payloadFunction(reportCreationData, _userId);
        if(Cypress.env("report") == "api"){
            cy._mapGet("token").then(_token => {
                cy.log(`token is: ${_token}`);
                cy.createApiReport(
                    reportCreationData, _payload, _token, envUrl
                );
                navigateToEnv();
            });
            cy._mapGet(mapKeysUtils.report_id).then(reportId => {
                cy.log(reportId);
                _HomePage.Page.reportsRows.should("be.visible")
                .each((elem) => {
                    if(elem.attr("href").includes(reportId)){
                        cy.log("Found Report").visit(`/report/${reportId}`);
                    }
                    return;
                });
            });
        }
        else {
            navigateToEnv();
            _HomePage.createReport(reportCreationData);
        }
    });
};

export const deleteReport = (reportNumber) => {
    cy.stepInfo('Delete report');
    NavigationSection.returnToHomePage();
    _HomePage.deleteReport(reportNumber);
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