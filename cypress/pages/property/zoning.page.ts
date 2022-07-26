import BasePage from "../base/base.page";

class ZoningPage extends BasePage {
    getSubjectZoneNameInputByZoneNumber(number: number) { return cy.get(`[name='zones[${number}].zone']`); }

    get siteAreaCell() { return cy.get("td[data-qa='siteArea-cell']"); }

    get propIdentificationCommentary() { return cy.get("[data-qa*='propertyIdentificationDiscussion.commentary']"); }

    get cityCell() { return cy.get("td[data-qa='city-cell']"); }

    get summaryIntroductionComm() { return cy.get("[data-qa*='zoningSummaryIntroduction.commentary']"); }

    get usesTab() { return cy.get("[data-qa='uses-tab']"); }

    get permittedUseDropdown() { return cy.get("[data-qa='permittedUses-form-control'] button"); }

    getCheckboxByQaAttr(attr: string) { return cy.get(`[data-qa='${attr}'] input`); }

    get propertyUseHeader() { return cy.contains("Property Use(s)"); }

    get currentUseDropdown() { return cy.get("[data-qa='currentUses-form-control'] button"); }

    get isConfirmingAllowableUsesRadio() { return cy.get("[name=isConformingWithAllowableUses]"); }

    get conformingUseCommentary() { return cy.get("[data-qa*='conformingUseDiscussion.commentary']"); }

    get bulkTab() { return cy.get("[data-qa='bulk-tab']"); }

    getRowCancelButtonByRegulationValue(value: string) {
        return cy.xpath(`//input[@value='${value}']//ancestor::td` + 
        `//following-sibling::td[@data-qa='remove-cell']//child::button`);
    }

    get addRegulationButton() { return cy.get("[data-qa='addRegulation-btn']"); }

    get addedEmptyRegulationName() { return cy.get("[placeholder='Bulk Regulation'][value='']"); }

    getActualInputByRegulationValue(value: string) {
        return cy.xpath(`//input[@value='${value}']//ancestor::td//following-sibling::td[@data-qa='actual-cell']` +
            "//descendant::input[@placeholder]");
    }

    getRequiredInputByRegulationValue(value: string) {
        return cy.xpath(`//input[@value='${value}']//ancestor::td//following-sibling::td[@data-qa='required-cell']` +
            "//descendant::input[@placeholder]");
    }

    getStatusDropdownByRegValue(value: string) {
        return cy.xpath(`//input[@value='${value}']//ancestor::td` +
            "//following-sibling::td[@data-qa='status-cell']//descendant::*[@data-qa='select-value']");
    }

    getDropdownOptionByValue(value: string) { return cy.get(`li[role='option'][data-value='${value}']`); }

    get complyingCommentary() { return cy.get("[data-qa*='complyingBulkDiscussion.commentary']"); }

    get parkingTab() { return cy.get("[data-qa='parking-tab']"); }

    get parkingResidentialUnits() { return cy.get("[data-qa='parkingTable-residentialUnits']"); }

    get actualParkingSpaces() { return cy.get("[data-qa='parkingTable-actualParkingSpaces']"); }

    get requiredParkingInput() { return cy.get("[name='requiredParkingSpaces']"); }

    get isConformingWithParkingRequirements() { return cy.get("[name='isConformingWithParkingRequirements']"); }

    get parkingConformityCommentary() { return cy.get("[data-qa*='parkingDiscussion.commentary']"); }

    getElementToCheckRadio(value: string) { return cy.get(`[data-qa=checked] input[value='${value}']`); }
}

export default new ZoningPage();
