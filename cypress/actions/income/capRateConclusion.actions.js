import BaseActions from "../base/base.actions";
import capRateConclusionPage from "../../pages/income/capRateConclusion.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class CapRateConclusionActions extends BaseActions {

    verifyBandOfInvestments(textToBe) {
        capRateConclusionPage.bandOfInvestmentsCell.should("have.text", textToBe);
    }

    verifyPWCCell(textToBe) {
        capRateConclusionPage.pwcCell.should("have.text", textToBe);
    }

    verifySitusCell(textToBe) {
        capRateConclusionPage.situsCell.should("have.text", textToBe);
    }

    navigateToCapRateComps() {
        capRateConclusionPage.changeButton.click();
    }

    verifyCompCapRatesCell(minCapRate, maxCapRate) {
        capRateConclusionPage.compCapRatesCell.should("have.text", `${minCapRate}-${maxCapRate}%`);
    }

    enterConclusionSectionConcludedCapRate(rate) {
        capRateConclusionPage.conclusionSectionConcludedCapRate.clear().type(rate).should("have.value", `${rate}`);
    }

    enterAsCompleteMonthsOfRentLoss(number) {
        capRateConclusionPage.asCompleteMonthsOfRentLoss.type(number).should("have.value", `${number}`);
    }

    enterASStabilizedMonthsOfRentLoss(number) {
        capRateConclusionPage.asStabilizedMonthsOfRentLoss.type(number).should("have.value", `${number}`);
    }

    selectRoundingFactor(value) {
        capRateConclusionPage.roundingFactorDropdown.click();
        capRateConclusionPage.getDropdownOptionByValue(value).click();
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        capRateConclusionPage.roundingFactorDropdown.should("have.text", textToBe);
    }

    verifyNetOperatingIncome(incomeToBe) {
        capRateConclusionPage.netOperatingIncomeCell.should("have.text", incomeToBe);
    }

    verifyConcludedCapRateCell(rate) {
        capRateConclusionPage.concludedCapRateCellInputToVerify.should("have.value", `${rate}`);
    }

    verifyAsStabilizedTablePart(period, finalValue) {
        this.verifyAsStabilizedPeriodCell(period);
        this.verifyAsStabilizedAmountCell();
        this.verifyAsStabilizedFinalValueCell(finalValue);
    }

    verifyAsStabilizedPeriodCell(period) {
        capRateConclusionPage.asStabilizedPeriodCell.should("have.text", period);
    }

    verifyAsStabilizedAmountCell() {
        capRateConclusionPage.netOperatingIncomeCell.invoke("text").then(noiText => {
            const noiNumber = getNumberFromDollarNumberWithCommas(noiText);
            capRateConclusionPage.concludedCapRateCellInputToVerify.invoke("attr", "value").then(capRate => {
               const textToBe = `$${numberWithCommas(Math.round(noiNumber / capRate * 100))}`;
               capRateConclusionPage.asStabilizedAmountCell.should("have.text", textToBe);
            });
        });
    }

    verifyAsStabilizedFinalValueCell(finalValue) {
        capRateConclusionPage.asStabilizedFinalValueCell.should("have.text", finalValue);
    }

    verifyAsCompleteTablePart(period, amount, finalValue) {
        this.verifyAsCompletePeriodCell(period);
        this.verifyAsCompleteAmountCell(amount);
        this.verifyAsCompleteFinalValueCell(finalValue);
    }

    verifyAsCompletePeriodCell(period) {
        capRateConclusionPage.asCompletePeriodCell.should("have.text", period);
    }

    verifyAsCompleteAmountCell(amount) {
        capRateConclusionPage.asCompleteAmountCell.should("have.text", amount);
    }

    verifyAsCompleteFinalValueCell(finalValue) {
        capRateConclusionPage.asCompleteFinalValueCell.should("have.text", finalValue);
    }

    verifyAsIsMarketTablePart(period, amount, finalValue, perUnit, perSF) {
        this.verifyAsIsMarketPeriodCell(period);
        this.verifyAsIsMarketAmountCell(amount);
        this.verifyAsIsMarketFinalValueCell(finalValue);
        this.verifyAsIsMarketPerUnit(perUnit);
        this.verifyAsIsMarketPerSF(perSF);
    }

    verifyAsIsMarketPeriodCell(period) {
        capRateConclusionPage.asIsMarketPeriodCell.should("have.text", period);
    }

    enterAsCompleteLessEntrepreneurialProfit(profit) {
        capRateConclusionPage.asCompleteLessEntrepreneurialProfit.clear().type(profit)
            .should("have.value", `${profit}%`);
    }

    verifyAsIsMarketAmountCell(amount) {
        capRateConclusionPage.asIsMarketAmountCell.should("have.text", amount);
    }

    verifyAsIsMarketFinalValueCell(finalValue) {
        capRateConclusionPage.asIsMarketFinalValueCell.should("have.text", finalValue);
    }

    verifyAsIsMarketPerUnit(value) {
        capRateConclusionPage.asIsMarketValuePerUnit.should("have.text", value);
    }

    verifyAsIsMarketPerSF(value) {
        capRateConclusionPage.asIsMarketValuePerSF.should("have.text", value);
    }
}

export default new CapRateConclusionActions();