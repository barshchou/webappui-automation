import highestBestUsePage from "../../pages/final/highestBestUse.page";
import { numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class HighestBestUseActions extends BaseActionsExt<typeof highestBestUsePage> {

    verifyZoneNameByRow(name: string, index = 0): HighestBestUseActions {
        highestBestUsePage.zonesCells.eq(index).should("have.text", name);
        return this;
    }

    verifyAllowableUsesByRow(uses: string, index = 0): HighestBestUseActions {
        highestBestUsePage.allowableUsesCells.eq(index).should("have.text", uses);
        return this;
    }

    verifySiteAreaByRow(area: string | number, index = 0): HighestBestUseActions {
        area = typeof area === "string" ? area : numberWithCommas(area);
        highestBestUsePage.siteAreaCells.eq(index).should("have.text", area);
        return this;
    }

    verifyZoningAreaByRow(area: string | number, index = 0): HighestBestUseActions {
        area = typeof area === "string" ? area : numberWithCommas(area);
        highestBestUsePage.zoningFloorAreaCells.eq(index).should("have.text", area);
        return this;
    }

    clickPhysicallyTab(): HighestBestUseActions {
        highestBestUsePage.physicallyTab.click();
        return this;
    }

    verifyPropertyFrontage(frontage: number | string): HighestBestUseActions {
        highestBestUsePage.propertyFrontage.should("have.text", `${frontage} ft`);
        return this;
    }

    verifyPropertyCondition(condition: string): HighestBestUseActions {
        highestBestUsePage.propertyCondition.should("have.text", condition);
        return this;
    }

    verifyComplyingBulk(bulk: string): HighestBestUseActions {
        highestBestUsePage.complyingBulk.should("have.text", bulk);
        return this;
    }

    verifyConformingUse(use: string): HighestBestUseActions {
        highestBestUsePage.conformingUse.should("have.text", use);
        return this;
    }

    verifyUnitType(type: string): HighestBestUseActions {
        highestBestUsePage.unitType.should("have.text", type);
        return this;
    }

    verifyUnitsNumber(number: string | number): HighestBestUseActions {
        highestBestUsePage.unitsNumber.should("have.text", `${number}`);
        return this;
    }

    checkSizeWithinRangeCheckbox(): HighestBestUseActions {
        highestBestUsePage.sizeWithinRangeCheckbox.check().should("have.value", "true");
        return this;
    }

    checkUtilitiesAvailableCheckbox(): HighestBestUseActions {
        highestBestUsePage.utilitiesAvailableCheckbox.check().should("have.value", "true");
        return this;
    }

    clickFinanciallyTab(): HighestBestUseActions {
        highestBestUsePage.financiallyTab.click();
        return this;
    }

    checkSubjectMarketRadioValue(value: string): HighestBestUseActions {
        highestBestUsePage.subjectMarketRadio.check(value);
        highestBestUsePage.getSubjectMarketElementToCheckRadio(value).should("exist");
        return this;
    }

    checkAsVacantBestUsePropTypeRadioValue(value: string): HighestBestUseActions {
        highestBestUsePage.asVacantBestUsePropTypeRadio.check(value);
        highestBestUsePage.getAsVacantBestUseElToCheckRadio(value).should("exist");
        return this;
    }

    addFinanciallyFeasiblePropertyTypesAsVacant(types: string | Array<string>): HighestBestUseActions {
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

    private checkDropdownOptionByQaAttribute(attr: string): HighestBestUseActions {
        highestBestUsePage.getDropdownOptionByQaAttr(attr).check().should("have.value", "true");
        return this;
    }

    uncheckNewConstructionFeasibleCheckbox(): HighestBestUseActions {
        highestBestUsePage.newConstructionFeasibleCheckbox.uncheck();
        highestBestUsePage.newConstructionFeasibleChecked.should("not.exist");
        return this;
    }

    checkAsImprovedBestUseRadioValue(value: string): HighestBestUseActions {
        highestBestUsePage.asImprovedBestUsePropTypeRadio.check(value);
        highestBestUsePage.getAsImprovedBestUseElToCheckRadio(value).should("exist");
        return this;
    }

    addFinanciallyFeasiblePropertyTypesAsImproved(types: string | Array<string>): HighestBestUseActions {
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

    clickHighestUseTab(): HighestBestUseActions {
        highestBestUsePage.highestUseTab.click();
        return this;
    }

    verifyAsVacantBestUseType(type: string): HighestBestUseActions {
        highestBestUsePage.asVacantBestUseType.should("have.text", type);
        return this;
    }

    verifyAsVacantFeasiblePropTypes(type: string): HighestBestUseActions {
        highestBestUsePage.asVacantFeasiblePropTypes.should("have.text", type);
        return this;
    }

    verifyAsVacantHighestUse(bestUseType: string, feasiblePropType: string): HighestBestUseActions {
        this.verifyAsVacantBestUseType(bestUseType)
            .verifyAsVacantFeasiblePropTypes(feasiblePropType);
        return this;
    }

    verifyAsImprovedBestUseType(type: string): HighestBestUseActions {
        highestBestUsePage.asImprovedBestUseType.should("have.text", type);
        return this;
    }

    verifyAsImprovedFeasiblePropTypes(type: string): HighestBestUseActions {
        highestBestUsePage.asImprovedFeasiblePropTypes.should("have.text", type);
        return this;
    }

    verifyAsImprovedHighestUse(bestUseType: string, feasiblePropType: string): HighestBestUseActions {
        this.verifyAsImprovedBestUseType(bestUseType)
            .verifyAsImprovedFeasiblePropTypes(feasiblePropType);
        return this;
    }

    clickProbableBuyerTab(): HighestBestUseActions {
        highestBestUsePage.probableBuyerTab.click();
        return this;
    }

    checkLocalCheckbox(): HighestBestUseActions {
        highestBestUsePage.localCheckbox.check().should("have.value", "true");
        return this;
    }

    checkRegionalCheckbox(): HighestBestUseActions {
        highestBestUsePage.regionalCheckbox.check().should("have.value", "true");
        return this;
    }

}

export default new HighestBestUseActions(highestBestUsePage);