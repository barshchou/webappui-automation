import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4172.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";

describe("Verify the functionality of the Upload Comps button", () => {
    before("Login and create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.uploadComps(testData.filePath)
            .verifyComparablesNumber(testData.compsNumber)
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});