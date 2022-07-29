import taxInfoPage from "../../pages/income/taxInfo.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

class TaxInfoActions extends BaseActionsExt<typeof taxInfoPage> {

    checkBasisByValue(value: string): this {
        taxInfoPage.basisRadio.check(value);
        taxInfoPage.getVerifyBasisRadioInput(value).should("exist");
        return this;
    }

    enterTaxableAssessedLandValue(value: number): this {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        taxInfoPage.landActualInput.realClick().realClick()
            .scrollIntoView()
            .focus().type("something")
            .clear()
            .realType(`${value}{enter}`);
        taxInfoPage.landActualInput.should('have.text', valueToBe);
        return this;
    }

    enterTransitionalLandValue(value: number): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        taxInfoPage.landTransitional.realClick().realClick()
            .scrollIntoView()
            .focus().type("something")
            .clear()
            .realType(`${value}{enter}`);
        taxInfoPage.landTransitional.should('have.text', valueToBe);
        return this;
    }

    enterTaxableAssessedBuildingValue(value: number): this {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        taxInfoPage.buildingActualInput.realClick().realClick()
            .scrollIntoView()
            .focus().type("something")
            .clear()
            .realType(`${value}{enter}`);
        taxInfoPage.buildingActualInput.should('have.text', valueToBe);
        return this;
    }

    enterTransitionalBuildingValue(value: number): TaxInfoActions {
        const valueToBe = `$${numberWithCommas(value.toFixed(2))}`;
        taxInfoPage.buildingTransitionalInput.realClick().realClick()
            .scrollIntoView()
            .focus().type("something")
            .clear()
            .realType(`${value}{enter}`);
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
}

export default new TaxInfoActions(taxInfoPage);
