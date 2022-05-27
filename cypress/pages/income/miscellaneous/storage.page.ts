import BasePage from "../../base/base.page";

class StoragePage extends BasePage {

    get noStorageButton() {return cy.get("[data-qa=no-storage-room-callout-btn]");}

    get storageIncomeTextField() {return cy.get("[name='storageIncome']");}
}

export default new StoragePage();
