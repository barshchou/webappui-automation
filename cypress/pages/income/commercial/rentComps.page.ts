import BasePage from "../../base/base.page";

class CommercialRentCompsPage extends BasePage {
    get mapDropdown() {return cy.get("[data-qa=commercial-rent-comps-map]");}
    get filtersDropdown() {return cy.xpath("//*[@role='button' and .='Filters']");}
    get leaseTermsSection() {return cy.contains("Lease Terms");}
    getNotCheckedCheckboxByQAAttr(attribute) {return cy.get(`[data-qa='${attribute}'] input`);}
    getCheckedCheckboxByQAAttr(attribute) {return cy.get(`[data-qa='${attribute}-checked'] input`);}
    get sortBySection() {return cy.contains("Sort By");}
    get sortByDropdown() {return cy.get("#select-sortType");}
    getDropdownOptionByValue(value) {return cy.get(`[role=option][data-value='${value}']`);}
    get addCompButtonsLocator() {return "[data-qa=add-comp-btn]";}
    getAddCompButtonByAddress(address) {return cy.contains(address).siblings(this.addCompButtonsLocator);}
    get addressCellsLocator() {return "[data-qa=address-cell]";}
    getMoveIconByGroupNameIndex(address, index) {
        return cy.get(`${this.getCompGroupTableLocator(address)} [data-qa=row-${index}] i`);
    }
    getCompGroupTableLocator(groupName) {return `[data-qa='${groupName}-group-panel']`;}
    getCompGroupTable(groupName) {return cy.get(this.getCompGroupTableLocator(groupName));}
}

export default new CommercialRentCompsPage();