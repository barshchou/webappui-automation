import BaseActions from "../base/base.actions";
import appraiserPage from "../../pages/report/appraiser.page";

class AppraiserActions extends BaseActions {

    verifyPageOpened() {
        appraiserPage.pageHeader.should("exist").and("contain.text", "Appraisers");
        return this;
    }
}

export default new AppraiserActions();