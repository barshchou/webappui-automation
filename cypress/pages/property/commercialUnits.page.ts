import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get commercialUnitsTabs() {return cy.get("button[role='tab']");}
    getRadioButtonByValueAndUnitIndex(value, index = 0) {return cy.get(`*[type=radio][value='${value}']`).eq(index);}
    get commercialUnitsSFInputs() {return cy.get("*[name*='.squareFeet']");}
}

export default new CommercialUnitsPage();