import BasePage from "../base/base.page";

class AssumptionsConditionsPage extends BasePage {
    get addExtraordinaryAssumptionsButton() {return cy.get("[data-qa=extraordinaryAssumptions-add-btn]");}

    get extraordinaryAssumptionsInputs() {return cy.get("[name^=extraordinaryAssumptions]");}

}

export default new AssumptionsConditionsPage();