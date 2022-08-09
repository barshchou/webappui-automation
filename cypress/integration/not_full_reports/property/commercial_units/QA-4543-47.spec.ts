import testData from "../../../../fixtures/not_full_reports/property/commercial_units/QA-4543-47.fixture";
import { Property } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";

describe(`[QA-4543][QA-4544][QA-4545][QA-4546][QA-4547] 
Verify the buttons functionality on Property > Commercial Units page.`,
{ tags: [ "@property", "@commercial_units" ] }, () => {

    before("Report creation and several commercial units addition", () => {
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        cy.saveLocalStorage();
    });

    beforeEach('Restore local storage', () => {
        cy.restoreLocalStorage();
    });

    //TODO test-case must be updated
    it.skip("[QA-4543]", () => {
        cy.stepInfo(`1. Verify that the Edit button is displayed on the Property > Commercial Units page.`);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.verifyThatPageIsOpened();
        Property._CommercialUnits.Page.formEditBtn(0).should('exist');

        cy.stepInfo(`2. Click on the Edit button.`);
        Property._CommercialUnits.clickEditDiscussionButton();

        cy.stepInfo(`3. Verify that the commentary form opens and buttons Cancel, 
        Revert to Original and Save are displayed.`);
        Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.should('have.attr', 'contenteditable');   
        Property._CommercialUnits.Page.formCancelButton(0).should('exist');
        Property._CommercialUnits.Page.formRevertToOriginalBtn(0).should('exist');
        Property._CommercialUnits.Page.formSaveBtn(0).should('exist');
    });

    //TODO test-case must be updated
    it.skip("[QA-4544]", () => {
        cy.stepInfo(`1. Click on the Cancel button and verify that the form closes form 
        without saving changes with no warning message.`);
        Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.clear().type(testData.textUpdateValue);
        Property._CommercialUnits.Page.formCancelButton(0).scrollIntoView().click();
        Property._CommercialUnits.Page.commercialUnitSFDiscussionText(testData.textUpdateValue).should('not.exist');
    });

    //TODO test-case must be updated
    it.skip("[QA-4547]", () => {
        cy.stepInfo(`1. Edit comment and click on the Save button.`);
        Property._CommercialUnits.clickEditDiscussionButton();
        Property._CommercialUnits.Page.commercialUnitSFDiscussionTextArea.clear().type(testData.textUpdateValue);
        Property._CommercialUnits.Page.formSaveBtn(0).first().click(); 
            
        cy.stepInfo(`2. Verify that the changes from step 5 are saved.`);
        Property._CommercialUnits.Page.commercialUnitSFDiscussionText(testData.textUpdateValue).should('exist');
    });

    //TODO test-case must be updated
    it.skip("[QA-4545]", () => {
        cy.stepInfo(`1. Edit comment and verify that the Revert to Original button becomes enabled.`);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.verifyThatPageIsOpened();
        Property._CommercialUnits.activateTextAreaInput()
            .editDiscussionTextArea(testData.textUpdateValue);
        Property._CommercialUnits.Page.formRevertToOriginalBtn(0).should('be.enabled')
            .click(); 
        Property._CommercialUnits.Page.modalWindow.should('be.visible');
        Property._CommercialUnits.Page.formYesRevertBtn.click();
        Property._CommercialUnits.Page.formSaveBtn().click();
    });

    //TODO test-case must be updated
    it("[QA-4546]", () => {
        cy.stepInfo(`1. Verify the 'Changes will be lost' modal functionality`);
        _NavigationSection.navigateToCommercialUnits();
        Property._CommercialUnits.verifyThatPageIsOpened();
        Property._CommercialUnits.activateTextAreaInput()
            .editDiscussionTextArea(testData.textUpdateValue)
            .clickRevertToOriginalButton()
            .clickCloseButton()
            .verifyCommentaryContainsText(testData.textUpdateValue)
            .activateTextAreaInput()
            .clickRevertToOriginalButton()
            .clickCancelRevertButton()
            .verifyCommentaryContainsText(testData.textUpdateValue)
            .activateTextAreaInput()
            .clickRevertToOriginalButton()
            .clickYesRevertButton()
            .verifyCommentaryFullText(testData.defaultText);       
    });
});