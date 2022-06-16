import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import "cypress-file-upload";
import "cypress-localstorage-commands";

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
    const envUrl = "/";
    switch (Cypress.env("loginMethod")) {
        case "ui":
            cy.loginByUI(envUrl);
            break;
        default:
            cy.loginByApi(envUrl);
    }
});

Cypress.Commands.add("dragAndDrop", (subject, target) => {
    Cypress.log({
        name: 'DRAGNDROP',
        message: `Dragging element ${subject} to ${target}`,
        consoleProps: () => {
            return {
                subject: subject,
                target: target
            };
        }
    });
    const BUTTON_INDEX = 0;
    const SLOPPY_CLICK_THRESHOLD = 10;
    cy.get(target)
        .first()
        .then($target => {
            let coordsDrop = $target[0].getBoundingClientRect();
            cy.get(subject)
                .first()
                .then(subject => {
                    const coordsDrag = subject[0].getBoundingClientRect();
                    cy.wrap(subject)
                        .trigger('mousedown', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x,
                            clientY: coordsDrag.y,
                            force: true
                        })
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrag.x + SLOPPY_CLICK_THRESHOLD,
                            clientY: coordsDrag.y,
                            force: true
                        });
                    cy.get('body')
                        .trigger('mousemove', {
                            button: BUTTON_INDEX,
                            clientX: coordsDrop.x,
                            clientY: coordsDrop.y,
                            force: true            
                        })
                        .trigger('mouseup');
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

//#endregion
