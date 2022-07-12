import { BoweryReports } from "../../../types/boweryReports.type";
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

    getReimbursementByRow(index = 0, columnsId = "monthly", reimbursementIndex = 0) { 
        return cy.get(`[name = 'reimbursements[${reimbursementIndex}].unitReimbursements[${index}].${columnsId}']`); 
    }

    getVCLossInputByRow(index = 0) { return cy.get(`[name='reimbursements[${index}].vcLoss']`); }

    getAppraiserForecastGross(expenseUIName: string, unitRow: number) { 
        return cy.xpath(`//div[p[.='${expenseUIName} (% of Appraiser Forecast)']]//following-sibling::div[1]//tbody/tr[${unitRow}]/td[3]`);
    }

    getAnnualReimbursement(expenseUIName: string, unitRow: number, reimbursementType: BoweryReports.ReimbursementType, 
        knownInformation: BoweryReports.KnownInformation) {
        let annualReimbursementColumnId = 3;
        if (reimbursementType == 'percentOfAppraiserForecast') {
            annualReimbursementColumnId = 5;
        } else if (knownInformation == 'Monthly') {
            annualReimbursementColumnId = 4;
        }
        return cy.xpath(`//div[p[.='${expenseUIName} (% of Appraiser Forecast)']]//following-sibling::div[1]//tbody/tr[${unitRow}]/td[${annualReimbursementColumnId}]`);
    }

    getGeneratedCommentaryByExpenseType(expenseUIName: string, reimbursementIndex = 0) {
        return cy.xpath(`//div[p[.='${expenseUIName} (% of Appraiser Forecast)']]//following-sibling::div[1]//p[@data-qa="reimbursements[${reimbursementIndex}].discussion.commentary-generated-text"]`);
    }

    getAnnualReimbursementTotal(expenseUIName: string) {
        return cy.xpath(`//div[p[.='${expenseUIName} (% of Appraiser Forecast)']]//following-sibling::div[1]//tbody/tr[last()]/td[last()]`);
    }

    getReimbursementItemHeader(expenseUIName: string) {
        return cy.xpath(`//div[p[.='${expenseUIName} (% of Appraiser Forecast)']]`);
    }
}

export default new CommercialReimbursementSummaryPage();