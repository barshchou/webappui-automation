import BasePage from "../base/base.page";

class FinalValuesReconciliationPage extends BasePage {
    get perUnitCheckbox() { return cy.get("[data-qa^='unitOfComparison.perUnit-checkbox'] input"); }

    get incomeStabilizedDate() { return cy.get("[data-qa=incomeApproachAsStablilized-date]"); }

    get incomeCompleteDate() { return cy.get("[data-qa=incomeApproachAsComplete-date]"); }

    get incomeMarketDate() { return cy.get("[data-qa=incomeApproachAsIs-date]"); }

    get salesStabilizedDate() { return cy.get("[data-qa=salesApproachAsStablilized-date]"); }

    get salesCompleteDate() { return cy.get("[data-qa=salesApproachAsComplete-date]"); }

    get salesMarketDate() { return cy.get("[data-qa=salesApproachAsIs-date]"); }

    get finalValueApproachRadio() { return cy.get("[name=approachSelected]"); }

    getElementToVerifyRadio(value: string) { return cy.get(`[data-qa=checked] input[value=${value}]`); }

    get finalValueAsStabDate() { return cy.get("[data-qa=asStablilized-date]"); }

    get finalValueAsCompleteDate() { return cy.get("[data-qa=asComplete-date]"); }

    get finalValueAsIsDate() { return cy.get("[data-qa=asIs-date]"); }

    finalValueConclusion(valueConclusion: string) { 
        return cy.get(`[data-qa="salesApproach${valueConclusion}-conclusion"]`);
    }
}

export default new FinalValuesReconciliationPage();