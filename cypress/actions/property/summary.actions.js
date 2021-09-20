import summaryPage from "../../pages/property/summary.page";
import BaseActions from "../base/base.actions";

class SummaryActions extends BaseActions {
    verifyThatPageIsOpened() {
        summaryPage.headerSection.should("be.visible")
    }
}

export default new SummaryActions()