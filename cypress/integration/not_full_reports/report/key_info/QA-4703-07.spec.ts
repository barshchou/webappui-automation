import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4703-07.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Report } from "../../../../actions";

describe(`[QA-4703-07] Verify the Edit button functionality for Property Rights Appraised 
and Definition of Market Value sections`,
{ tags: [ "@report", "@key_info" ] }, () => {
    beforeEach("Login, create report", () => {
        cy.stepInfo("Create report");
        createReport(testData.reportCreationData);
    });

    it(`[QA-4703][Report > Key Info] Verify the Property Rights Appraised and Definition 
         of Market Value sections can be edited`, () => {
        cy.stepInfo(`1. On the Report > Key Info page click inside the Property Rights Appraised section.`);
        _NavigationSection.navigateToReportInformation();
        Report._KeyInfo.activateTextAreaInput( Report._KeyInfo.Page.textBoxPropertyRightsAppraised);

        cy.stepInfo(`2. Verify that the Revert to Original buttons and the info message are displayed`);
        Report._KeyInfo.Page.formRevertToOriginalBtn().should("be.visible");
        Report._KeyInfo.Page.userPrompt().should("be.visible");

        cy.stepInfo(`3. Enter any values (numbers, letters, special symbols) - no validation, can be edited.`);
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, false, false, false);
        Report._KeyInfo.verifyCommentaryContainsText(testData.enterValue, 
            testData.propertyRightsAppraisedCommentaryTitle);
            
        cy.stepInfo(`4. On the Report > Key Info page click inside the Definition of Market Value section.`);
        Report._KeyInfo.activateTextAreaInput(Report._KeyInfo.Page.textBoxDefinitionOfMarketValue());

        cy.stepInfo(`5. Verify that the Revert to Original buttons and the info message are displayed`);
        Report._KeyInfo.Page.formRevertToOriginalBtn(1).should("be.visible");
        Report._KeyInfo.Page.userPrompt().should("be.visible");

        cy.stepInfo(`6. Enter any values (numbers, letters, special symbols) - no validation, can be edited.`);
        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, false, false, false);
        Report._KeyInfo.verifyCommentaryContainsText(testData.enterValue, 
            testData.definitionOfMarketValueCommentaryTitle);
    });

    //TODO update test after test-cases updates QA-6543
    it.skip(`Test body`, () => {
        cy.stepInfo(`1. Verify that the commentary form opens and buttons Cancel, Revert to Original 
            and Save are displayed for both sections`);
        Report._KeyInfo.Page.formCancelButton().should("be.visible");
        Report._KeyInfo.Page.formCancelButton(1).should("be.visible");
        Report._KeyInfo.Page.formSaveBtn().should("be.visible");
        Report._KeyInfo.Page.formSaveBtn(1).should("be.visible");
        Report._KeyInfo.Page.formRevertToOriginalBtn().should("be.visible");
        Report._KeyInfo.Page.formRevertToOriginalBtn(1).should("be.visible");

        cy.stepInfo(`5. Verify that the commentary form opens and buttons Cancel, Revert to Original 
            and Save are displayed for both sections`);
        Report._KeyInfo.Page.formSaveBtn().click();
        Report._KeyInfo.Page.formSaveBtn().click();

        cy.stepInfo(`6. Edit comment and verify that the Revert to Original button 
            becomes enabled for both sections`);
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false, true);
        Report._KeyInfo.Page.formCancelButton().click();
        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false, true);

        cy.stepInfo(`7. Click on the Revert to Original button and verify the 'Changes will be lost modal' 
            is displayed for both sections`);
        Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("not.include.text", testData.enterValue);
        Report._KeyInfo.Page.textBoxDefinitionOfMarketValue().should("not.include.text", testData.enterValue);
        cy.reload();

        cy.stepInfo(`8. CLick on the Revert ot Original button and Click on the X icon and verify that 
            the modal is closed and no changes are applied`);
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, true, false);
        Report._KeyInfo.Page.formRevertToOriginalBtn(0).click();
        Report._KeyInfo.Page.CloseIcon.click();
        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, true, false);
        Report._KeyInfo.Page.formRevertToOriginalBtn(1).click();
        Report._KeyInfo.Page.CloseIcon.click();
        Report._KeyInfo.Page.textBoxPropertyRightsAppraised.should("include.text", testData.enterValue);
        Report._KeyInfo.Page.textBoxDefinitionOfMarketValue().should("include.text", testData.enterValue);

        cy.stepInfo(`9 Edit comment and click on the Save button for both sections. 
            Verify that the changes from step 2 are saved`);
        Report._KeyInfo.enterPropertyRightsAppraisedComment(testData.enterValue, false, true);
        Report._KeyInfo.enterDefinitionMarketValue(testData.enterValue, false, true);
    });
});