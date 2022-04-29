import unitGroupsPage from "../../../pages/income/residential/unitGroups.page";
import {numberWithCommas} from "../../../../utils/numbers.utils";
import BaseActionsExt from "../../base/base.actions.ext";

class UnitGroupsActions extends BaseActionsExt<typeof unitGroupsPage> {

    verifyRowsNumberEqualBedroomsNonComp(bedroomsNumber: number | string, numberOfUnits: number | string): UnitGroupsActions {
        unitGroupsPage.getBedroomEqualTableRowsNoneComp(bedroomsNumber).should("have.length", numberOfUnits);
        return this;
    }

    verifyGLAPercentage(percentage = 90): UnitGroupsActions {
        unitGroupsPage.glaPercentage.should("have.value", percentage);
        return this;
    }

    verifyRoomSize(size = 230): UnitGroupsActions {
        unitGroupsPage.roomSize.should("have.value", size);
        return this;
    }

    verifyGLAValue(grossArea: number, glaPercentage = 90): UnitGroupsActions {
        const valueToBe = numberWithCommas(Math.round(grossArea / 100 * glaPercentage));
        unitGroupsPage.glaValue.should("be.disabled").should("have.value", `${valueToBe} sqft`);
        return this;
    }

    enterAvgSFByUnitTypeValue(type: string, avgSF: string): UnitGroupsActions {
        unitGroupsPage.getAvgSFInputByUnitTypeValue(type).clear().type(avgSF).should("have.value", avgSF);
        return this;
    }

    verifyGLACellValue(grossArea: number, glaPercentage = 90): UnitGroupsActions {
        const valueToBe = numberWithCommas(Math.round(grossArea / 100 * glaPercentage));
        unitGroupsPage.glaCell.should("have.text", `${valueToBe} sqft`);
        return this;
    }

    verifyTotalAvgSqftEqualUnits(avgSF: number, unitsNumber: number): UnitGroupsActions {
        const textToBe = numberWithCommas(Math.round(avgSF * unitsNumber));
        unitGroupsPage.totalAverageSqftCell.should("have.text", `${textToBe} sqft`);
        return this;
    }

    clickChangeButton() {
        unitGroupsPage.changeButton.click();
        return this;
    }

    checkCompGroupRadio(value: string): UnitGroupsActions {
        unitGroupsPage.getSelectCompGroupRadio.check(value);
        return this;
    }
}

export default new UnitGroupsActions(unitGroupsPage);