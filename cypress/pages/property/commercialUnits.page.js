import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get commercialUnitsTabs() {return cy.get("button[role='tab']");}
    getRadioButtonByValueAndUnitIndex(value, index = 0) {return cy.get(`*[type=radio][value='${value}']`).eq(index);}
}

export default new CommercialUnitsPage();