import { Tag } from '../../../../utils/tags.utils';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4724.fixture';

// Remove skip after fix bug
describe.skip(`[QA-4724] Verify the Save & Continue button functionality on the Report > Key Info page:`,
    { tags:[ Tag.report, Tag.key_info ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Key Info page.");
        _NavigationSection.navigateToReportInformation()
            .clickYesButton();

        cy.stepInfo("2. Fill in the editable fields with values and click on the Save & Continue button");
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue);
            Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", testData.verifyTexValue);
            Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(testData.listValue, 1);
            Report._KeyInfo.Page.textBoxDefinitionOfMarketValue.should("include.text", testData.verifyTexValue);
            Report._KeyInfo.clickSaveContinueButton();

        cy.stepInfo("3. Verify that the changes are saved and the user is redirected to the next page (Report > Appraiser)");
        Report._Appraiser.verifyPageOpened();
        cy.go("back");
        Report._KeyInfo.clickYesButton();
        Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", testData.verifyTexValue);
        Report._KeyInfo.Page.textBoxDefinitionOfMarketValue.should("include.text", testData.verifyTexValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});