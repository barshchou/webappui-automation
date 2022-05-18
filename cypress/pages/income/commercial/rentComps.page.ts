import BasePage from "../../base/base.page";

class CommercialRentCompsPage extends BasePage {
    get mapDropdown() {return cy.get("[data-qa=commercial-rent-comps-map]");}

    get filtersDropdown() {return cy.xpath("//*[@role='button' and .='Filters']");}

    get leaseTermsSection() {return cy.contains("Lease Terms");}

    getNotCheckedCheckboxByQAAttr(attribute) {return cy.get(`[data-qa='${attribute}'] input`);}

    getCheckedCheckboxByQAAttr(attribute) {return cy.get(`[data-qa='${attribute}-checked'] input`);}

    get sortBySection() {return cy.contains("Sort By");}

    get sortByDropdown() {return cy.get('[data-qa="select-value"]');}

    getDropdownOptionByValue(value) {return cy.get(`[role=option][data-value='${value}']`);}

    get addCompButtonsLocator() {return "[data-qa=add-comp-btn]";}

    getAddCompButtonByAddress(address) {return cy.contains(address).siblings(this.addCompButtonsLocator);}

    get addressCellsLocator() {return "[data-qa=address-cell]";}

    getMoveIconByGroupNameIndex(address, index) {
        return cy.get(`${this.getCompGroupTableLocator(address)} [data-qa=row-${index}] i`);
    }

    getCompGroupTableLocator(groupName) {return `[data-qa='${groupName}-group-panel']`;}

    getCompGroupTable(groupName) {return cy.get(this.getCompGroupTableLocator(groupName));}

    get manuallyAddANewCompButton() {return cy.get("[data-qa=manually-add-a-new-comp-btn]");}

    get addressSearchInput() {return cy.get("[data-qa='google-autocomplete-search.location-input'] input");}

    get submitButton() {return cy.get("[data-qa=submit-button]");}

    get searchResultsRow() {return cy.get("tr[data-qa^='search-results']");}

    getRentCompInputField(fieldName) {return cy.get(`input[name='${fieldName}']`);}

    getRentCompDropdownField(fieldName) {return cy.get(`[data-qa=${fieldName}-select-list]`);}

    getRentCompDropdownOption(option) {return cy.get(`li[data-value=${option}]`);}

    get leaseDatePicker() {return cy.get("[data-qa=dateSigned-date-picker] div input");}

    getEditButtonByRowNubmer(rowNumber = 0) {return cy.xpath(`//tr[@data-qa='row-${rowNumber}']//button[.='Edit']`);}

    getUnitOfMeasureRadioButton(name) {
        return cy.get("div[data-qa=rentType-radio-group] [role=radiogroup]").
            eq(1).
            find(`input[value='${name}']`);
    }

    getRentPerSFCellByRowNumber(rowNumber = 0) {return cy.xpath(`//tr[@data-qa='row-${rowNumber}']/td[@data-qa='rentPerSF-cell']`);}
}

export default new CommercialRentCompsPage();