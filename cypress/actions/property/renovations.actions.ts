import renovationsPage from "../../pages/property/renovations.page";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

class RenovationsActions extends BaseActionsExt<typeof renovationsPage> {

    chooseRenovationByValue(value: BoweryReports.RenovationType): RenovationsActions {
        renovationsPage.prospectiveRenovationsDropdown.click();
        renovationsPage.getDropdownOptionByValue(value).click();
        renovationsPage.prospectiveRenovationsDropdown.should("have.text", value);
        return this;
    }

    clickTotalButton(): RenovationsActions {
        renovationsPage.totalButton.click();
        return this;
    }

    enterRenovationPeriod(period: number): RenovationsActions {
        renovationsPage.renovationPeriodInput.clear().type(`${period}`).should("have.value", period);
        return this;
    }

    enterTotalAmount(amount: number): RenovationsActions {
        if (isHasDecimalPartMoreNumberOfDigits(amount)) {
            amount = cutDecimalPartToNumberOfDigits(amount);
        }
        renovationsPage.totalAmountInput.clear().type(`${amount}`).should("have.value", numberWithCommas(amount));
        return this;
    }

    fillTotalTable(period: number, totalAmount: number): RenovationsActions {
        this.enterRenovationPeriod(period)
            .enterTotalAmount(totalAmount);
        return this;
    }

    verifyNetTotalRenovationBudget(budgetToBe: number): RenovationsActions {
        if (isHasDecimalPartMoreNumberOfDigits(budgetToBe)) {
            budgetToBe = cutDecimalPartToNumberOfDigits(budgetToBe);
        }
        renovationsPage.netRenovationTotalBudget.should("have.text", `$ ${numberWithCommas(budgetToBe.toFixed(2))}`);
        return this;
    }

    editCommentary(newCommentary: string): RenovationsActions {
        renovationsPage.editCommentaryButton.click();
        renovationsPage.commentaryTextArea.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }
}

export default new RenovationsActions(renovationsPage);
