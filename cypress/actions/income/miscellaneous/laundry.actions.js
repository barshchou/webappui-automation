import BaseActions from "../../base/base.actions";
import laundryPage from "../../../pages/income/miscellaneous/laundry.page";

class LaundryActions extends BaseActions{

    /**
     *
     * @returns {LaundryActions}
     */
    verifyNoLaundryButtonExists() {
        laundryPage.noLaundryButton.should("exist");
        return this;
    }
}

export default new LaundryActions();
