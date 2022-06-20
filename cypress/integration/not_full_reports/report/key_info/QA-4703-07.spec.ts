import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4703-07.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";


describe("[QA-4703-07] Verify the Edit button functionality for Property Rights Appraised and Definition of Market Value sections",
    { tags: [ "@report", "@key_info" ] }, () => {
        
    before("Login, create report", () => {
        cy.stepInfo("Create report");
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo(`1. Verify that the Edit buttons are displayed on the Report > Key Info page for Property
        Rights Appraised and Definition of Market Value sections`);
        _NavigationSection.navigateToReportInformation();
        Report._KeyInfo.Page.formEditBtn().should("be.visible");
        Report._KeyInfo.Page.formEditBtn(1).should("be.visible");

        cy.stepInfo("2. Click on the Edit button for both sections");
        Report._KeyInfo.Page.formEditBtn().click();
        Report._KeyInfo.Page.formEditBtn().click();

        cy.stepInfo("4. Verify that the commentary form opens and buttons Cancel, Revert to Original and Save are displayed for both sections");
        Report._KeyInfo.Page.formCancelButton().should("be.visible");
        Report._KeyInfo.Page.formCancelButton(1).should("be.visible");
        Report._KeyInfo.Page.formSaveBtn().should("be.visible");
        Report._KeyInfo.Page.formSaveBtn(1).should("be.visible");
        Report._KeyInfo.Page.formRevertToOriginalBtn().should("be.visible");
        Report._KeyInfo.Page.formRevertToOriginalBtn(1).should("be.visible");

        cy.stepInfo("5. Verify that the commentary form opens and buttons Cancel, Revert to Original and Save are displayed for both sections");
        Report._KeyInfo.Page.formSaveBtn().click();
        Report._KeyInfo.Page.formSaveBtn().click();

        cy.stepInfo("6. Edit comment and verify that the Revert to Original button becomes enabled for both sections");
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, false, false, true);
        Report._KeyInfo.Page.formCancelButton().click();
        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, false, false, true);

        cy.stepInfo("7. Click on the Revert to Original button and verify the ‘Changes will be lost modal’ is displayed for both sections");
        Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("not.include.text", testData.enterValue);
        Report._KeyInfo.Page.textBoxDefinitionOfMarketValue().should("not.include.text", testData.enterValue);
        cy.reload();

        cy.stepInfo("8. CLick on the Revert ot Original button and Click on the X icon and verify that the modal is closed and no changes are applied");
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false);
        Report._KeyInfo.Page.formRevertToOriginalBtn().click();
        Report._KeyInfo.Page.CloseIcon.click();
        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false);
        Report._KeyInfo.Page.formRevertToOriginalBtn(1).click();
        Report._KeyInfo.Page.CloseIcon.click();
        Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", testData.enterValue);
        Report._KeyInfo.Page.textBoxDefinitionOfMarketValue().should("include.text", testData.enterValue);

        cy.stepInfo("9 Edit comment and click on the Save button for both sections. Verify that the changes from step 2 are saved");
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, false, true);
        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, false, true);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});