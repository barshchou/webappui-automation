import { BoweryAutomation } from "../../types";
import { aliasQuery } from "../../utils/graphql.utils";
import Homepage from "./homepage.actions";
import NavigationSection from "./navigationSection.actions";

export const createReport = (reportCreationData: BoweryAutomation.ReportCreationData, 
    username = Cypress.env("USERNAME"), 
    password = Cypress.env("PASSWORD")) => {
    cy.login(username, password);
    Homepage.createReport(reportCreationData);
    salesInterceptions();
};

export const deleteReport = (reportNumber) => {
    cy.stepInfo('Delete report');
    NavigationSection.returnToHomePage();
    Homepage.deleteReport(reportNumber);
};

export const salesInterceptions = () => {
    cy.intercept('POST', '/graphql', req => {
        aliasQuery(req, "searchSalesTransactions");
        aliasQuery(req, "findTransactionByIdAndVersion");
        aliasQuery(req, "findSalesComps");
        aliasQuery(req, "findSingleSalesComp");
        aliasQuery(req, "updateJob");
        aliasQuery(req, "findSalesCompsByEventIds");
    });
};