import BaseActions from "../base/base.actions";
import taxInfoPage from "../../pages/income/taxInfo.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class TaxInfoActions extends BaseActions {

    /**
     *
     * @param value
     * @returns {TaxInfoActions}
     */
    checkBasisByValue(value) {
        taxInfoPage.basisRadio.check(value);
        taxInfoPage.getVerifyBasisRadioInput(value).should("exist");
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @returns {TaxInfoActions}
     */
    enterTaxableAssessedLandValue(value) {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.landActualInput.clear().type(value).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @returns {TaxInfoActions}
     */
    enterTaxableAssessedBuildingValue(value) {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.buildingActualInput.clear().type(value).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{landValue: number | string, buildingValue: number | string}>} currentTaxInfoData
     * @returns {TaxInfoActions}
     */
    verifyTotalAssessedValue(currentTaxInfoData) {
        const textToBe = `$${numberWithCommas(currentTaxInfoData.landValue + currentTaxInfoData.buildingValue)}`;
        taxInfoPage.totalTaxableAssessedValue.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{landValue: number | string, buildingValue: number | string}>} currentTaxInfoData
     * @returns {TaxInfoActions}
     */
    fillTaxableAssessedValues(currentTaxInfoData) {
        this.enterTaxableAssessedLandValue(currentTaxInfoData.landValue)
            .enterTaxableAssessedBuildingValue(currentTaxInfoData.buildingValue)
            .verifyTotalAssessedValue(currentTaxInfoData);
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    clickEditTaxRatesButton() {
        taxInfoPage.editTaxRatesButton.click();
        return this;
    }

    /**
     *
     * @param {string} name
     * @returns {TaxInfoActions}
     */
    enterTaxClassName(name) {
        taxInfoPage.taxClassNameInput.clear().type(name).should("have.value", name);
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @param {number} index
     * @returns {TaxInfoActions}
     */
    enterTaxRateYearByIndex(value, index = 0) {
        taxInfoPage.taxRateYearInputs.eq(index).clear().type(value).clear().type(value).should("have.value", value);
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @param {number} index
     * @returns {TaxInfoActions}
     */
    enterTaxRateValueByIndex(value, index = 0) {
        taxInfoPage.taxRateValueInputs.eq(index).clear().type(value).should("have.value", `${value}%`);
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    clickSaveChangesButton() {
        taxInfoPage.saveButton.click();
        return this;
    }

    /**
     *
     * @param {Readonly<{className: string, rateYear: string | number, rateValue: string | number}>} currentTaxInfoData
     * @returns {TaxInfoActions}
     */
    editTaxRatesWithoutAddingNew(currentTaxInfoData) {
        this.clickEditTaxRatesButton()
            .enterTaxClassName(currentTaxInfoData.className)
            .enterTaxRateYearByIndex(currentTaxInfoData.rateYear)
            .enterTaxRateValueByIndex(currentTaxInfoData.rateValue)
            .clickSaveChangesButton();
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {TaxInfoActions}
     */
    verifyTaxClassDropdownText(textToBe) {
        taxInfoPage.taxClassDropdown.should("contain.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string | number} textToBe
     * @returns {TaxInfoActions}
     */
    verifyTaxRateDropdownText(textToBe) {
        taxInfoPage.taxRateDropdown.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{className: string, rateYear: number | string}>} currentTaxInfoData
     * @returns {TaxInfoActions}
     */
    verifyTaxLiabilityInfo(currentTaxInfoData) {
        this.verifyTaxClassDropdownText(currentTaxInfoData.className)
            .verifyTaxRateDropdownText(currentTaxInfoData.rateYear);
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    verifyTaxableAssessedValue() {
        taxInfoPage.totalTaxableAssessedValue.invoke("text").then(totalAssessedText => {
            const totalAssessedNumber = getNumberFromDollarNumberWithCommas(totalAssessedText);
            const textToBe = `$${numberWithCommas(totalAssessedNumber.toFixed(2))}`;
            taxInfoPage.taxableAssessedValue.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @param {number | string} rateToBe
     * @returns {TaxInfoActions}
     */
    verifyTaxRateValueCell(rateToBe) {
        taxInfoPage.taxRateValueCell.should("have.text", `${rateToBe}%`);
        return this;
    }

    /**
     *
     * @param {number | string} taxRate
     * @returns {TaxInfoActions}
     */
    verifyTaxLiabilityTotalCell(taxRate) {
        taxInfoPage.taxableAssessedValue.invoke("text").then(taxableAssessedText => {
            const taxableAssessedNumber = getNumberFromDollarNumberWithCommas(taxableAssessedText);
            const textToBe = `$${numberWithCommas((taxableAssessedNumber / 100 * taxRate).toFixed(2))}`;
            taxInfoPage.taxLiabilityTotalCell.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @param {string | number} textToBe
     * @returns {TaxInfoActions}
     */
    verifySFOrUnitsNumberCell(textToBe) {
        taxInfoPage.sfOrUnitsNumberCell.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    verifyPerBasisCell() {
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

    /**
     *
     * @param {string | number} taxRate
     * @param {string | number} sfOrUnitsNumber
     * @returns {TaxInfoActions}
     */
    verifyTaxLiabilityTable(taxRate, sfOrUnitsNumber) {
        this.verifyTaxableAssessedValue()
            .verifyTaxRateValueCell(taxRate)
            .verifyTaxLiabilityTotalCell(taxRate)
            .verifySFOrUnitsNumberCell(sfOrUnitsNumber)
            .verifyPerBasisCell();
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {TaxInfoActions}
     */
    verifyTaxLiabilityCommentary(commToBe) {
        taxInfoPage.taxLiabilityCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    clickProjectedTab() {
        taxInfoPage.projectedTab.click();
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    checkProjectedIncludeCheckbox() {
        taxInfoPage.projectedIncludeInExportCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {TaxInfoActions}
     */
    verifyProjectedLiabilityCommentary(commToBe) {
        taxInfoPage.projectedLiabilityCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    clickComparablesTab() {
        taxInfoPage.comparablesTab.click();
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    clickAddBlankRowButton() {
        taxInfoPage.addBlankRowButton.click();
        return this;
    }

    /**
     *
     * @param {string} address
     * @returns {TaxInfoActions}
     */
    enterNewTaxCompAddress(address) {
        taxInfoPage.newTaxCompAddressInput.type(address).should("have.value", address);
        return this;
    }

    /**
     *
     * @param {number | string} year
     * @returns {TaxInfoActions}
     */
    enterNewTaxCompYearBuilt(year) {
        taxInfoPage.newTaxCompYearBuiltInput.type(year).should("have.value", year);
        return this;
    }

    /**
     *
     * @param {number | string} basisValue
     * @returns {TaxInfoActions}
     */
    enterNewTaxCompBasis(basisValue) {
        taxInfoPage.newTaxCompBasisInput.type(basisValue).should("have.value", basisValue);
        return this;
    }

    /**
     *
     * @param {number | string} taxesPerBasis
     * @returns {TaxInfoActions}
     */
    enterTaxesPerBasis(taxesPerBasis) {
        taxInfoPage.newTaxCompTaxesPerBasisInput.type(taxesPerBasis).should("have.value", `$${taxesPerBasis}`);
        return this;
    }

    /**
     *
     * @param {number} year
     * @returns {TaxInfoActions}
     */
    enterTaxYear(year) {
        taxInfoPage.newTaxCompTaxYearInput.type(year).should("have.value", year);
        return this;
    }

    /**
     *
     * @param {string} sourceValue
     * @returns {TaxInfoActions}
     */
    selectSourceOfInfo(sourceValue) {
        taxInfoPage.sourceOfInfoDropdown.click();
        taxInfoPage.getDropdownOptionByValue(sourceValue).click();
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    clickAddButton() {
        taxInfoPage.addButton.click();
        return this;
    }

    /**
     *
     * @param {Readonly<{address: string, yearBuilt: number, basis: number, taxPerBasis: number, sourceOfInfo: string,
     * taxYear: number}>} taxCompData
     * @returns {TaxInfoActions}
     */
    addTaxComparableWithoutSourceInfoData(taxCompData) {
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

    /**
     *
     * @param {Array<Readonly<{address: string, yearBuilt: number, basis: number, taxPerBasis: number, sourceOfInfo: string,
     * taxYear: number}>>} taxCompDatas
     * @returns {TaxInfoActions}
     */
    addListTaxComparablesWithoutSourceInfoData(taxCompDatas) {
        taxCompDatas.forEach(data => {
            this.addTaxComparableWithoutSourceInfoData(data);
        });
        return this;
    }

    /**
     *
     * @param {Readonly<{address: string, yearBuilt: number, basis: number, taxPerBasis: number, sourceOfInfo: string,
     * taxYear: number}>} taxCompData
     * @param {number} rowNumber
     * @returns {TaxInfoActions}
     */
    verifyAddedComparableByRowNumber(taxCompData, rowNumber) {
        taxInfoPage.taxCompsTableAddresses.eq(rowNumber).should("have.text", taxCompData.address);
        taxInfoPage.taxCompsTableYearsBuilt.eq(rowNumber).should("have.value", taxCompData.yearBuilt);
        taxInfoPage.taxCompsTableTaxYears.eq(rowNumber).should("have.value", taxCompData.taxYear);
        taxInfoPage.taxCompsTableBasis.eq(rowNumber).should("have.value", taxCompData.basis);
        taxInfoPage.taxCompsTableTaxesPerBasis.eq(rowNumber).should("have.value", `$${taxCompData.taxPerBasis}`);
        const sourceInfoText = this.getSourceOfInfoTextByValue(taxCompData.sourceOfInfo);
        taxInfoPage.taxCompsTableSourcesOfInfo.eq(rowNumber).should("contain.text", sourceInfoText);
        return this;
    }

    /**
     * @private
     * @param {string} value
     * @returns {string}
     */
    getSourceOfInfoTextByValue(value) {
        switch (value) {
            case "externalDatabase":
                return "External Database";
            case "bowerySubject":
                return "Bowery Subject";
            case "other":
                return "Other";
        }
    }

    /**
     *
     * @param {Array<Readonly<{address: string, yearBuilt: number, basis: number, taxPerBasis: number, sourceOfInfo: string,
     * taxYear: number}>>} taxCompDatas
     * @returns {TaxInfoActions}
     */
    verifyListAddedComparables(taxCompDatas) {
        let rowIndex = taxCompDatas.length - 1;
        for (let i = 0; i < taxCompDatas.length; i++) {
            this.verifyAddedComparableByRowNumber(taxCompDatas[i], rowIndex);
            rowIndex--;
        }
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {TaxInfoActions}
     */
    verifyTaxCompsCommentary(commToBe) {
        taxInfoPage.taxCompsDiscussionComm.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @returns {TaxInfoActions}
     */
    clickSummaryTab() {
        taxInfoPage.summaryTab.click();
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {TaxInfoActions}
     */
    checkConcludedLiabilityTypeByValue(value) {
        taxInfoPage.concludedLiabilityTypeRadio.check(value);
        taxInfoPage.getVerifyConcludedTaxLiabTypeInput(value).should("exist");
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @returns {TaxInfoActions}
     */
    enterConcludedLiabilityPerBasis(value) {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.concludedLiabilityPerBasisInput.clear().type(value).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {number} concludedLiability
     * @param {number} numberOfUnits
     * @returns {TaxInfoActions}
     */
    verifyAppraiserOpinionLiabilityTotal(concludedLiability, numberOfUnits) {
        const textToBe = `$${numberWithCommas(concludedLiability * numberOfUnits)}`;
        taxInfoPage.appraiserOpTaxLiabilityTotal.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} taxLiability
     * @returns {TaxInfoActions}
     */
    verifyAppraiserOpinionTaxLiabilityPerBasis(taxLiability) {
        const textToBe = `$${numberWithCommas(taxLiability)}`;
        taxInfoPage.appraiserOpTaxLiabilityPerBasis.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {number} taxRate
     * @returns {TaxInfoActions}
     */
    verifyAppraiserOpinionTaxRateCell(taxRate) {
        taxInfoPage.appraiserOpTaxLiabTaxRateValueCell.should("have.text", `${taxRate}%`);
        return this;
    }

    /**
     *
     * @param {number} taxRate
     * @returns {TaxInfoActions}
     */
    verifyAppraiserOpinionTaxableAssessedValueCell(taxRate) {
        taxInfoPage.appraiserOpTaxLiabilityTotal.invoke("text").then(liabilityTotalText => {
            const liabilityTotalNumber = getNumberFromDollarNumberWithCommas(liabilityTotalText);
            const textToBe = `$${numberWithCommas((liabilityTotalNumber * 100 / taxRate).toFixed(2))}`;
            taxInfoPage.appraiserOpTaxAssessedValueCell.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {TaxInfoActions}
     */
    verifyTaxSummaryCommentary(commToBe) {
        taxInfoPage.taxSummaryDiscussionCommentary.should("have.text", commToBe);
        return this;
    }

    verifyTaxSummaryTooltip(tooltipToBe) {
        taxInfoPage.taxSummaryDiscussionTooltip.should("have.attr", "aria-label", tooltipToBe);
        return this;
    }

    verifyTaxSummaryDiscussionTitle(titleToBe) {
        taxInfoPage.taxSummaryDiscussionTitle.should("have.text", titleToBe);
        return this;
    }
}

export default new TaxInfoActions();
