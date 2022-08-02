import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4326.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe("Sales Value Conclusion Discussion -> Generated Commentary is revertible", 
    { tags: [ "@sales", "@value_conclusion" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToSalesValueConclusion();
            Sales.ValueConclusion.verifyGeneratedCommentary(testData.commentaryData.generatedCommentary)
                .enterNewCommentary(testData.commentaryData.newCommentary)
                .clickRevertCommentaryButton()
                .verifyGeneratedCommentary(testData.commentaryData.generatedCommentary);
        });
    });