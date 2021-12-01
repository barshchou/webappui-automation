import BaseActions from "../../base/base.actions";
import laundryPage from "../../../pages/income/miscellaneous/laundry.page";

class LaundryActions extends BaseActions{

    verifyNoLaundryButtonExists() {
        laundryPage.noLaundryButton.should("exist");
    }
}

export default new LaundryActions();
