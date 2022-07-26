import { PropertySquareFootAnalysisKeys } from './../../enums/enumKeys.enum.d';
import taxInfoPage from "../../pages/income/taxInfo.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas, 
    getNumberWithDecimalPart, getNumberFromPercentNumberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

class TaxInfoActions extends BaseActionsExt<typeof taxInfoPage> {

    checkBasisByValue(value: string): this {
        taxInfoPage.basisRadio.check(value);
        taxInfoPage.getVerifyBasisRadioInput(value).should("exist");
        return this;
    }

    enterTaxableAssessedLandValue(value: number): this {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.landActualInput.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    enterTransitionalLandValue(value: number | string): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.landTransitional.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    enterTaxableAssessedBuildingValue(value: number): this {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.buildingActualInput.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    enterTransitionalBuildingValue(value: string | number): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.buildingTransitionalInput.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    switchIncludeTransitionalCheckbox(value = false): TaxInfoActions {
        taxInfoPage.includeTransitionalAssessedValueCheckbox
            .invoke('attr', 'value').then(attr => {
            cy.log(`${attr}`);
            if (attr == `${!value}`){
                taxInfoPage.includeTransitionalAssessedValueCheckbox.click().should('have.value', `${value}`);
            }
        });
        return this;
    }

    verifyTotalAssessedValue(currentTaxInfoData: BoweryReports.CurrentTaxInfoData): this {
        const textToBe = `$${numberWithCommas(currentTaxInfoData.landValue + currentTaxInfoData.buildingValue)}`;
        taxInfoPage.totalTaxableAssessedValue.should("have.text", textToBe);
        return this;
    }

    fillTaxableAssessedValues(currentTaxInfoData: BoweryReports.CurrentTaxInfoData): this {
        this.enterTaxableAssessedLandValue(currentTaxInfoData.landValue)
            .enterTaxableAssessedBuildingValue(currentTaxInfoData.buildingValue)
            .verifyTotalAssessedValue(currentTaxInfoData);
        return this;
    }

    clickEditTaxRatesButton(): this {
        taxInfoPage.editTaxRatesButton.click();
        return this;
    }

    enterTaxClassName(name: string): this {
        taxInfoPage.taxClassNameInput.clear().type(name).should("have.value", name);
        return this;
    }

    enterTaxRateYearByIndex(value: number, index = 0): this {
        taxInfoPage.taxRateYearInputs.eq(index).clear().type(`${value}`).clear().type(`${value}`)
            .should("have.value", value);
        return this;
    }

    enterTaxRateValueByIndex(value: number, index = 0): this {
        taxInfoPage.taxRateValueInputs.eq(index).clear().type(`${value}`).should("have.value", `${value}%`);
        return this;
    }

    clickSaveChangesButton(): this {
        taxInfoPage.saveButton.click();
        return this;
    }

    editTaxRatesWithoutAddingNew(currentTaxInfoData: BoweryReports.CurrentTaxInfoData): this {
        this.clickEditTaxRatesButton()
            .enterTaxClassName(currentTaxInfoData.className)
            .enterTaxRateYearByIndex(currentTaxInfoData.rateYear)
            .enterTaxRateValueByIndex(currentTaxInfoData.rateValue)
            .clickSaveChangesButton();
        return this;
    }

    verifyTaxClassDropdownText(textToBe: string): this {
        taxInfoPage.taxClassDropdown.should("contain.text", textToBe);
        return this;
    }

    verifyTaxRateDropdownText(textToBe: number): this {
        taxInfoPage.taxRateDropdown.should("have.text", textToBe);
        return this;
    }

    verifyTaxLiabilityInfo(currentTaxInfoData: BoweryReports.CurrentTaxInfoData): this {
        this.verifyTaxClassDropdownText(currentTaxInfoData.className)
            .verifyTaxRateDropdownText(currentTaxInfoData.rateYear);
        return this;
    }

    verifyTaxableAssessedValue(): this {
        taxInfoPage.totalTaxableAssessedValue.invoke("text").then(totalAssessedText => {
            const totalAssessedNumber = getNumberFromDollarNumberWithCommas(totalAssessedText);
            const textToBe = `$${numberWithCommas(totalAssessedNumber.toFixed(2))}`;
            taxInfoPage.taxableAssessedValue.should("have.text", textToBe);
        });
        return this;
    }

    verifyTaxRateValueCell(rateToBe: number): this {
        taxInfoPage.taxRateValueCell.should("have.text", `${rateToBe}%`);
        return this;
    }

    verifyTaxLiabilityTotalCell(taxRate: number): this {
        taxInfoPage.taxableAssessedValue.invoke("text").then(taxableAssessedText => {
            const taxableAssessedNumber = getNumberFromDollarNumberWithCommas(taxableAssessedText);
            const textToBe = `$${numberWithCommas((taxableAssessedNumber / 100 * taxRate).toFixed(2))}`;
            taxInfoPage.taxLiabilityTotalCell.should("have.text", textToBe);
        });
        return this;
    }

    verifySFOrUnitsNumberCell(textToBe: number): this {
        taxInfoPage.sfOrUnitsNumberCell.should("have.text", textToBe);
        return this;
    }

    verifyPerBasisCell(): this {
        taxInfoPage.taxLiabilityTotalCell.invoke("text").then(taxLiabilityText => {
            const taxLiabilityNumber = getNumberFromDollarNumberWithCommas(taxLiabilityText);
            taxInfoPage.sfOrUnitsNumberCell.invoke("text").then(basisText => {
                const basisNumber = getNumberFromDollarNumberWithCommas(basisText);
                const textToBe = `$${numberWithCommas((taxLiabilityNumber / basisNumber).toFixed(2))}`;
                taxInfoPage.perBasisCell.should("have.text", textToBe);
            });
        });
        return this;
    }

    verifyTaxLiabilityTable(taxRate: number, sfOrUnitsNumber: number): this {
        this.verifyTaxableAssessedValue()
            .verifyTaxRateValueCell(taxRate)
            .verifyTaxLiabilityTotalCell(taxRate)
            .verifySFOrUnitsNumberCell(sfOrUnitsNumber)
            .verifyPerBasisCell();
        return this;
    }

    verifyTaxLiabilityCommentary(commToBe: string): this {
        taxInfoPage.taxLiabilityCommentary.should("have.text", commToBe);
        return this;
    }

    clickProjectedTab(): this {
        taxInfoPage.projectedTab.click();
        return this;
    }

    checkProjectedIncludeCheckbox(): this {
        taxInfoPage.projectedIncludeInExportCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyProjectedLiabilityCommentary(commToBe: string): this {
        taxInfoPage.projectedLiabilityCommentary.should("have.text", commToBe);
        return this;
    }

    clickComparablesTab(): this {
        taxInfoPage.comparablesTab.click();
        return this;
    }

    clickAddBlankRowButton(): this {
        taxInfoPage.addBlankRowButton.click();
        return this;
    }

    enterNewTaxCompAddress(address: string): this {
        taxInfoPage.newTaxCompAddressInput.type(address).should("have.value", address);
        return this;
    }

    enterNewTaxCompYearBuilt(year: number): this {
        taxInfoPage.newTaxCompYearBuiltInput.type(`${year}`).should("have.value", year);
        return this;
    }

    enterNewTaxCompBasis(basisValue: number): this {
        taxInfoPage.newTaxCompBasisInput.type(`${basisValue}`).should("have.value", basisValue);
        return this;
    }

    enterTaxesPerBasis(taxesPerBasis: number) {
        taxInfoPage.newTaxCompTaxesPerBasisInput.type(`${taxesPerBasis}`).should("have.value", `$${taxesPerBasis}`);
        return this;
    }

    enterTaxYear(year: number): this {
        taxInfoPage.newTaxCompTaxYearInput.type(`${year}`).should("have.value", year);
        return this;
    }

    selectSourceOfInfo(sourceValue: string): this {
        taxInfoPage.sourceOfInfoDropdown.click();
        taxInfoPage.getDropdownOptionByValue(sourceValue).click();
        return this;
    }

    clickAddButton(): this {
        taxInfoPage.addButton.click();
        return this;
    }

    addTaxComparableWithoutSourceInfoData(taxCompData: BoweryReports.TaxCompData): this {
        this.clickAddBlankRowButton()
            .enterNewTaxCompAddress(taxCompData.address)
            .enterNewTaxCompYearBuilt(taxCompData.yearBuilt)
            .enterNewTaxCompBasis(taxCompData.basis)
            .enterTaxesPerBasis(taxCompData.taxPerBasis)
            .selectSourceOfInfo(taxCompData.sourceOfInfo)
            .enterTaxYear(taxCompData.taxYear)
            .clickAddButton();
        return this;
    }

    addListTaxComparablesWithoutSourceInfoData(taxCompDatas: BoweryReports.TaxCompData[]): this {
        taxCompDatas.forEach(data => {
            this.addTaxComparableWithoutSourceInfoData(data);
        });
        return this;
    }

    verifyAddedComparableByRowNumber(taxCompData: BoweryReports.TaxCompData, rowNumber: number): this {
        taxInfoPage.taxCompsTableAddresses.eq(rowNumber).should("have.text", taxCompData.address);
        taxInfoPage.taxCompsTableYearsBuilt.eq(rowNumber).should("have.value", taxCompData.yearBuilt);
        taxInfoPage.taxCompsTableTaxYears.eq(rowNumber).should("have.value", taxCompData.taxYear);
        taxInfoPage.taxCompsTableBasis.eq(rowNumber).should("have.value", taxCompData.basis);
        taxInfoPage.taxCompsTableTaxesPerBasis.eq(rowNumber).should("have.value", `$${taxCompData.taxPerBasis}`);
        const sourceInfoText = TaxInfoActions.getSourceOfInfoTextByValue(taxCompData.sourceOfInfo);
        taxInfoPage.taxCompsTableSourcesOfInfo.eq(rowNumber).should("contain.text", sourceInfoText);
        return this;
    }

    private static getSourceOfInfoTextByValue(value: string): string {
        switch (value) {
            case "externalDatabase":
                return "External Database";
            case "bowerySubject":
                return "Bowery Subject";
            case "other":
                return "Other";
        }
    }

    verifyListAddedComparables(taxCompDatas: BoweryReports.TaxCompData[]): this {
        let rowIndex = taxCompDatas.length - 1;
        for (let i = 0; i < taxCompDatas.length; i++) {
            this.verifyAddedComparableByRowNumber(taxCompDatas[i], rowIndex);
            rowIndex--;
        }
        return this;
    }

    clickAddNewRowButton(name = "Add Additional Tax Rate"): TaxInfoActions {
        taxInfoPage.getAddNewRowButton(name).click();
        return this;
    } 

    verifyTaxCompsCommentary(commToBe: string): this {
        taxInfoPage.taxCompsDiscussionComm.should("have.text", commToBe);
        return this;
    }

    clickSummaryTab(): this {
        taxInfoPage.summaryTab.click();
        return this;
    }

    checkConcludedLiabilityTypeByValue(value: string): this {
        taxInfoPage.concludedLiabilityTypeRadio.check(value);
        taxInfoPage.getVerifyConcludedTaxLiabTypeInput(value).should("exist");
        return this;
    }

    enterConcludedLiabilityPerBasis(value: number): this {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.concludedLiabilityPerBasisInput.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    verifyAppraiserOpinionLiabilityTotal(concludedLiability: number, numberOfUnits: number): this {
        const textToBe = `$${numberWithCommas(concludedLiability * numberOfUnits)}`;
        taxInfoPage.appraiserOpTaxLiabilityTotal.should("have.text", textToBe);
        return this;
    }

    verifyAppraiserOpinionTaxLiabilityPerBasis(taxLiability: number): this {
        const textToBe = `$${numberWithCommas(taxLiability)}`;
        taxInfoPage.appraiserOpTaxLiabilityPerBasis.should("have.text", textToBe);
        return this;
    }

    verifyAppraiserOpinionTaxRateCell(taxRate: number): this {
        taxInfoPage.appraiserOpTaxLiabTaxRateValueCell.should("have.text", `${taxRate}%`);
        return this;
    }

    verifyAppraiserOpinionTaxableAssessedValueCell(taxRate: number): this {
        taxInfoPage.appraiserOpTaxLiabilityTotal.invoke("text").then(liabilityTotalText => {
            const liabilityTotalNumber = getNumberFromDollarNumberWithCommas(liabilityTotalText);
            const textToBe = `$${numberWithCommas((liabilityTotalNumber * 100 / taxRate).toFixed(2))}`;
            taxInfoPage.appraiserOpTaxAssessedValueCell.should("have.text", textToBe);
        });
        return this;
    }

    verifyTaxCalculationCommentary(commToBe: string): this {
        taxInfoPage.taxCalculationDiscussionCommentary.should("exist").should("have.text", commToBe);
        return this;
    }

    verifyTaxCalculationTooltip(tooltipToBe: string): this {
        taxInfoPage.taxCalculationDiscussionTooltip.should("exist").should("have.attr", "aria-label", tooltipToBe);
        return this;
    }

    verifyTaxCalculationDiscussionTitle(titleToBe: string): this {
        taxInfoPage.taxCalculationDiscussionTitle.should("exist").should("have.text", titleToBe);
        return this;
    }

    verifyTaxSummaryDiscussion(textToBe: string): this {
        taxInfoPage.taxSummaryDiscussion.should("have.text", textToBe);
        return this;
    }

    verifyRowTaxLiability(name: string, rowNumber = 0): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowValue(name).eq(rowNumber).should("exist");
        return this;
    }
    
    enterRowTaxLiabilityItem(rowName: string, enterName: string, rowNumber = 0): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowItem(rowName).eq(rowNumber)
            .realClick()
            .realClick()
            .type(`${enterName}{enter}`)
            .should("have.text", enterName);
        return this;
    }

    /**
     * Enters values for the selected row. Depending on the name of the row, the rounding of values changes
     * @param rowName The name of the row you want to change
     * @param value Enter value 
     * @param rowNumber Row number. Need if there is row with similar name 
     * @returns `this`
     */
    enterRowTaxLiabilityValue(rowName: string, value: number, rowNumber = 0): TaxInfoActions {
        const initial =  taxInfoPage.getTaxLiabilityRowValue(rowName).eq(rowNumber).realClick().realClick().type(`${value}{enter}`);
        if (rowName === "Additional Tax Rate") {
            initial.should("have.text", `${getNumberWithDecimalPart(value, 9)}%`);
        } else {
            initial.should("have.text", `$${numberWithCommas(value.toFixed(2))}`);
        }
        return this;
    }

    deleteRowTaxLiability(rowName: string, rowNumber = 0): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowAction(rowName).eq(rowNumber).click().should("not.exist");
        return this;
    }

    /**
     * Get all "Tax Rate" and "Assessment Row" values and verify "Tax Liability (Total)" using this formula:
     * sum of all tax rates * sum of all assessments = tax liability (total)
     * @returns `this`
     */
    verifyTotalTaxLiability(): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowValue("Tax Rate").then($el => {
            const itemCount = $el.length;
            const taxRates = [];
            for (let i = 0; itemCount > i; i++) {
                taxInfoPage.getTaxLiabilityRowValue("Tax Rate").eq(i).invoke("text").then(taxRateText => {
                    let taxRateNumber = getNumberFromPercentNumberWithCommas(taxRateText);
                    taxRates.push(taxRateNumber);
                });
            }
            cy.wrap(taxRates).then(taxRates => {
                const sumTaxRates = taxRates.reduce((a, b) => a + b);
                const taxRatesPercent = sumTaxRates * 0.01;
                taxInfoPage.getTaxLiabilityRowValue("Assessment Row").then($el => {
                    const itemCount = $el.length;
                    const assessments = [];
                    for (let i = 0; itemCount > i; i++) {
                        taxInfoPage.getTaxLiabilityRowValue("Assessment Row").eq(i).invoke("text").then(assessmentText => {
                            let assessmentNumber = getNumberFromDollarNumberWithCommas(assessmentText);
                            assessments.push(assessmentNumber);
                        });
                    }
                    cy.wrap(assessments).then(assessments => {
                        const sumAssessments = assessments.reduce((a, b) => a + b);
                        taxInfoPage.getTaxLiabilityRowValue("Taxable Assessed Value").invoke("text").then(taxAssessedText => {
                            const allTaxAssessedNumber = sumAssessments + getNumberFromDollarNumberWithCommas(taxAssessedText);
                            const taxLiabilityTotalToBe = `$${numberWithCommas((allTaxAssessedNumber * taxRatesPercent).toFixed(2))}`;
                            taxInfoPage.getTaxLiabilityRowValue("Tax Liability (Total)").should("have.text", taxLiabilityTotalToBe);
                        });
                    });
                });
            });
        });
       
        return this;
    }

    verifyTaxLiabilityItemAndValue(item: string, value: string): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowItem(item).should("exist");
        taxInfoPage.getTaxLiabilityRowItem(value).should("have.text", value);
        return this;
    }

    verifyPSFTaxLiability(item: PropertySquareFootAnalysisKeys, isSummary = false): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowValue(item).invoke("text").then(PSFAnalysis => {
            const numberPSFAnalysis = getNumberFromDollarNumberWithCommas(PSFAnalysis);
            taxInfoPage.getTaxLiabilityRowValue("Tax Liability (Total)").invoke("text").then(taxLiabilityTotal => {
                const numberTaxLiabilityTotal = getNumberFromDollarNumberWithCommas(taxLiabilityTotal);
                const taxLiability = `$${numberWithCommas((numberTaxLiabilityTotal / numberPSFAnalysis).toFixed(2))}`;
                taxInfoPage.getTaxLiabilityRowValue("Tax Liability (PSF)").should("have.text", taxLiability);
                if (isSummary === true) {
                    this.clickSummaryTab();
                    taxInfoPage.getSummaryRowValue("taxLiabilityPerBasis").should("have.text", taxLiability);
                }
            });
        });
        return this;
    }
}

export default new TaxInfoActions(taxInfoPage);
