import BaseActions from "../../base/base.actions";
import otherPage from "../../../pages/income/miscellaneous/other.page";

class OtherActions extends BaseActions {

    /**
     *
     * @returns {OtherActions}
     */
    verifyPageIsOpened() {
        otherPage.pageHeader.should("exist");
        return this;
    }

}

export default new OtherActions();
