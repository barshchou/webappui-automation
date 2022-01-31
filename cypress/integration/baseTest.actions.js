import Homepage from "../actions/base/homepage.actions";
import NavigationSection from "../actions/base/navigationSection.actions";

export const createReport = (reportCreationData) => {
    cy.login();
    Homepage.createReport(reportCreationData);
};

export const deleteReport = (reportNumber) => {
    NavigationSection.returnToHomePage();
    Homepage.deleteReport(reportNumber);
};