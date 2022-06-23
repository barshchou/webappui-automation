import propertySalePage from "../../pages/final/propertySaleConclusion.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";

class PropertySaleConclusionActions extends BaseActionsExt<typeof propertySalePage> {

    verifyContractPrice(price: number | string): PropertySaleConclusionActions {
        const textToBe = typeof price === "string" ? price : `$${numberWithCommas(price)}`;
        propertySalePage.contractPrice.should("have.text", textToBe);
        return this;
    }

    verifyContractDate(date: string): PropertySaleConclusionActions {
        propertySalePage.contractDate.should("have.text", date);
        return this;
    }

    verifyContractChangeInValue(asIsMarketFinalValue: string | number): PropertySaleConclusionActions {
        asIsMarketFinalValue = typeof asIsMarketFinalValue === "number" ? asIsMarketFinalValue :
            getNumberFromDollarNumberWithCommas(asIsMarketFinalValue);
        propertySalePage.contractPrice.invoke("text").then(contractPriceText => {
            const contractPriceNumber = getNumberFromDollarNumberWithCommas(contractPriceText);
            const resultPercent = Number(asIsMarketFinalValue) * 100 / contractPriceNumber;
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

export default new PropertySaleConclusionActions(propertySalePage);