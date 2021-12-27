import unitGroupsPage from "../../../pages/income/residential/unitGroups.page";
import BaseActions from "../../base/base.actions";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class UnitGroupsActions extends BaseActions {

    /**
     *
     * @returns {UnitGroupsActions}
     */
    verifyThatPageIsOpened() {
        unitGroupsPage.pageHeaderSection.should("be.visible");
        return this;
    }

    /**
     *
     * @param {number, string} bedroomsNumber
     * @param {number, string} numberOfUnits
     * @returns {UnitGroupsActions}
     */
    verifyRowsNumberEqualBedroomsNonComp(bedroomsNumber, numberOfUnits) {
        unitGroupsPage.getBedroomEqualTableRowsNoneComp(bedroomsNumber).should("have.length", numberOfUnits);
        return this;
    }

    /**
     *
     * @param {number} percentage
     * @returns {UnitGroupsActions}
     */
    verifyGLAPercentage(percentage = 90) {
        unitGroupsPage.glaPercentage.should("have.value", percentage);
        return this;
    }

    /**
     *
     * @param {number} size
     * @returns {UnitGroupsActions}
     */
    verifyRoomSize(size = 230) {
        unitGroupsPage.roomSize.should("have.value", size);
        return this;
    }

    /**
     *
     * @param {number} grossArea
     * @param {number} glaPercentage
     * @returns {UnitGroupsActions}
     */
    verifyGLAValue(grossArea, glaPercentage = 90) {
        const valueToBe = numberWithCommas(Math.round(grossArea / 100 * glaPercentage));
        unitGroupsPage.glaValue.should("be.disabled").should("have.value", `${valueToBe} sqft`);
        return this;
    }

    /**
     *
     * @param {string} type
     * @param {string, number} avgSF
     * @returns {UnitGroupsActions}
     */
    enterAvgSFByUnitTypeValue(type, avgSF) {
        unitGroupsPage.getAvgSFInputByUnitTypeValue(type).clear().type(avgSF).should("have.value", avgSF);
        return this;
    }

    /**
     *
     * @param {number} grossArea
     * @param {number} glaPercentage
     * @returns {UnitGroupsActions}
     */
    verifyGLACellValue(grossArea, glaPercentage = 90) {
        const valueToBe = numberWithCommas(Math.round(grossArea / 100 * glaPercentage));
        unitGroupsPage.glaCell.should("have.text", `${valueToBe} sqft`);
        return this;
    }

    /**
     *
     * @param {number} avgSF
     * @param {number} unitsNumber
     * @returns {UnitGroupsActions}
     */
    verifyTotalAvgSqftEqualUnits(avgSF, unitsNumber) {
        const textToBe = numberWithCommas(Math.round(avgSF * unitsNumber));
        unitGroupsPage.totalAverageSqftCell.should("have.text", `${textToBe} sqft`);
        return this;
    }
}

export default new UnitGroupsActions();