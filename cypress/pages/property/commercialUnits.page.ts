import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get iconExchangeComUnits() {return cy.get("[data-icon=exchange]");}

    get iconExchangeTooltip() {return cy.get(".MuiTooltip-tooltip");}
    
    get numberCommercialUnitsField() {return cy.xpath("//*[.='No. of Commercial Units']//following::*[@inputmode][1]");}

    get iconDeleteImage(){
        return cy.get('[data-icon="trash-alt"]');
    }

    get commercialUnitHeaderSection() {return cy.get("*[data-qa='propertyCommercialUnitDescription']");}

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

    commercialUnitSFDiscussionText(text: string) {
        return cy.xpath(`//span[@data-slate-string="true"][contains(text(), "${text}")]`);
    } 

    getGradeCheckbox(value: string, index = 0) {
        return cy.xpath(`//*[text()='Grade']/..//descendant::input[@value='${value}']`).eq(index);
    }

    get commercialGrossLeasableAreaToolip() { return cy.xpath(`//label[text() = "Commercial Gross Leasable Area"]/span[1]`);}
}

export default new CommercialUnitsPage();