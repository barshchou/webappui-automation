import BaseActions from "../../base/base.actions";
import otherPage from "../../../pages/income/miscellaneous/other.page";

class OtherActions extends BaseActions {

    verifyPageIsOpened() {
        otherPage.pageHeader.should("exist");
    }

}

export default new OtherActions();
