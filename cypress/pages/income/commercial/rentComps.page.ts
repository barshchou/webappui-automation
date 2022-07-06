import BasePage from "../../base/base.page";

class CommercialRentCompsPage extends BasePage {
    get mapDropdown() {return cy.get("[data-qa=commercial-rent-comps-map]");}

    get filtersDropdown() {return cy.xpath("//*[@role='button' and .='Filters']");}

    get leaseTermsSection() {return cy.contains("Lease Terms");}

    getNotCheckedCheckboxByQAAttr(attribute: string) {return cy.get(`[data-qa='${attribute}'] input`);}

    getCheckedCheckboxByQAAttr(attribute: string) {return cy.get(`[data-qa='${attribute}-checked'] input`);}

    get sortBySection() {return cy.contains("Sort By");}

    get sortByDropdown() {return cy.get('[data-qa="select-value"]');}

    getDropdownOptionByValue(value: string) {return cy.get(`[role=option][data-value='${value}']`);}

    get addCompButtonsLocator() {return "[data-qa=add-comp-btn]";}

    get removeCompButtonLocator() {return "[data-qa=remove-comp-btn]";}

    getAddCompButtonByAddress(address: string) {return cy.contains(address).siblings(this.addCompButtonsLocator);}

    get addressCellsLocator() {return "[data-qa=address-cell]";}

    getMoveIconByGroupNameIndex(address: string, index: number) {
        return cy.get(`${this.getCompGroupTableLocator(address)} [data-qa=row-${index}] i`);
    }

    getCompGroupTableLocator(groupName: string) {return `[data-qa='${groupName}-group-panel']`;}

    getCompGroupTable(groupName) {return cy.get(this.getCompGroupTableLocator(groupName));}

    get manuallyAddANewCompButton() {return cy.get("[data-qa=manually-add-a-new-comp-btn]");}

    get addressSearchInput() {return cy.get("[data-qa='google-autocomplete-search.location-input'] input");}

    get submitButton() {return cy.get("[data-qa=submit-button]");}

    get searchResultsRow() {return cy.get("tr[data-qa^='search-results']");}

    getRentCompInputField(fieldName: string) {return cy.get(`input[name='${fieldName}']`);}

    getRentCompDropdownField(fieldName: string) {return cy.get(`[data-qa=${fieldName}-select-list]`);}

    getRentCompDropdownOption(option: string) {return cy.get(`[data-value=${option}]`);}

    get leaseDatePicker() {return cy.get("[data-qa=dateSigned-date-picker] div input");}

    getEditButtonByRowNumber(rowNumber = 0) {return cy.xpath(`//tr[@data-qa='row-${rowNumber}']//button[.='Edit']`);}

    getRemoveButtonByRowNumber(rowNumber = 0) {return cy.xpath(`//tr[@data-qa='row-${rowNumber}']//button[.='Remove']`);}

    getUnitOfMeasureRadioButton(name: string) {
        return cy.get("div[data-qa=rentType-radio-group] [role=radiogroup]").
            eq(1).
            find(`input[value='${name}']`);
    }

    getRentPerSFCellByRowNumber(rowNumber = 0) {return cy.xpath(`//tr[@data-qa='row-${rowNumber}']/td[@data-qa='rentPerSF-cell']`);}

    getDragableElement(index: number) { return `[data-qa="row-${index}"] [data-qa="drag-cell"]>span`;}

    getDropableArea(compGroup: string) {return `[data-qa="${compGroup}-group-panel"] tbody[data-react-beautiful-dnd-droppable] tr td`;}

    getDropableAreaDropped(compGroup: string) {return `[data-qa="${compGroup}-group-panel"] [data-qa="row-0"]`;}

    get draggableUnsortedPlaceholder() {return cy.xpath(`//*[@data-qa="unsorted_group"]//td[contains(text(), 'Drop any rent roll unit here')]`);}

    get cancelModalButton() {return cy.get("[data-qa=cancel-link]");}

    addRemovedCompByRowButton(rowNumber: number) {return cy.get(`[data-qa=row-${rowNumber}] [aria-label=Add]`);}

    removeRemovedCompByRowButton(rowNumber: number) {return cy.get(`[data-qa=row-${rowNumber}] [aria-label=Remove]`);}

    get clearAllButton() {return cy.get("button").contains("Clear All");}

    getRemovedCompRows(title = "Comp") {return cy.xpath(`//*[contains(text(), 'Removed ${title}')]//following::tbody//tr`);}

    get starZoomButton() {return cy.get(".leaflet-control svg[role='presentation']");}

}

export default new CommercialRentCompsPage();