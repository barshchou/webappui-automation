import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get commercialUnitsTabs() {return cy.get("button[role='tab']");}

    getRadioButtonByValueAndUnitIndex(group: string, value: string, index = 0): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.xpath(`//*[contains(text(), '${group}')]//parent::span//child::input[@value='${value}'][1]`).eq(index);
    }

    get commercialUnitsSFInputs() {return cy.get("*[name*='.squareFeet']");}

    getOtherFieldByGroup(groupName: string, unitIndex: number) {
        return cy.get(`[name='units[${unitIndex}].other${groupName.replaceAll(" ", "")}']`);
    }

    get commercialUnitSFDiscussionTextArea() {
        return cy.xpath("//*[.='Commercial Unit SF Discussion']//following-sibling::div//child::*[@data-slate-editor]");
    }
}

export default new CommercialUnitsPage();