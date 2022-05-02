import Homepage from "./homepage.actions";
import NavigationSection from "./navigationSection.actions";

export const createReport = (reportCreationData: BoweryAutomation.ReportCreationData) => {
    cy.login();
    Homepage.createReport(reportCreationData);
};

export const deleteReport = (reportNumber) => {
    cy.stepInfo('Delete report');
    NavigationSection.returnToHomePage();
    Homepage.deleteReport(reportNumber);
};