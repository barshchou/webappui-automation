import BasePage from "../base/base.page";

class RenovationsPage extends BasePage{
    get prospectiveRenovationsDropdown() {
        return cy.get("[data-qa='prospectiveRenovationType-form-control'] [data-qa='select-value']");
    }
    getDropdownOptionByValue(value) {return cy.get(`li[role='option'][data-value='${value}']`);}
    get totalButton() {return cy.get("[data-qa='Total-btn']");}
    get renovationPeriodInput() {return cy.get("[name*='renovationPeriod']");}
    get totalAmountInput() {return cy.get("[name='total.total.amount']");}
    get netRenovationTotalBudget() {return cy.get("[data-qa='net-renovation-total-budget']");}
    get editCommentaryButton() {return cy.get("[data-qa='generated-commentary-edit-btn']");}
    get commentaryTextArea() {return cy.get("[name='prospectiveRenovationsDiscussion.commentary']");}
}

export default new RenovationsPage();
