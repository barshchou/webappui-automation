/* eslint-disable @typescript-eslint/no-explicit-any */
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';
import "cypress-file-upload";
import "cypress-localstorage-commands";
import mapKeysUtils from '../utils/mapKeys.utils';
import { BoweryAutomation } from '../types/boweryAutomation.type';
import { Alias } from '../utils/alias.utils';

/**
 * You can use exporting of this map only in exceptional cases, as in QA-4136 spec
 */
export const _map = new Map();

/**
 * Mutating / creating array in `_map`. 
 * Useful when you need push some data dynamically into array
 * @param mapKey key from `mapKeyUtils`
 * @param value value you want to set into array
 * @param message message which will be shown by `cy.log` method 
 */
export const _mutateArrayInMap = (mapKey: string, value: any, message = "Unknown array of values from map") => {
    if (_map.get(mapKey) === undefined) {
        const arr = [ value ];
        _map.set(mapKey, arr);
    }
    else {
        cy._mapGet(mapKey).then(arr => {
            return arr.push(value);
        });
    }
    cy._mapGet(mapKey).then(arr => cy.log(`${message}: ${arr}`));
};

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

        // set bearer token also in localStorage in order to avoid unexpected behavior from old code
        window.localStorage.setItem("jwToken", token);

        // set bearer token so we could we use this in global after hook in `./index.ts`
        cy._mapSet(mapKeysUtils.bearer_token, token);

        const userId = responseBody.user._id;
        cy.log(`User Id is: ${userId}`);
        cy._mapSet(mapKeysUtils.user_id, userId);
    });
});

Cypress.Commands.add("loginByUI", (url: string, username: string, password: string) => {
    cy.intercept({
        url: "/user/login",
        method:"POST"
    }).as(Alias.loginRequest);
    cy.log("Logging in by UI");
    _cyVisit(url);
    cy.get("*[name='username']").should("be.visible").type(username).should("have.value", username);
    cy.get("*[name='password']").should("be.visible").type(password).type("{enter}");
    
    cy.wait(`@${Alias.loginRequest}`).then(({ response }) => {
        cy._mapSet(mapKeysUtils.bearer_token, response.body.token);
        cy._mapSet(mapKeysUtils.user_id, response.body.user._id);
    });
});

Cypress.Commands.add("createApiReport", 
(reportCreationData: BoweryAutomation.ReportCreationData, payload, token, envUrl) => {
    cy.task("createReportApi", 
    { 
        _reportCreationData:reportCreationData, 
        _payload:payload, 
        _token:token,
        _envUrl:envUrl

    }, { timeout:60000 })
    .then(val => {
        cy.log(`reportId is next: ${val}`);
        cy._mapSet(mapKeysUtils.report_id, val);
        _mutateArrayInMap(mapKeysUtils.report_id_arr, val, "Array of report_id");
    });
    cy.log("createApiReport");
});

Cypress.Commands.add("deleteApiReport", () => {
    cy.log("Delete report");    
    cy.logNode("\nDelete report");
        cy._mapGet(mapKeysUtils.report_id_arr).then(arr => {
            if (arr === undefined) {
                cy.log("No report_ids saved! Nothing to delete.");
                return;
            }
            else {
                arr.forEach(reportId => {
                    cy.log(`Deleting report with id: ${reportId}`);
                    cy.logNode(`Deleting report with id: ${reportId}`);
                    // Deleting report
                    cy.request({
                        method:"DELETE",
                        url:`${Cypress.config().baseUrl}/report/${reportId}`,
                        auth:{
                            'bearer': _map.get(mapKeysUtils.bearer_token)
                        },
                        timeout: 60000
                    }).then((resp) => {
                        expect(resp.status).to.eq(200);
                    });
    
                    // Additional check whether report was deleted
                    cy.request({
                        failOnStatusCode: false,
                        method:"GET",
                        url:`${Cypress.config().baseUrl}/report/${reportId}`,
                        auth:{
                            'bearer': _map.get(mapKeysUtils.bearer_token)
                        },
                        timeout: 60000
                    }).then((resp) => {
                        expect(resp.status).to.eq(404);
                    });
                });
            }
        });
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

Cypress.Commands.add("logNode", (message: string) => {
    return cy.task("logNode", message);
});
//#endregion
