import adjustCompsPage from "../../pages/sales/adjustComps.page";
import {
    getNumberFromDollarNumberWithCommas,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";
import { _saveDataInFile } from "../../support/commands";
import Enums from "../../enums/enums";
import capRateConclusionKeys from "../../utils/mapKeys/income/capRateConclusion/capRateConclusion.keys";

type AdjustmentName = BoweryReports.SalesAdjustmentGrid.AdjustmentName;

class AdjustCompsActions extends BaseActionsExt<typeof adjustCompsPage> {
    /**
     * Checks whether name string in cell Cumulative Price Per *basis* is bold   
     */
    checkCumulativePriceName(basis: BoweryReports.SalesAdjustmentGrid.CumulativePrice) {
        this.Page.cellCumulativePriceName(basis).should("have.css", "font-weight", "500");
        return this;
    }

    checkCalculationUnitsRadio(value: BoweryReports.SalesAdjustmentGrid.CalculationUnits = 
    Enums.CALCULATION_UNITS.perResidentialUnits): AdjustCompsActions {
        adjustCompsPage.calculationUnitsRadio.check(value).should("be.checked");
        return this;
    }

    checkIncomeAdjustmentLevel(value: string): AdjustCompsActions {
        adjustCompsPage.incomeAdjustmentLevelRadio.check(value).should("be.checked");
        return this;
    }

    enterSizeAdjustmentByColumn(value: number, index = 0): AdjustCompsActions {
        adjustCompsPage.sizeAdjustmentCells.eq(index).clear().type(`${value}`).should("have.value", `${value}%`);
        return this;
    }

    enterConditionAdjustmentByColumn(value: number, index = 0): AdjustCompsActions {
        adjustCompsPage.conditionAdjustmentCells.eq(index).clear().type(`${value}`).should("have.value", `${value}%`);
        return this;
    }

    editOtherAdjustmentRowName(prevName: string, newName: string, index = 0): AdjustCompsActions {
        adjustCompsPage.getAdjustmentEditNameButton(prevName).click();
        adjustCompsPage.getOtherAdjustmentNameInputField(index).clear().type(newName).should("have.value", newName);
        adjustCompsPage.getOtherAdjustmentNameSaveButton(index).click();
        this.verifyRowWithNameExists(newName);
        return this;
    }

    editOtherUtilitiesAdjustmentRowName(prevName: string, newName: string, index = 0): AdjustCompsActions {
        adjustCompsPage.getAdjustmentEditNameButton(prevName).click();
        adjustCompsPage.getOtherUtilitiesAdjustmentNameInputField(index)
            .clear().type(newName).should("have.value", newName);
        adjustCompsPage.getOtherUtilitiesAdjustmentNameSaveButton(index).click();
        this.verifyRowWithNameExists(newName);
        return this;
    }

    verifyRowWithNameExists(name: string): AdjustCompsActions {
        cy.contains("td", name).should("exist");
        return this;
    }

    verifyRowWithNameNotExists(name: string): AdjustCompsActions {
        cy.contains("td", name).should("not.exist");
        return this;
    }

    deleteOtherAdjustmentRow(name: string, index= 0): AdjustCompsActions {
        adjustCompsPage.getAdjustmentDeleteButton(name).eq(index).click();
        this.verifyRowWithNameNotExists(name);
        return this;
    }

    enterLocationAdjustmentByName(adjustmentName: string, value: number, index = 0): AdjustCompsActions {
        adjustCompsPage.getLocationAdjustmentsRowCells(adjustmentName).eq(index).scrollIntoView().clear()
            .type(`${value}{del}`).should("have.value", `${value}%`);
        return this;
    }

    enterLocationAdjustmentGroup(adjustmentName: string[], value: number[], index = 0): AdjustCompsActions {
        adjustmentName.forEach((adjustment, i) => {
            this.enterLocationAdjustmentByName(adjustment, value[i], index);
        });
        return this;
    }

    enterOtherAdjustmentByColumn(value: number | string, rowNumber = 0, index = 0): AdjustCompsActions {
        adjustCompsPage.getOtherAdjustmentRowCells(rowNumber).eq(index).scrollIntoView().clear()
            .type(`${value}{del}`).should("have.value", `${value}%`);
        return this;
    }

    enterOtherUtilitiesAdjustmentByColumn(value: number | string, rowNumber = 0, index = 0): AdjustCompsActions {
        adjustCompsPage.getOtherUtilitiesAdjustmentRowCells(rowNumber).eq(index).scrollIntoView().clear()
            .type(`${value}{del}`).should("have.value", `${value}%`);
        return this;
    }

    enterUtilitiesAdjustmentGroup(adjustmentName: string[], value: number[], index = 0): AdjustCompsActions {
        adjustmentName.forEach((adjustment, i) => {
            this.enterUtilitiesAdjustmentByName(adjustment, value[i], index);
        });
        return this;
    }

    enterUtilitiesAdjustmentByName(adjustmentName: string, value: number, index = 0): AdjustCompsActions {
        adjustCompsPage.getUtilitiesAdjustmentsRowCells(adjustmentName).eq(index).scrollIntoView().clear()
            .type(`${value}{del}`).should("have.value", `${value}%`);
        return this;
    }

    enterMarketAdjustmentsGroup(adjustmentName: string[], value: number[], index = 0): AdjustCompsActions {
        adjustmentName.forEach((adjustment, i) => {
            this.enterMarketAdjustmentByName(adjustment, value[i], index);
        });
        return this;
    }

    enterMarketAdjustmentByName(adjustmentName: string, value: number, index = 0): AdjustCompsActions {
        adjustCompsPage.getMarketAdjustmentsRowCells(adjustmentName).eq(index).scrollIntoView().clear()
            .type(`${value}{del}`).should("have.value", `${value}%`);
        return this;
    }

    verifyMarketAdjustmentByName(adjustmentName: string, value: number, index = 0): AdjustCompsActions {
        adjustCompsPage.getMarketAdjustmentsRowCells(adjustmentName).eq(index)
            .should('have.value', `${value}%`);
        return this;
    }

    clearOtherAdjustmentByColumn(rowNumber = 0, index = 0): AdjustCompsActions {
        adjustCompsPage.getOtherAdjustmentRowCells(rowNumber).eq(index).clear();
        return this;
    }

    clearOtherUtilitiesAdjustmentByColumn(rowNumber = 0, index = 0): AdjustCompsActions {
        adjustCompsPage.getOtherUtilitiesAdjustmentRowCells(rowNumber).eq(index).clear();
        return this;
    }

    clickAddOtherAdjustmentButton(): AdjustCompsActions {
        adjustCompsPage.addOtherAdjustmentButton.click({ force: true });
        return this;
    }

    verifyTrendedPriceByColumn(value: string, index = 0): AdjustCompsActions {
        adjustCompsPage.cellCumulativePriceValue.eq(index).should("have.text", value);
        return this;
    }

    verifyAdjustedPriceByColumn(index = 0, isEmpty = false): AdjustCompsActions {
        adjustCompsPage.cellCumulativePriceValue.eq(index).invoke("text").then(trendedText => {
            const trendedNumber = getNumberFromDollarNumberWithCommas(trendedText);
            adjustCompsPage.netPropertyAdjustmentsCells.eq(index).invoke("text").then(netAdjText => {
                const netAdjNumber = Number(netAdjText.replace("%", ""));
                // ToDo: Fix this rounding after resolving https://bowery.atlassian.net/browse/QA-6954
                const adjustedPriceToBe = trendedNumber + (trendedNumber * (netAdjNumber / 100));
                let adjustedPriceText: string;
                if (adjustedPriceToBe < 0) {
                    adjustedPriceText = `-$${numberWithCommas(adjustedPriceToBe.toFixed(2)
                        .replace("-", ""))}`;
                } else {
                    adjustedPriceText = `$${numberWithCommas(adjustedPriceToBe.toFixed(2))}`;
                }
                adjustCompsPage.adjustedPriceCells.eq(index).should("have.text", isEmpty ? "" : adjustedPriceText);
            });
        });
        return this;
    }

    verifyNetMarketAdjustmentsByCompIndex(index = 0): AdjustCompsActions {
        adjustCompsPage.getAllAdjustmentCellsByCompIndex(index).then(cells => {
            const adjustmentsValues = Array.from(cells).map(cell => cell.getAttribute("value"))
                .map(cellText => Number(cellText.replace("%", "")));
            const netPropAdjustmentsToBe = adjustmentsValues.reduce((sum, prevValue) => sum + prevValue, 0);
            adjustCompsPage.marketAdjustmentsCells.eq(index).should("have.text", `${netPropAdjustmentsToBe}%`);
        });
        return this;
    }

    /**
     * Verify that Trended Price per selected @param {string} basis adjusted based on
     * Net Market adjustment total value
     */
    verifyTrendedPricePerBasis(comparablesAdjustments: number[], basis: string, index = 0, isEmpty = false): 
    AdjustCompsActions {
        adjustCompsPage.viewMarketDetails.click();
        adjustCompsPage.getPricePerBasisValue(basis).should("be.visible");
        adjustCompsPage.getPricePerBasisValue(basis).invoke("text").then(pricePerUnitText => {
            let pricePerBasisNumber = getNumberFromDollarNumberWithCommas(pricePerUnitText);
            let pricePerBasisNumberWithPercentage = 0;
            for (let i = 0; i < comparablesAdjustments.length; i++) {
                pricePerBasisNumberWithPercentage = pricePerBasisNumber + 
                    (pricePerBasisNumber * comparablesAdjustments[i]/ 100);
                pricePerBasisNumber = pricePerBasisNumberWithPercentage;
            }
            let adjustedTrendedPriceText: string;
            if (pricePerBasisNumber < 0) {
                adjustedTrendedPriceText = `-$${numberWithCommas(pricePerBasisNumber.toFixed(2)
                    .replace("-", ""))}`;
            } else {
                adjustedTrendedPriceText = `$${numberWithCommas(pricePerBasisNumber.toFixed(2))}`;
            }
            cy.log("Cumulative Price Per Unit is: " + adjustedTrendedPriceText);
            _saveDataInFile(`$${numberWithCommas(Math.round(pricePerBasisNumber))}`, `${Cypress.spec.name}.txt`);
            adjustCompsPage.cellCumulativePriceValue.eq(index)
                .should("have.text", isEmpty ? "$0.00" : adjustedTrendedPriceText);
        });
            
        return this;
    }

    verifyNetPropertyAdjustmentsByCompIndex(index = 0): AdjustCompsActions {
        adjustCompsPage.getAllAdjustmentCellsByCompIndex(index).then(cells => {
            const adjustmentsValues = Array.from(cells).map(cell => cell.getAttribute("value"))
                .map(cellText => Number(cellText.replace("%", "")));
            const netPropAdjustmentsToBe = adjustmentsValues.reduce((sum, prevValue) => sum + prevValue, 0);
            adjustCompsPage.netPropertyAdjustmentsCells.eq(index).should("have.text", `${netPropAdjustmentsToBe}%`);
        });
        return this;
    }

    verifyTotalLocationAdjustmentsByCompIndex(index = 0): AdjustCompsActions {
        adjustCompsPage.getAllLocationAdjustmentCellsByCompIndex(index).then(cells => {
            const adjustmentsValues = Array.from(cells).map(cell => cell.getAttribute("value"))
                .map(cellText => Number(cellText.replace("%", "")));
            const netPropAdjustmentsToBe = adjustmentsValues.reduce((sum, prevValue) => sum + prevValue, 0);
            adjustCompsPage.totalLocationAdjustmentsCells.eq(index).should("have.text", `${netPropAdjustmentsToBe}%`);
        });
        return this;
    }

    verifyTotalUtilitiesAdjustmentsByCompIndex(index = 0): AdjustCompsActions {
        adjustCompsPage.getAllUtilitiesAdjustmentCellsByCompIndex(index).then(cells => {
            const adjustmentsValues = Array.from(cells).map(cell => cell.getAttribute("value"))
                .map(cellText => Number(cellText.replace("%", "")));
            const netPropAdjustmentsToBe = adjustmentsValues.reduce((sum, prevValue) => sum + prevValue, 0);
            adjustCompsPage.totalUtilityAdjustmentsCells.eq(index).should("have.text", `${netPropAdjustmentsToBe}%`);
        });
        return this;
    }

    enterPropertyRightsByColumn(value: number, index = 0): AdjustCompsActions {
        adjustCompsPage.propertyRightsCells.eq(index).clear().type(`${value}`).should("have.value", `${value}%`);
        return this;
    }

    clickComparisonPerUnitRadioButton(): AdjustCompsActions {
        adjustCompsPage.getComparisonPerUnitRadio.click();
        return this;
    }

    clickAddCustomUtilitiesAdjustment(): AdjustCompsActions {
        adjustCompsPage.addCustomUtilitiesAdjustmentButton.click();
        return this;
    }

    expandAdjustmentDetails(adjustmentName: AdjustmentName): AdjustCompsActions {
        adjustCompsPage.getAdjustmentArrow(adjustmentName).click();
        return this;
    }

    verifyExistValueInOtherAdjustmentDetails(value: string, index = 1): AdjustCompsActions {
        adjustCompsPage.getOtherAdjustmentColumnValue(value, index).should("have.text", value);
        return this;
    }

    clickDiscussionsShowAllButton(): AdjustCompsActions {
        adjustCompsPage.discussionsShowAllButton.click();
        return this;
    }

    verifyConditionDiscussionCommentary(value: string): AdjustCompsActions {
        adjustCompsPage.conditionDiscussionCommentary.should("include.text", value);
        return this;
    }

    verifyDiscussionsFieldWithNameExists(name: string): AdjustCompsActions {
        cy.contains("h6", name).should("exist");
        return this;
    }

    enterMarketConditionAdjustment(value: string | number): AdjustCompsActions {
        adjustCompsPage.marketConditionAdjustmentInput.type(`${value}`).should('have.attr', 'value', value);
        adjustCompsPage.applyMarketConditionAdjustmentButton.click();
        return this;
    }

    verifyMarketConditionsTime(dateOfValue: Date, saleDate: Date, index = 0): AdjustCompsActions {
        const diff = new Date(+saleDate).setHours(12) - new Date(+dateOfValue).setHours(12);
        const daysDifference = Math.round(diff/8.64e7);
        adjustCompsPage.marketConditionAdjustmentInput.invoke("val").then((val: number) => {
            const marketConditionsTime = Math.round(Math.abs(daysDifference) / 365 * val);
            adjustCompsPage.getMarketAdjustmentsRowCells("marketConditions").eq(index)
                .should("have.value", `${marketConditionsTime}%`);
        });
        return this;
    }

    /**
     * Count Price per Units. If in Sale Comparables Setup check `Per Residential Units` count like
     * `Price per Units = Sale Price /  Residential Units`. 
     * If in Sale Comparables Setup check Per Total Units count like
     * `Price per Units = Sale Price /  Residential Units +  Commercial Units`. Value is rounded down
     * @param calculationUnit Name of Calculation Unit
     * @param units Count Residential or/and Commercial units
     * @returns `this`
     */
    verifyExpandMarketAdjustmentPricePerUnit(calculationUnit: BoweryReports.SalesAdjustmentGrid.CalculationUnits, 
        units: number): AdjustCompsActions {
        this.checkCalculationUnitsRadio(calculationUnit);
        adjustCompsPage.getExpandMarketAdjustmentSubjectRow("Sale Price").invoke("text").then(salePrice => {
            const salePriceNumber = getNumberFromDollarNumberWithCommas(salePrice);
            const pricePerUnit = salePriceNumber / units;
            const decimalPart = (pricePerUnit.toString().split(".")[1]);
            cy.log("decimalPart.charAt(2)", decimalPart.charAt(2));
            cy.log("test", Number(decimalPart.substring(0, 3)));
            // ToDo: Fix this rounding after resolving https://bowery.atlassian.net/browse/QA-6954
            const pricePerUnitToBe = (decimalPart.charAt(2) === "5") ? 
                `$${numberWithCommas(Math.round(pricePerUnit) + '.' + Number(decimalPart.substring(0, 2)))}`
                :   `$${numberWithCommas(pricePerUnit.toFixed(2))}`;
            adjustCompsPage.getExpandMarketAdjustmentSubjectRow("Price per Unit").should("have.text", pricePerUnitToBe);
        });
        return this;
    }

    verifyExpandMarketAdjustmentPricePerSF(calculationUnit: BoweryReports.SalesAdjustmentGrid.CalculationUnits, 
        area: number): AdjustCompsActions {
        this.checkCalculationUnitsRadio(calculationUnit);
        adjustCompsPage.getExpandMarketAdjustmentSubjectRow("Sale Price").invoke("text").then(salePrice => {
            const salePriceNumber = getNumberFromDollarNumberWithCommas(salePrice);
            const pricePerSf = salePriceNumber / area;
            // ToDo: Fix this rounding after resolving https://bowery.atlassian.net/browse/QA-6954
            const pricePerSfAdjusted = (Math.round(pricePerSf * 1000)) / 1000;
            const pricePerSfToBe = `$${numberWithCommas(pricePerSfAdjusted.toFixed(2))}`;
            adjustCompsPage.getExpandMarketAdjustmentSubjectRow("Price per SF").should("have.text", pricePerSfToBe);
        });
        return this;
    }

    verifyCommercialAreaSf(incomeValue: BoweryReports.IncomeTypes, squareFootAnalysis: number,
        areaSf: number[], index = 0): AdjustCompsActions {
        this.Page.getAdjustmentExpansionCellValue(Enums.ADJUSTMENT_EXPANSION_LABELS.commercialAreaRatio, index)
            .invoke('text').then(commercialAreaSf => {
                let commercialArea = areaSf.reduce((prev, next) => prev + next);
                let calculatedPercent = incomeValue === Enums.INCOME_TYPE.residential 
                    ? '0%'
                    : `${commercialArea / squareFootAnalysis * 100}%`;
                expect(commercialAreaSf).to.be.eq(`${calculatedPercent}`);
            });
        return this;
    }

    verifyExpandMarketAdjustmentSalePrice(calculationUnit: BoweryReports.SalesAdjustmentGrid.CalculationUnits): 
    AdjustCompsActions {
        this.checkCalculationUnitsRadio(calculationUnit);
        cy._mapGet(capRateConclusionKeys.asStabilizedAmount).then(salePrice => {
            adjustCompsPage.getExpandMarketAdjustmentSubjectRow("Sale Price")
                .should("include.text", `$${numberWithCommas(salePrice)}`);
        });
        
        return this;
    }
}

export default new AdjustCompsActions(adjustCompsPage);
