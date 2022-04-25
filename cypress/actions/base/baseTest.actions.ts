import Homepage from "./homepage.actions";
import NavigationSection from "./navigationSection.actions";

export const createReport = (reportCreationData) => {
    cy.login();
    Homepage.createReport(reportCreationData);
};

export const deleteReport = (reportNumber) => {
    NavigationSection.returnToHomePage();
    Homepage.deleteReport(reportNumber);
};