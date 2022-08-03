import testData from "../../../../fixtures/not_full_reports/report/client/QA-4645.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { Report } from '../../../../actions';


describe("Verify the Client Guidelines Discussion on the page", 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToClientPage();
            Report._Client.verifyGuidelineTooltip()
                .verifyClientGuidelinesCommentary(testData.generatedCommentary)
                .clickGuidelinesCommentaryEditButton()
                .enterNewCommentary(testData.newCommentary)
                .Page.revertToGeneratedButton.click();
            Report._Client.verifyClientGuidelinesCommentary(testData.generatedCommentary);
        });
    });