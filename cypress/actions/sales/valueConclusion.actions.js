import BaseActions from "../base/base.actions";
import valueConclusionPage from "../../pages/sales/valueConclusion.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class ValueConclusionActions extends BaseActions {

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceMin(price) {
        valueConclusionPage.unadjustedPriceMin.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceAvg(price) {
        valueConclusionPage.unadjustedPriceAvg.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceMax(price) {
        valueConclusionPage.unadjustedPriceMax.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceMedian(price) {
        valueConclusionPage.unadjustedPriceMedian.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {Readonly<{min: string, avg: string, max: string, median: string}>} unadjustedPrices
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPrices(unadjustedPrices) {
        this.verifyUnadjustedPriceMin(unadjustedPrices.min)
            .verifyUnadjustedPriceAvg(unadjustedPrices.avg)
            .verifyUnadjustedPriceMax(unadjustedPrices.max)
            .verifyUnadjustedPriceMedian(unadjustedPrices.median);
        return this;
    }

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceMin(price) {
        valueConclusionPage.adjustedPriceMin.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceAvg(price) {
        valueConclusionPage.adjustedPriceAvg.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceMax(price) {
        valueConclusionPage.adjustedPriceMax.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceMedian(price) {
        valueConclusionPage.adjustedPriceMedian.should("have.text", price);
        return this;
    }

    /**
     *
     * @param {Readonly<{min: string, avg: string, max: string, median: string}>} adjustedPrices
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPrices(adjustedPrices) {
        this.verifyAdjustedPriceMin(adjustedPrices.min)
            .verifyAdjustedPriceAvg(adjustedPrices.avg)
            .verifyAdjustedPriceMax(adjustedPrices.max)
            .verifyAdjustedPriceMedian(adjustedPrices.median);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {ValueConclusionActions}
     */
    verifyIncomeApproachConclusion(textToBe) {
        valueConclusionPage.incomeApproachConclusion.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @returns {ValueConclusionActions}
     */
    enterSaleValueConclusion(value) {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.saleValueConclusion.clear().type(value).should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string | number} value
     * @returns {ValueConclusionActions}
     */
    verifySaleValueConclusion(value) {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.saleValueConclusion.should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {string} period
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedPeriod(period) {
        valueConclusionPage.asStabilizedPeriod.should("have.text", period);
        return this;
    }

    /**
     *
     * @param {string} amount
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedAmount(amount) {
        valueConclusionPage.asStabilizedAmount.should("have.text", amount);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedFinalValue(value) {
        valueConclusionPage.asStabilizedFinalValue.should("have.text", value);
        return this;
    }

    /**
     *
     * @param {Readonly<{period: string, amount: string, finalValue: string}>} rowData
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedRow(rowData) {
        this.verifyAsStabilizedPeriod(rowData.period)
            .verifyAsStabilizedAmount(rowData.amount)
            .verifyAsStabilizedFinalValue(rowData.finalValue);
        return this;
    }

    /**
     *
     * @param {string} period
     * @returns {ValueConclusionActions}
     */
    verifyAsCompletePeriod(period) {
        valueConclusionPage.asCompletePeriod.should("have.text", period);
        return this;
    }

    /**
     *
     * @param {string} amount
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteAmount(amount) {
        valueConclusionPage.asCompleteAmount.should("have.text", amount);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteFinalValue(value) {
        valueConclusionPage.asCompleteFinalValue.should("have.text", value);
        return this;
    }

    /**
     *
     * @param {Readonly<{period: string, amount: string, finalValue: string}>} rowData
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteRow(rowData) {
        this.verifyAsCompletePeriod(rowData.period)
            .verifyAsCompleteAmount(rowData.amount)
            .verifyAsCompleteFinalValue(rowData.finalValue);
        return this;
    }

    /**
     *
     * @param {string} period
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketPeriod(period) {
        valueConclusionPage.asIsMarketPeriod.should("have.text", period);
        return this;
    }

    /**
     *
     * @param {string} amount
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketAmount(amount) {
        valueConclusionPage.asIsMarketAmount.should("have.text", amount);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketFinalValue(value) {
        valueConclusionPage.asIsMarketFinalValue.should("have.text", value);
        return this;
    }

    /**
     *
     * @param {Readonly<{period: string, amount: string, finalValue: string}>} rowData
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketRow(rowData) {
        this.verifyAsIsMarketPeriod(rowData.period)
            .verifyAsIsMarketAmount(rowData.amount)
            .verifyAsIsMarketFinalValue(rowData.finalValue);
        return this;
    }

    /**
     *
     * @returns {ValueConclusionActions}
     */
    checkMatchIncomeApproachDeductionsCheckbox() {
        valueConclusionPage.matchIncomeApproachDeductionsCheckbox.check().should("have.value", "true");
        return this;
    }

    /**
     *
     * @returns {ValueConclusionActions}
     */
    verifyMatchIncomeApproachDeductionsChecked() {
        valueConclusionPage.matchIncomeApproachDeductionsCheckbox.should("have.value", "true");
        return this;
    }
}

export default new ValueConclusionActions();