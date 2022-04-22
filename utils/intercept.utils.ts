/// <reference types="cypress" />

import { getEnvUrl } from "./env.utils";

export const interceptGoogleScriptsLoad = () => {
    cy.intercept({
        url: "https://maps.googleapis.com/**",
        method: "GET"
    }).as("googleScripts");
};

export const waitGoogleScriptsToLoad = () => {
    cy.wait("@googleScripts", {timeout: 10000}).its("response.statusCode").should("eq", 200);
};

export const interceptGoogleScriptsAndWaitLoad = () => {
    interceptGoogleScriptsLoad();
    waitGoogleScriptsToLoad();
};

const aliasInterceptedReportId = "aliasInterceptedReportId";
export const interceptReportId = () => {
    return cy.intercept("GET","/report/*").as(aliasInterceptedReportId);
};

const aliasReportId = "aliasReportId";
export const setReportId = () => {
    cy.url().then(url => {
        const reportID = url.replace("/report-information", "").replace(`${getEnvUrl()}/report/`, "");
        cy.log(`Current report ID is ${reportID}`);
        cy.wrap(reportID).as(aliasReportId);
    });
};
export const getReportId = () => {
    return cy.get(`@${aliasReportId}`);
};
export const recordProxiedRequests = () => {
    if(Cypress.state()?.error != undefined){
        let networkActivity = Cypress.ProxyLogging.proxyRequests.map(proxReq => {
            return proxReq.consoleProps;
    });
        cy.log(networkActivity);
        cy.writeFile(
            `./cypress/network_activity_records/${Cypress.spec.name}.txt`,
            networkActivity
        );
    }
};