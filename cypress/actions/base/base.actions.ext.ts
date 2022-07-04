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
    extractAlias(aliasName: string) {
        return cy.get(`@${aliasName}`);
    }

    /**
     * @description As you can see, this.Page.pageHeaderElement is not defined, because it does not exist on basPage,
     * but this method dynamically takes defined pageHeaderElement from the page, with which parametrized an action,
     * on what we call this method, so if we want to use this method on any action, we have to define in appropriate
     * page an element with exact same name pageHeaderElement, which we want to hide.
     * For example: if we take expenseForecast page, there is a defined element pageHeaderElement and if we call this method
     * on the expenseForecast action, which extends BaseActionsExt and parametrized with expenseForecast page, this method
     * will take pageHeaderElement from expenseForecast page for hiding. By using this way, we avoid code duplicating and
     * we don't have to worry about, how to pass element correctly, our code will dynamically define the needed one
     */
    hideHeader() {
        cy.log('hide');
        if (Cypress.browser.isHeadless == true) {
            this.hideElement(this.Page.Header);
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            this.hideElement(this.Page.pageHeaderElement);
        }
        return this;
    }
}
