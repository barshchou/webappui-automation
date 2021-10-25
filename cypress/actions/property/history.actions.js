import BaseActions from "../base/base.actions";
import historyPage from "../../pages/property/history.page";
import {isDateHasCorrectFormat} from "../../../utils/date.utils";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class HistoryActions extends BaseActions{
    enterCurrentOwner(owner) {
        historyPage.currentOwnerField.clear().type(owner).should("have.value", owner);
    }

    checkIsUnderContractCheckbox() {
        historyPage.isUnderContractCheckbox.check().should("have.value", "true");
    }

    enterContractDetails(buyer, contractDate, contractPrice) {
        historyPage.buyerField.should("exist").clear().type(buyer).should("have.value", buyer);
        historyPage.contractDate.clear().type(contractDate);
        if (isDateHasCorrectFormat(contractDate)) {
            historyPage.inputToCheckDate.should("have.value", contractDate);
        } else {
            historyPage.errorMessage.should("exist");
        }
        if (isHasDecimalPartMoreNumberOfDigits(contractPrice)) {
            contractPrice = cutDecimalPartToNumberOfDigits(contractPrice);
        }
        const textToBe = numberWithCommas(contractPrice);
        historyPage.contractPrice.clear().type(contractPrice).should("have.value", textToBe);
    }
}

export default new HistoryActions();