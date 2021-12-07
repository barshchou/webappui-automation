import BaseActions from "../base/base.actions";
import adjustCompsPage from "../../pages/sales/adjustComps.page";

class AdjustCompsActions extends BaseActions {

    checkCalculationUnitsRadio(value) {
        adjustCompsPage.calculationUnitsRadio.check(value);
        adjustCompsPage.getElementToCheckRadio(value).should("exist");
    }

    checkIncomeAdjustmentLevel(value) {
        adjustCompsPage.incomeAdjustmentLevelRadio.check(value);
        adjustCompsPage.getElementToCheckRadio(value).should("exist");
    }

    enterSizeAdjustmentByColumn(value, index) {
        adjustCompsPage.sizeAdjustmentCells.eq(index).clear().type(value).should("have.value", `${value}%`);
    }

    enterConditionAdjustmentByColumn(value, index) {
        adjustCompsPage.conditionAdjustmentCells.eq(index).clear().type(value).should("have.value", `${value}%`);
    }

    editOtherAdjustmentRowName(newName) {
        adjustCompsPage.otherAdjustmentsEditButton.click();
        adjustCompsPage.otherAdjustmentNameInputField.clear().type(newName).should("have.value", newName);
        adjustCompsPage.otherAdjustmentNameSaveButton.click();
        adjustCompsPage.getRowNameTitleElement(newName).should("exist");
    }

    enterOtherAdjustmentByColumn(value, index) {
        adjustCompsPage.otherAdjustmentCells.eq(index).clear().type(value).should("have.value", `${value}%`);
    }

    verifyTrendedPriceByColumn(value, index) {
        adjustCompsPage.trendedPricePerUnitCells.eq(index).should("have.text", value);
    }

    verifyAdjustedPriceByColumn(value, index) {
        adjustCompsPage.adjustedPricePerUnitCells.eq(index).should("have.text", value);
    }

}

export default new AdjustCompsActions();