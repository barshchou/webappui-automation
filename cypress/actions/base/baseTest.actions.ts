import { BoweryAutomation } from "../../types";
import { aliasQuery } from "../../utils/graphql.utils";
import NavigationSection from "./navigationSection.actions";
import { createPayload } from "../../api/report_payloads/462Avenue1NY.payload";
import mapKeysUtils from "../../utils/mapKeys.utils";
import { _HomePage } from ".";

/**
 * Login action
 */
export const loginAction = () => {
    switch (Cypress.env("loginMethod")) {
        case "ui":
            cy.loginByUI(Cypress.config().baseUrl);
            break;
        default:
            cy.loginByApi(
                Cypress.config().baseUrl, 
                Cypress.env("USERNAME"), 
                Cypress.env("PASSWORD")
            );
    }
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
                cy.createApiReport(
                    reportCreationData, _payload, _token, envUrl
                );
            });
            cy._mapGet(mapKeysUtils.report_id).then(reportId => {
                cy.log("Report id: "+reportId);
                cy.visit(`/report/${reportId}`);
            });
        }
        else {
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