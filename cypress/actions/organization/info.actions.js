import BaseActions from "../base/base.actions";
import infoPage from "../../pages/organization/info.page";

class OrganizationInfoActions extends BaseActions{

    verifyPageOpened() {
        infoPage.pageHeader.should("exist");
        return this;
    }
}

export default new OrganizationInfoActions();