import { BoweryAutomation } from "../../types/boweryAutomation.type";
import { aliasQuery } from "../../utils/graphql.utils";
import NavigationSection from "./navigationSection.actions";
import { createPayload } from "../../api/report_payloads/462Avenue1NY.payload";
import mapKeysUtils from "../../utils/mapKeys.utils";
import { _HomePage, _NavigationSection } from ".";
import { Alias, gqlOperationNames } from "../../utils/alias.utils";
import routesUtils from "../../utils/routes.utils";

/**
 * Login action
 */
export const loginAction = (username = Cypress.env("USERNAME"), password = Cypress.env("PASSWORD")) => {
    switch (Cypress.env("loginMethod")) {
        case "ui":
            cy.loginByUI(Cypress.config().baseUrl, username, password);
            break;
        default:
            cy.loginByApi(Cypress.config().baseUrl, username, password);
            cy.visit('/');
    }
    
};

export const createReport = (reportCreationData: BoweryAutomation.ReportCreationData, 
    username = Cypress.env("USERNAME"), password = Cypress.env("PASSWORD"),
    payloadFunction = createPayload) => {

    salesInterceptions();

    const envUrl = Cypress.config().baseUrl;
    loginAction(username, password);
    cy._mapGet(mapKeysUtils.userId).then(_userId => {
        cy.log(`user id is: ${_userId}`);
        const _payload = payloadFunction(reportCreationData, _userId);
        if (Cypress.env("report") == "api") {
            cy._mapGet(mapKeysUtils.bearerToken).then(_token => {
                cy.createApiReport(
                    reportCreationData, _payload, _token, envUrl
                );
            });
            cy._mapGet(mapKeysUtils.reportId).then(reportId => {
                cy.log("Report id: "+reportId);
                cy.visit(`/report/${reportId}/report-information`);
                _NavigationSection.waitForUrl(routesUtils.keyInfo);
            });
        } else {
            _HomePage.createReport(reportCreationData);
        }
    });
};

export const deleteReport = (reportNumber) => {
    cy.stepInfo('Delete report');
    NavigationSection.returnToHomePage();
    _HomePage.deleteReport(reportNumber);
};

/**
 * Set up interceptions for GraphQL requests 
 * which we wait when interacting with Comp-plex
 */
export const salesInterceptions = () => {
    cy.intercept('POST', '/graphql', req => {
        aliasQuery(req, gqlOperationNames.searchSalesTransactions);
        aliasQuery(req, gqlOperationNames.findTransactionByIdAndVersion);
        aliasQuery(req, gqlOperationNames.findSalesComps);
        aliasQuery(req, gqlOperationNames.findSingleSalesComp);
        aliasQuery(req, gqlOperationNames.updateJob);
        aliasQuery(req, gqlOperationNames.findTransactionsByIdsAndVersions);
        aliasQuery(req, gqlOperationNames.searchJobs);
    });
};

/**
 * Navigating to Comp-plex client
 */
export const navigateToCompplex = () => {
    salesInterceptions();
    cy.stepInfo(`Navigating to standalone Comp-plex.`);
    cy.visit("/index.html");
    cy.wait(`@${Alias.gql.SearchSalesTransactions}`);
};