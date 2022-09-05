import testData from "../../../../fixtures/not_full_reports/report/key_info/QA-4703_05-07.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { Report } from "../../../../actions";

describe(`[QA-4703_05-07] Verify the revert commentary functionality for Property Rights Appraised 
and Definition of Market Value sections`,
{ tags: [ "@report", "@key_info" ] }, () => {
    beforeEach("Login, create report", () => {
        cy.stepInfo("Create report");
        createReport(testData.reportCreationData);
    });

    it(`[QA-4703][Report > Key Info] Verify the Property Rights Appraised and Definition 
         of Market Value sections can be edited`, () => {
        cy.stepInfo(`1. On the Report > Key Info page click inside the Property Rights Appraised section.`);
        Report._KeyInfo.activateTextAreaInput( Report._KeyInfo.Page
            .formCommentTextBox(testData.propertyRightsAppraisedTitle));

        cy.stepInfo(`2. Verify that the Revert to Original buttons and the info message are displayed`);
        Report._KeyInfo.Page.formRevertToOriginalBtnBySectionName(testData.propertyRightsAppraisedTitle)
            .should("be.visible").and("be.disabled");
        Report._KeyInfo.Page.commentaryUserPromptBySectionName(testData.propertyRightsAppraisedTitle)
            .should("be.visible");

        cy.stepInfo(`3. Enter any values (numbers, letters, special symbols) - no validation, can be edited.`);
        Report._KeyInfo.enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue)
            .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.enterValue);
            
        cy.stepInfo(`4. On the Report > Key Info page click inside the Definition of Market Value section.`);
        Report._KeyInfo.activateTextAreaInput(Report._KeyInfo.Page
            .formCommentTextBox(testData.definitionOfMarketValueTitle));

        cy.stepInfo(`5. Verify that the Revert to Original buttons and the info message are displayed`);
        Report._KeyInfo.Page.formRevertToOriginalBtnBySectionName(testData.definitionOfMarketValueTitle)
            .should("be.visible").and("be.disabled");
        Report._KeyInfo.Page.commentaryUserPromptBySectionName(testData.definitionOfMarketValueTitle)
            .should("be.visible");

        cy.stepInfo(`6. Enter any values (numbers, letters, special symbols) - no validation, can be edited.`);
        Report._KeyInfo.enterFormCommentTextBox(testData.definitionOfMarketValueTitle, testData.enterValue)
            .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.enterValue);
    });

    it(`[QA-4705-07]`, () => {

        cy.stepInfo(`1. Edit comment and verify that the Revert to Original button 
            becomes enabled for both sections`);
        Report._KeyInfo.enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue)
            .Page.formRevertToOriginalBtnBySectionName(testData.propertyRightsAppraisedTitle).should("not.be.disabled");
        Report._KeyInfo.enterFormCommentTextBox(testData.definitionOfMarketValueTitle, testData.enterValue)
            .Page.formRevertToOriginalBtnBySectionName(testData.definitionOfMarketValueTitle).should("not.be.disabled");

        cy.stepInfo(`2. Click on the Revert to Original button and verify the 'Changes will be lost modal' 
            is displayed for both sections`);
        Report._KeyInfo.activateTextAreaInput(Report._KeyInfo.Page
            .formCommentTextBox(testData.propertyRightsAppraisedTitle))
            .revertToOriginalCommentarySectionByName(testData.propertyRightsAppraisedTitle)
            .verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle,
                testData.enterValue, "not.contain.text")
            .revertToOriginalCommentarySectionByName(testData.definitionOfMarketValueTitle)
            .verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle,
                testData.enterValue, "not.contain.text");

        cy.stepInfo(`3. CLick on the Revert ot Original button and Click on the X icon and verify that 
            the modal is closed and no changes are applied`);
        Report._KeyInfo.enterFormCommentTextBox(testData.propertyRightsAppraisedTitle, testData.enterValue, false)
            .clickRevertToOriginalButtonBySection(testData.propertyRightsAppraisedTitle)
            .Page.CloseIcon.click();
        Report._KeyInfo.verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.enterValue)
            .activateTextAreaInput(Report._KeyInfo.Page.formCommentTextBox(testData.propertyRightsAppraisedTitle))
            .clickRevertToOriginalButtonBySection(testData.propertyRightsAppraisedTitle)
            .Page.formCancelButton().click();
        Report._KeyInfo.verifyFormCommentTextBoxText(testData.propertyRightsAppraisedTitle, testData.enterValue)
            .enterFormCommentTextBox(testData.definitionOfMarketValueTitle, testData.enterValue, false)
            .clickRevertToOriginalButtonBySection(testData.definitionOfMarketValueTitle)
            .Page.CloseIcon.click();
        Report._KeyInfo.verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.enterValue)
            .activateTextAreaInput(Report._KeyInfo.Page.formCommentTextBox(testData.definitionOfMarketValueTitle))
            .clickRevertToOriginalButtonBySection(testData.definitionOfMarketValueTitle)
            .Page.formCancelButton().click();
        Report._KeyInfo.verifyFormCommentTextBoxText(testData.definitionOfMarketValueTitle, testData.enterValue);
    });
});