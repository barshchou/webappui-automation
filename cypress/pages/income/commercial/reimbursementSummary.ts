import BasePage from "../../base/base.page";

class CommercialReimbursementSummary extends BasePage {

    get addReimbursementButton() {return cy.get("[data-qa='create-reimbursement_btn']");}

    get reimbursementModal() {return cy.get("[data-qa='reimbursement-edit-modal-content']");}

    get expenseType() {return cy.get("[data-qa='expenseType-select-list'] [data-qa=select-value]");}

    get expenseTypeSelected() {return cy.get("[data-qa='expenseType-select-list']");}

    getDropdownOptionByValue(expense: string) {return cy.get(`li[data-value='${expense}']`);}

    get reimbursementTypeRadioButton() {return cy.get("[name=type]");}

    get knownInformation() {return cy.get("name = 'knownInformation.dollarAmountType'");}

}

export default new CommercialReimbursementSummary();