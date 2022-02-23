import BaseActions from "../base/base.actions";
import valueConclusionPage from "../../pages/sales/valueConclusion.page";
import {numberWithCommas} from "../../../utils/numbers.utils";

class ValueConclusionActions extends BaseActions {

    /**
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceMin(price) {
        valueConclusionPage.unadjustedPriceMin.should("have.text", price);
        return this;
    }

    /**
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceAvg(price) {
        valueConclusionPage.unadjustedPriceAvg.should("have.text", price);
        return this;
    }

    /**
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceMax(price) {
        valueConclusionPage.unadjustedPriceMax.should("have.text", price);
        return this;
    }

    /**
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyUnadjustedPriceMedian(price) {
        valueConclusionPage.unadjustedPriceMedian.should("have.text", price);
        return this;
    }

    /**
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
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceMin(price) {
        valueConclusionPage.adjustedPriceMin.should("have.text", price);
        return this;
    }

    /**
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceAvg(price) {
        valueConclusionPage.adjustedPriceAvg.should("have.text", price);
        return this;
    }

    /**
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceMax(price) {
        valueConclusionPage.adjustedPriceMax.should("have.text", price);
        return this;
    }

    /**
     * @param {string} price
     * @returns {ValueConclusionActions}
     */
    verifyAdjustedPriceMedian(price) {
        valueConclusionPage.adjustedPriceMedian.should("have.text", price);
        return this;
    }

    /**
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
     * @param {string} textToBe
     * @returns {ValueConclusionActions}
     */
    verifyIncomeApproachConclusion(textToBe) {
        valueConclusionPage.incomeApproachConclusion.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string | number} value
     * @returns {ValueConclusionActions}
     */
    enterSaleValueConclusion(value) {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.saleValueConclusion.clear().type(value).should("have.value", valueToBe);
        return this;
    }

    /**
     * @param {string | number} value
     * @returns {ValueConclusionActions}
     */
    verifySaleValueConclusion(value) {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.saleValueConclusion.should("have.value", valueToBe);
        return this;
    }

    /**
     * @param {string} period
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedPeriod(period) {
        valueConclusionPage.asStabilizedPeriod.should("have.text", period);
        return this;
    }

    /**
     * @param {string} amount
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedAmount(amount) {
        valueConclusionPage.asStabilizedAmount.should("have.text", amount);
        return this;
    }

    /**
     * @param {string} value
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedFinalValue(value) {
        valueConclusionPage.asStabilizedFinalValue.should("have.text", value);
        return this;
    }

    /**
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
     * @param {string} period
     * @returns {ValueConclusionActions}
     */
    verifyAsCompletePeriod(period) {
        valueConclusionPage.asCompletePeriod.should("have.text", period);
        return this;
    }

    /**
     * @param {string} amount
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteAmount(amount) {
        valueConclusionPage.asCompleteAmount.should("have.text", amount);
        return this;
    }

    /**
     * @param {string} value
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteFinalValue(value) {
        valueConclusionPage.asCompleteFinalValue.should("have.text", value);
        return this;
    }

    /**
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
     * @param {string} period
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketPeriod(period) {
        const textToBe = period.includes("-") ? period.replaceAll("-", "/") : period;
        valueConclusionPage.asIsMarketPeriod.should("have.text", textToBe);
        return this;
    }

    /**
     * @param {string} amount
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketAmount(amount) {
        valueConclusionPage.asIsMarketAmount.should("have.text", amount);
        return this;
    }

    /**
     * @param {string} value
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketFinalValue(value) {
        valueConclusionPage.asIsMarketFinalValue.should("have.text", value);
        return this;
    }

    /**
     * @param {Readonly<{period: string, amount: string, finalValue: string}>} rowData
     * @returns {ValueConclusionActions}
     */
    verifyAsIsMarketRow(rowData) {
        this.verifyAsIsMarketPeriod(rowData.period)
            .verifyAsIsMarketAmount(rowData.amount)
            .verifyAsIsMarketFinalValue(rowData.finalValue);
        return this;
    }

    checkMatchIncomeApproachDeductionsCheckbox() {
        valueConclusionPage.matchIncomeApproachDeductionsCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyMatchIncomeApproachDeductionsChecked() {
        valueConclusionPage.matchIncomeApproachDeductionsCheckbox.should("have.value", "true");
        return this;
    }

    /**
     * @param {string | number} period
     * @param {number} rowNumber
     * @returns {ValueConclusionActions}
     */
    verifyAsStabResRentLossTimePeriodByRow(period, rowNumber = 0) {
        valueConclusionPage.asStabResRentLossTimePeriodCells.eq(rowNumber).should("have.value", period);
        return this;
    }

    /**
     * @param {string} commentary
     * @returns {ValueConclusionActions}
     */
    enterAdditionalCommentary(commentary) {
        valueConclusionPage.additionalCommentaryInput.type(commentary);
        this.verifyAdditionalCommentaryText(commentary);
        return this;
    }

    /**
     * @param {string} commToBe
     * @returns {ValueConclusionActions}
     */
    verifyAdditionalCommentaryText(commToBe) {
        valueConclusionPage.additionalCommentaryInput.should("have.text", commToBe);
        return this;
    }

    /**
     * @param {string} commToBe
     * @returns {ValueConclusionActions}
     */
    verifyGeneratedCommentary(commToBe) {
        valueConclusionPage.valueConclusionDiscussionCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     * @param {string} commentary
     * @returns {ValueConclusionActions}
     */
    enterNewCommentary(commentary) {
        valueConclusionPage.editCommentaryButton.click();
        valueConclusionPage.commentaryInput.clear().type(commentary).should("have.text", commentary);
        return this;
    }

    clickRevertCommentaryButton() {
        valueConclusionPage.revertCommentaryButton.click();
        return this;
    }

    /**
     * @param {string | number} profit
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteLessEntrepreneurialProfit(profit) {
        const valueToBe = typeof profit === "string" ? profit : `${profit}%`;
        valueConclusionPage.asCompleteLessEntrepreneurialProfit.should("have.value", valueToBe);
        return this;
    }

    /**
     * @param {string} title
     * @returns {ValueConclusionActions}
     */
    verifyPopUpWithTitleExists(title) {
        cy.get(`[title='${title}']`).should("exist");
        return this;
    }

    /**
     * @param {string | number} gbaToBe
     * @returns {ValueConclusionActions}
     */
    verifyGrossBuildingAreaAmount(gbaToBe) {
        const textToBe = typeof gbaToBe === "string" ? gbaToBe : numberWithCommas(gbaToBe);
        valueConclusionPage.gbaAmount.should("contain.text", textToBe);
        return this;
    }

    /**
     * @param {number} monthsToBe
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedLaundryLossMonths(monthsToBe) {
        valueConclusionPage.asStabilizedLaundryLossMonths.should("have.value", monthsToBe);
        return this;
    }

    /**
     * @param {number} monthsToBe
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteLaundryLossMonths(monthsToBe) {
        valueConclusionPage.asCompleteLessLaundryLossMonths.should("have.value", monthsToBe);
        return this;
    }

    /**
     * @param {string} amountToBe
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedLaundryLossAmount(amountToBe) {
        valueConclusionPage.asStabilizedLaundryLossAmount.should("have.value", amountToBe);
        return this;
    }

    /**
     * @param {string} amountToBe
     * @returns {ValueConclusionActions}
     */
    verifyAsCompleteLaundryLossAmount(amountToBe) {
        valueConclusionPage.asCompleteLaundryLossAmount.should("have.value", amountToBe);
        return this;
    }

    /**
     * @param {string | number} amountToBe
     * @returns {ValueConclusionActions}
     */
    verifyAsStabilizedCommissionFeeAmount(amountToBe) {
        const valueToBe = typeof amountToBe === "string" ? amountToBe : `-$${numberWithCommas(amountToBe)}`;
        valueConclusionPage.asStabilizedCommissionFeeAmount.should("have.value", valueToBe);
        return this;
    }
}

export default new ValueConclusionActions();