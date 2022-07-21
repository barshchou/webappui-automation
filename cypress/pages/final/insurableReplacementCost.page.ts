import BasePage from "../base/base.page";

class InsurableReplacementCostPage extends BasePage {
    get subjectStateDropdown() { return cy.get("[data-qa^=subjectState] [data-qa=select-value]"); }

    get subjectLocaleDropdown() { return cy.get("[data-qa^=subjectLocale] [data-qa=select-value]"); }

    get localMultiplier() { return cy.get("[name=localMultiplier]"); }
}

export default new InsurableReplacementCostPage();