import BasePage from "../../../base/base.page";

class AddCompFormPage extends BasePage{
    get closeButton() {return cy.get("*[aria-label='close']");}
    get propAddressField() {return cy.get("*[data-qa='property-address']");}
    get unitNumbFieldName() {return cy.get("*[data-qa='unit-number-input'] > label");}
    get unitNumbInput() {return cy.get("*[name='unitNumber']");}
    get unitTypeDropdown() {return cy.get("*[data-qa='unitLayout-select-list'] [data-qa='select-value']");}
    getUnitTypeByValue(value) {return cy.get(`*[data-qa^='unitLayout'][data-value='${value}']`);}
    get unitTypeInputToCheck() {return cy.get("*[data-qa='unitLayout-select-list'] input");}
    get monthRentFieldName() {return cy.get("*[data-qa='unit-rent-input'] > label");}
    get monthRentInput() {return cy.get("*[name='rent']");}
    get dateOfValueInput() {return cy.get("*[data-qa='dateOfValue-date-picker'] input[placeholder='MM-DD-YYYY']");}
    get datePickerButton() {return cy.get("*[data-qa='dateOfValue-date-picker'] button");}
    get datePickerPopover() {return cy.get("#picker-popover");}
    getDayOfCurrentMonthInPicker(day) {return cy.xpath(`//*[text()='${day}']//parent::button[@tabindex='0']`);}
    get errorMessage() {return cy.get("#component-error-text");}
    get dateInputValue() {return cy.get("*[data-qa='dateOfValue-date-picker'] > input");}
    get squareFootageFieldName() {return cy.get("*[data-qa='unit-sqft-input'] > label");}
    get squareFootageInput() {return cy.get("*[name='sqft']");}
    get sourceOfInfoDropdown() {return cy.get("*[data-qa='sourceOfInformation-select-list'] [data-qa='select-value']");}
    getSourceOfInfoByValue(value) {return cy.get(`*[data-qa^='sourceOfInformation'][data-value='${value}']`);}
    get sourceOfInfoInputToCheck() {return cy.get("*[data-qa='sourceOfInformation-select-list'] input");}
    get numberOfBedroomsFieldName() {return cy.get("*[data-qa='unit-bedrooms-input'] > label");}
    get bedroomsInput() {return cy.get("*[name='bedrooms']");}
    get sourceNameInput() {return cy.get("*[name='sourceName']");}
    get sourceUrlInput() {return cy.get("*[name='sourceUrl']");}
    get numberOfRoomsFieldName() {return cy.get("*[data-qa='unit-rooms-input'] > label");}
    get numberOfRoomsInput() {return cy.get("*[name='rooms']");}
    get numberOfBathFieldName() {return cy.get("*[data-qa='unit-bathrooms-input'] > label");}
    get numberOfBathInput() {return cy.get("*[name='bathrooms']");}
    get bathNumbErrorMessage() {return cy.contains("Must be a whole or half number");}
    get internalNotesTextField() {return cy.get("*[name='internalNotes']");}
    get unitAmenitiesFieldName() {return cy.get("*[data-qa='amenities-form-control'] label");}
    get unitAmenitiesDropdown() {return cy.get("*[data-qa='amenities-form-control'] button");}
    getCheckboxByDataQaAttr(attribute) {return cy.get(`*[data-qa='${attribute}'] input`);}
    get cancelButton() {return cy.get("*[data-qa='cancel-btn']");}
    get submitCompButton() {return cy.get("*[data-qa='submit-comp-btn']");}
}

export default new AddCompFormPage();