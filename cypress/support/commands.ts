import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import "cypress-file-upload";
import "cypress-localstorage-commands";
import mapKeysUtils from '../utils/mapKeys.utils';
import { BoweryAutomation } from '../types';

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

Cypress.Commands.add("loginByApi", (envUrl, username, password) => {
    cy.log("Logging in by api");
    cy.task("loginApi",
    {
        _envUrl:envUrl,
        _username: username, 
        _password: password

    })
    .then(_response => {
        const response: any = _response;
        const responseBody = JSON.parse(response.text);

        const token = responseBody.token;
        window.localStorage.setItem("jwToken", token);
        const userId = responseBody.user._id;
        cy.log(`User Id is: ${userId}`);
        cy._mapSet("token", token);
        cy._mapSet("user_id_api", userId);
    });
});

Cypress.Commands.add("loginByUI", (url: string, username: string, password: string) => {
    cy.log("Logging in by UI");
    _cyVisit(url);
    cy.get("*[name='username']").should("be.visible").type(username).should("have.value", username);
    cy.get("*[name='password']").should("be.visible").type(password).type("{enter}");
});

Cypress.Commands.add("createApiReport", 
(reportCreationData: BoweryAutomation.ReportCreationData, payload, token, envUrl) => {
    cy.task("createReportApi", 
    { 
        _reportCreationData:reportCreationData, 
        _payload:payload, 
        _token:token,
        _envUrl:envUrl

    }, { timeout:30000 })
    .then(val => {
        cy.log(`reportId is next: ${val}`);
        cy._mapSet(mapKeysUtils.report_id, val);
    });
    cy.log("createApiReport");
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


Cypress.Commands.add("_mapSet", (_key:any, _value:any) => {
    return _map.set(_key, _value);
});

Cypress.Commands.add("_mapGet", (_key: any) => {
    return _map.get(_key);
});
//#endregion
