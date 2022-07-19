/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference types="cypress" />

import { _mutateArrayInMap } from "../cypress/support/commands";
import { Alias } from "../cypress/utils/alias.utils";
import mapKeysUtils from "../cypress/utils/mapKeys.utils";

export const interceptGoogleScriptsLoad = () => {
    cy.intercept({
        url: "https://maps.googleapis.com/**",
        method: "GET"
    }).as("googleScripts");
};

export const waitGoogleScriptsToLoad = () => {
    cy.wait("@googleScripts", { timeout: 10000 }).its("response.statusCode").should("eq", 200);
};

export const interceptGoogleScriptsAndWaitLoad = () => {
    interceptGoogleScriptsLoad();
    waitGoogleScriptsToLoad();
};

export const interceptReportId = () => {
    return cy.intercept("GET", "/report/*").as(Alias.reportId);
};

export const setReportId = () => {
    cy.url().then(url => {
        const reportID = url.split(`${Cypress.config().baseUrl}/report/`)[1].split("/")[0];
        cy.log(`Current report ID is ${reportID}`);
        cy.wrap(reportID).as(Alias.reportId);

        _mutateArrayInMap(mapKeysUtils.report_id_arr, reportID, "Array of report_id");
    });
};
export const getReportId = () => {
    return cy.get(`@${Alias.reportId}`);
};

const pathToNetworkActivity = "./cypress/gh_artifacts/network_activity_records";

/**
 * Recording network requests which Cypress listen to.
 * Cypress has a module which listen and proxies all the network request
 * which was made by web application.
 * Using hidden internal commands - we retrieve them 
 * and then by explicit commands call - record them into file.
 */
export const recordProxiedRequests = () => {
    // @ts-ignore
    if(Cypress.state()?.error != undefined){
        // @ts-ignore
        let networkActivity = Cypress.ProxyLogging.proxyRequests.map(proxReq => {
            return proxReq.consoleProps;
        });
        // @ts-ignore
        Cypress.Commands._commands.log.fn("Recording network activity");
        // @ts-ignore
        Cypress.Commands._commands.log.fn(networkActivity);
        // @ts-ignore
        Cypress.Commands._commands.writeFile.fn(
            `${pathToNetworkActivity}/${Cypress.spec.name}.txt`,
            networkActivity
        );
    }
};