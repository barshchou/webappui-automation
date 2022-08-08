import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

type AdjustmentName = BoweryReports.SalesAdjustmentGrid.AdjustmentName;
type RowsMarketAdjustment = BoweryReports.SalesAdjustmentGrid.RowsMarketAdjustment;
type CumulativePrice = BoweryReports.SalesAdjustmentGrid.CumulativePrice

class AdjustCompsPage extends BasePage {
    get calculationUnitsRadio() { return cy.get("[name=basisOfComparison]"); }

    get incomeAdjustmentLevelRadio() { return cy.get("[name=incomeAdjustmentLevel]"); }

    get sizeAdjustmentCells() { return cy.get("[name$=sizeAdjustment]"); }

    get conditionAdjustmentCells() { return cy.get("[name$=conditionAdjustment]"); }

    getAdjustmentEditNameButton(prevName: string) { 
        return cy.get(`[aria-label='${prevName}'] button[aria-label=edit] svg`); 
    }

    getAdjustmentDeleteButton(name: string) { return cy.get(`[aria-label='${name}'] button[aria-label=delete] svg`); }

    getOtherAdjustmentNameInputField(index: number) { return cy.get(`[name='otherAdjustmentLabel[${index}]']`); }

    getOtherUtilitiesAdjustmentNameInputField(index: number) { 
        return cy.get(`[name='utilityAdjustmentLabel[${index}]']`); 
    }

    getOtherAdjustmentNameSaveButton(index: number) { 
        return cy.xpath(`//*[@name='otherAdjustmentLabel[${index}]']//following::button[1]`); 
    }

    getOtherUtilitiesAdjustmentNameSaveButton(index: number) { 
        return cy.xpath(`//*[@name='utilityAdjustmentLabel[${index}]']//following::button[1]`); 
    }

    getOtherAdjustmentRowCells(rowNumber: number) { 
        return cy.get(`[name*='adjustments.otherAdjustment[${rowNumber}]']`); 
    }

    getOtherUtilitiesAdjustmentRowCells(rowNumber: number) { 
        return cy.get(`[name*='utilityAdjustment.otherAdjustment[${rowNumber}]']`); 
    }

    getUtilitiesAdjustmentsRowCells(utilityName: string) { 
        return cy.get(`[name*='utilityAdjustment.${utilityName}']`); 
    }

    getMarketAdjustmentsRowCells(marketAdjName: string) { 
        return cy.get(`[name*='adjustments.${marketAdjName}']`); 
    }

    getLocationAdjustmentsRowCells(locationAdjName: string) { 
        return cy.get(`[name*='locationAdjustment.${locationAdjName}']`); 
    }

    get trendedPriceCells() { 
        return cy.xpath("//*[starts-with(., 'Trended Price')]//following-sibling::td"); 
    }
    
    get cumulativePriceCells() { 
        return cy.xpath("//*[starts-with(., 'Cumulative Price')]//following-sibling::td"); 
    }
    
    get cellCumulativePriceValue() { 
        return cy.xpath("//*[starts-with(., 'Cumulative Price')]//following-sibling::td"); 
    }

    cellCumulativePriceName(basisName: CumulativePrice) {
        return cy.contains(`Cumulative Price Per ${basisName}`);
    }
    
    get adjustedPriceCells() { 
        return cy.xpath("//*[starts-with(., 'Adjusted Price')]//following-sibling::td"); 
    }

    get netPropertyAdjustmentsCells() { 
        return cy.xpath("//td[.='Net Property Adjustments']//following-sibling::td"); 
    }

    get marketAdjustmentsCells() { 
        return cy.xpath("//td[.='Net Market Adjustments']//following-sibling::td"); 
    }

    get totalLocationAdjustmentsCells() { 
        return cy.xpath("//td[.=' Total Location Adjustments']//following-sibling::td"); 
    }

    get totalUtilityAdjustmentsCells() { 
        return cy.xpath("//td[.='Total Utility Adjustments']//following-sibling::td"); 
    }

    getAllAdjustmentCellsByCompIndex(index: number) { return cy.get(`[name^='salesComps[${index}]']`); }

    getAllLocationAdjustmentCellsByCompIndex(index: number) { 
        return cy.get(`[name^='salesComps[${index}].adjustments.locationAdjustment']`); 
    }

    getAllUtilitiesAdjustmentCellsByCompIndex(index: number) { 
        return cy.get(`[name^='salesComps[${index}].adjustments.utilityAdjustment']`); 
    }

    get propertyRightsCells() { return cy.get("[name$=propertyRights]"); }

    get addOtherAdjustmentButton() { return cy.get("[data-qa=otherAdjustmentLabel]"); }

    get getComparisonPerUnitRadio() { return cy.xpath("//input[@value='Per Total Units']"); }

    get addCustomUtilitiesAdjustmentButton() { return cy.get("[data-qa=utilityAdjustmentLabel]"); }

    get pricePerUnit() { return cy.xpath("//*[starts-with(., 'Price per Unit')]//following-sibling::td"); }

    getPricePerBasisValue(basisName: string) { 
        return cy.xpath(`//*[starts-with(., '${basisName}')]//following-sibling::td`); 
    }

    get viewMarketDetails() { return cy.xpath("//div[text() = 'Market Adjustment']"); }

    get viewAdjustmentDetails() { 
        return cy.xpath("//*[contains(text(), 'Other Adjustment')]//following::*[@role='presentation'][1]"); 
    }

    get discussionsShowAllButton() { return cy.xpath("//*[@type='button']/*[contains(text(), 'Show All')]"); }

    get conditionDiscussionCommentary() { return cy.get("[data-qa='conditionDiscussion.commentary-generated-text']"); }

    get marketConditionAdjustmentTooltip() { return cy.get("svg[data-icon=info-circle]"); }

    get applyMarketConditionAdjustmentButton() { return cy.get("[data-qa='apply-market-condition-adjustment']"); }

    get marketConditionAdjustmentInput() { return cy.get("[name='marketConditionAdjustment']"); }

    getOtherAdjustmentColumnValue(value: string, index = 1) { 
        return cy.xpath(`//*[contains(text(), 'Other Adjustment')]` + 
        `//following::*[contains(text(), '${value}')][${index}]`); 
    }
    
    getAdjustmentArrow(adjustmentName: AdjustmentName) {
        return cy.get(`[data-qa="expansion-row-${adjustmentName}"] [aria-label="Show more"]`);
    }

    getAdjustmentRow(adjustmentName: AdjustmentName, rowName: RowsMarketAdjustment) {
        return cy.get(`[data-qa="expansion-row-${adjustmentName}"] [data-qa="${rowName}"] a`);
    }

    /**
     * ernst: this selector probably should move to comp-plex page objects
     * or in base page (since its a shared page element)
     * move it later
     */
    get modalSalesCompInfo() {
        return cy.get('[id="salesApproach.salesAdjustmentGrid-final-form"]');
    }

    getExpandMarketAdjustmentSubjectRow(name: string, index = 2) {
        return cy.xpath(`//*[@data-qa='expansion-row-market-adjustment']` + 
        `//*[contains(text(), '${name}')]//following::*[${index}]`);
    }

    get cellCompHeader() {
        return cy.get('[data-qa="sales-adjustment-grid-header-row"] [data-qa="comp-header-cell"]', { timeout: 60000 });
    }
}

export default new AdjustCompsPage();
