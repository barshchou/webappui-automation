import BasePage from "../../base/base.page";
import { BoweryReports } from "../../../types/boweryReports.type";

class CommercialRentCompsPage extends BasePage {
    get mapDropdown() { return cy.get("[data-qa=commercial-rent-comps-map]"); }

    get filtersDropdown() { return cy.xpath("//*[@role='button' and .='Filters']"); }

    get leaseTermsSection() { return cy.contains("Lease Terms"); }

    getNotCheckedCheckboxByQAAttr(attribute: string) { return cy.get(`[data-qa='${attribute}'] input`); }

    getCheckedCheckboxByQAAttr(attribute: string) { return cy.get(`[data-qa='${attribute}-checked'] input`); }

    get sortBySection() { return cy.contains("Sort By"); }

    get sortByDropdown() { return cy.get('[data-qa="select-value"]'); }

    getDropdownOptionByValue(value: string) { return cy.get(`[role=option][data-value='${value}']`); }

    get addCompButtonsLocator() { return "[data-qa=add-comp-btn]"; }

    get removeCompButtonLocator() { return "[data-qa=remove-comp-btn]"; }

    getAddCompButtonByAddress(address: string) { return cy.contains(address).siblings(this.addCompButtonsLocator); }

    get addressCellsLocator() { return "[data-qa=address-cell]"; }

    getCompGroupTableLocator(groupName: string) { return `//*[@data-qa='${groupName}-group-panel']`; }

    getCompGroupTableColumn(groupName: string, columnName: string) {
        return cy.xpath(`${this.getCompGroupTableLocator(groupName)}//child::th[text()='${columnName}']`);
    }

    get manuallyAddANewCompButton() { return cy.get("[data-qa=manually-add-a-new-comp-btn]"); }

    get addressSearchInput() { return cy.get("[data-qa='google-autocomplete-search.location-input'] input"); }

    get submitButton() { return cy.get("[data-qa=submit-button]"); }

    get searchResultsRow() { return cy.get("tr[data-qa^='search-results']"); }

    getRentCompInputField(fieldName: string) { return cy.get(`input[name='${fieldName}']`); }

    getRentCompDropdownField(fieldName: string) { return cy.get(`[data-qa=${fieldName}-select-list]`); }

    getRentCompDropdownOption(option: string) { return cy.get(`[data-value=${option}]`); }

    get leaseDatePicker() { return cy.get("[data-qa=dateSigned-date-picker] input:not([type=hidden])"); }

    get leaseDateInputToVerify() { return cy.get("[data-qa=dateSigned-date-picker] input[type=hidden]"); }

    getRentPerSFCellByRowNumberAndGroup(group = "Unsorted", rowNumber = 0) {
        return cy.get(`[data-qa='${group}-group-panel'] [data-qa=rentPerSF-cell]`).eq(rowNumber);
    }

    getDraggableElement(index: number) { return `[data-qa="row-${index}"] [data-qa="drag-cell"]>span`; }

    getDroppableArea(compGroup: string) { 
        return `[data-qa="${compGroup}-group-panel"] tbody[data-react-beautiful-dnd-droppable] tr td`; 
    }

    getDroppableAreaDropped(compGroup: string) { return `[data-qa="${compGroup}-group-panel"] [data-qa="row-0"]`; }

    get draggableUnsortedPlaceholder() { 
        return cy.xpath(`//*[@data-qa="unsorted_group"]//td[contains(text(), 'Drop any rent roll unit here')]`); 
    }

    get cancelModalButton() { return cy.get("[data-qa=cancel-link]"); }

    addRemovedCompByRowButton(rowNumber: number) { return cy.get(`[data-qa=row-${rowNumber}] [aria-label=Add]`); }

    removeRemovedCompByRowButton(rowNumber: number) { return cy.get(`[data-qa=row-${rowNumber}] [aria-label=Remove]`); }

    get clearAllButton() { return cy.get("button").contains("Clear All"); }

    getRemovedCompRows(title = "Comp") { 
        return cy.xpath(`//*[contains(text(), 'Removed ${title}')]//following::tbody//tr`); 
    }

    get computedPanel() { return cy.get("[data-qa=computed-panel]"); }

    get mapStarZoomButton() { return cy.get(".leaflet-control svg[role='presentation']"); }

    get mapDrawPolygonButton() { return cy.get("[title='Draw a polygon']"); }

    get mapZoomInButton() { return cy.get("[title='Zoom in']"); }

    get mapZoomOutButton() { return cy.get("[title='Zoom out']"); }

    get mapContainer() { return cy.get(".leaflet-container"); }

    getMapDialogButtons(title: string) { return cy.get(`[title='${title}']`); }

    getModalDialogYesButtons() { return cy.get("[data-qa='yes.btn']"); }

    getModalDialogNoButtons() { return cy.get("[data-qa='no-btn']"); }

    get editingIcon() { return cy.get(".leaflet-editing-icon"); }
    
    get computedSubjectColumn() { return this.computedPanel.find("[data-qa='0-column']"); }

    get computedSubjectMinCell() { return this.computedSubjectColumn.find("[data-qa='00-cell']"); }

    get computedSubjectAvgCell() { return this.computedSubjectColumn.find("[data-qa='01-cell']"); }

    get computedSubjectMaxCell() { return this.computedSubjectColumn.find("[data-qa='02-cell']"); }

    get addCompButtons() { return cy.get(this.addCompButtonsLocator); }

    get computedCompsColumn() { return this.computedPanel.find("[data-qa='1-column']"); }

    get computedCompsMinCell() { return this.computedCompsColumn.find("[data-qa='10-cell']"); }

    get computedCompsAvgCell() { return this.computedCompsColumn.find("[data-qa='11-cell']"); }

    get computedCompsMaxCell() { return this.computedCompsColumn.find("[data-qa='12-cell']"); }

    getRemoveCompButtonsFromGroupTable(group = "unsorted") {
        return cy.get(`[data-qa='${group}_group'] [data-qa="remove-comp-btn"]`);
    }

    get commercialUnitDetailsModal() { return cy.get("[data-qa=commRentCompDetailsModal]"); }

    getUnitMeasureRadioByValue(value: BoweryReports.UnitsOfMeasure) {
        return this.commercialUnitDetailsModal
            .find(`[data-qa=rentType-radio-group] input[value='${value}']`); 
    }

    get pageHeaderElement() { return cy.get("[data-qa=rentComps]"); }

    getDropdownOptionsByFieldName(name: string) {
        return cy.get(`[data-qa^=${name}][data-qa$='-select-option']`);
    }

    get componentErrorElement() { return cy.get("#component-error-text"); }

    getEditCompButton(rowNumber = 0) { return cy.get("[data-testid='EditIcon']").eq(rowNumber); }
    
    getRemoveCompButton(rowNumber = 0) { return cy.get("[data-testid='CancelIcon']").eq(rowNumber); } 
  
}

export default new CommercialRentCompsPage();
