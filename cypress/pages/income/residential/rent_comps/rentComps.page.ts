import BasePage from "../../../base/base.page";

class RentCompsPage extends BasePage{
    get generatedCommentary() {return cy.get("*[data-qa='rentCompsIntroduction.commentary-generated-text']");}
    get unitSwitchButton() {return cy.get("*[data-qa='unit-switch-button']");}
    get buildingSwitchButton() {return cy.get("*[data-qa='building-switch-button']");}
    get switchSearchConfirmButton() {return cy.get("*[data-qa='switch-search-confirm']");}
    get unitTypesArrowButton() {return cy.xpath("//*[text()='Unit Type']//following-sibling::button");}
    getCheckboxByDataQaAttr(attribute) {return cy.get(`*[data-qa='${attribute}'] input`);}
    get changeCompTypePopUpMessage() {return cy.xpath("//*[text()='Changing your comp type will cause you " +
        "to lose all currently selected comparables.']");}
    get minRentInput() {return cy.get("*[name='filters.minRent']");}
    get maxRentInput() {return cy.get("*[name='filters.maxRent']");}
    get minSquareFeet() {return cy.get("*[name='filters.minSqft']");}
    get maxSquareFeet() {return cy.get("*[name='filters.maxSqft']");}
    get numberOfBedroomsArrowButton() {return cy.xpath("//*[text()='Bedrooms']//following-sibling::button");}
    get sourceOfInfoArrow() {return cy.xpath("//*[text()='Source of Information']//following-sibling::button");}
    get minDateValueInput() {return cy.get("*[data-qa='filters.minDateOfValue-date-picker'] input[placeholder='MM-DD-YYYY']");}
    get maxDateValueInput() {return cy.get("*[data-qa='filters.maxDateOfValue-date-picker'] input[placeholder='MM-DD-YYYY']");}
    get dateMinInputToCheckValue() {return cy.get("*[data-qa='filters.minDateOfValue-date-picker'] > input");}
    get dateMaxInputToCheckValue() {return cy.get("*[data-qa='filters.maxDateOfValue-date-picker'] > input");}
    get errorMessage() {return cy.get("#component-error-text");}
    get dateMinPickerButton() {
        return cy.xpath("//*[@data-qa='filters.minDateOfValue-date-picker']//child::button");
    }
    get dateMaxPickerButton() {
        return cy.xpath("//*[@data-qa='filters.maxDateOfValue-date-picker']//child::button");
    }
    get pickerCalendar() {return cy.get("*[role='document']");}
    getDayInCurrentMonthPicker(day) {return cy.xpath(`//*[text()='${day}']//parent::button[@tabindex='0']`);}
    get amenitiesArrowButton() {return cy.xpath("//*[text()='Amenities']//following-sibling::button");}
    get numberOfFoundResults() {return cy.get("*[data-qa='rentComps-count']");}
    get resetFiltersButton() {return cy.get("*[data-qa='reset-filters-button']");}
    get sortByDropdown() {return cy.get("*[data-qa='select-value']");}
    getSortDropdownOptionByValue(value) {return cy.get(`*[data-value='${value}']`);}
    get loadingModal() {return cy.get("*[data-qa='loading-modal']");}
    get photoElementLocator() {return "*[data-qa='photo']";}
    get photoElements() {return cy.get(this.photoElementLocator);}
    get nextPhotoButtons() {return cy.get("button.slick-next");}
    get prevPhotoButtons() {return cy.get("button.slick-prev");}
    get comparableItems() {return cy.get("*[data-qa='rentComp-item']");}
    get comparableAddressesTexts() {return cy.get("*[data-qa='rentComp-address-text']");}
    get rentElementsTexts() {return cy.get("*[data-qa='rentComp-address-text'] + p");}
    get comparablesAmenitiesTexts() {return cy.get("*[data-qa='rentComp-contitions']");}
    get comparablePropertyTexts() {return cy.get("*[data-qa='rentComp-property']");}
    get selectComparableButtons() {return cy.get("*[data-qa='rentComp-select-btn']");}
    get selectedComparableButtons() {return cy.get("*[data-qa='rentComp-selected-btn']");}
    get zoomInButton() {return cy.get("*[title='Zoom in']");}
    get zoomOutButton() {return cy.get("*[title='Zoom out']");}
    get uncategorizedTable() {return cy.get("*[data-qa='uncategorized']");}
    get indexColumnCellsSelector() {return "*[data-qa='col-index']";}
    get indexColumnCells() {return cy.get(this.indexColumnCellsSelector);}
    get addNewRentCompButton() {return cy.get("*[data-qa='add-new-rent-comp-btn']");}
    get findRentCompSection() {return cy.contains("Find Rent Comparable");}
    get searchAddressField() {return cy.get("*[placeholder='Search Address']");}
    get submitButton() {return cy.get("*[data-qa='submit-button']");}
    get searchResultsRows() {return cy.get("tr[data-qa^='search-results']");}
    get newUnitForm() {return cy.get("*[data-qa='new-unit-modal']");}
    getCategoryRowByIndexLocator(index) {return `*[data-qa='row-${index}']`;}
    getCategoryRowByIndex(index) {return cy.get(this.getCategoryRowByIndexLocator(index));}
    get categoryRoomsCellsLocator() {return "*[data-qa='col-rooms']";}
    get categoryBedroomsCellsLocator() {return "*[data-qa='col-bedrooms']";}
    get categoryRentsCellsLocator() {return "*[data-qa='col-rent']";}
    get categoryRentPerRoomLocator() {return "*[data-qa='col-rentPerRoom']";}
    get categorySourceOfInfoLocator() {return "*[data-qa='col-source-of-info']";}
    get advancedSearchButton() {return cy.get("[data-qa=advanced-search-link]");}
    get selectStateButton() {return cy.get("[data-qa='search.locationIdentifier-select-list'] [role='button']");}
    getStateByName(name) {return cy.get(`[data-qa='search.locationIdentifier-${name}-select-option']`);}
    get propertyIdentifierInput() {return cy.get("*[name='search.propertyIdentifier']");}
    getBedroomTableByNumber(bedroomsNumber) {return cy.get(`[data-qa='bedrooms_${bedroomsNumber}']`);}
    getSelectButtonByAddress(address) {return cy.xpath(`//*[text()='${address}']//following-sibling::button`);}
    getSelectedButtonByAddress(address) {return cy.xpath(`//*[text()='${address}']//following-sibling::button[contains(@data-qa, 'selected-btn')]`);}
    get editButtonLocator() {return "[data-qa=col-edit] button";}
    get removeButtonLocator() {return "[data-qa=col-remove] button";}
    get moveCellLocator() {return "[data-qa=drag-cell] i";}
    get indexCellLocator() {return "[data-qa=col-index]";}
    get unitAddressLocator() {return "[data-qa=col-unitAddress]";}
    get uncategorizedMinCell() {return cy.xpath("//*[@data-qa='uncategorized']//descendant::td[.='Min']//following-sibling::td[1]");}
    get uncategorizedAverageCell() {return cy.xpath("//*[@data-qa='uncategorized']//descendant::td[.='Average']//following-sibling::td[1]");}
    get uncategorizedMaxCell() {return cy.xpath("//*[@data-qa='uncategorized']//descendant::td[.='Max']//following-sibling::td[1]");}
    get rentRollSummary() {return cy.contains("Rent Roll Summary");}
    get uncategorizedSubjectMin() {return cy.get("[data-qa=rent-comps-type-uncategorized] [data-qa='Min:-cell']");}
    get uncategorizedSubjectAverage() {return cy.get("[data-qa=rent-comps-type-uncategorized] [data-qa='Avg:-cell']");}
    get uncategorizedSubjectMax() {return cy.get("[data-qa=rent-comps-type-uncategorized] [data-qa='Max:-cell']");}
    get uncategorizedSubjectColumn() {return cy.get("[data-qa=rent-comps-type-uncategorized] [data-qa=computed-panel] [data-qa='0-column']");}
    get displaySquareFootageForCompsCheckbox() {return cy.get("[data-qa=showSFForComps] input");}
    get squareFootageCellsLocator() {return "[data-qa=col-sqft]";}
    get rentPerSfCellsLocator() {return "[data-qa=col-rentPerSf]";}
    get uncategorizedDevForecast() {return cy.get("[data-qa=rent-comps-type-uncategorized] [data-qa=computed-panel] [data-qa='1-column']");}
    get bathroomsCellsLocator() {return "[data-qa=col-bathrooms]";}
    getBedroomsTableHeader(bedroomsNumber) {return cy.get(`[data-qa='rent-comps-type-bedrooms_${bedroomsNumber}'] h5`);}
    get uncategorizedTableHeader() {return cy.get("[data-qa=rent-comps-type-uncategorized] h5");}
    getBedroomSubjectColumn(bedroomsNumber) {
        return cy.get(`[data-qa=rent-comps-type-bedrooms_${bedroomsNumber}] [data-qa=computed-panel] [data-qa='0-column']`);
    }
    getBedroomMarketRateSummary(bedroomsNumber) {
        return cy.xpath(`//*[@data-qa='rent-comps-type-bedrooms_${bedroomsNumber}']//descendant::p[.='Rent Roll Market Rate Summary']`);
    }
    get perBuildingFiltersButton() {return cy.xpath("//button[.='Filters']");}
    get tablesColumns() {return cy.get("[scope=col]");}
    get unitTypesWrapper() {return cy.get("[data-qa^='filters.selectedUnitTypes'] [data-qa=chips-wrapper]");}
    getAreYouSurePopUp(basis) {return cy.xpath(`//*[.='Are you sure you want to search Per ${basis}?']`);}
    get searchCancelButton() {return cy.get("[data-qa=search-cancel]");}
}

export default new RentCompsPage();