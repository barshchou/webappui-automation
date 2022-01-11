import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4326.fixture";
import Homepage from "../../../../actions/base/homepage.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";

describe("Sales Value Conclusion Discussion -> Generated Commentary is revertible", () => {

    before("Login, create report", () => {
       cy.login();
       Homepage.createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToSalesValueConclusion();
        Sales.ValueConclusion.verifyGeneratedCommentary(testData.commentaryData.generatedCommentary)
            .enterNewCommentary(testData.commentaryData.newCommentary)
            .clickRevertCommentaryButton()
            .verifyGeneratedCommentary(testData.commentaryData.generatedCommentary);
    });

    after("Delete report", () => {
        Sales.ValueConclusion.returnToHomePage();
        Homepage.deleteReport(testData.reportCreationData.reportNumber);
    });
});