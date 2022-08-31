import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class TaxInfoPage extends BasePage {
    basisRadioButton(value: string) { return cy.get(`[data-qa='basis-radio-group'] input[value='${value}']`); }

    getVerifyBasisRadioInput(value: string) { 
        return cy.get(`[data-qa='basis-radio-group'] [data-qa=checked] input[value='${value}']`); 
    }

    get landActualInput() { return cy.xpath('//*[.="Land"]//following::div[@col-id="actual"]').first(); }

    get landTransitional() { return cy.xpath('//*[.="Land"]//following::div[@col-id="transitional"]').first(); }

    get buildingActualInput() { return cy.xpath('//*[.="Building"]//following::div[@col-id="actual"]').first(); }

    get buildingTransitionalInput() { 
        return cy.xpath('//*[.="Building"]//preceding-sibling::div[@col-id="transitional"]').first(); 
    }

    get includeTransitionalAssessedValueCheckbox() { return cy.get("[data-qa^='hasTransitionalAssessedValue'] input"); }

    get totalTaxableAssessedValue() { return cy.get("[data-qa=totalActual-cell]"); }

    get editTaxRatesButton() { return cy.get("[data-qa=edit-tax-rates_btn]"); }

    get taxClassNameInput() { return cy.get("[name=taxClassName]"); }

    get taxRateYearInputs() { return cy.get("[name^=taxRates][name$=effectiveDate]"); }

    get taxRateValueInputs() { return cy.get("[name^=taxRates][name$=value]"); }

    get saveButton() { return cy.get("[data-qa=save-btn]"); }

    get taxClassDropdown() { return cy.get("#select-taxClass"); }

    get taxRateDropdown() { return cy.get("#select-taxRate"); }

    get taxableAssessedValue() { return cy.get("[data-qa=taxableAssessedValue-cell]"); }

    get taxRateValueCell() { return cy.get("[data-qa=taxRate-value-cell]"); }

    get taxLiabilityTotalCell() { return cy.get("[data-qa=taxLiability-cell]"); }

    get sfOrUnitsNumberCell() { return cy.get("[data-qa=grossBuildingArea-cell]"); }

    get perBasisCell() { return cy.get("[data-qa=perBasis-cell]"); }

    get taxLiabilityCommentary() { return cy.get("[data-qa^='currentTaxLiabilityDiscussion.commentary']"); }

    get projectedTab() { return cy.get("[data-qa=projected-tab]"); }

    get projectedIncludeInExportCheckbox() { return cy.get("[data-qa^='projected.includedInExport'] input"); }

    projectedIncludeSectionCheckbox(sectionName: BoweryReports.ProjectedTaxesSectionsKeys) { 
        return cy.get(`[data-qa^='projected.${sectionName}.includedInExport'] input`); 
    }

    get projectedLiabilityCommentary() { 
        return cy.get("[data-qa^='projected.projectedTaxLiabilityDiscussion.commentary']"); 
    }

    get comparablesTab() { return cy.get("[data-qa=comparables-tab]"); }

    get addBlankRowButton() { return cy.get("[data-qa=add-blank-row-btn]"); }

    get newTaxCompAddressInput() { return cy.get("[name='newTaxComp.address']"); }

    get newTaxCompYearBuiltInput() { return cy.get("[name='newTaxComp.yearBuilt']"); }

    get newTaxCompBasisInput() { return cy.get("[name='newTaxComp.basis']"); }

    get newTaxCompTaxesPerBasisInput() { return cy.get("[name='newTaxComp.taxesPerBasis']"); }

    get sourceOfInfoDropdown() { return cy.get("[data-qa^='newTaxComp.sourceOfInformation'] [data-qa=select-value]"); }

    getDropdownOptionByValue(value: string) { return cy.get(`li[data-value='${value}']`); }

    get newTaxCompTaxYearInput() { return cy.get("[name='newTaxComp.taxYear']"); }

    get addButton() { return cy.get("[data-qa=add-btn]"); }

    get taxCompsTableAddresses() { return cy.get("[name^=taxComps][name$=address]"); }

    get taxCompsTableYearsBuilt() { return cy.get("[name^=taxComps][name$=yearBuilt]"); }

    get taxCompsTableTaxYears() { return cy.get("[name^=taxComps][name$=taxYear]"); }

    get taxCompsTableBasis() { return cy.get("[name^=taxComps][name$=basis]"); }

    get taxCompsTableTaxesPerBasis() { return cy.get("[name^=taxComps][name$=taxesPerBasis]"); }

    get taxCompsTableSourcesOfInfo() { return cy.get("[data-qa='sourceOfInfo-cell'] > div"); }

    get taxCompsDiscussionComm() { return cy.get("[data-qa^='taxCompsDiscussion.commentary']"); }

    get summaryTab() { return cy.get("[data-qa=summary-tab]"); }

    get concludedLiabilityTypeRadio() { return cy.get("[name='projected.concludedLiabilityType']"); }

    getVerifyConcludedTaxLiabilityTypeInput(value: string) { 
        return cy.get(`[data-qa^=projected] [data-qa="checked"] input[value='${value}']`); 
    }

    get concludedLiabilityPerBasisInput() { return cy.get("[name='projected.concludedLiabilityPerBasis']"); }

    get appraiserOpTaxLiabilityTotal() { return cy.get(`[data-qa="Appraiser's Opinion-taxLiability-value-cell"]`); }

    get appraiserOpTaxLiabilityPerBasis() { 
        return cy.get(`[data-qa="Appraiser's Opinion-taxLiabilityPerBasis-value-cell"]`); 
    }

    get appraiserOpTaxLiabilityTaxRateValueCell() { 
        return cy.get(`[data-qa="Appraiser's Opinion-taxRate-value-cell"]`); 
    }

    get appraiserOpTaxAssessedValueCell() { 
        return cy.get(`[data-qa="Appraiser's Opinion-taxableAssessedValue-value-cell"]`); 
    }
    
    get taxCalculationDiscussionCommentary() { 
        return cy.xpath("//*[.='Tax Calculation Discussion']//following::*[@data-slate-editor][1]"); 
    }
    
    get taxCalculationDiscussionTooltip() { 
        return cy.xpath("//*[.='Tax Calculation Discussion']//following::*[contains(text(), 'The following')]"); 
    }
    
    get taxCalculationDiscussionTitle() { return cy.xpath("//h6[contains(text(),'Tax Calculation Discussion')]"); }

    get taxSummaryDiscussion() {
        return cy.get("[data-qa^='taxSummaryDiscussion.commentary'],[name='taxSummaryDiscussion.commentary']");
    }

    getTaxLiabilityRowValue(name: string) {
        return cy.xpath(`//*[@role='presentation']//*[contains(text(), '${name}')]/following-sibling::*[1]`);
    }

    getTaxLiabilityRowItem(name: string) { 
        return cy.xpath(`//*[@role='presentation']//*[contains(text(), '${name}')]`);
    }

    getTaxLiabilityRowAction(name: string) {
        return cy.xpath(`//*[@role='presentation']//*[contains(text(), '${name}')]/following-sibling::*[2]`);
    }

    getSummaryRowValue(name: string, rowNumber = 0) { 
        return cy.get(`[data-qa='Current-${name}-value-cell']`).eq(rowNumber); 
    }

    get addAdditionalTaxRate() {
        return cy.xpath("//button/span[contains(text(), 'Add Additional Tax Rate')]");
    }

    get addSpecialAssessment() {
        return cy.xpath("//button/span[contains(text(), 'Add Special Assessment')]");
    }

    get taxableAssessedValueProvidedInput() {
        return cy.xpath(`//*[@row-id='taxableAssessedValueId']/div[@col-id='value']`);
    }

    taxLiabilityTotalOnProjectedTab(sectionName: BoweryReports.ProjectedTaxesSectionsValues) {
        return cy.xpath(`//div[h6[.='${sectionName}']]//div[@row-id='taxLiabilityTotal']/div[@col-id='value']`);
    }

    taxLiabilityTotalPerSfOnProjectedTab(sectionName: BoweryReports.ProjectedTaxesSectionsValues) {
        return cy.xpath(`//div[h6[.='${sectionName}']]//div[@row-id='taxesPerBasis']/div[@col-id='value']`);
    }

    projectedTaxesIncludedInputs(inputName: BoweryReports.ProjectedTaxesInputsNamesValues) {
        return cy.xpath(`//*[@row-id='${inputName}']/div[@col-id='value']`);
    }

    taxLiabilityTotalOnSummaryTab(sectionName: BoweryReports.ProjectedTaxesSectionsValues) {
        return cy.get(`[data-qa^='${sectionName}'][data-qa$='-taxLiability-value-cell']`);
    }

    taxLiabilityTotalPerSfOnSummaryTab(sectionName: BoweryReports.ProjectedTaxesSectionsValues) {
        return cy.get(`[data-qa^='${sectionName}'][data-qa$='-taxLiabilityPerBasis-value-cell']`);
    }
}

export default new TaxInfoPage();
