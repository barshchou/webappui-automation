import BaseActions from "../base/base.actions";
import renovationsPage from "../../pages/property/renovations.page";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class RenovationsActions extends BaseActions{
    chooseRenovationByValue(value) {
        renovationsPage.prospectiveRenovationsDropdown.click();
        renovationsPage.getDropdownOptionByValue(value).click();
        renovationsPage.prospectiveRenovationsDropdown.should("have.text", value);
    }

    clickTotalButton() {
        renovationsPage.totalButton.click();
    }

    enterRenovationPeriod(period) {
        renovationsPage.renovationPeriodInput.clear().type(period).should("have.value", period);
    }

    enterTotalAmount(amount) {
        if (isHasDecimalPartMoreNumberOfDigits(amount)) {
            amount = cutDecimalPartToNumberOfDigits(amount);
        }
        renovationsPage.totalAmountInput.clear().type(amount).should("have.value", numberWithCommas(amount));
    }

    fillTotalTable(period, totalAmount) {
        this.enterRenovationPeriod(period);
        this.enterTotalAmount(totalAmount);
    }

    verifyNetTotalRenovationBudget(budgetToBe) {
        if (isHasDecimalPartMoreNumberOfDigits(budgetToBe)) {
            budgetToBe = cutDecimalPartToNumberOfDigits(budgetToBe);
        }
        renovationsPage.netRenovationTotalBudget.should("have.text", `$ ${numberWithCommas(budgetToBe.toFixed(2))}`);
    }

    editCommentary(newCommentary) {
        renovationsPage.editCommentaryButton.click();
        renovationsPage.commentaryTextArea.clear().type(newCommentary).should("have.text", newCommentary);
    }
}

export default new RenovationsActions();
