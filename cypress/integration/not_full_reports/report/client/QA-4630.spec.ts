import { Tag } from './../../../../utils/tags.utils';
import { PreviewEdit, Report } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import testData from '../../../../fixtures/not_full_reports/report/client/QA-4630.fixture';

describe("Verify the functionality of the NYCB Application No. (optional) field",
    { tags:[ Tag.report, Tag.client ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Proceed to the Report > Client page.");
        _NavigationSection.navigateToClientPage();
        Report._Client.verifyProgressBarNotExist()
            .Page.formEditBtn(0).click();
        Report._Client.Page.formEditBtn(0).click();

        cy.stepInfo("2. Try to enter any num. value / non-integer / non-num. / long value in the Client File Number field (NO validation).");
        Report._Client.enterNycbApplicationNumber(testData.clientFileNumber);

        cy.stepInfo("3. Try to copy-paste any value into the Client File Number field, save it.");
        Report._Client.Page.nycbApplicationNumber.invoke("val", testData.clientFileNumber);

        cy.stepInfo("4. Proceed to the Preview & Edit > Cover page and verify that the Client from the previous step is displayed in the APPRAISAL REPORT section.");
        _NavigationSection.navigateToCoverPage();
        PreviewEdit._CoverPage.verifyApplicationNumber(testData.clientFileNumber);
      
        deleteReport(testData.reportCreationData.reportNumber);
    });
});