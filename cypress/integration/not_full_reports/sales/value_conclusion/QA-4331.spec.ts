import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4331.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe("Sales Value Conclusion Discussion -> Appraiser Commentary", () => {
    before("Login", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.enterAdditionalCommentary(testData.commentary)
            .clickSaveButton();
        cy.reload();
        Sales.ValueConclusion.verifyAdditionalCommentaryText(testData.commentary);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});