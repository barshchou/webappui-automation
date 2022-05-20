import { Tag } from './../../../../utils/tags.utils';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4714.fixture';

describe(`[QA-4695] Verify the suggested text dropdown in the new narrative component added through "=" for the 'Foreclosure sale' option on the Report > Key Info page 
    for Property Rights Appraised and Definition of Market Value sections`,
    { tags:[ Tag.report, Tag.key_info ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Key Info page.");
        _NavigationSection.navigateToReportInformation()
            .clickYesButton();

        cy.stepInfo("2. Enter the “=F“ and select the 'Foreclosure sale' option for both sections.");
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false, false);
        Report._KeyInfo.clickNarrativeSuggestions(testData.listValue);
        Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", testData.verifyTexValue);

        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false, false);
        Report._KeyInfo.clickNarrativeSuggestions(testData.listValue, 1);
        Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", testData.verifyTexValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});