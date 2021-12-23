import BaseActions from "../base/base.actions";
import adjustCompsPage from "../../pages/sales/adjustComps.page";

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
     * @param {number, string} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    enterSizeAdjustmentByColumn(value, index) {
        adjustCompsPage.sizeAdjustmentCells.eq(index).clear().type(value).should("have.value", `${value}%`);
        return this;
    }

    /**
     *
     * @param {number, string} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    enterConditionAdjustmentByColumn(value, index) {
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
     * @param {string, number} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    enterOtherAdjustmentByColumn(value, index) {
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
        adjustCompsPage.trendedPricePerUnitCells.eq(index).should("have.text", value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @param {number} index
     * @returns {AdjustCompsActions}
     */
    verifyAdjustedPriceByColumn(value, index) {
        adjustCompsPage.adjustedPricePerUnitCells.eq(index).should("have.text", value);
        return this;
    }

}

export default new AdjustCompsActions();