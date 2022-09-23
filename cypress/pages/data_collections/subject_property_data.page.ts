import BasePage from "../base/base.page";
import { BoweryReports } from "../../types/boweryReports.type";

class SubjectPropertyDataPage extends BasePage {

    get numberOfResUnitsInput() { return cy.get("[name='residentialUnitCount']"); }

    basisSquareFootAnalysis(basis: BoweryReports.BasisSquareFootAnalysis) {
        return cy.get(`[name="basisForSFAnalysis"][value="${basis}"]`);
    }

    get basisSquareFootAnalysisArea() { return cy.get('[name="basisForSFAnalysisValue"]'); }

    get numberOfCommercialUnitsInput() { return cy.get("[name=commercialUnitCount]"); }

    get grossBuildingArea() { return cy.get("[name=grossBuildingArea]"); }

    get floorsNumber() { return cy.get("[name=floors]"); }

    get currentGrossBuildingArea() { return cy.get("[name='current.grossBuildingArea']"); }

    get currentNumberOfResUnits() { return cy.get("[name='current.residentialUnitCount']"); }

    get currentFloorsNumber() { return cy.get("[name='current.floors']"); }

    get streetAddress() { return cy.get("[name=streetAddress]"); }

    get streetName() { return cy.get("[name=streetName]"); }

    get propertyIdentifierType() { return cy.get("*[name=propertyIdentifierType]"); }

    get propertyIdentifier() { return cy.get("*[name=propertyIdentifier]"); }

    get yearBuilt() { return cy.get("[name=yearBuilt]"); }

    get siteArea() { return cy.get("[name=siteArea]"); }

    get buildingNameInput() { return cy.get(`[name='buildingName']`); }

    get currentNumberOfCommercialUnitsInput() { return cy.get("*[name='current.commercialUnitCount']"); }

    resUnitsInputValidationText(text: string) {
        return cy.xpath(`//*[contains(@name, 'residentialUnitCount')]//following::*[contains(text(), '${text}')][1]`);
    }

    commercialUnitsInputValidationText(text: string) {
        return cy.xpath(`//*[contains(@name, 'commercialUnitCount')]//following::*[contains(text(), '${text}')][1]`);
    }

    get currentOwnerField() { return cy.get("[name=currentOwner]"); }

    get selectGeneralConditionButton() { return cy.get("*[data-qa*='generalCondition'] [data-qa='select-value']"); } 
    
    get selectAsStabilizedConditionButton() { 
        return cy.get("*[data-qa*=generalAsStabilizedCondition] [data-qa='select-value']");
    }

    getDropdownOptionByValue(value: string) { return cy.get(`li[role=option][data-value='${value}']`); }
    
    get buildingTypeDropdown() { return cy.get('[data-qa="buildingType-select-list"]'); }

    buildingType(type: string) { return cy.get(`[data-qa="buildingType-${type}-select-option"]`); }

    get buildingAsIsConditionDropdown() { return cy.get(`[data-qa="generalCondition.value-form-control"]`); }

    get buildingAsStabilizedConditionDropdown() { 
        return cy.get(`[data-qa="generalAsStabilizedCondition.value-form-control"]`); 
    }

    buildingConditionValue(condition: string) { return cy.get(`[data-value='${condition}']`); }

}

export default new SubjectPropertyDataPage();