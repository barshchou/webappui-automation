import { Report } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/key_info/QA-4695.fixture';
import Enums from "../../../../enums/enums";

// TODO: QA-7037 Update test
describe("Verify the Save button functionality on the Report > Client page",
    { tags:[ "@report", "@key_info", "@update_test" ] }, () => {
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("[QA-4695]", () => {
            cy.stepInfo("1. Verify the following elements are displayed on the page.");
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