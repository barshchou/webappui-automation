import infoPage from "../../pages/organization/info.page";
import BaseActionsExt from "../base/base.actions.ext";

class OrganizationInfoActions extends BaseActionsExt<typeof infoPage> {

    verifyPageOpened() {
        infoPage.pageHeader.should("exist");
        return this;
    }
}

export default new OrganizationInfoActions(infoPage);