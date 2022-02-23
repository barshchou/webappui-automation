import BaseActions from "../../base/base.actions";
import stabRentRollSummaryPage from "../../../pages/income/residential/stabRentRollSummary.page";

class StabilizedRentRollSummaryActions extends BaseActions{

    /**
     *
     * @param {string} rentToBe
     * @param {number} rowNumber
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyAnnualRentByRow(rentToBe, rowNumber = 0) {
        stabRentRollSummaryPage.annualRentCells.eq(rowNumber).should("have.text", rentToBe);
        return this;
    }

    /**
     *
     * @param {string} rentToBe
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyTotalAnnualRent(rentToBe) {
        stabRentRollSummaryPage.totalAnnualRent.should("have.text", rentToBe);
        return this;
    }

    /**
     *
     * @param {number} value
     * @param {number} rowNumber
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyIncreaseValueByRow(value = 1, rowNumber = 0) {
        stabRentRollSummaryPage.increaseCells.eq(rowNumber).should("have.value", value);
        return this;
    }

    /**
     *
     * @param {string} pgiToBe
     * @param {number} rowNumber
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyPGICellByRow(pgiToBe, rowNumber = 0) {
        stabRentRollSummaryPage.pgiCells.eq(rowNumber).should("have.text", pgiToBe);
        return this;
    }

    /**
     *
     * @param {string} pgiToBe
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyPGITotal(pgiToBe) {
        stabRentRollSummaryPage.pgiTotal.should("have.text", pgiToBe);
        return this;
    }

    /**
     *
     * @returns {StabilizedRentRollSummaryActions}
     */
    openDiscussionTab() {
        stabRentRollSummaryPage.summaryDiscussionTab.click();
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyStabRRSummaryDiscussion(commToBe) {
        stabRentRollSummaryPage.stabRRSummaryDiscussion.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyGrossIncomeDiscussion(commToBe) {
        stabRentRollSummaryPage.grossIncomeDiscussion.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {StabilizedRentRollSummaryActions}
     */
    verifyDistributionSummary(commToBe) {
        stabRentRollSummaryPage.distributionSummary.should("have.text", commToBe);
        return this;
    }
}

export default new StabilizedRentRollSummaryActions();
