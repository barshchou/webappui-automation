import BasePage from "../base/base.page";

class AdjustCompsPage extends BasePage {
    get calculationUnitsRadio() {return cy.get("[name=basisOfComparison]");}
    get incomeAdjustmentLevelRadio() {return cy.get("[name=incomeAdjustmentLevel]");}
    get sizeAdjustmentCells() {return cy.get("[name$=sizeAdjustment]");}
    get conditionAdjustmentCells() {return cy.get("[name$=conditionAdjustment]");}
    get otherAdjustmentsEditButton() {return cy.get("[title='Other Adjustments'] button");}
    get otherAdjustmentNameInputField() {return cy.get("[name=otherAdjustmentLabel]");}
    get otherAdjustmentNameSaveButton() {return cy.xpath("//*[@name='otherAdjustmentLabel']//following::button[1]");}
    getRowNameTitleElement(rowName) {return cy.get(`td > [title='${rowName}']`);}
    get otherAdjustmentCells() {return cy.get("[name*='adjustments.otherAdjustment']");}
    get trendedPriceCells() {return cy.xpath("//*[starts-with(., 'Trended Price')]//following-sibling::td");}
    get adjustedPriceCells() {return cy.xpath("//*[starts-with(., 'Adjusted Price')]//following-sibling::td");}
    get netPropertyAdjustmentsCells() {return cy.xpath("//td[.='Net Property Adjustments']//following-sibling::td");}
    getAllAdjustmentCellsByCompIndex(index) {return cy.get(`[name^='salesComps[${index}]']`);}
    get propertyRightsCells() {return cy.get("[name$=propertyRights]");}
    get addOtherAdjustmentButton() {return cy.get("[data-qa=otherAdjustmentLabel]");}
}

export default new AdjustCompsPage();