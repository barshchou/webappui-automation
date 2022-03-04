import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get commercialUnitsTabs() {return cy.get("button[role='tab']");}

    getRadioButtonByValueAndUnitIndex(group: string, value: string, index: number = 0): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.xpath(`//*[contains(text(), '${group}')]//parent::span//child::input[@value='${value}'][1]`).eq(index);
    }

    get commercialUnitsSFInputs() {return cy.get("*[name*='.squareFeet']");}
    getOtherFrontageByUnit(unitIndex) {return cy.get(`[name='units[${unitIndex}].otherFrontage']`);}
}

export default new CommercialUnitsPage();