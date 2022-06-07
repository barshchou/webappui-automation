import BaseActions from "../base/base.actions";
import appraiserPage from "../../pages/report/appraiser.page";
import { _ReportTitles } from "../../enums/pages_titles";

class AppraiserActions extends BaseActions {

    verifyPageOpened() {
        appraiserPage.pageHeader.should("exist").and("contain.text", _ReportTitles.APPRAISERS);
        return this;
    }
}

export default new AppraiserActions();