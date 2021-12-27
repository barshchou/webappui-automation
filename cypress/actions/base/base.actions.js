import {getEnvUrl} from "../../../utils/env.utils";

export default class BaseActions {

    /**
     *
     * @returns {BaseActions}
     */
    clickYesButton() {
        cy.get("*[name='form-confirm-submit-btn']").click();
        return this;
    }

    /**
     *
     * @returns {BaseActions}
     */
    clickNoButton() {
        cy.get("*[name='form-confirm-reject-btn']").click();
        return this;
    }

    /**
     *
     * @returns {BaseActions}
     */
    returnToHomePage() {
        cy.visit(`${getEnvUrl()}/reports`);
        return this;
    }

    /**
     *
     * @returns {BaseActions}
     */
    goBackWithSave() {
        cy.go("back");
        this.clickYesButton();
        return this;
    }

    /**
     *
     * @returns {BaseActions}
     */
    goBackWithoutSave() {
        cy.go("back");
        this.clickNoButton();
        return this;
    }

    /**
     *
     * @returns {BaseActions}
     */
    goBack() {
        cy.go("back");
        return this;
    }

    /**
     *
     * @returns {BaseActions}
     */
    clickSaveButton() {
        cy.get("*[data-qa='form-save-btn']").click();
        return this;
    }

    clickSaveContinueButton() {
        cy.get("*[data-qa='form-submit-btn']").scrollIntoView().click();
    }

    /**
     *
     * @returns {BaseActions}
     */
    verifyProgressBarNotExist() {
        cy.get("*[role='progressbar']").should("not.exist");
        return this;
    }
}
