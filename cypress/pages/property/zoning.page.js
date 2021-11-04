import BasePage from "../base/base.page";

class ZoningPage extends BasePage{
    getSubjectZoneNameInputByZoneNumber(number) {return cy.get(`[name='zones[${number}].zone']`);}
    get siteAreaCell() {return cy.get("td[data-qa='siteArea-cell']");}
    get propIdentificationCommentary() {return cy.get("[data-qa*='propertyIdentificationDiscussion.commentary']");}
    get cityCell() {return cy.get("td[data-qa='city-cell']");}
    get summaryIntroductionComm() {return cy.get("[data-qa*='zoningSummaryIntroduction.commentary']");}
    get usesTab() {return cy.get("[data-qa='uses-tab']");}
    get permittedUseDropdown() {return cy.get("[data-qa='permittedUses-form-control'] button");}
    getCheckboxByQaAttr(attr) {return cy.get(`[data-qa='${attr}'] input`);}
    get propertyUseHeader() {return cy.contains("Property Use(s)");}
    get currentUseDropdown() {return cy.get("[data-qa='currentUses-form-control'] button");}
    get isConfirmingAllowableUsesRadio() {return cy.get("[name=isConformingWithAllowableUses]");}
}

export default new ZoningPage();