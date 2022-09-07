import testData from "../../../../fixtures/not_full_reports/report/client/QA-4645.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import { Report } from '../../../../actions';

// TODO: Test fail. Recheck after fix: https://bowery.atlassian.net/browse/WEB-6818
describe("Verify the Client Guidelines Discussion on the page", 
    { tags: [ "@report", "@client" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4645]", () => {
            NavigationSection.navigateToClientPage();
            Report._Client.verifyGuidelineTooltip()
                .verifyFormCommentTextBoxText(testData.textBoxName, testData.generatedCommentary)
                .clearFormCommentTextBox(testData.textBoxName)
                .enterFormCommentTextBox(testData.textBoxName, testData.newCommentary)
                .verifyFormCommentTextBoxText(testData.textBoxName, testData.newCommentary)
                .revertToOriginalCommentarySectionByName(testData.textBoxName);
            Report._Client.verifyFormCommentTextBoxText(testData.textBoxName, testData.generatedCommentary);
        });
    });