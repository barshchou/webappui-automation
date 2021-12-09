import BaseActions from "../base/base.actions";
import highestBestUsePage from "../../pages/final/highestBestUse.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class HighestBestUseActions extends BaseActions {

    verifyZoneNameByRow(name, index = 0) {
        highestBestUsePage.zonesCells.eq(index).should("have.text", name);
        return this;
    }

    verifyAllowableUsesByRow(uses, index = 0) {
        highestBestUsePage.allowableUsesCells.eq(index).should("have.text", uses);
        return this;
    }

    verifySiteAreaByRow(area, index = 0) {
        area = typeof area === "string" ? area : numberWithCommas(area);
        highestBestUsePage.siteAreaCells.eq(index).should("have.text", area);
        return this;
    }

    verifyZoningAreaByRow(area, index = 0) {
        area = typeof area === "string" ? area : numberWithCommas(area);
        highestBestUsePage.zoningFloorAreaCells.eq(index).should("have.text", area);
        return this;
    }

    clickPhysicallyTab() {
        highestBestUsePage.physicallyTab.click();
        return this;
    }

    verifyPropertyFrontage(frontage) {
        highestBestUsePage.propertyFrontage.should("have.text", `${frontage} ft`);
        return this;
    }

    verifyPropertyCondition(condition) {
        highestBestUsePage.propertyCondition.should("have.text", condition);
        return this;
    }

    verifyComplyingBulk(bulk) {
        highestBestUsePage.complyingBulk.should("have.text", bulk);
        return this;
    }

    verifyConformingUse(use) {
        highestBestUsePage.conformingUse.should("have.text", use);
        return this;
    }

    verifyUnitType(type) {
        highestBestUsePage.unitType.should("have.text", type);
        return this;
    }

    verifyUnitsNumber(number) {
        highestBestUsePage.unitsNumber.should("have.text", `${number}`);
        return this;
    }

    checkSizeWithinRangeCheckbox() {
        highestBestUsePage.sizeWithinRangeCheckbox.check().should("have.value", "true");
        return this;
    }

    checkUtilitiesAvailableCheckbox() {
        highestBestUsePage.utilitiesAvailableCheckbox.check().should("have.value", "true");
        return this;
    }

    clickFinanciallyTab() {
        highestBestUsePage.financiallyTab.click();
        return this;
    }

    checkSubjectMarketRadioValue(value) {
        highestBestUsePage.subjectMarketRadio.check(value);
        highestBestUsePage.getSubjectMarketElementToCheckRadio(value).should("exist");
        return this;
    }

    checkAsVacantBestUsePropTypeRadioValue(value) {
        highestBestUsePage.asVacantBestUsePropTypeRadio.check(value);
        highestBestUsePage.getAsVacantBestUseElToCheckRadio(value).should("exist");
        return this;
    }

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

    checkDropdownOptionByQaAttribute(attr) {
        highestBestUsePage.getDropdownOptionByQaAttr(attr).check().should("have.value", "true");
    }

    uncheckNewConstructionFeasibleCheckbox() {
        highestBestUsePage.newConstructionFeasibleCheckbox.uncheck().should("have.value", "false");
        return this;
    }

    checkAsImprovedBestUseRadioValue(value) {
        highestBestUsePage.asImprovedBestUsePropTypeRadio.check(value);
        highestBestUsePage.getAsImprovedBestUseElToCheckRadio(value).should("exist");
        return this;
    }

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

    verifyAsVacantBestUseType(type) {
        highestBestUsePage.asVacantBestUseType.should("have.text", type);
        return this;
    }

    verifyAsVacantFeasiblePropTypes(type) {
        highestBestUsePage.asVacantFeasiblePropTypes.should("have.text", type);
        return this;
    }

    verifyAsVacantHighestUse(bestUseType, feasiblePropType) {
        this.verifyAsVacantBestUseType(bestUseType);
        this.verifyAsVacantFeasiblePropTypes(feasiblePropType);
        return this;
    }

    verifyAsImprovedBestUseType(type) {
        highestBestUsePage.asImprovedBestUseType.should("have.text", type);
        return this;
    }

    verifyAsImprovedFeasiblePropTypes(type) {
        highestBestUsePage.asImprovedFeasiblePropTypes.should("have.text", type);
        return this;
    }

    verifyAsImprovedHighestUse(bestUseType, feasiblePropType) {
        this.verifyAsImprovedBestUseType(bestUseType);
        this.verifyAsImprovedFeasiblePropTypes(feasiblePropType);
        return this;
    }

    clickProbableBuyerTab() {
        highestBestUsePage.probableBuyerTab.click();
        return this;
    }

    checkLocalCheckbox() {
        highestBestUsePage.localCheckbox.check().should("have.value", "true");
        return this;
    }

    checkRegionalCheckbox() {
        highestBestUsePage.regionalCheckbox.check().should("have.value", "true");
        return this;
    }

}

export default new HighestBestUseActions();