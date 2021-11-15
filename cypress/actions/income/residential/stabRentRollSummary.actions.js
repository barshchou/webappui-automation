import BaseActions from "../../base/base.actions";
import stabRentRollSummaryPage from "../../../pages/income/residential/stabRentRollSummary.page";

class StabilizedRentRollSummaryActions extends BaseActions{
    verifyAnnualRentByRow(rentToBe, rowNumber = 0) {
        stabRentRollSummaryPage.annualRentCells.eq(rowNumber).should("have.text", rentToBe);
    }

    verifyTotalAnnualRent(rentToBe) {
        stabRentRollSummaryPage.totalAnnualRent.should("have.text", rentToBe);
    }

    verifyIncreaseValueByRow(value = 1, rowNumber = 0) {
        stabRentRollSummaryPage.increaseCells.eq(rowNumber).should("have.value", value);
    }

    verifyPGICellByRow(pgiToBe, rowNumber = 0) {
        stabRentRollSummaryPage.pgiCells.eq(rowNumber).should("have.text", pgiToBe);
    }

    verifyPGITotal(pgiToBe) {
        stabRentRollSummaryPage.pgiTotal.should("have.text", pgiToBe);
    }

    openDiscussionTab() {
        stabRentRollSummaryPage.summaryDiscussionTab.click();
    }

    verifyStabRRSummaryDiscussion(commToBe) {
        stabRentRollSummaryPage.stabRRSummaryDiscussion.should("have.text", commToBe);
    }

    verifyGrossIncomeDiscussion(commToBe) {
        stabRentRollSummaryPage.grossIncomeDiscussion.should("have.text", commToBe);
    }

    verifyDistributionSummary(commToBe) {
        stabRentRollSummaryPage.distributionSummary.should("have.text", commToBe);
    }
}

export default new StabilizedRentRollSummaryActions();
