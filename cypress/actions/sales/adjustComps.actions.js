import BaseActions from "../base/base.actions";
import adjustCompsPage from "../../pages/sales/adjustComps.page";
import {
    getNumberFromDollarNumberWithCommas,
    getNumberWithDecimalPart,
    numberWithCommas
} from "../../../utils/numbers.utils";

class AdjustCompsActions extends BaseActions {

    /**
     *
     * @param {string} value
     * @returns {AdjustCompsActions}
     */
    checkCalculationUnitsRadio(value) {
        adjustCompsPage.calculationUnitsRadio.check(value);
        adjustCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {AdjustCompsActions}
     */
    checkIncomeAdjustmentLevel(value) {
        adjustCompsPage.incomeAdjustmentLevelRadio.check(value);
        adjustCompsPage.getElementToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    enterSizeAdjustmentByColumn(value, index= 0) {
        adjustCompsPage.sizeAdjustmentCells.eq(index).clear().type(value).should("have.value", `${value}%`);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    enterConditionAdjustmentByColumn(value, index= 0) {
        adjustCompsPage.conditionAdjustmentCells.eq(index).clear().type(value).should("have.value", `${value}%`);
        return this;
    }

    /**
     *
     * @param {string} newName
     * @returns {AdjustCompsActions}
     */
    editOtherAdjustmentRowName(newName) {
        adjustCompsPage.otherAdjustmentsEditButton.click();
        adjustCompsPage.otherAdjustmentNameInputField.clear().type(newName).should("have.value", newName);
        adjustCompsPage.otherAdjustmentNameSaveButton.click();
        adjustCompsPage.getRowNameTitleElement(newName).should("exist");
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    enterOtherAdjustmentByColumn(value, index= 0) {
        adjustCompsPage.otherAdjustmentCells.eq(index).clear().type(value).should("have.value", `${value}%`);
        return this;
    }

    /**
     *
     * @param {string} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    verifyTrendedPriceByColumn(value, index) {
        adjustCompsPage.trendedPriceCells.eq(index).should("have.text", value);
        return this;
    }

    /**
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    verifyAdjustedPriceByColumn(index = 0) {
        adjustCompsPage.trendedPriceCells.eq(index).invoke("text").then(trendedText => {
            const trendedNumber = getNumberFromDollarNumberWithCommas(trendedText);
            adjustCompsPage.netPropertyAdjustmentsCells.eq(index).invoke("text").then(netAdjText => {
                const netAdjNumber = Number(netAdjText.replace("%", ""));
                const adjustedPriceToBe = trendedNumber + (trendedNumber * (netAdjNumber / 100));
                let adjustedPriceText;
                if (adjustedPriceToBe < 0) {
                    adjustedPriceText = `-$${numberWithCommas(getNumberWithDecimalPart(adjustedPriceToBe)
                        .replace("-", ""))}`;
                } else {
                    adjustedPriceText = `$${numberWithCommas(getNumberWithDecimalPart(adjustedPriceToBe))}`;
                }
                adjustCompsPage.adjustedPriceCells.eq(index).should("have.text", adjustedPriceText);
            });
        });
        return this;
    }

    /**
     * @param {number} index
     */
    verifyNetPropertyAdjustmentsByCompIndex(index = 0) {
        adjustCompsPage.getAllAdjustmentCellsByCompIndex(index).then(cells => {
            const adjustmentsValues = Array.from(cells).filter((el, index) => index > 3)
                .map(cell => cell.value).map(cellText => Number(cellText.replace("%", "")));
            const netPropAdjustmentsToBe = adjustmentsValues.reduce((sum, prevValue) => sum + prevValue, 0);
            adjustCompsPage.netPropertyAdjustmentsCells.eq(index).should("have.text", `${netPropAdjustmentsToBe}%`);
        });
        return this;
    }

    /**
     * @param {number | string} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    enterPropertyRightsByColumn(value, index = 0) {
        adjustCompsPage.propertyRightsCells.eq(index).clear().type(value).should("have.value", `${value}%`);
        return this;
    }
}

export default new AdjustCompsActions();