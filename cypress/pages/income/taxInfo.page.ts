import BasePage from "../base/base.page";

class TaxInfoPage extends BasePage {
    get basisRadio() {return cy.get("[name=basis]");}

    getVerifyBasisRadioInput(value) {return cy.get(`[data-qa='basis-radio-group'] [data-qa=checked] input[value='${value}']`);}

    get landActualInput() {return cy.get("[name=landActual]");}

    get buildingActualInput() {return cy.get("[name=buildingActual]");}

    get totalTaxableAssessedValue() {return cy.get("[data-qa=totalActual-cell]");}

    get editTaxRatesButton() {return cy.get("[data-qa=edit-tax-rates_btn]");}

    get taxClassNameInput() {return cy.get("[name=taxClassName]");}

    get taxRateYearInputs() {return cy.get("[name^=taxRates][name$=effectiveDate]");}

    get taxRateValueInputs() {return cy.get("[name^=taxRates][name$=value]");}

    get saveButton() {return cy.get("[data-qa=save-btn]");}

    get taxClassDropdown() {return cy.get("#select-taxClass");}

    get taxRateDropdown() {return cy.get("#select-taxRate");}

    get taxableAssessedValue() {return cy.get("[data-qa=taxableAssessedValue-cell]");}

    get taxRateValueCell() {return cy.get("[data-qa=taxRate-value-cell]");}

    get taxLiabilityTotalCell() {return cy.get("[data-qa=taxLiability-cell]");}

    get sfOrUnitsNumberCell() {return cy.get("[data-qa=grossBuildingArea-cell]");}

    get perBasisCell() {return cy.get("[data-qa=perBasis-cell]");}

    get taxLiabilityCommentary() {return cy.get("[data-qa^='currentTaxLiabilityDiscussion.commentary']");}

    get projectedTab() {return cy.get("[data-qa=projected-tab]");}

    get projectedIncludeInExportCheckbox() {return cy.get("[data-qa^='projected.includedInExport'] input");}

    get projectedLiabilityCommentary() {return cy.get("[data-qa^='projected.projectedTaxLiabilityDiscussion.commentary']");}

    get comparablesTab() {return cy.get("[data-qa=comparables-tab]");}

    get addBlankRowButton() {return cy.get("[data-qa=add-blank-row-btn]");}

    get newTaxCompAddressInput() {return cy.get("[name='newTaxComp.address']");}

    get newTaxCompYearBuiltInput() {return cy.get("[name='newTaxComp.yearBuilt']");}

    get newTaxCompBasisInput() {return cy.get("[name='newTaxComp.basis']");}

    get newTaxCompTaxesPerBasisInput() {return cy.get("[name='newTaxComp.taxesPerBasis']");}

    get sourceOfInfoDropdown() {return cy.get("[data-qa^='newTaxComp.sourceOfInformation'] [data-qa=select-value]");}

    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}

    get newTaxCompTaxYearInput() {return cy.get("[name='newTaxComp.taxYear']");}

    get addButton() {return cy.get("[data-qa=add-btn]");}

    get taxCompsTableAddresses() {return cy.get("[name^=taxComps][name$=address]");}

    get taxCompsTableYearsBuilt() {return cy.get("[name^=taxComps][name$=yearBuilt]");}

    get taxCompsTableTaxYears() {return cy.get("[name^=taxComps][name$=taxYear]");}

    get taxCompsTableBasis() {return cy.get("[name^=taxComps][name$=basis]");}

    get taxCompsTableTaxesPerBasis() {return cy.get("[name^=taxComps][name$=taxesPerBasis]");}

    get taxCompsTableSourcesOfInfo() {return cy.get("[data-qa='sourceOfInfo-cell'] > div");}

    get taxCompsDiscussionComm() {return cy.get("[data-qa^='taxCompsDiscussion.commentary']");}

    get summaryTab() {return cy.get("[data-qa=summary-tab]");}

    get concludedLiabilityTypeRadio() {return cy.get("[name='projected.concludedLiabilityType']");}

    getVerifyConcludedTaxLiabTypeInput(value) {return cy.get(`[data-qa^=projected] [data-qa="checked"] input[value='${value}']`);}

    get concludedLiabilityPerBasisInput() {return cy.get("[name='projected.concludedLiabilityPerBasis']");}

    get appraiserOpTaxLiabilityTotal() {return cy.get(`[data-qa="Appraiser's Opinion-taxLiability-value-cell"]`);}

    get appraiserOpTaxLiabilityPerBasis() {return cy.get(`[data-qa="Appraiser's Opinion-taxLiabilityPerBasis-value-cell"]`);}

    get appraiserOpTaxLiabTaxRateValueCell() {return cy.get(`[data-qa="Appraiser's Opinion-taxRate-value-cell"]`);}

    get appraiserOpTaxAssessedValueCell() {return cy.get(`[data-qa="Appraiser's Opinion-taxableAssessedValue-value-cell"]`);}
    
    get taxSummaryDiscussionCommentary() {return cy.xpath("//*[.='Tax Calculation Discussion']//following::*[@data-slate-editor][1]");}
    
    get taxSummaryDiscussionTooltip() {return cy.get("svg[data-icon=info-circle]");}
    
    get taxSummaryDiscussionTitle() {return cy.xpath("//h6[contains(text(),'Tax Calculation Discussion')]");}
}

export default new TaxInfoPage();
