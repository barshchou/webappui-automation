import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import "cypress-file-upload";
import "cypress-localstorage-commands";
import { getEnvUrl } from "../../utils/env.utils";

const _map = new Map();

//#region plugin commands initialization
addMatchImageSnapshotCommand({
    failureThreshold: 0.05, // threshold for entire image
    failureThresholdType: 'percent', // percent of image or number of pixels
    scale: false,
    comparisonMethod:"ssim",
    allowSizeMismatch: true
});

//#endregion

//#region custom commands definition
/**
 * If we set env variable CYPRESS_DEBUG=1 - pageLoadTimeout will be 3 minutes instead of 1.
 * Useful when some environments loads really slow.
 */
const _cyVisit = (url: string) => cy.visit(url, { timeout: Cypress.env("DEBUG") == 1 ? 180000 : 60000 });

Cypress.Commands.add("loginByApi", (url) => {
    cy.log("Logging in by api");
    cy.task("loginApi").then(_response => {
        const response: any = _response;
        const responseBody = JSON.parse(response.text);

        const token = responseBody.token;
        window.localStorage.setItem("jwToken", token);
        const userId = responseBody.user._id;
        cy.log(`User Id is: ${userId}`);
        cy._mapSet("token", token);
    });
});

Cypress.Commands.add("loginByUI", (url) => {
    cy.log("Logging in by UI");
    _cyVisit(url);
    const username = Cypress.env("USERNAME");
    const password = Cypress.env("PASSWORD");
    cy.get("*[name='username']").should("be.visible").type(username).should("have.value", username);
    cy.get("*[name='password']").should("be.visible").type(password).type("{enter}");
});

Cypress.Commands.add("login", () => {
    const envUrl = getEnvUrl();
    switch (Cypress.env("loginMethod")) {
        case "ui":
            cy.loginByUI(envUrl);
            break;
        default:
            cy.loginByApi(envUrl);
    }
});

Cypress.Commands.add("createApiReport", (reportCreationData: BoweryAutomation.ReportCreationData, payload) => {
    const envUrl = getEnvUrl();
    cy.loginByApi(envUrl).then(loginResponse => {
        const requestBody = payload(reportCreationData, loginResponse.body.user._id);
        cy.request({
            method: "POST",
            url: `${envUrl}/report`,
            auth: {
                bearer: loginResponse.body.token
            },
            body: requestBody
        }).then(response => {
            expect(response.status).to.be.eq(200);
            cy.log(`Report ID is: ${response.body}`);
            // const reportUrl = `${envUrl}/report/${response.body}`;
            // _cyVisit(reportUrl);
        });
    });
});

Cypress.Commands.add("stepInfo", (message:string) => {
    Cypress.log({
        displayName:"StepInfo",
        message:`${message}`,
        consoleProps: () => {
            return {
                Step: `${message}`
            };
        }
    });
});


Cypress.Commands.add("_mapSet", (_key:any, _value:any) => {
    return _map.set(_key, _value);
});
Cypress.Commands.add("_mapGet", (_key: any) => {
    return _map.get(_key);
});
//#endregion
