import BaseActions from "../base/base.actions";
import propertySalePage from "../../pages/final/propertySaleConclusion.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class PropertySaleConclusionActions extends BaseActions {

    /**
     *
     * @param {number, string} price
     * @returns {PropertySaleConclusionActions}
     */
    verifyContractPrice(price) {
        const textToBe = typeof price === "string" ? price : `$${numberWithCommas(price)}`;
        propertySalePage.contractPrice.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} date
     * @returns {PropertySaleConclusionActions}
     */
    verifyContractDate(date) {
        propertySalePage.contractDate.should("have.text", date);
        return this;
    }

    /**
     *
     * @param {string, number} asIsMarketFinalValue
     * @returns {PropertySaleConclusionActions}
     */
    verifyContractChangeInValue(asIsMarketFinalValue) {
        asIsMarketFinalValue = typeof asIsMarketFinalValue === "number" ? asIsMarketFinalValue :
            getNumberFromDollarNumberWithCommas(asIsMarketFinalValue);
        propertySalePage.contractPrice.invoke("text").then(contractPriceText => {
            const contractPriceNumber = getNumberFromDollarNumberWithCommas(contractPriceText);
            const resultPercent = asIsMarketFinalValue * 100 / contractPriceNumber;
            let textToBe;
            if (resultPercent > 100) {
                textToBe = `${(resultPercent - 100).toFixed(2)}%`;
            } else {
                textToBe = `${(100 - resultPercent).toFixed(2)}%`;
            }
            propertySalePage.contractChangeInValue.should("have.text", textToBe);
        });
        return this;
    }
}

export default new PropertySaleConclusionActions();