import adjustCompsPage from "../../pages/sales/adjustComps.page";
import {
    getNumberFromDollarNumberWithCommas,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class AdjustCompsActions extends BaseActionsExt<typeof adjustCompsPage> {

    checkCalculationUnitsRadio(value: string): AdjustCompsActions {
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
        adjustCompsPage.getOtherUtilitiesAdjustmentNameInputField(index).clear().type(newName).should("have.value", newName);
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
        adjustCompsPage.cumulativePriceCells.eq(index).should("have.text", value);
        return this;
    }

    verifyAdjustedPriceByColumn(index = 0): AdjustCompsActions {
        adjustCompsPage.cumulativePriceCells.eq(index).invoke("text").then(trendedText => {
            const trendedNumber = getNumberFromDollarNumberWithCommas(trendedText);
            adjustCompsPage.netPropertyAdjustmentsCells.eq(index).invoke("text").then(netAdjText => {
                const netAdjNumber = Number(netAdjText.replace("%", ""));
                const adjustedPriceToBe = trendedNumber + (trendedNumber * (netAdjNumber / 100));
                let adjustedPriceText: string;
                if (adjustedPriceToBe < 0) {
                    adjustedPriceText = `-$${numberWithCommas(adjustedPriceToBe.toFixed(2)
                        .replace("-", ""))}`;
                } else {
                    adjustedPriceText = `$${numberWithCommas(adjustedPriceToBe.toFixed(2))}`;
                }
                adjustCompsPage.adjustedPriceCells.eq(index).should("have.text", adjustedPriceText);
            });
        });
        return this;
    }

    /**
    * Verify that Trended Price per selected @param {string} basis adjusted based on
    Net Market adjustment total value
    */
    verifyTrendedPricePerBasis(comparablesAdjustments: number[], basis: string, index = 0): AdjustCompsActions {
        adjustCompsPage.viewMarketDetails.click();
        adjustCompsPage.getPricePerBasisValue(basis).should("be.visible");
        adjustCompsPage.getPricePerBasisValue(basis).invoke("text").then(pricePerUnitText => {
            let pricePerBasisNumber = getNumberFromDollarNumberWithCommas(pricePerUnitText);
            let pricePerBasisNumberWithPercentage = 0;
            for (let i = 0; i < comparablesAdjustments.length; i++) {
                pricePerBasisNumberWithPercentage = pricePerBasisNumber + (pricePerBasisNumber * comparablesAdjustments[i]/ 100);
                pricePerBasisNumber = pricePerBasisNumberWithPercentage;
            }
             let adjustedTrendedPriceText: string;
             if (pricePerBasisNumber < 0) {
                 adjustedTrendedPriceText = `-$${numberWithCommas(pricePerBasisNumber.toFixed(2)
                     .replace("-", ""))}`;
             } else {
                 adjustedTrendedPriceText = `$${numberWithCommas(pricePerBasisNumber.toFixed(2))}`;
             }
             adjustCompsPage.cumulativePriceCells.eq(index).should("have.text", adjustedTrendedPriceText);
           
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
}

export default new AdjustCompsActions(adjustCompsPage);