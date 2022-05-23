import { Tag } from '../../../../utils/tags.utils';
import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4714_16.fixture';

describe(`[QA-4714_16] Verify the suggested text dropdown in the new narrative component added through "=" for the 'Foreclosure sale'
    then “=Sh“ and select the 'Sheriff's sale'  option on the Report > Key Info page for Property Rights Appraised and Definition of Market Value sections`,
    { tags:[ Tag.report, Tag.key_info ] }, () => {
        
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Key Info page.");
        _NavigationSection.navigateToReportInformation()
            .clickYesButton();

        cy.stepInfo("2. Enter the “=F“ and select the 'Foreclosure sale' then “=Sh“ and select the 'Sheriff's sale'  option for both sections.");
        testData.chips.forEach(chip => {
            Report._KeyInfo.enterPropertyRightsAppraisedComment(chip.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(chip.listValue);
            Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", chip.verifyTexValue);

            Report._KeyInfo.enterDefinitionMarketValue(chip.enterValue, true, false, false);
            Report._KeyInfo.clickNarrativeSuggestions(chip.listValue, 1);
            Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", chip.verifyTexValue);
            cy.reload();
        });

        deleteReport(testData.reportCreationData.reportNumber);
    });
});