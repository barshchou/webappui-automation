import taxInfoPage from "../../pages/income/taxInfo.page";
import {
    getNumberFromDollarNumberWithCommas, numberWithCommas,
    getNumberWithDecimalPart, getNumberFromPercentNumberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";
import taxInfoKeys from "../../utils/mapKeys/income/tax_Info/taxInfoKeys";

class TaxInfoActions extends BaseActionsExt<typeof taxInfoPage> {

    checkBasisByValue(value: string): this {
        taxInfoPage.basisRadioButton(value).click();
        taxInfoPage.getVerifyBasisRadioInput(value).should("exist");
        return this;
    }

    enterTaxableAssessedLandValue(value: number): this {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.typeInAgTable(taxInfoPage.landActualInput, `${value}`);
        taxInfoPage.landActualInput.should('have.text', valueToBe);
        return this;
    }

    enterTransitionalLandValue(value: number): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.typeInAgTable(taxInfoPage.landTransitional, `${value}`);
        taxInfoPage.landTransitional.should('have.text', valueToBe);
        return this;
    }

    enterTaxableAssessedBuildingValue(value: number): this {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.typeInAgTable(taxInfoPage.buildingActualInput, `${value}`);
        taxInfoPage.buildingActualInput.should('have.text', valueToBe);
        return this;
    }

    enterTransitionalBuildingValue(value: number): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        this.typeInAgTable(taxInfoPage.buildingTransitionalInput, `${value}`);
        taxInfoPage.buildingTransitionalInput.should('have.text', valueToBe);
        return this;
    }

    switchIncludeTransitionalCheckbox(value = false): TaxInfoActions {
        taxInfoPage.includeTransitionalAssessedValueCheckbox
            .invoke('attr', 'value').then(attr => {
                cy.log(`${attr}`);
                if (attr == `${!value}`) {
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

    checkProjectedIncludeCheckbox(check = true): this {
        taxInfoPage.projectedIncludeInExportCheckbox.invoke('attr', 'value').then(status => {
            if (status !== `${check}`) {
                taxInfoPage.projectedIncludeInExportCheckbox.click().should('have.value', `${check}`);
            }
        });
        return this;
    }

    checkProjectedSectionCheckbox(sectionName: BoweryReports.ProjectedTaxesSectionsKeys, check = true): this {
        taxInfoPage.projectedIncludeSectionCheckbox(sectionName).invoke('attr', 'value').then(status => {
            if (status !== `${check}`) {
                taxInfoPage.projectedIncludeSectionCheckbox(sectionName).click().should('have.value', `${check}`);
            }
        });
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

    addListTaxComparablesWithoutSourceInfoData(taxCompData: BoweryReports.TaxCompData[]): this {
        taxCompData.forEach(data => {
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
            default:
                cy.log('Provided source of information is not valid');
                return null;
        }
    }

    verifyListAddedComparables(taxCompData: BoweryReports.TaxCompData[]): this {
        let rowIndex = taxCompData.length - 1;
        for (let i = 0; i < taxCompData.length; i++) {
            this.verifyAddedComparableByRowNumber(taxCompData[i], rowIndex);
            rowIndex--;
        }
        return this;
    }

    clickAddAdditionalTaxRate(): TaxInfoActions {
        taxInfoPage.addAdditionalTaxRate.click();
        return this;
    }

    clickAddSpecialAssessmentRate(): TaxInfoActions {
        taxInfoPage.addSpecialAssessment.click();
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
        taxInfoPage.getVerifyConcludedTaxLiabilityTypeInput(value).should("exist");
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
        taxInfoPage.appraiserOpTaxLiabilityTaxRateValueCell.should("have.text", `${taxRate}%`);
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
        taxInfoPage.taxCalculationDiscussionTooltip.should("have.text", tooltipToBe);
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
    enterRowTaxLiabilityValue(rowName: string, value: number, decimalCount = 9, rowNumber = 0): TaxInfoActions {
        const initial = taxInfoPage.getTaxLiabilityRowValue(rowName).eq(rowNumber)
            .realClick().realClick().type(`${value}{enter}`);
        if (rowName === "Additional Tax Rate") {
            initial.should("have.text", `${getNumberWithDecimalPart(value, decimalCount)}%`);
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
     * Get all values from row and add in `Map`
     * @param rowName Row name in Tax Liability table
     * @param isPercent `true` if value contains `%`, `false` if value contains `$`
     * @returns `this`
     */
    private getValuesFromRows(rowName: string, isPercent = true): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowValue(rowName).then($el => {
            const rowElements = [];
            for (let i = 0; $el.length > i; i++) {
                taxInfoPage.getTaxLiabilityRowValue(rowName).eq(i).invoke("text").then(rowElement => {
                    let rowElementNumber = isPercent ? getNumberFromPercentNumberWithCommas(rowElement)
                        : getNumberFromDollarNumberWithCommas(rowElement);
                    rowElements.push(rowElementNumber);
                });
            }
            const mapKey = rowName === "Tax Rate" ? taxInfoKeys.taxRates : taxInfoKeys.assessmentRows;
            cy._mapSet(mapKey, rowElements);
        });
        return this;
    }

    /**
     * Get all "Tax Rate" and "Assessment Row" values and verify "Tax Liability (Total)" using this formula:
     * sum of all tax rates * sum of all assessments = tax liability (total)
     * @returns `this`
     */
    verifyTotalTaxLiability(): TaxInfoActions {
        this.getValuesFromRows("Tax Rate");
        cy._mapGet(taxInfoKeys.taxRates).then(taxRates => {
            const sumTaxRates = taxRates.reduce((a, b) => a + b);
            const taxRatesPercent = sumTaxRates / 100;
            this.getValuesFromRows("Assessment Row", false);
            cy._mapGet(taxInfoKeys.assessmentRows).then(assessments => {
                const sumAssessments = assessments.reduce((a, b) => a + b);
                taxInfoPage.getTaxLiabilityRowValue("Taxable Assessed Value").invoke("text")
                    .then(taxAssessedText => {
                        const allTaxAssessedNumber = sumAssessments +
                            getNumberFromDollarNumberWithCommas(taxAssessedText);
                        const taxLiabilityTotalToBe =
                            `$${numberWithCommas((allTaxAssessedNumber * taxRatesPercent).toFixed(2))}`;
                        taxInfoPage.getTaxLiabilityRowValue("Tax Liability (Total)")
                            .should("have.text", taxLiabilityTotalToBe);
                    });
            });
        });
        return this;
    }

    verifyTaxLiabilityItemAndValue(item: string, value: string | number): TaxInfoActions {
        const convertValue = numberWithCommas(value);
        taxInfoPage.getTaxLiabilityRowItem(item).should("exist");
        taxInfoPage.getTaxLiabilityRowItem(convertValue).should("have.text", convertValue);
        return this;
    }

    verifyPSFTaxLiability(item: BoweryReports.BasisSquareFootAnalysis, isSummary = false): TaxInfoActions {
        taxInfoPage.getTaxLiabilityRowValue(`${item}`).invoke("text").then(PSFAnalysis => {
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

    verifyTaxLiabilityOnProjectedTab(squareFootAnalysisArea: number, 
        sectionName: BoweryReports.ProjectedTaxesSectionsValues): TaxInfoActions {
        taxInfoPage.taxLiabilityTotalOnProjectedTab(sectionName).invoke('text').then(taxTotal => {
            let taxTotalPerSfAdjusted = getNumberFromDollarNumberWithCommas(taxTotal) / squareFootAnalysisArea;
            taxInfoPage.taxLiabilityTotalPerSfOnProjectedTab(sectionName)
                .should('have.text', `$${numberWithCommas(taxTotalPerSfAdjusted.toFixed(2))}`);
        });
        return this;
    }

    verifyTaxLiabilityOnSummaryTab(squareFootAnalysisArea: number, 
        sectionName: BoweryReports.ProjectedTaxesSectionsValues): TaxInfoActions {
        taxInfoPage.taxLiabilityTotalOnSummaryTab(sectionName).invoke('text').then(taxTotal => {
            let taxTotalPerSfAdjusted = getNumberFromDollarNumberWithCommas(taxTotal) / squareFootAnalysisArea;
            taxInfoPage.taxLiabilityTotalPerSfOnSummaryTab(sectionName)
                .should('have.text', `$${numberWithCommas(taxTotalPerSfAdjusted.toFixed(2))}`);
        });
        return this;
    }

    enterItemValueOnProjectedTab(inputName: BoweryReports.ProjectedTaxesInputsNamesValues, value: string ): 
    TaxInfoActions {
        this.typeInAgTable(taxInfoPage.projectedTaxesIncludedInputs(inputName), value);
        this.verifyProjectInputs(value, inputName);
        return this;
    }

    verifyProjectInputs(valueToBe: string, inputName: BoweryReports.ProjectedTaxesInputsNamesValues): TaxInfoActions {
        taxInfoPage.projectedTaxesIncludedInputs(inputName).should("have.text", valueToBe);
        return this;
    }
}

export default new TaxInfoActions(taxInfoPage);
