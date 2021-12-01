import unitGroupsPage from "../../../pages/income/residential/unitGroups.page";
import BaseActions from "../../base/base.actions";
import {numberWithCommas} from "../../../../utils/numbers.utils";

class UnitGroupsActions extends BaseActions {
    verifyThatPageIsOpened() {
        unitGroupsPage.pageHeaderSection.should("be.visible");
    }

    verifyRowsNumberEqualBedroomsNonComp(bedroomsNumber, numberOfUnits) {
        unitGroupsPage.getBedroomEqualTableRowsNoneComp(bedroomsNumber).should("have.length", numberOfUnits);
    }

    verifyGLAPercentage(percentage = 90) {
        unitGroupsPage.glaPercentage.should("have.value", percentage);
    }

    verifyRoomSize(size = 230) {
        unitGroupsPage.roomSize.should("have.value", size);
    }

    verifyGLAValue(grossArea, glaPercentage = 90) {
        const valueToBe = numberWithCommas(Math.round(grossArea / 100 * glaPercentage));
        unitGroupsPage.glaValue.should("be.disabled").should("have.value", `${valueToBe} sqft`);
    }

    enterAvgSFByUnitTypeValue(type, avgSF) {
        unitGroupsPage.getAvgSFInputByUnitTypeValue(type).clear().type(avgSF).should("have.value", avgSF);
    }

    verifyGLACellValue(grossArea, glaPercentage = 90) {
        const valueToBe = numberWithCommas(Math.round(grossArea / 100 * glaPercentage));
        unitGroupsPage.glaCell.should("have.text", `${valueToBe} sqft`);
    }

    verifyTotalAvgSqftEqualUnits(avgSF, unitsNumber) {
        const textToBe = numberWithCommas(Math.round(avgSF * unitsNumber));
        unitGroupsPage.totalAverageSqftCell.should("have.text", `${textToBe} sqft`);
    }
}

export default new UnitGroupsActions();