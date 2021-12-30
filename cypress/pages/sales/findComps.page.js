import BasePage from "../base/base.page";

class FindCompsPage extends BasePage {
    get createCompButton() {return cy.get("[data-qa=create-sales-comps-btn]");}
    get searchCompAddressInput() {return cy.get("[data-qa='google-autocomplete-search.location-input'] input");}
    get findCompField() {return cy.contains("Enter New Comparable Address");}
    get submitButton() {return cy.get("[data-qa=submit-button]");}
    getSelectCompButtonByAddress(address) {return cy.xpath(`//*[text()='${address}']//following-sibling::td/a`);}
    get addressCells() {return cy.get("[data-qa=address]");}
    get capRateCells() {return cy.get("td[data-qa=cap-rate]");}
    get importCompsButton() {return cy.get("[data-qa=import-btn]");}
    get importCompModal() {return cy.get("[data-qa=import-modal]");}
}

export default new FindCompsPage();