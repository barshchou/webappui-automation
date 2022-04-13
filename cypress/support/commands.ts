import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import "cypress-file-upload";
import "cypress-localstorage-commands";
import {getEnvUrl} from "../../utils/env.utils";

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
    cy.request({
        method: "POST",
        url: `${url}/user/login`,
        body: {
            username: Cypress.env("USERNAME"),
            password: Cypress.env("PASSWORD")
        },
    }).then((response) => {
        const token = response.body.token;
        window.localStorage.setItem("jwToken", token);
        _cyVisit(url);
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
//#endregion
