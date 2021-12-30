import testData from "../../../../fixtures/not_full_reports/sales/find_comps/QA-4173.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";

describe("Verify the Enter Report Unique ID modal is displayed on clicking the Import Comps button", () => {
    before("Login and create report", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToFindComps();
        Sales.FindComps.clickImportComparableButton()
            .verifyImportCompModalShown()
            .returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});