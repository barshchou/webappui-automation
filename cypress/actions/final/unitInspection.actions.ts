import unitInspectionPage from "../../pages/final/unitInspection.page";
import BaseActionsExt from "../base/base.actions.ext";

class UnitInspectionActions extends BaseActionsExt<typeof unitInspectionPage> {

    verifyNumberOfInspectedUnitsCommentary(inspectedNumber = 1): UnitInspectionActions {
        if (inspectedNumber === 0) {
            unitInspectionPage.generatedCommentary.should("have.text", "We have not inspected any units.");
        } else {
            unitInspectionPage.generatedCommentary.should("contain.text", `We inspected ${inspectedNumber}`);
        }
        return this;
    }

    verifyNumberOfInspectedUnitsRows(number: number): UnitInspectionActions {
        unitInspectionPage.numberCells.should("have.length", number);
        return this;
    }

    chooseReadyForOccupancyValueByRow(value, rowNumber = 0): UnitInspectionActions {
        unitInspectionPage.readyForOccupancyDropdowns.eq(rowNumber).click();
        unitInspectionPage.getDropdownOptionByValue(value).click();
        return this;
    }

    chooseListReadyForOccupancyValues(values: Array<string>): UnitInspectionActions {
        values.forEach((value, index) => {
            this.chooseReadyForOccupancyValueByRow(value, index);
        });
        return this;
    }

    verifyRowExistInTable(rowNumber = 0) {
        unitInspectionPage.getRowInUnitInspectionTable(rowNumber).should("exist");
        return this;
    }

    verifyRowNotExistInTable(rowNumber = 0) {
        unitInspectionPage.getRowInUnitInspectionTable(rowNumber).should("not.exist");
        return this;
    }
}

export default new UnitInspectionActions(unitInspectionPage);