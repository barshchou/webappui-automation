import BasePage from "../../base/base.page";

class OtherPage extends BasePage {

    get addOtherincomeButton() { return cy.get("[data-qa='add-btn']"); }

    otherIncomeAnnualAmount(index = 0) { return cy.get(`[name = 'lineItems[${index}].otherIncomeAnnualAmount']`); }

    vcLossTypeDropdown(index = 0) { return cy.get(`[data-qa = 'lineItems[${index}].vcLossType-form-control']`); }

    vcLossTypeDropdownValue(type: string, index = 0) { return cy.get(`[data-qa = "lineItems[${index}].vcLossType-${type}-select-option"]`); } 

    otherIncomeVc(index = 0) { return cy.get(`[name = 'lineItems[${index}].otherIncomeVc']`); }

    incomeCategoryTextField(index = 0) { return cy.get(`[name = 'lineItems[${index}].otherIncomeCategory']`); }

}

export default new OtherPage();
