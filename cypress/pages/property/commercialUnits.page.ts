import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class CommercialUnitsPage extends BasePage {
    get iconExchangeComUnits() { return cy.get("[data-icon=exchange]"); }

    get iconExchangeTooltip() { return cy.get(".MuiTooltip-tooltip"); }
    
    get numberCommercialUnitsField() { 
        return cy.xpath("//*[.='No. of Commercial Units']//following::input[1]");
    }

    getIconDeleteImage(category: BoweryReports.ImageType, index = 0) {
        return cy.get(`[data-qa="${category}-image-delete-${index}"]`);
    }

    get commercialUnitHeaderSection() { return cy.get("*[data-qa='propertyCommercialUnitDescription']"); }

    getIconRotateImage(category: BoweryReports.ImageType, index = 0) {
        return cy.get(`[data-qa="${category}-image-rotate-${index}"]`);
    }

    getCommercialUnitImage(category: BoweryReports.ImageType, index = 0) {
        return cy.xpath(`//*[@data-qa="${category}-image-preview-${index}"]//ancestor::*[@role="img"]`);
    }

    get commercialUnitsTabs() { return cy.get("button[role='tab']"); }

    getRadioButtonByValueAndUnitIndex(group: string, value: string): Cypress.Chainable<JQuery<HTMLElement>> {
        return cy.xpath(`//label[contains(text(), '${group}')]//following::input[@value='${value}'][1]`);
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
        return cy.get('[data-testid="InfoOutlinedIcon"]'); 
    }

    get commercialUnitSfDiscussionTipText() { 
        return cy.xpath(`//h6[.= "Commercial Unit SF Discussion"]//..//following-sibling::span`); 
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

    getImageCategoryImageUpload(category: BoweryReports.ImageType) {
        return cy.get(`[data-qa=${category}-image-upload]`).find('input[type="file"]');
    }
}

export default new CommercialUnitsPage();
