import BaseActions from "../../base/base.actions";
import parkingPage from "../../../pages/income/miscellaneous/parking.page";

class ParkingActions extends BaseActions {

    /**
     * @returns {ParkingActions}
     */
    checkIsFreeParkingCheckbox() {
        parkingPage.isParkingFreeCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {ParkingActions}
     */
    verifyParkingCommentary(commToBe) {
        parkingPage.parkingCommentary.should("have.text", commToBe);
        return this;
    }
}

export default new ParkingActions();
