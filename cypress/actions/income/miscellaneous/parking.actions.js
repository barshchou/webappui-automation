import BaseActions from "../../base/base.actions";
import parkingPage from "../../../pages/income/miscellaneous/parking.page";

class ParkingActions extends BaseActions {
    checkIsFreeParkingCheckbox() {
        parkingPage.isParkingFreeCheckbox.check().should("have.value", "true");
    }

    verifyParkingCommentary(commToBe) {
        parkingPage.parkingCommentary.should("have.text", commToBe);
    }
}

export default new ParkingActions();
