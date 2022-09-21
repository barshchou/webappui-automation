import { reportCreationFixture } from './../../../../fixtures/not_full_reports/report/key_info/QA-4697.fixture';
import { Report } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4697.fixture';
import { _NavigationSection } from '../../../../actions/base';
import { normalizeText } from '../../../../../utils/string.utils';

describe("Verify the functionality of the Interest Appraised radio buttons section",
    { tags:[ "@report", "@key_info" ] }, () => {

        testData.dataFixture.forEach(data => {
            it(`[QA-4697] ${data.conclusionValue}`, () => {
                cy.stepInfo("Login, create report");
                createReport(reportCreationFixture(data.conclusionValue));

                cy.stepInfo("1. Proceed to the Report > Key Info page");
                _NavigationSection.navigateToReportKeyInfo();

                cy.stepInfo("2. Verify the radio buttons are NOT selected by default");
                Report._KeyInfo.verifyAllInterestAppraisedNotChecked(data.reportInclude);

                cy.stepInfo("3. First check");
                data.firstCheck.forEach((value, index) => {
                    Report._KeyInfo.Page.getRadioButtonByValue(value).eq(index).click();
                    Report._KeyInfo.verifyProgressBarNotExist();
                });

                cy.stepInfo("4. Verify the radio buttons are selected by default");
                data.interestAppraised.forEach((value, index) => {
                    Report._KeyInfo.Page.getRadioButtonByValue(value).eq(index).click();
                    Report._KeyInfo.verifyProgressBarNotExist();
                });

                cy.stepInfo("5. Verify that the radio button selection affects the Generated Commentary");
                Report._KeyInfo.Page.formCommentTextBox(testData.propertyRightsAppraised).invoke("text").then(text => {
                    expect(normalizeText(text)).to.be.include(data.commentToBe);
                });
            });
        });
    });