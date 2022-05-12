import BaseActions from "../base/base.actions";
import historyPage from "../../pages/property/history.page";
import { isDateHasCorrectFormat } from "../../../utils/date.utils";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";

class HistoryActions extends BaseActions{

    /**
     *
     * @param {string} owner
     * @returns {HistoryActions}
     */
    enterCurrentOwner(owner) {
        historyPage.currentOwnerField.clear().type(owner).should("have.value", owner);
        return this;
    }

    /**
     *
     * @returns {HistoryActions}
     */
    checkIsUnderContractCheckbox() {
        historyPage.isUnderContractCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @param {Readonly<{buyer: string, contractDate: string, contractPrice: number}>} contractDetails
     * @returns {HistoryActions}
     */
    enterContractDetails(contractDetails) {
        historyPage.buyerField.should("exist").clear().type(contractDetails.buyer)
            .should("have.value", contractDetails.buyer);
        historyPage.contractDate.clear().type(contractDetails.contractDate);
        if (isDateHasCorrectFormat(contractDetails.contractDate)) {
            historyPage.inputToCheckDate.should("have.value", contractDetails.contractDate);
        } else {
            historyPage.errorMessage.should("exist");
        }
        let contractPrice = contractDetails.contractPrice;
        if (isHasDecimalPartMoreNumberOfDigits(contractPrice)) {
            contractPrice = cutDecimalPartToNumberOfDigits(contractPrice);
        }
        const textToBe = numberWithCommas(contractPrice);
        historyPage.contractPrice.clear().type(contractPrice).should("have.value", textToBe);
        return this;
    }
}

export default new HistoryActions();