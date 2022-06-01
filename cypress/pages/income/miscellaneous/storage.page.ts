import BasePage from "../../base/base.page";

class StoragePage extends BasePage {

    get noStorageButton() {return cy.get("[data-qa=no-storage-room-callout-btn]");}

    get storageIncomeTextField() {return cy.get("[name='storageIncome']");}

    get storageVCLossRadio() {return cy.get("[data-qa=storageVCLossType-radio-group] input");}

    get storageVCLossPercentage() {return cy.get("[name=storageVCLossPercentage]");}
}

export default new StoragePage();
