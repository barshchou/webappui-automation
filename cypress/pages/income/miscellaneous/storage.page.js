import BasePage from "../../base/base.page";

class StoragePage extends BasePage {
    get noStorageButton() {return cy.get("[data-qa=no-storage-room-callout-btn]");}
}

export default new StoragePage();
