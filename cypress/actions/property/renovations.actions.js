import BaseActions from "../base/base.actions";
import renovationsPage from "../../pages/property/renovations.page";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class RenovationsActions extends BaseActions{

    /**
     *
     * @param {string} value
     * @returns {RenovationsActions}
     */
    chooseRenovationByValue(value) {
        renovationsPage.prospectiveRenovationsDropdown.click();
        renovationsPage.getDropdownOptionByValue(value).click();
        renovationsPage.prospectiveRenovationsDropdown.should("have.text", value);
        return this;
    }

    /**
     *
     * @returns {RenovationsActions}
     */
    clickTotalButton() {
        renovationsPage.totalButton.click();
        return this;
    }

    /**
     *
     * @param {number} period
     * @returns {RenovationsActions}
     */
    enterRenovationPeriod(period) {
        renovationsPage.renovationPeriodInput.clear().type(period).should("have.value", period);
        return this;
    }

    /**
     *
     * @param {number} amount
     * @returns {RenovationsActions}
     */
    enterTotalAmount(amount) {
        if (isHasDecimalPartMoreNumberOfDigits(amount)) {
            amount = cutDecimalPartToNumberOfDigits(amount);
        }
        renovationsPage.totalAmountInput.clear().type(amount).should("have.value", numberWithCommas(amount));
        return this;
    }

    /**
     *
     * @param {number} period
     * @param {number} totalAmount
     * @returns {RenovationsActions}
     */
    fillTotalTable(period, totalAmount) {
        this.enterRenovationPeriod(period)
            .enterTotalAmount(totalAmount);
        return this;
    }

    /**
     *
     * @param {number} budgetToBe
     * @returns {RenovationsActions}
     */
    verifyNetTotalRenovationBudget(budgetToBe) {
        if (isHasDecimalPartMoreNumberOfDigits(budgetToBe)) {
            budgetToBe = cutDecimalPartToNumberOfDigits(budgetToBe);
        }
        renovationsPage.netRenovationTotalBudget.should("have.text", `$ ${numberWithCommas(budgetToBe.toFixed(2))}`);
        return this;
    }

    /**
     *
     * @param {string} newCommentary
     * @returns {RenovationsActions}
     */
    editCommentary(newCommentary) {
        renovationsPage.editCommentaryButton.click();
        renovationsPage.commentaryTextArea.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }
}

export default new RenovationsActions();
