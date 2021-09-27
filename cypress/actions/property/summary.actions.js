import summaryPage from "../../pages/property/summary.page";
import BaseActions from "../base/base.actions";

class SummaryActions extends BaseActions {
    verifyThatPageIsOpened() {
        summaryPage.headerSection.should("be.visible");
    }

    enterNumberOfUnits(number) {
        summaryPage.numberOfUnitsInput.clear().type(number).should("have.value", number);
    }
}

export default new SummaryActions();