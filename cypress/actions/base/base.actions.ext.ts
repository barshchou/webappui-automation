/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="cypress-xpath" />
/// <reference types="cypress-image-snapshot" />

/**
 * Use this class for QA-5043
 */
import BasePage from "../../pages/base/base.page";
import BaseActions from "./base.actions";

export default class BaseActionsExt<T extends BasePage> extends BaseActions {
    Page: T;

    constructor(page: T){
        super();
        this.Page = page;
    }

    verifyTooltipNotExist() {
        this.Page.tooltip.should("not.exist");
        return this;
    } 

    /**
     * 
     * @param aliasName alias name, you don't need to procees string with '@'
     * @see https://docs.cypress.io/api/commands/as
     * @returns Cypress.Chainable with aliased value
     */
    extractAlias(aliasName: string){
        return cy.get(`@${aliasName}`);
    }
}