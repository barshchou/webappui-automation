import BaseActions from "../../base/base.actions";
import stabRenRollPage from "../../../pages/income/commercial/stabilizedRentRoll.page";

class StabilizedRentRollActions extends BaseActions{
    verifyIsInspectedChecked() {
        stabRenRollPage.elementToVerifyIsInspected.should("have.css", "background-color", "rgb(65, 96, 211)");
    }
}

export default new StabilizedRentRollActions();