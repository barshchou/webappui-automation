import BaseActions from "../base/base.actions";
import capRateConclusionPage from "../../pages/income/capRateConclusion.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class CapRateConclusionActions extends BaseActions {

    /**
     *
     * @param {string} textToBe
     * @returns {CapRateConclusionActions}
     */
    verifyBandOfInvestments(textToBe) {
        capRateConclusionPage.bandOfInvestmentsCell.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {CapRateConclusionActions}
     */
    verifyPWCCell(textToBe) {
        capRateConclusionPage.pwcCell.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} textToBe
     * @returns {CapRateConclusionActions}
     */
    verifySitusCell(textToBe) {
        capRateConclusionPage.situsCell.should("have.text", textToBe);
        return this;
    }

    navigateToCapRateComps() {
        capRateConclusionPage.changeButton.click();
    }

    /**
     *
     * @param {number} minCapRate
     * @param {number} maxCapRate
     * @returns {CapRateConclusionActions}
     */
    verifyCompCapRatesCell(minCapRate, maxCapRate) {
        capRateConclusionPage.compCapRatesCell.should("have.text", `${minCapRate}-${maxCapRate}%`);
        return this;
    }

    /**
     *
     * @param {number | string} rate
     * @returns {CapRateConclusionActions}
     */
    enterConclusionSectionConcludedCapRate(rate) {
        capRateConclusionPage.conclusionSectionConcludedCapRate.clear().type(rate).should("have.value", `${rate}`);
        return this;
    }

    /**
     *
     * @param {number | string} number
     * @returns {CapRateConclusionActions}
     */
    enterAsCompleteMonthsOfRentLoss(number) {
        capRateConclusionPage.asCompleteMonthsOfRentLoss.type(number).should("have.value", `${number}`);
        return this;
    }

    /**
     *
     * @param {string | number} number
     * @returns {CapRateConclusionActions}
     */
    enterASStabilizedMonthsOfRentLoss(number) {
        capRateConclusionPage.asStabilizedMonthsOfRentLoss.type(number).should("have.value", `${number}`);
        return this;
    }

    /**
     *
     * @param {number | string} value
     * @returns {CapRateConclusionActions}
     */
    selectRoundingFactor(value) {
        capRateConclusionPage.roundingFactorDropdown.click();
        capRateConclusionPage.getDropdownOptionByValue(value).click();
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        capRateConclusionPage.roundingFactorDropdown.should("have.text", textToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {CapRateConclusionActions}
     */
    verifyNetOperatingIncome(incomeToBe) {
        capRateConclusionPage.netOperatingIncomeCell.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {number | string} rate
     * @returns {CapRateConclusionActions}
     */
    verifyConcludedCapRateCell(rate) {
        capRateConclusionPage.concludedCapRateCellInputToVerify.should("have.value", `${rate}`);
        return this;
    }

    /**
     *
     * @param {Readonly<{period: string, finalValue: string}>} partData
     * @returns {CapRateConclusionActions}
     */
    verifyAsStabilizedTablePart(partData) {
        this.verifyAsStabilizedPeriodCell(partData.period)
            .verifyAsStabilizedAmountCell()
            .verifyAsStabilizedFinalValueCell(partData.finalValue);
        return this;
    }

    /**
     *
     * @param {string} period
     * @returns {CapRateConclusionActions}
     */
    verifyAsStabilizedPeriodCell(period) {
        capRateConclusionPage.asStabilizedPeriodCell.should("have.text", period);
        return this;
    }

    /**
     *
     * @returns {CapRateConclusionActions}
     */
    verifyAsStabilizedAmountCell() {
        capRateConclusionPage.netOperatingIncomeCell.invoke("text").then(noiText => {
            const noiNumber = getNumberFromDollarNumberWithCommas(noiText);
            capRateConclusionPage.concludedCapRateCellInputToVerify.invoke("attr", "value").then(capRate => {
               const textToBe = `$${numberWithCommas(Math.round(noiNumber / capRate * 100))}`;
               capRateConclusionPage.asStabilizedAmountCell.should("have.text", textToBe);
            });
        });
        return this;
    }

    /**
     *
     * @param {string} finalValue
     * @returns {CapRateConclusionActions}
     */
    verifyAsStabilizedFinalValueCell(finalValue) {
        capRateConclusionPage.asStabilizedFinalValueCell.should("have.text", finalValue);
        return this;
    }

    /**
     *
     * @param {Readonly<{period: string, amount: string, finalValue: string}>} partData
     * @returns {CapRateConclusionActions}
     */
    verifyAsCompleteTablePart(partData) {
        this.verifyAsCompletePeriodCell(partData.period)
            .verifyAsCompleteAmountCell(partData.amount)
            .verifyAsCompleteFinalValueCell(partData.finalValue);
        return this;
    }

    /**
     *
     * @param {string} period
     * @returns {CapRateConclusionActions}
     */
    verifyAsCompletePeriodCell(period) {
        capRateConclusionPage.asCompletePeriodCell.should("have.text", period);
        return this;
    }

    /**
     *
     * @param {string} amount
     * @returns {CapRateConclusionActions}
     */
    verifyAsCompleteAmountCell(amount) {
        capRateConclusionPage.asCompleteAmountCell.should("have.text", amount);
        return this;
    }

    /**
     *
     * @param {string} finalValue
     * @returns {CapRateConclusionActions}
     */
    verifyAsCompleteFinalValueCell(finalValue) {
        capRateConclusionPage.asCompleteFinalValueCell.should("have.text", finalValue);
        return this;
    }

    /**
     *
     * @param {Readonly<{period: string, amount: string, finalValue: string, perUnit: string, perSF: string}>} partData
     * @returns {CapRateConclusionActions}
     */
    verifyAsIsMarketTablePart(partData) {
        this.verifyAsIsMarketPeriodCell(partData.period)
            .verifyAsIsMarketAmountCell(partData.amount)
            .verifyAsIsMarketFinalValueCell(partData.finalValue)
            .verifyAsIsMarketPerUnit(partData.perUnit)
            .verifyAsIsMarketPerSF(partData.perSF);
        return this;
    }

    /**
     *
     * @param {string} period
     * @returns {CapRateConclusionActions}
     */
    verifyAsIsMarketPeriodCell(period) {
        capRateConclusionPage.asIsMarketPeriodCell.should("have.text", period);
        return this;
    }

    /**
     *
     * @param {string | number} profit
     * @returns {CapRateConclusionActions}
     */
    enterAsCompleteLessEntrepreneurialProfit(profit) {
        capRateConclusionPage.asCompleteLessEntrepreneurialProfit.clear().type(profit)
            .should("have.value", `${profit}%`);
        return this;
    }

    /**
     *
     * @param {string} amount
     * @returns {CapRateConclusionActions}
     */
    verifyAsIsMarketAmountCell(amount) {
        capRateConclusionPage.asIsMarketAmountCell.should("have.text", amount);
        return this;
    }

    /**
     *
     * @param {string} finalValue
     * @returns {CapRateConclusionActions}
     */
    verifyAsIsMarketFinalValueCell(finalValue) {
        capRateConclusionPage.asIsMarketFinalValueCell.should("have.text", finalValue);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateConclusionActions}
     */
    verifyAsIsMarketPerUnit(value) {
        capRateConclusionPage.asIsMarketValuePerUnit.should("have.text", value);
        return this;
    }

    /**
     *
     * @param {string} value
     * @returns {CapRateConclusionActions}
     */
    verifyAsIsMarketPerSF(value) {
        capRateConclusionPage.asIsMarketValuePerSF.should("have.text", value);
        return this;
    }
}

export default new CapRateConclusionActions();