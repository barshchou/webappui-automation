import BasePage from "../base/base.page";

class AssumptionsConditionsPage extends BasePage {
    get addExtraordinaryAssumptionsButton() { return cy.get("[data-qa=extraordinaryAssumptions-add-btn]"); }

    get extraordinaryAssumptionsInputs() { return cy.get("[name^=extraordinaryAssumptions]"); }

    get itemsGeneralAssumptionsTextarea() { return cy.get("[name^=generalAssumptions]"); }
}

export default new AssumptionsConditionsPage();