import taxInfoPage from "../../pages/income/taxInfo.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class TaxInfoActions extends BaseActionsExt<typeof taxInfoPage> {

    checkBasisByValue(value: string): TaxInfoActions {
        taxInfoPage.basisRadio.check(value);
        taxInfoPage.getVerifyBasisRadioInput(value).should("exist");
        return this;
    }

    enterTaxableAssessedLandValue(value: number | string): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.landActualInput.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    enterTransitionalLandValue(value: number | string): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.landTransitional.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    enterTaxableAssessedBuildingValue(value: string | number): TaxInfoActions {
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

    verifyTotalAssessedValue(currentTaxInfoData: Readonly<{ landValue: number | string; buildingValue: number | string; }>): TaxInfoActions {
        const textToBe = `$${numberWithCommas(`${currentTaxInfoData.landValue}` + `${currentTaxInfoData.buildingValue}`)}`;
        taxInfoPage.totalTaxableAssessedValue.should("have.text", textToBe);
        return this;
    }

    fillTaxableAssessedValues(currentTaxInfoData: Readonly<{ landValue: number | string; buildingValue: number | string; }>): TaxInfoActions {
        this.enterTaxableAssessedLandValue(currentTaxInfoData.landValue)
            .enterTaxableAssessedBuildingValue(currentTaxInfoData.buildingValue)
            .verifyTotalAssessedValue(currentTaxInfoData);
        return this;
    }

    clickEditTaxRatesButton(): TaxInfoActions {
        taxInfoPage.editTaxRatesButton.click();
        return this;
    }

    enterTaxClassName(name: string): TaxInfoActions {
        taxInfoPage.taxClassNameInput.clear().type(name).should("have.value", name);
        return this;
    }

    enterTaxRateYearByIndex(value: string | number, index = 0): TaxInfoActions {
        taxInfoPage.taxRateYearInputs.eq(index).clear().type(`${value}`).clear().type(`${value}`).should("have.value", value);
        return this;
    }

    enterTaxRateValueByIndex(value: string | number, index = 0): TaxInfoActions {
        taxInfoPage.taxRateValueInputs.eq(index).clear().type(`${value}`).should("have.value", `${value}%`);
        return this;
    }

    clickSaveChangesButton(): TaxInfoActions {
        taxInfoPage.saveButton.click();
        return this;
    }

    editTaxRatesWithoutAddingNew(currentTaxInfoData: Readonly<{ className: string; rateYear: string | number; rateValue: string | number; }>): TaxInfoActions {
        this.clickEditTaxRatesButton()
            .enterTaxClassName(currentTaxInfoData.className)
            .enterTaxRateYearByIndex(currentTaxInfoData.rateYear)
            .enterTaxRateValueByIndex(currentTaxInfoData.rateValue)
            .clickSaveChangesButton();
        return this;
    }

    verifyTaxClassDropdownText(textToBe: string): TaxInfoActions {
        taxInfoPage.taxClassDropdown.should("contain.text", textToBe);
        return this;
    }

    verifyTaxRateDropdownText(textToBe: string | number): TaxInfoActions {
        taxInfoPage.taxRateDropdown.should("have.text", textToBe);
        return this;
    }

    verifyTaxLiabilityInfo(currentTaxInfoData: Readonly<{ className: string; rateYear: number | string; }>): TaxInfoActions {
        this.verifyTaxClassDropdownText(currentTaxInfoData.className)
            .verifyTaxRateDropdownText(currentTaxInfoData.rateYear);
        return this;
    }

    verifyTaxableAssessedValue(): TaxInfoActions {
        taxInfoPage.totalTaxableAssessedValue.invoke("text").then(totalAssessedText => {
            const totalAssessedNumber = getNumberFromDollarNumberWithCommas(totalAssessedText);
            const textToBe = `$${numberWithCommas(totalAssessedNumber.toFixed(2))}`;
            taxInfoPage.taxableAssessedValue.should("have.text", textToBe);
        });
        return this;
    }

    verifyTaxRateValueCell(rateToBe: number | string): TaxInfoActions {
        taxInfoPage.taxRateValueCell.should("have.text", `${rateToBe}%`);
        return this;
    }

    verifyTaxLiabilityTotalCell(taxRate: number): TaxInfoActions {
        taxInfoPage.taxableAssessedValue.invoke("text").then(taxableAssessedText => {
            const taxableAssessedNumber = getNumberFromDollarNumberWithCommas(taxableAssessedText);
            const textToBe = `$${numberWithCommas((taxableAssessedNumber / 100 * taxRate).toFixed(2))}`;
            taxInfoPage.taxLiabilityTotalCell.should("have.text", textToBe);
        });
        return this;
    }

    verifySFOrUnitsNumberCell(textToBe: string | number): TaxInfoActions {
        taxInfoPage.sfOrUnitsNumberCell.should("have.text", textToBe);
        return this;
    }

    verifyPerBasisCell(): TaxInfoActions {
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

    verifyTaxLiabilityTable(taxRate: number, sfOrUnitsNumber: string | number): TaxInfoActions {
        this.verifyTaxableAssessedValue()
            .verifyTaxRateValueCell(taxRate)
            .verifyTaxLiabilityTotalCell(taxRate)
            .verifySFOrUnitsNumberCell(sfOrUnitsNumber)
            .verifyPerBasisCell();
        return this;
    }

    verifyTaxLiabilityCommentary(commToBe: string): TaxInfoActions {
        taxInfoPage.taxLiabilityCommentary.should("have.text", commToBe);
        return this;
    }

    clickProjectedTab(): TaxInfoActions {
        taxInfoPage.projectedTab.click();
        return this;
    }

    checkProjectedIncludeCheckbox(): TaxInfoActions {
        taxInfoPage.projectedIncludeInExportCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyProjectedLiabilityCommentary(commToBe: string): TaxInfoActions {
        taxInfoPage.projectedLiabilityCommentary.should("have.text", commToBe);
        return this;
    }

    clickComparablesTab(): TaxInfoActions {
        taxInfoPage.comparablesTab.click();
        return this;
    }

    clickAddBlankRowButton(): TaxInfoActions {
        taxInfoPage.addBlankRowButton.click();
        return this;
    }

    enterNewTaxCompAddress(address: string): TaxInfoActions {
        taxInfoPage.newTaxCompAddressInput.type(address).should("have.value", address);
        return this;
    }

    enterNewTaxCompYearBuilt(year: number | string): TaxInfoActions {
        taxInfoPage.newTaxCompYearBuiltInput.type(`${year}`).should("have.value", year);
        return this;
    }

    enterNewTaxCompBasis(basisValue: number | string): TaxInfoActions {
        taxInfoPage.newTaxCompBasisInput.type(`${basisValue}`).should("have.value", basisValue);
        return this;
    }

    enterTaxesPerBasis(taxesPerBasis: number | string): TaxInfoActions {
        taxInfoPage.newTaxCompTaxesPerBasisInput.type(`${taxesPerBasis}`).should("have.value", `$${taxesPerBasis}`);
        return this;
    }

    enterTaxYear(year: number): TaxInfoActions {
        taxInfoPage.newTaxCompTaxYearInput.type(`${year}`).should("have.value", year);
        return this;
    }

    selectSourceOfInfo(sourceValue: string): TaxInfoActions {
        taxInfoPage.sourceOfInfoDropdown.click();
        taxInfoPage.getDropdownOptionByValue(sourceValue).click();
        return this;
    }

    clickAddButton(): TaxInfoActions {
        taxInfoPage.addButton.click();
        return this;
    }

    addTaxComparableWithoutSourceInfoData(taxCompData: Readonly<{
            address: string; yearBuilt: number; basis: number; taxPerBasis: number; sourceOfInfo: string;
            taxYear: number;
        }>): TaxInfoActions {
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

    addListTaxComparablesWithoutSourceInfoData(taxCompDatas: Array<Readonly<{
            address: string; yearBuilt: number; basis: number; taxPerBasis: number; sourceOfInfo: string;
            taxYear: number;
        }>>): TaxInfoActions {
        taxCompDatas.forEach(data => {
            this.addTaxComparableWithoutSourceInfoData(data);
        });
        return this;
    }

    verifyAddedComparableByRowNumber(taxCompData: Readonly<{
            address: string; yearBuilt: number; basis: number; taxPerBasis: number; sourceOfInfo: string;
            taxYear: number;
        }>, rowNumber: number): TaxInfoActions {
        taxInfoPage.taxCompsTableAddresses.eq(rowNumber).should("have.text", taxCompData.address);
        taxInfoPage.taxCompsTableYearsBuilt.eq(rowNumber).should("have.value", taxCompData.yearBuilt);
        taxInfoPage.taxCompsTableTaxYears.eq(rowNumber).should("have.value", taxCompData.taxYear);
        taxInfoPage.taxCompsTableBasis.eq(rowNumber).should("have.value", taxCompData.basis);
        taxInfoPage.taxCompsTableTaxesPerBasis.eq(rowNumber).should("have.value", `$${taxCompData.taxPerBasis}`);
        const sourceInfoText = this.getSourceOfInfoTextByValue(taxCompData.sourceOfInfo);
        taxInfoPage.taxCompsTableSourcesOfInfo.eq(rowNumber).should("contain.text", sourceInfoText);
        return this;
    }

    getSourceOfInfoTextByValue(value: string): string {
        switch (value) {
            case "externalDatabase":
                return "External Database";
            case "bowerySubject":
                return "Bowery Subject";
            case "other":
                return "Other";
        }
    }

    verifyListAddedComparables(taxCompDatas: Array<Readonly<{
            address: string; yearBuilt: number; basis: number; taxPerBasis: number; sourceOfInfo: string;
            taxYear: number;
        }>>): TaxInfoActions {
        let rowIndex = taxCompDatas.length - 1;
        for (let i = 0; i < taxCompDatas.length; i++) {
            this.verifyAddedComparableByRowNumber(taxCompDatas[i], rowIndex);
            rowIndex--;
        }
        return this;
    }

    verifyTaxCompsCommentary(commToBe: string): TaxInfoActions {
        taxInfoPage.taxCompsDiscussionComm.should("have.text", commToBe);
        return this;
    }

    clickSummaryTab(): TaxInfoActions {
        taxInfoPage.summaryTab.click();
        return this;
    }

    checkConcludedLiabilityTypeByValue(value: string): TaxInfoActions {
        taxInfoPage.concludedLiabilityTypeRadio.check(value);
        taxInfoPage.getVerifyConcludedTaxLiabTypeInput(value).should("exist");
        return this;
    }

    enterConcludedLiabilityPerBasis(value: number | string): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.concludedLiabilityPerBasisInput.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    verifyAppraiserOpinionLiabilityTotal(concludedLiability: number, numberOfUnits: number): TaxInfoActions {
        const textToBe = `$${numberWithCommas(concludedLiability * numberOfUnits)}`;
        taxInfoPage.appraiserOpTaxLiabilityTotal.should("have.text", textToBe);
        return this;
    }

    verifyAppraiserOpinionTaxLiabilityPerBasis(taxLiability: number): TaxInfoActions {
        const textToBe = `$${numberWithCommas(taxLiability)}`;
        taxInfoPage.appraiserOpTaxLiabilityPerBasis.should("have.text", textToBe);
        return this;
    }

    verifyAppraiserOpinionTaxRateCell(taxRate: number): TaxInfoActions {
        taxInfoPage.appraiserOpTaxLiabTaxRateValueCell.should("have.text", `${taxRate}%`);
        return this;
    }

    verifyAppraiserOpinionTaxableAssessedValueCell(taxRate: number): TaxInfoActions {
        taxInfoPage.appraiserOpTaxLiabilityTotal.invoke("text").then(liabilityTotalText => {
            const liabilityTotalNumber = getNumberFromDollarNumberWithCommas(liabilityTotalText);
            const textToBe = `$${numberWithCommas((liabilityTotalNumber * 100 / taxRate).toFixed(2))}`;
            taxInfoPage.appraiserOpTaxAssessedValueCell.should("have.text", textToBe);
        });
        return this;
    }

    verifyTaxSummaryCommentary(commToBe: string): TaxInfoActions {
        taxInfoPage.taxSummaryDiscussionCommentary.should("exist").should("have.text", commToBe);
        return this;
    }

    verifyTaxSummaryTooltip(tooltipToBe: string): TaxInfoActions {
        taxInfoPage.taxSummaryDiscussionTooltip.should("exist").should("have.attr", "aria-label", tooltipToBe);
        return this;
    }

    verifyTaxSummaryDiscussionTitle(titleToBe: string) {
        taxInfoPage.taxSummaryDiscussionTitle.should("exist").should("have.text", titleToBe);
        return this;
    }
}

export default new TaxInfoActions(taxInfoPage);
