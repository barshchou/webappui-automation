/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="cypress-xpath" />
/// <reference types="cypress-image-snapshot" />


import { Options } from "cypress-image-snapshot";

export default class BaseActions {

    get Actions(){
        return this;
    }

    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").click();
        this.verifyProgressBarNotExist();
        return this;
    }

    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").click();
        return this;
    }

    returnToHomePage() {
        cy.visit(`/reports`);
    }

    goBackWithSave() {
        cy.go("back");
        this.clickYesButton();
    }

    goBackWithoutSave() {
        cy.go("back");
        this.clickNoButton();
    }

    goBack() {
        cy.go("back");
    }

    clickSaveButton() {
        cy.get("*[data-qa='form-save-btn']").click();
        return this;
    }

    clickSubmitBtn() {
        cy.get('[type="submit"][data-qa="save-btn"]').click();
        return this;
    }

    clickSaveContinueButton() {
        cy.get("*[data-qa='form-submit-btn']").scrollIntoView().click();
    }

    verifyProgressBarNotExist() {
        cy.get("*[role='progressbar']").should("not.exist");
        return this;
    }

    clickBackButton() {
        cy.xpath("//button[.='Back']").click();
        return this;
    }

    verifyContainsValue(expectedValue: string) {
        cy.contains(expectedValue).should("be.visible");
        return this;
    }

    /**
     * Retrive DOM-element screenshot and compares it with baseline.
     * @param element - PageElement to be snapshoted. 
     * @param snapshotName - 
     * @see https://github.com/jaredpalmer/cypress-image-snapshot
     */

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    matchElementSnapshot(element:Cypress.Chainable, snapshotName: string, options: Options = { allowSizeMismatch: true } ){
        if(Cypress.browser.isHeadless == true) {
            element.should("be.visible");
            
            element.matchImageSnapshot(snapshotName, options);
            return this; 
        } 
    }

    /**
     * Emulates paste of text by invoking function `val` of JQuery element.
     * Does not related to functionality of Clipboard API of browser.
     */
    emulateCopyPaste(elem: Cypress.Chainable<JQuery<HTMLElement>>, text: string): this {
        elem.click().invoke("val", text);
        return this;
    }

    pause(){
        cy.pause();
        return this;
    }

    closeUserSurveyIfExist() {
        cy.get("body").then($body => {
            if ($body.find('form h6 [aria-label="Close"]').length > 0) {   
                cy.get('form h6 [aria-label="Close"]').click();
            } 
            else {
                return;
            }
        });
        return this;
    }
}
