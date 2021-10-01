import BasePage from "../../base/base.page";

class RentCompsPage extends BasePage{
    get generatedCommentary() {return cy.get("*[data-qa='rentCompsIntroduction.commentary-generated-text']");}
    get unitSwitchButton() {return cy.get("*[data-qa='unit-switch-button']");}
    get buildingSwitchButton() {return cy.get("*[data-qa='building-switch-button']");}
    get switchSearchConfirmButton() {return cy.get("*[data-qa='switch-search-confirm']");}
    get unitTypesArrowButton() {return cy.xpath("//*[text()='Unit Type']//following-sibling::button");}
    getCheckboxByDataQaAttr(attribute) {return cy.get(`*[data-qa='${attribute}'] input`);}
    get changeCompTypePopUpMessage() {return cy.xpath("//*[text()='Changing your comp type will cause you " +
        "to lose all currently selected comparables.']");}
    get minRentInput() {return cy.get("*[name='minRent']");}
    get maxRentInput() {return cy.get("*[name='maxRent']");}
    get minSquareFeet() {return cy.get("*[name='minSqft']");}
    get maxSquareFeet() {return cy.get("*[name='maxSqft']");}
    get numberOfBedroomsArrowButton() {return cy.xpath("//*[text()='Bedrooms']//following-sibling::button");}
    get sourceOfInfoArrow() {return cy.xpath("//*[text()='Source of Information']//following-sibling::button");}
    get minDateValueInput() {return cy.get("*[data-qa='minDateOfValue-date-picker'] input[placeholder='MM-DD-YYYY']");}
    get maxDateValueInput() {return cy.get("*[data-qa='maxDateOfValue-date-picker'] input[placeholder='MM-DD-YYYY']");}
    get dateMinInputToCheckValue() {return cy.get("*[data-qa='minDateOfValue-date-picker'] > input");}
    get dateMaxInputToCheckValue() {return cy.get("*[data-qa='maxDateOfValue-date-picker'] > input");}
    get errorMessage() {return cy.get("#component-error-text");}
    get dateMinPickerButton() {
        return cy.xpath("//*[@data-qa='minDateOfValue-date-picker']//child::button");
    }
    get dateMaxPickerButton() {
        return cy.xpath("//*[@data-qa='maxDateOfValue-date-picker']//child::button");
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
}

export default new RentCompsPage();