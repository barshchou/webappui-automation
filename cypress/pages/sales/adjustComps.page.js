import BasePage from "../base/base.page";

class AdjustCompsPage extends BasePage {
    get calculationUnitsRadio() {return cy.get("[name=basisOfComparison]");}
    getElementToCheckRadio(value) {return cy.get(`[data-qa=checked] [value='${value}']`);}
    get incomeAdjustmentLevelRadio() {return cy.get("[name=incomeAdjustmentLevel]");}
    get sizeAdjustmentCells() {return cy.get("[name$=sizeAdjustment]");}
    get conditionAdjustmentCells() {return cy.get("[name$=conditionAdjustment]");}
    get otherAdjustmentsEditButton() {return cy.get("[title='Other Adjustments'] button");}
    get otherAdjustmentNameInputField() {return cy.get("[name=otherAdjustmentLabel]");}
    get otherAdjustmentNameSaveButton() {return cy.xpath("//*[@name='otherAdjustmentLabel']//following::button[1]");}
    getRowNameTitleElement(rowName) {return cy.get(`td > [title='${rowName}']`);}
    get otherAdjustmentCells() {return cy.get("[name$='adjustments.otherAdjustment']");}
    get trendedPricePerUnitCells() {return cy.xpath("//*[.='Trended Price per Unit']//following-sibling::td");}
    get adjustedPricePerUnitCells() {return cy.xpath("//*[.='Adjusted Price per Unit']//following-sibling::td");}
}

export default new AdjustCompsPage();