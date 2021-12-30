import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4331.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";

describe("Sales Value Conclusion Discussion -> Appraiser Commentary", () => {
    before("Login", () => {
        cy.login();
        Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.enterAdditionalCommentary(testData.commentary)
            .clickSaveButton();
        cy.reload();
        Sales.ValueConclusion.verifyAdditionalCommentaryText(testData.commentary);
        Sales.ValueConclusion.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});