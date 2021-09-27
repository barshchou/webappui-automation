import unitGroupsPage from "../../../pages/income/residental/unitGroups.page";
import BaseActions from "../../base/base.actions";

class UnitGroupsActions extends BaseActions {
    verifyThatPageIsOpened() {
        unitGroupsPage.pageHeaderSection.should("be.visible");
    }
}

export default new UnitGroupsActions();