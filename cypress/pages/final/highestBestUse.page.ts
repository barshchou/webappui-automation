import BasePage from "../base/base.page";

class HighestBestUsePage extends BasePage {

    get zonesCells() { return cy.get("[data-qa=zones]"); }

    get allowableUsesCells() { return cy.get("[data-qa=allowable-uses]"); }

    get siteAreaCells() { return cy.get("[data-qa=site-area]"); }

    get zoningFloorAreaCells() { return cy.get("[data-qa=zoning-floor-area]"); }

    get physicallyTab() { return cy.get("[data-qa=physically-tab]"); }

    get propertyFrontage() { return cy.get("[data-qa=property-frontage]"); }

    get propertyCondition() { return cy.get("[data-qa=property-condition]"); }

    get complyingBulk() { return cy.get("[data-qa=complying-bulk]"); }

    get conformingUse() { return cy.get("[data-qa=conforming-use]"); }

    get unitType() { return cy.get("[data-qa=unit-group-name]"); }

    get unitsNumber() { return cy.get("[data-qa=unit-count]"); }

    get sizeWithinRangeCheckbox() { return cy.get("[data-qa^=sizeWithinRange] input"); }

    get utilitiesAvailableCheckbox() { return cy.get("[data-qa^=necessaryUtilitiesAvailable] input"); }

    get financiallyTab() { return cy.get("[data-qa=financially-tab]"); }

    get subjectMarketRadio() { return cy.get("[name=subjectMarketCharacteristics]"); }

    getSubjectMarketElementToCheckRadio(value: string) {
        return cy.get(`[data-qa^=subjectMarketCharacteristics] [data-qa=checked] input[value=${value}]`);
    }

    get asVacantBestUsePropTypeRadio() { return cy.get("[name=asVacantBestUsePropertyType]"); }

    getAsVacantBestUseElToCheckRadio(value: string) {
        return cy.get(`[data-qa^=asVacantBestUsePropertyType] [data-qa=checked] input[value=${value}]`);
    }

    get asVacantFeasiblePropTypesDropdown() { return cy.get("[data-qa^=asVacantFeasiblePropertyTypes] button"); }

    getDropdownOptionByQaAttr(attribute: string) { return cy.get(`[data-qa=${attribute}] input`); }

    get financiallyFeasibleHeader() { return cy.xpath("//*[.='Financially Feasible']"); }

    get newConstructionFeasibleCheckbox() { return cy.get("[data-qa^=newConstructionFeasible] input"); }

    get newConstructionFeasibleChecked() { return cy.get("[data-qa=newConstructionFeasible-checked]"); }

    get asImprovedBestUsePropTypeRadio() { return cy.get("[name=asImprovedBestUsePropertyType]"); }

    getAsImprovedBestUseElToCheckRadio(value: string) {
        return cy.get(`[data-qa^=asImprovedBestUsePropertyType] [data-qa=checked] input[value=${value}]`);
    }

    get asImprovedFeasiblePropTypesDropdown() { return cy.get("[data-qa^=asImprovedFeasiblePropertyTypes] button"); }

    get highestUseTab() { return cy.get("[data-qa=highestUse-tab]"); }

    get asVacantBestUseType() { return cy.get("[data-qa=as-vacant-best-use-type]"); }

    get asVacantFeasiblePropTypes() { return cy.get("[data-qa=as-vacant-feasible-property-types]"); }

    get asImprovedBestUseType() { return cy.get("[data-qa=as-improved-best-use-type]"); }

    get asImprovedFeasiblePropTypes() { return cy.get("[data-qa=as-improved-feasible-property-types]"); }

    get probableBuyerTab() { return cy.get("[data-qa=probableBuyer-tab]"); }

    get localCheckbox() { return cy.get("[data-qa^=local-checkbox] input"); }

    get regionalCheckbox() { return cy.get("[data-qa^=regional-checkbox] input"); }
}

export default new HighestBestUsePage();