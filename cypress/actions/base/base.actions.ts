/// <reference types="cypress-xpath" />
/// <reference types="cypress-image-snapshot" />


import { Options } from "cypress-image-snapshot";
import {getEnvUrl} from "../../../utils/env.utils";

export default class BaseActions {

    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").click();
        return this;
    }

    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").click();
        return this;
    }

    returnToHomePage() {
        cy.visit(`${getEnvUrl()}/reports`);
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

    clickSaveContinueButton() {
        cy.get("*[data-qa='form-submit-btn']").scrollIntoView().click();
    }

    verifyProgressBarNotExist() {
        cy.get("*[role='progressbar']").should("not.exist");
        return this;
    }

    closeSatisfactionSurvey() {
        cy.get("[aria-label=Close]").click();
        return this;
    }

    clickBackButton() {
        cy.xpath("//button[.='BACK']").click();
        return this;
    }

    matchElementSnapshot(element:Cypress.Chainable, snapshotName: string, options?: Options){
        element.matchImageSnapshot(snapshotName,options);
        return this;
    }

    pause(){
        cy.pause();
        return this;
    }
}
