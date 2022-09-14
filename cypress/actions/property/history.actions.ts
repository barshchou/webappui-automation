import historyPage from "../../pages/property/history.page";
import { isDateHasCorrectFormat } from "../../../utils/date.utils";
import {
    cutDecimalPartToNumberOfDigits,
    isHasDecimalPartMoreNumberOfDigits,
    numberWithCommas
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class HistoryActions extends BaseActionsExt<typeof historyPage> {

    checkIsUnderContractCheckbox(): HistoryActions {
        historyPage.isUnderContractCheckbox.check().should("have.value", "true");
        return this;
    }

    enterContractDetails(contractDetails: Readonly<{buyer: string, 
        contractDate: string, contractPrice: number}>): HistoryActions {
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
        historyPage.contractPrice.clear().type(`${contractPrice}`).should("have.value", textToBe);
        return this;
    }

    clickEditDataBySectionName(name: string): HistoryActions {
        historyPage.getEditIconBySectionName(name).click();
        return this;
    }
}

export default new HistoryActions(historyPage);