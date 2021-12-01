/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable<Subject> {
        /**
         * Login to application with api
         * @example
         * cy.loginByApi()
         */
        loginByApi(): Chainable<any>

        /**
         * login to application with UI
         * @example
         * cy.loginByUI()
         */
        loginByUI(): Chainable<any>

        /**
         * Save application's local storage to LOCAL_STORAGE_MEMORY variable
         * @example
         * cy.saveLocalStorage()
         */
        saveLocalStorage(): Chainable<any>

        /**
         * Restore application's local storage from LOCAL_STORAGE_MEMORY variable
         * @example
         * cy.restoreLocalStorage()
         */
        restoreLocalStorage(): Chainable<any>
    }
}