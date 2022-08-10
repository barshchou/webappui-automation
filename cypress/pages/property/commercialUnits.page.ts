import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get iconExchangeComUnits() { return cy.get("[data-icon=exchange]"); }

    get iconExchangeTooltip() { return cy.get(".MuiTooltip-tooltip"); }
    
    get numberCommercialUnitsField() { 
        return cy.xpath("//*[.='No. of Commercial Units']//following::*[@inputmode][1]"); 
    }

    get iconDeleteImage() {
        return cy.get('[data-icon="trash-alt"]');
    }

    get commercialUnitHeaderSection() { return cy.get("*[data-qa='propertyCommercialUnitDescription']"); }

    get iconRotateImage() {
        return cy.get('[data-icon="retweet"]');
    }

    get commercialUnitImage() {
        return cy.get('h6 + div > [role="img"]');
    }

    get commercialUnitsTabs() { return cy.get("button[role='tab']"); }

    getRadioButtonByValueAndUnitIndex(group: string, value: string, index = 0): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.xpath(`//label[contains(text(), '${group}')]//following::input[@value='${value}'][1]`).eq(index);
    }

    get commercialUnitsSFInputs() { return cy.get("*[name*='.squareFeet']"); }

    getOtherFieldByGroup(groupName: string, unitIndex: number) {
        return cy.get(`[name='units[${unitIndex}].other${groupName.replaceAll(" ", "")}']`);
    }

    get commercialGrossLeasableAreaTextArea() {
        return cy.get(`input[name="commercialSquareFootage"]`);
    }

    get commercialUnitSFDiscussionTextArea() {
        return cy.xpath("//*[.='Commercial Unit SF Discussion']//parent::div//following-sibling" + 
        "::div//child::*[@data-slate-editor]");
    }

    commercialUnitSFDiscussionText(text: string) {
        return cy.xpath(`//span[@data-slate-string="true"][contains(text(), "${text}")]`);
    } 

    getGradeCheckbox(value: string, index = 0) {
        return cy.xpath(`//*[text()='Grade']/..//descendant::input[@value='${value}']`).eq(index);
    }

    get commercialGrossLeasableAreaTooltip() { 
        return cy.xpath(`//label[text() = "Commercial Gross Leasable Area"]/span[1]`); 
    }

    get commercialUnitSfDiscussionTooltip() { 
        return cy.xpath(`//h6[.= "Commercial Unit SF Discussion"]//following-sibling::*[@data-icon="info-circle"]`); 
    }

    get commentaryText() { return cy.get("div[data-slate-editor]"); }

    get narrativeSuggestionsList() { return cy.get("[data-qa='narrative-suggestions-list'] > ul"); }

    get changesLostModalHeader() { return cy.contains("Changes will be lost"); }

    get cancelRevertButton() { return this.formYesRevertBtn.prev("button"); }

    get commercialUnitsNumberInput() { 
        return cy.xpath("//label[.='No. of Commercial Units']//following-sibling::div//input"); 
    }

    get commercialUnitsDiscussionTitle() { return cy.xpath("//h6[.='Commercial Unit SF Discussion']"); }

    commercialUnitDescriptionTitle(unitNumber = 1) { 
        return cy.xpath(`//div[.='Commercial Unit ${unitNumber} Description']`); 
    }

    commercialUnitsTab(unitNumber = 1) { 
        return cy.xpath(`//div[@role='tablist']/button[.="Commercial Unit ${unitNumber}"]`); 
    } 
}

export default new CommercialUnitsPage();
