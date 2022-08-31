import { Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4695.fixture';
import Enums from "../../../../enums/enums";

describe("[QA-4695] Verify the Save button functionality on the Report > Client page",
    { tags:[ "@report", "@key_info" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            // TODO: [QA-6759] AQA - Remove duplicate navigation to KeyInfo page
            cy.stepInfo("1. Proceed to the Report > Key Info page.");
            _NavigationSection.navigateToReportKeyInfo();

            cy.stepInfo("2. Verify the following elements are displayed on the page.");
            Report._KeyInfo.verifyElementIsVisible(Report._KeyInfo.Page.keyInfoTitle)
                .verifyElementIsVisible(Report._KeyInfo.Page.purposeDropdown)
                .verifyElementIsVisible(Report._KeyInfo.Page.asIsMarketInterestsGroup)
                .verifyElementIsVisible(Report._KeyInfo.Page.asCompleteInterestsGroup)
                .verifyElementIsVisible(Report._KeyInfo.Page.asStabilizedInterestsGroup)
                .verifyElementIsVisible(Report._KeyInfo.Page
                    .formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.letterOfTransmittalPurpose))
                .verifyElementIsVisible(Report._KeyInfo.Page.getDateInputByQA('dueDate'))
                .verifyElementIsVisible(Report._KeyInfo.Page.getDateInputByQA('dateOfValuation'))
                .verifyElementIsVisible(Report._KeyInfo.Page.getDateInputByQA('inspectionDate'))
                .verifyElementIsVisible(Report._KeyInfo.Page.inputToCheckUpload)
                .verifyElementIsVisible(Report._KeyInfo.Page.jobNumberTextInput)
                .verifyElementIsVisible(Report._KeyInfo.Page.uploadFilesButton)
                .verifyElementIsVisible(Report._KeyInfo.Page
                    .formCommentTextBox(Enums.PAGES_TEXTBOX_NAMES.definitionOfMarketValue));
        });
    });