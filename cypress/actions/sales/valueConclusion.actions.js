import BaseActions from "../base/base.actions";
import valueConclusionPage from "../../pages/sales/valueConclusion.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class ValueConclusionActions extends BaseActions {

    verifyUnadjustedPriceMin(price) {
        valueConclusionPage.unadjustedPriceMin.should("have.text", price);
    }

    verifyUnadjustedPriceAvg(price) {
        valueConclusionPage.unadjustedPriceAvg.should("have.text", price);
    }

    verifyUnadjustedPriceMax(price) {
        valueConclusionPage.unadjustedPriceMax.should("have.text", price);
    }

    verifyUnadjustedPriceMedian(price) {
        valueConclusionPage.unadjustedPriceMedian.should("have.text", price);
    }

    verifyUnadjustedPrices(min, avg, max, median) {
        this.verifyUnadjustedPriceMin(min);
        this.verifyUnadjustedPriceAvg(avg);
        this.verifyUnadjustedPriceMax(max);
        this.verifyUnadjustedPriceMedian(median);
    }

    verifyAdjustedPriceMin(price) {
        valueConclusionPage.adjustedPriceMin.should("have.text", price);
    }

    verifyAdjustedPriceAvg(price) {
        valueConclusionPage.adjustedPriceAvg.should("have.text", price);
    }

    verifyAdjustedPriceMax(price) {
        valueConclusionPage.adjustedPriceMax.should("have.text", price);
    }

    verifyAdjustedPriceMedian(price) {
        valueConclusionPage.adjustedPriceMedian.should("have.text", price);
    }

    verifyAdjustedPrices(min, avg, max, median) {
        this.verifyAdjustedPriceMin(min);
        this.verifyAdjustedPriceAvg(avg);
        this.verifyAdjustedPriceMax(max);
        this.verifyAdjustedPriceMedian(median);
    }

    verifyIncomeApproachConclusion(textToBe) {
        valueConclusionPage.incomeApproachConclusion.should("have.text", textToBe);
    }

    enterSaleValueConclusion(value) {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.saleValueConclusion.clear().type(value).should("have.value", valueToBe);
    }

    verifyAsStabilizedPeriod(period) {
        valueConclusionPage.asStabilizedPeriod.should("have.text", period);
    }

    verifyAsStabilizedAmount(amount) {
        valueConclusionPage.asStabilizedAmount.should("have.text", amount);
    }

    verifyAsStabilizedFinalValue(value) {
        valueConclusionPage.asStabilizedFinalValue.should("have.text", value);
    }

    verifyAsStabilizedRow(period, amount, value) {
        this.verifyAsStabilizedPeriod(period);
        this.verifyAsStabilizedAmount(amount);
        this.verifyAsStabilizedFinalValue(value);
    }

    verifyAsCompletePeriod(period) {
        valueConclusionPage.asCompletePeriod.should("have.text", period);
    }

    verifyAsCompleteAmount(amount) {
        valueConclusionPage.asCompleteAmount.should("have.text", amount);
    }

    verifyAsCompleteFinalValue(value) {
        valueConclusionPage.asCompleteFinalValue.should("have.text", value);
    }

    verifyAsCompleteRow(period, amount, value) {
        this.verifyAsCompletePeriod(period);
        this.verifyAsCompleteAmount(amount);
        this.verifyAsCompleteFinalValue(value);
    }

    verifyAsIsMarketPeriod(period) {
        valueConclusionPage.asIsMarketPeriod.should("have.text", period);
    }

    verifyAsIsMarketAmount(amount) {
        valueConclusionPage.asIsMarketAmount.should("have.text", amount);
    }

    verifyAsIsMarketFinalValue(value) {
        valueConclusionPage.asIsMarketFinalValue.should("have.text", value);
    }

    verifyAsIsMarketRow(period, amount, value) {
        this.verifyAsIsMarketPeriod(period);
        this.verifyAsIsMarketAmount(amount);
        this.verifyAsIsMarketFinalValue(value);
    }
}

export default new ValueConclusionActions();