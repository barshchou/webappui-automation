import BasePage from "../../../base/base.page";

class AddCompFormPage extends BasePage{
    get closeButton() {return cy.get("*[aria-label='close']");}
    get propAddressField() {return cy.get("*[data-qa='property-address']");}
    get unitNumbFieldName() {return cy.get("*[data-qa='unit-number-input'] > label");}
    get unitNumbInput() {return cy.get("*[name='unitNumber']");}
    get unitTypeDropdown() {return cy.get("*[data-qa='unitLayout-select-list'] *[data-qa='select-value']");}
    getUnitTypeByValue(value) {return cy.get(`*[data-qa^='unitLayout'][data-value='${value}']`);}
    get unitTypeInputToCheck() {return cy.get("*[data-qa='unitLayout-select-list'] input");}
    get monthRentFieldName() {return cy.get("*[data-qa='unit-rent-input'] > label");}
    get monthRentInput() {return cy.get("*[name='rent']");}
}

export default new AddCompFormPage();