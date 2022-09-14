import BasePage from "../base/base.page";

class HistoryPage extends BasePage {
    get isUnderContractCheckbox() { return cy.get("*[data-qa=isUnderContract] input"); }

    get buyerField() { return cy.get("*[name='contractDetails.grantee']"); }

    get contractDate() { 
        return cy.get("*[data-qa='contractDetails.date-date-picker'] input[placeholder='MM-DD-YYYY']"); 
    }

    get inputToCheckDate() { return cy.get("*[data-qa='contractDetails.date-date-picker'] input[type='hidden']"); }

    get errorMessage() { return cy.get("#component-error-text"); }

    get contractPrice() { return cy.get("*[name='contractDetails.price']"); }
}

export default new HistoryPage();