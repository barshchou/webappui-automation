import BaseActions from "../../base/base.actions";
import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";

class StabilizedRentRollActions extends BaseActions{

    /**
     *
     * @returns {StabilizedRentRollActions}
     */
    verifyIsInspectedChecked() {
        stabRenRollPage.elementToVerifyIsInspected.should("have.css", "background-color", "rgb(66, 96, 211)");
        return this;
    }
}

export default new StabilizedRentRollActions();