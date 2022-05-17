import BaseActions from "../base/base.actions";
import highestBestUsePage from "../../pages/final/highestBestUse.page";
import { numberWithCommas } from "../../../utils/numbers.utils";

class HighestBestUseActions extends BaseActions {

    /**
     *
     * @param {string} name
     * @param index
     * @returns {HighestBestUseActions}
     */
    verifyZoneNameByRow(name, index = 0) {
        highestBestUsePage.zonesCells.eq(index).should("have.text", name);
        return this;
    }

    /**
     *
     * @param {string} uses
     * @param {number} index
     * @returns {HighestBestUseActions}
     */
    verifyAllowableUsesByRow(uses, index = 0) {
        highestBestUsePage.allowableUsesCells.eq(index).should("have.text", uses);
        return this;
    }

    /**
     *
     * @param {string} area
     * @param {number} index
     * @returns {HighestBestUseActions}
     */
    verifySiteAreaByRow(area, index = 0) {
        area = typeof area === "string" ? area : numberWithCommas(area);
        highestBestUsePage.siteAreaCells.eq(index).should("have.text", area);
        return this;
    }

    /**
     *
     * @param {string} area
     * @param {number} index
     * @returns {HighestBestUseActions}
     */
    verifyZoningAreaByRow(area, index = 0) {
        area = typeof area === "string" ? area : numberWithCommas(area);
        highestBestUsePage.zoningFloorAreaCells.eq(index).should("have.text", area);
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    clickPhysicallyTab() {
        highestBestUsePage.physicallyTab.click();
        return this;
    }

    /**
     *
     * @param {number | string} frontage
     * @returns {HighestBestUseActions}
     */
    verifyPropertyFrontage(frontage) {
        highestBestUsePage.propertyFrontage.should("have.text", `${frontage} ft`);
        return this;
    }

    /**
     *
     * @param {string} condition
     * @returns {HighestBestUseActions}
     */
    verifyPropertyCondition(condition) {
        highestBestUsePage.propertyCondition.should("have.text", condition);
        return this;
    }

    /**
     *
     * @param {string} bulk
     * @returns {HighestBestUseActions}
     */
    verifyComplyingBulk(bulk) {
        highestBestUsePage.complyingBulk.should("have.text", bulk);
        return this;
    }

    /**
     *
     * @param use
     * @returns {HighestBestUseActions}
     */
    verifyConformingUse(use) {
        highestBestUsePage.conformingUse.should("have.text", use);
        return this;
    }

    /**
     *
     * @param {string} type
     * @returns {HighestBestUseActions}
     */
    verifyUnitType(type) {
        highestBestUsePage.unitType.should("have.text", type);
        return this;
    }

    /**
     *
     * @param {string | number} number
     * @returns {HighestBestUseActions}
     */
    verifyUnitsNumber(number) {
        highestBestUsePage.unitsNumber.should("have.text", `${number}`);
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    checkSizeWithinRangeCheckbox() {
        highestBestUsePage.sizeWithinRangeCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    checkUtilitiesAvailableCheckbox() {
        highestBestUsePage.utilitiesAvailableCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    clickFinanciallyTab() {
        highestBestUsePage.financiallyTab.click();
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {HighestBestUseActions}
     */
    checkSubjectMarketRadioValue(value) {
        highestBestUsePage.subjectMarketRadio.check(value);
        highestBestUsePage.getSubjectMarketElementToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {HighestBestUseActions}
     */
    checkAsVacantBestUsePropTypeRadioValue(value) {
        highestBestUsePage.asVacantBestUsePropTypeRadio.check(value);
        highestBestUsePage.getAsVacantBestUseElToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string | Array<string>} types
     * @returns {HighestBestUseActions}
     */
    addFinanciallyFeasiblePropertyTypesAsVacant(types) {
        highestBestUsePage.asVacantFeasiblePropTypesDropdown.click();
        if (Array.isArray(types)) {
            types.forEach(type => {
                this.checkDropdownOptionByQaAttribute(type);
            });
        } else {
            this.checkDropdownOptionByQaAttribute(types);
        }
        highestBestUsePage.financiallyFeasibleHeader.click();
        return this;
    }

    /**
     * @private
     * @param {string} attr
     * @returns {HighestBestUseActions}
     */
    checkDropdownOptionByQaAttribute(attr) {
        highestBestUsePage.getDropdownOptionByQaAttr(attr).check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    uncheckNewConstructionFeasibleCheckbox() {
        highestBestUsePage.newConstructionFeasibleCheckbox.uncheck();
        highestBestUsePage.newConstructionFeasibleChecked.should("not.exist");
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {HighestBestUseActions}
     */
    checkAsImprovedBestUseRadioValue(value) {
        highestBestUsePage.asImprovedBestUsePropTypeRadio.check(value);
        highestBestUsePage.getAsImprovedBestUseElToCheckRadio(value).should("exist");
        return this;
    }

    /**
     *
     * @param {string | Array<string>} types
     * @returns {HighestBestUseActions}
     */
    addFinanciallyFeasiblePropertyTypesAsImproved(types) {
        highestBestUsePage.asImprovedFeasiblePropTypesDropdown.click();
        if (Array.isArray(types)) {
            types.forEach(type => {
                this.checkDropdownOptionByQaAttribute(type);
            });
        } else {
            this.checkDropdownOptionByQaAttribute(types);
        }
        highestBestUsePage.financiallyFeasibleHeader.click();
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    clickHighestUseTab() {
        highestBestUsePage.highestUseTab.click();
        return this;
    }

    /**
     *
     * @param {string} type
     * @returns {HighestBestUseActions}
     */
    verifyAsVacantBestUseType(type) {
        highestBestUsePage.asVacantBestUseType.should("have.text", type);
        return this;
    }

    /**
     *
     * @param {string} type
     * @returns {HighestBestUseActions}
     */
    verifyAsVacantFeasiblePropTypes(type) {
        highestBestUsePage.asVacantFeasiblePropTypes.should("have.text", type);
        return this;
    }

    /**
     *
     * @param {string} bestUseType
     * @param {string} feasiblePropType
     * @returns {HighestBestUseActions}
     */
    verifyAsVacantHighestUse(bestUseType, feasiblePropType) {
        this.verifyAsVacantBestUseType(bestUseType)
            .verifyAsVacantFeasiblePropTypes(feasiblePropType);
        return this;
    }

    /**
     *
     * @param {string} type
     * @returns {HighestBestUseActions}
     */
    verifyAsImprovedBestUseType(type) {
        highestBestUsePage.asImprovedBestUseType.should("have.text", type);
        return this;
    }

    /**
     *
     * @param {string} type
     * @returns {HighestBestUseActions}
     */
    verifyAsImprovedFeasiblePropTypes(type) {
        highestBestUsePage.asImprovedFeasiblePropTypes.should("have.text", type);
        return this;
    }

    /**
     *
     * @param {string} bestUseType
     * @param {string} feasiblePropType
     * @returns {HighestBestUseActions}
     */
    verifyAsImprovedHighestUse(bestUseType, feasiblePropType) {
        this.verifyAsImprovedBestUseType(bestUseType)
            .verifyAsImprovedFeasiblePropTypes(feasiblePropType);
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    clickProbableBuyerTab() {
        highestBestUsePage.probableBuyerTab.click();
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    checkLocalCheckbox() {
        highestBestUsePage.localCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @returns {HighestBestUseActions}
     */
    checkRegionalCheckbox() {
        highestBestUsePage.regionalCheckbox.check().should("have.value", "true");
        return this;
    }

}

export default new HighestBestUseActions();