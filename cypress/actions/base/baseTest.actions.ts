import { aliasQuery } from "../../utils/graphql.utils";
import Homepage from "./homepage.actions";
import NavigationSection from "./navigationSection.actions";
import { createPayload } from "../../api/report_payloads/462Avenue1NY.payload";

/**
 * ernst: createReport is used everywhere - default logic should be: 
 * api login + api report 
 * -> navigation to dashboard 
 * -> check whether report exist on dashboard 
 * -> navigate there via UI
 * ____
 * UI login + api report
 * -> navigate to login 
 * -> auth via api 
 * -> create report via api
 * -> check whether report exists via api
 * -> re-login via ui
 * -> navigate to report (via report_id, which can be set to _setMap)
 * ___
 * api login + UI report (implemented)
 */

export const createReport = (reportCreationData: BoweryAutomation.ReportCreationData, payloadFunction = createPayload) => {
    cy.login();
    if(Cypress.env("report") == "api"){
        cy._mapGet("token").then(val => {
            cy.log(val);
            cy.pause();
            cy.task("createReportApi",
            { _reportCreationData: reportCreationData, _payloadFn: payloadFunction(reportCreationData, "user_id"), _token: val });
            cy.pause();
        });
        
    }
    else {
        Homepage.createReport(reportCreationData);
    }
    salesInterceptions();
};

export const deleteReport = (reportNumber) => {
    cy.stepInfo('Delete report');
    NavigationSection.returnToHomePage();
    Homepage.deleteReport(reportNumber);
};

export const salesInterceptions = () => {
    cy.intercept('POST', '/graphql', req => {
        aliasQuery(req, "findSalesComps");
        aliasQuery(req, "findSingleSalesComp");
        aliasQuery(req, "updateAppraisal");
        aliasQuery(req, "findSalesCompsByEventIds");
    });
};