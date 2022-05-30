import { aliasQuery } from "../../utils/graphql.utils";
import Homepage from "./homepage.actions";
import NavigationSection from "./navigationSection.actions";
import { createPayload } from "../../api/report_payloads/462Avenue1NY.payload";

export const createReport = (reportCreationData: BoweryAutomation.ReportCreationData, payloadFunction = createPayload) => {
    cy.login();
    if(Cypress.env("report") == "api"){
        cy.task("createReportApi",
        { _reportCreationData: reportCreationData, _payloadFn: payloadFunction(reportCreationData, "user_id") });
        cy.pause();
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