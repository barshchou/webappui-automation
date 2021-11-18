import BaseActions from "../base/base.actions";
import taxInfoPage from "../../pages/income/taxInfo.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class TaxInfoActions extends BaseActions {
    checkBasisByValue(value) {
        taxInfoPage.basisRadio.check(value);
        taxInfoPage.getVerifyBasisRadioInput(value).should("exist");
    }

    enterTaxableAssessedLandValue(value) {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.landActualInput.clear().type(value).should("have.value", valueToBe);
    }

    enterTaxableAssessedBuildingValue(value) {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.buildingActualInput.clear().type(value).should("have.value", valueToBe);
    }

    verifyTotalAssessedValue(landValue, buildingValue) {
        const textToBe = `$${numberWithCommas(landValue + buildingValue)}`;
        taxInfoPage.totalTaxableAssessedValue.should("have.text", textToBe);
    }

    fillTaxableAssessedValues(landValue, buildingValue) {
        this.enterTaxableAssessedLandValue(landValue);
        this.enterTaxableAssessedBuildingValue(buildingValue);
        this.verifyTotalAssessedValue(landValue, buildingValue);
    }

    clickEditTaxRatesButton() {
        taxInfoPage.editTaxRatesButton.click();
    }

    enterTaxClassName(name) {
        taxInfoPage.taxClassNameInput.clear().type(name).should("have.value", name);
    }

    enterTaxRateYearByIndex(value, index = 0) {
        taxInfoPage.taxRateYearInputs.eq(index).clear().type(value).should("have.value", value);
    }

    enterTaxRateValueByIndex(value, index = 0) {
        taxInfoPage.taxRateValueInputs.eq(index).clear().type(value).should("have.value", `${value}%`);
    }

    clickSaveChangesButton() {
        taxInfoPage.saveButton.click();
    }

    editTaxRatesWithoutAddingNew(taxClassName, taxRateYear, taxRateValue) {
        this.clickEditTaxRatesButton();
        this.enterTaxClassName(taxClassName);
        this.enterTaxRateYearByIndex(taxRateYear);
        this.enterTaxRateValueByIndex(taxRateValue);
        this.clickSaveChangesButton();
    }

    verifyTaxClassDropdownText(textToBe) {
        taxInfoPage.taxClassDropdown.should("contain.text", textToBe);
    }

    verifyTaxRateDropdownText(textToBe) {
        taxInfoPage.taxRateDropdown.should("have.text", textToBe);
    }

    verifyTaxLiabilityInfo(taxClass, taxRate) {
        this.verifyTaxClassDropdownText(taxClass);
        this.verifyTaxRateDropdownText(taxRate);
    }

    async verifyTaxableAssessedValue() {
        const totalAssessedText = await taxInfoPage.totalTaxableAssessedValue.then(el => el.text()).promisify();
        const totalAssessedNumber = getNumberFromDollarNumberWithCommas(totalAssessedText);
        const textToBe = `$${numberWithCommas(totalAssessedNumber.toFixed(2))}`;
        taxInfoPage.taxableAssessedValue.should("have.text", textToBe);
    }

    verifyTaxRateValueCell(rateToBe) {
        taxInfoPage.taxRateValueCell.should("have.text", `${rateToBe}%`);
    }

    async verifyTaxLiabilityTotalCell(taxRate) {
        const taxableAssessedText = await taxInfoPage.taxableAssessedValue.then(el => el.text()).promisify();
        const taxableAssessedNumber = getNumberFromDollarNumberWithCommas(taxableAssessedText);
        const textToBe = `$${numberWithCommas((taxableAssessedNumber / 100 * taxRate).toFixed(2))}`;
        taxInfoPage.taxLiabilityTotalCell.should("have.text", textToBe);
    }

    verifySFOrUnitsNumberCell(textToBe) {
        taxInfoPage.sfOrUnitsNumberCell.should("have.text", textToBe);
    }

    async verifyPerBasisCell() {
        const taxLiabilityText = await taxInfoPage.taxLiabilityTotalCell.then(el => el.text()).promisify();
        const taxLiabilityNumber = getNumberFromDollarNumberWithCommas(taxLiabilityText);
        const basisText = await taxInfoPage.sfOrUnitsNumberCell.then(el => el.text()).promisify();
        const basisNumber = getNumberFromDollarNumberWithCommas(basisText);
        const textToBe = `$${numberWithCommas((taxLiabilityNumber / basisNumber).toFixed(2))}`;
        taxInfoPage.perBasisCell.should("have.text", textToBe);
    }

    async verifyTaxLiabilityTable(taxRate, sfOrUnitsNumber) {
        await this.verifyTaxableAssessedValue();
        this.verifyTaxRateValueCell(taxRate);
        await this.verifyTaxLiabilityTotalCell(taxRate);
        this.verifySFOrUnitsNumberCell(sfOrUnitsNumber);
        await this.verifyPerBasisCell();
    }

    verifyTaxLiabilityCommentary(commToBe) {
        taxInfoPage.taxLiabilityCommentary.should("have.text", commToBe);
    }

    clickProjectedTab() {
        taxInfoPage.projectedTab.click();
    }

    checkProjectedIncludeCheckbox() {
        taxInfoPage.projectedIncludeInExportCheckbox.check().should("have.value", "true");
    }

    verifyProjectedLiabilityCommentary(commToBe) {
        taxInfoPage.projectedLiabilityCommentary.should("have.text", commToBe);
    }

    clickComparablesTab() {
        taxInfoPage.comparablesTab.click();
    }

    clickAddBlankRowButton() {
        taxInfoPage.addBlankRowButton.click();
    }

    enterNewTaxCompAddress(address) {
        taxInfoPage.newTaxCompAddressInput.type(address).should("have.value", address);
    }

    enterNewTaxCompYearBuilt(year) {
        taxInfoPage.newTaxCompYearBuiltInput.type(year).should("have.value", year);
    }

    enterNewTaxCompBasis(basisValue) {
        taxInfoPage.newTaxCompBasisInput.type(basisValue).should("have.value", basisValue);
    }

    enterTaxesPerBasis(taxesPerBasis) {
        taxInfoPage.newTaxCompTaxesPerBasisInput.type(taxesPerBasis).should("have.value", `$${taxesPerBasis}`);
    }

    enterTaxYear(year) {
        taxInfoPage.newTaxCompTaxYearInput.type(year).should("have.value", year);
    }

    selectSourceOfInfo(sourceValue) {
        taxInfoPage.sourceOfInfoDropdown.click();
        taxInfoPage.getDropdownOptionByValue(sourceValue).click();
    }

    clickAddButton() {
        taxInfoPage.addButton.click();
    }

    addTaxComparableWithoutSourceInfoData(taxCompData) {
        this.clickAddBlankRowButton();
        this.enterNewTaxCompAddress(taxCompData.address);
        this.enterNewTaxCompYearBuilt(taxCompData.yearBuilt);
        this.enterNewTaxCompBasis(taxCompData.basis);
        this.enterTaxesPerBasis(taxCompData.taxPerBasis);
        this.selectSourceOfInfo(taxCompData.sourceOfInfo);
        this.enterTaxYear(taxCompData.taxYear);
        this.clickAddButton();
    }

    addListTaxComparablesWithoutSourceInfoData(...taxCompDatas) {
        taxCompDatas.forEach(data => {
            this.addTaxComparableWithoutSourceInfoData(data);
        });
    }

    verifyAddedComparableByRowNumber(taxCompData, rowNumber) {
        taxInfoPage.taxCompsTableAddresses.eq(rowNumber).should("have.text", taxCompData.address);
        taxInfoPage.taxCompsTableYearsBuilt.eq(rowNumber).should("have.value", taxCompData.yearBuilt);
        taxInfoPage.taxCompsTableTaxYears.eq(rowNumber).should("have.value", taxCompData.taxYear);
        taxInfoPage.taxCompsTableBasis.eq(rowNumber).should("have.value", taxCompData.basis);
        taxInfoPage.taxCompsTableTaxesPerBasis.eq(rowNumber).should("have.value", `$${taxCompData.taxPerBasis}`);
        const sourceInfoText = this.getSourceOfInfoTextByValue(taxCompData.sourceOfInfo);
        taxInfoPage.taxCompsTableSourcesOfInfo.eq(rowNumber).should("contain.text", sourceInfoText);
    }

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

    verifyListAddedComparables(...taxCompDatas) {
        let rowIndex = taxCompDatas.length - 1;
        for (let i = 0; i < taxCompDatas.length; i++) {
            this.verifyAddedComparableByRowNumber(taxCompDatas[i], rowIndex);
            rowIndex--;
        }
    }

    verifyTaxCompsCommentary(commToBe) {
        taxInfoPage.taxCompsDiscussionComm.should("have.text", commToBe);
    }

    clickSummaryTab() {
        taxInfoPage.summaryTab.click();
    }

    checkConcludedLiabilityTypeByValue(value) {
        taxInfoPage.concludedLiabilityTypeRadio.check(value);
        taxInfoPage.getVerifyConcludedTaxLiabTypeInput(value).should("exist");
    }

    enterConcludedLiabilityPerBasis(value) {
        const valueToBe = `$${numberWithCommas(value)}`;
        taxInfoPage.concludedLiabilityPerBasisInput.clear().type(value).should("have.value", valueToBe);
    }

    verifyAppraiserOpinionTaxLiabilityTotal(concludedLiability, numberOfUnits) {
        const textToBe = `$${numberWithCommas(concludedLiability * numberOfUnits)}`;
        taxInfoPage.appraiserOpTaxLiabilityTotal.should("have.text", textToBe);
    }

    verifyAppraiserOpinionTaxLiabilityPerBasis(taxLiability) {
        const textToBe = `$${numberWithCommas(taxLiability)}`;
        taxInfoPage.appraiserOpTaxLiabilityPerBasis.should("have.text", textToBe);
    }

    verifyAppraiserOpinionTaxRateCell(taxRate) {
        taxInfoPage.appraiserOpTaxLiabTaxRateValueCell.should("have.text", `${taxRate}%`);
    }

    async verifyAppraiserOpinionTaxableAssessedValueCell(taxRate) {
        const liabilityTotalText = await taxInfoPage.appraiserOpTaxLiabilityTotal.then(el => el.text()).promisify();
        const liabilityTotalNumber = getNumberFromDollarNumberWithCommas(liabilityTotalText);
        const textToBe = `$${numberWithCommas((liabilityTotalNumber * 100 / taxRate).toFixed(2))}`;
        taxInfoPage.appraiserOpTaxAssessedValueCell.should("have.text", textToBe);
    }

    verifyTaxSummaryCommentary(commToBe) {
        taxInfoPage.taxSummaryDiscussionCommentary.should("have.text", commToBe);
    }
}

export default new TaxInfoActions();
