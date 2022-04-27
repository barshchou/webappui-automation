import BasePage from "../base/base.page";

class AdjustCompsPage extends BasePage {
    get calculationUnitsRadio() {return cy.get("[name=basisOfComparison]");}

    get incomeAdjustmentLevelRadio() {return cy.get("[name=incomeAdjustmentLevel]");}

    get sizeAdjustmentCells() {return cy.get("[name$=sizeAdjustment]");}

    get conditionAdjustmentCells() {return cy.get("[name$=conditionAdjustment]");}

    getAdjustmentEditNameButton(prevName: string) {return cy.get(`[aria-label='${prevName}'] button[aria-label=edit] svg`);}

    getAdjustmentDeleteButton(name: string) {return cy.get(`[aria-label='${name}'] button[aria-label=delete] svg`);}

    getOtherAdjustmentNameInputField(index: number) {return cy.get(`[name='otherAdjustmentLabel[${index}]']`);}

    getOtherAdjustmentNameSaveButton(index) {return cy.xpath(`//*[@name='otherAdjustmentLabel[${index}]']//following::button[1]`);}

    getOtherAdjustmentRowCells(rowNumber: number) {return cy.get(`[name*='adjustments.otherAdjustment[${rowNumber}]']`);}

    get trendedPriceCells() {return cy.xpath("//*[starts-with(., 'Trended Price')]//following-sibling::td");}

    get adjustedPriceCells() {return cy.xpath("//*[starts-with(., 'Adjusted Price')]//following-sibling::td");}

    get netPropertyAdjustmentsCells() {return cy.xpath("//td[.='Net Property Adjustments']//following-sibling::td");}

    getAllAdjustmentCellsByCompIndex(index) {return cy.get(`[name^='salesComps[${index}]']`);}

    get propertyRightsCells() {return cy.get("[name$=propertyRights]");}

    get addOtherAdjustmentButton() {return cy.get("[data-qa=otherAdjustmentLabel]");}

    get getComparisonPerUnitRadio() {return cy.xpath("//input[@value='Per Total Units']");}
}

export default new AdjustCompsPage();