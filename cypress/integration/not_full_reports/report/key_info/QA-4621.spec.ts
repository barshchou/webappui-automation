import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4621.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";


describe("[QA-4621] The Letter of Engagement prefill from Dropbox to LoE filed in WebApp - 1 LoE PDF file",
    { tags: [ Tag.report, Tag.key_info, Tag.salesforce ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo(" 1. Create a new report on the WebApp (Note: the JOB # of that report corresponds with the JOB # of an open job on SalesForce)");
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("2. Navigate to the Report > Key Info > Engagement");
        _NavigationSection.navigateToReportInformation();
        
        cy.stepInfo("3. Verify that the Letter Of Engagement PDF from Dropbox is auto-filled.");
        Report._KeyInfo.Page.inputToCheckUpload.should("have.value", testData.verifyValue);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});