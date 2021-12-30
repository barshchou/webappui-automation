import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4307.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import Report from "../../../../actions/report/report.manager";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";

describe("As Is Market Value -> Time Period date is pulled from Report -> Key Info " +
    "-> Date of validation (As is)", () => {
    before("Login, create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        Report.KeyInfo.enterDateByType(testData.dateOfValuation);
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.verifyAsIsMarketPeriod(testData.dateOfValuation.date);
        Sales.ValueConclusion.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});