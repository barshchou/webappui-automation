/* eslint-disable @typescript-eslint/triple-slash-reference */
// eslint-disable-next-line multiline-comment-style
/// <reference types="cypress-xpath" />
/// <reference types="cypress-image-snapshot" />


import { Options } from "cypress-image-snapshot";

export default class BaseActions {

    get Actions() {
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

    verifyTooltipExist(verifyValue?: string) {
        cy.get("[role=tooltip]").should("not.exist");
        if (verifyValue) {
            cy.get("[role=tooltip]").should("include.text", verifyValue);
        }
        return this;
    }

    /**
     * Retrieve DOM-element screenshot and compares it with baseline.
     * @param element - PageElement to be snapshoted. 
     * @param snapshotName
     * @param options
     * @see https://github.com/jaredpalmer/cypress-image-snapshot
     */

    matchElementSnapshot(element:Cypress.Chainable, snapshotName: string, 
        options: Options = { allowSizeMismatch: true } ) {
        if (Cypress.browser.isHeadless == true) {
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

    pause() {
        cy.pause();
        return this;
    }

    closeUserSurveyIfExist() {
        cy.get("body").then($body => {
            if ($body.find('form h6 [aria-label="Close"]').length > 0) {   
                cy.get('form h6 [aria-label="Close"]').click();
            } else {
                return;
            }
        });
        return this;
    }

    hideElement(element: Cypress.Chainable<JQuery<HTMLElement>>) {
        element.then(el => el.hide());
        return this;
    }
}
