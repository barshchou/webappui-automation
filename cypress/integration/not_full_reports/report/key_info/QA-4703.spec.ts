import { Tag } from './../../../../utils/tags.utils';
import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4624.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";


describe("[QA-4703] Verify the Edit button functionality for Property Rights Appraised and Definition of Market Value sections",
    { tags: [ Tag.report, Tag.key_info ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo("Create report");
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Verify that the Edit buttons are displayed on the Report > Key Info page for Property
        Rights Appraised and Definition of Market Value sections`);
        _NavigationSection.navigateToReportInformation()
            .clickYesButton();
        Report._KeyInfo.Page.formEditBtn(0).should("be.visible");
        Report._KeyInfo.Page.formEditBtn(1).should("be.visible");

        cy.stepInfo("2. Click on the Edit button for both sections.");
        Report._KeyInfo.Page.formEditBtn(0).click();
        Report._KeyInfo.Page.formEditBtn(0).click();
        
        cy.stepInfo("3. Verify that the commentary form opens and buttons Cancel, Revert to Original and Save are displayed for both sections.");
        Report._KeyInfo.Page.formSaveBtn(0).click();
        Report._KeyInfo.Page.formSaveBtn(0).click();

        deleteReport(testData.reportCreationData.reportNumber);
    });
});