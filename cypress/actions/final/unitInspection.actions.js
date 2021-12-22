import BaseActions from "../base/base.actions";
import unitInspectionPage from "../../pages/final/unitInspection.page";

class UnitInspectionActions extends BaseActions {

    /**
     *
     * @param {number} inspectedNumber
     * @returns {UnitInspectionActions}
     */
    verifyNumberOfInspectedUnitsCommentary(inspectedNumber = 1) {
        if (inspectedNumber === 0) {
            unitInspectionPage.generatedCommentary.should("have.text", "We have not inspected any units.");
        } else {
            unitInspectionPage.generatedCommentary.should("contain.text", `We inspected ${inspectedNumber}`);
        }
        return this;
    }

    /**
     *
     * @param {number} number
     * @returns {UnitInspectionActions}
     */
    verifyNumberOfInspectedUnitsRows(number) {
        unitInspectionPage.numberCells.should("have.length", number);
        return this;
    }

    /**
     *
     * @param value
     * @param rowNumber
     * @returns {UnitInspectionActions}
     */
    chooseReadyForOccupancyValueByRow(value, rowNumber = 0) {
        unitInspectionPage.readyForOccupancyDropdowns.eq(rowNumber).click();
        unitInspectionPage.getDropdownOptionByValue(value).click();
        return this;
    }

    /**
     *
     * @param {Array<string>} values
     * @returns {UnitInspectionActions}
     */
    chooseListReadyForOccupancyValues(values) {
        values.forEach((value, index) => {
            this.chooseReadyForOccupancyValueByRow(value, index);
        });
        return this;
    }
}

export default new UnitInspectionActions();