import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get iconExchangeComUnits() {return cy.get("[data-icon=exchange]");}

    get iconExchangeTooltip() {return cy.get(".MuiTooltip-tooltip");}

    get iconDeleteImage(){
        return cy.get('[data-icon="trash-alt"]');
    }

    get iconRotateImage(){
        return cy.get('[data-icon="retweet"]');
    }

    get commercialUnitImage() {
        return cy.get('h6 + div > [role="img"]');
    }

    get commercialUnitsTabs() {return cy.get("button[role='tab']");}

    getRadioButtonByValueAndUnitIndex(group: string, value: string, index = 0): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.xpath(`//*[contains(text(), '${group}')]//parent::span//child::input[@value='${value}'][1]`).eq(index);
    }

    get commercialUnitsSFInputs() {return cy.get("*[name*='.squareFeet']");}

    getOtherFieldByGroup(groupName: string, unitIndex: number) {
        return cy.get(`[name='units[${unitIndex}].other${groupName.replaceAll(" ", "")}']`);
    }

    get commercialGrossLeasableAreaTextArea() {
        return cy.get(`input[name="commercialSquareFootage"]`);
    }

    get commercialUnitSFDiscussionTextArea() {
        return cy.xpath("//*[.='Commercial Unit SF Discussion']//following-sibling::div//child::*[@data-slate-editor]");
    }

    getGradeCheckbox(value: string, index = 0) {
        return cy.xpath(`//*[text()='Grade']/..//descendant::input[@value='${value}']`).eq(index);
    }
}

export default new CommercialUnitsPage();