import BasePage from "../../base/base.page";

class CommercialReimbursementSummaryPage extends BasePage {

    get addReimbursementButton() { return cy.get("[data-qa='create-reimbursement_btn']"); }

    get reimbursementModal() { return cy.get("[data-qa='reimbursement-edit-modal-content']"); }

    get expenseTypeDropdown() { return cy.get("[data-qa='select-value']"); }

    get expenseType() { return cy.get("[data-qa='expenseType-select-list'] [data-qa=select-value]"); }

    get expenseTypeSelected() { return cy.get("[data-qa='expenseType-select-list']"); }

    getDropdownOptionByValue(expense: string) { return cy.get(`li[data-value='${expense}']`); }

    reimbursementTypeRadioButton(value: string) { return cy.xpath(`//input[@name = 'type'][@value = '${value}']`); }

    reimbursementKnownInformation(value: string) { return cy.xpath(`//input[@name = 'knownInformation.dollarAmountType'][@value = '${value}']`); }

    getReimbursementByRow(index = 0, knownInformation = "monthly") { return cy.get(`[name = 'reimbursements[0].unitReimbursements[${index}].${knownInformation}']`); }

    getVCLossInputByRow(index = 0) { return cy.get(`[name='reimbursements[${index}].vcLoss']`); }

}

export default new CommercialReimbursementSummaryPage();