/* eslint-disable @typescript-eslint/ban-ts-comment */
/// <reference types="cypress" />

import { getEnvUrl } from "./env.utils";
import { ALIASE } from "./const.utils";

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

const aliasInterceptedReportId = "aliasInterceptedReportId";
export const interceptReportId = () => {
    return cy.intercept("GET", "/report/*").as(aliasInterceptedReportId);
};

export const setReportId = () => {
    cy.url().then(url => {
        const reportID = url.replace("/report-information", "").replace(`${getEnvUrl()}/report/`, "");
        cy.log(`Current report ID is ${reportID}`);
        cy.wrap(reportID).as(ALIASE.reportId);
    });
};
export const getReportId = () => {
    return cy.get(`@${ALIASE.reportId}`);
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