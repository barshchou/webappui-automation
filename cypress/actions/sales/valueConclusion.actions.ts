import valueConclusionPage from "../../pages/sales/valueConclusion.page";
import { numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";

class ValueConclusionActions extends BaseActionsExt<typeof valueConclusionPage> {

    verifyUnadjustedPriceMin(price: string): this {
        valueConclusionPage.unadjustedPriceMin.should("have.text", price);
        return this;
    }

    verifyUnadjustedPriceAvg(price: string): this {
        valueConclusionPage.unadjustedPriceAvg.should("have.text", price);
        return this;
    }

    verifyUnadjustedPriceMax(price: string): this {
        valueConclusionPage.unadjustedPriceMax.should("have.text", price);
        return this;
    }

    verifyUnadjustedPriceMedian(price: string): this {
        valueConclusionPage.unadjustedPriceMedian.should("have.text", price);
        return this;
    }

    verifyUnadjustedPrices(unadjustedPrices: Readonly<{min: string, avg: string, max: string, median: string}>): this {
        this.verifyUnadjustedPriceMin(unadjustedPrices.min)
            .verifyUnadjustedPriceAvg(unadjustedPrices.avg)
            .verifyUnadjustedPriceMax(unadjustedPrices.max)
            .verifyUnadjustedPriceMedian(unadjustedPrices.median);
        return this;
    }

    verifyAdjustedPriceMin(price: string): this {
        valueConclusionPage.adjustedPriceMin.should("have.text", price);
        return this;
    }

    verifyAdjustedPriceAvg(price: string): this {
        valueConclusionPage.adjustedPriceAvg.should("have.text", price);
        return this;
    }

    verifyAdjustedPriceMax(price: string): this {
        valueConclusionPage.adjustedPriceMax.should("have.text", price);
        return this;
    }

    verifyAdjustedPriceMedian(price: string): this {
        valueConclusionPage.adjustedPriceMedian.should("have.text", price);
        return this;
    }

    verifyAdjustedPrices(adjustedPrices: Readonly<{min: string, avg: string, max: string, median: string}>): this {
        this.verifyAdjustedPriceMin(adjustedPrices.min)
            .verifyAdjustedPriceAvg(adjustedPrices.avg)
            .verifyAdjustedPriceMax(adjustedPrices.max)
            .verifyAdjustedPriceMedian(adjustedPrices.median);
        return this;
    }

    verifyIncomeApproachConclusion(textToBe: string): this {
        valueConclusionPage.incomeApproachConclusion.should("have.text", textToBe);
        return this;
    }

    enterSaleValueConclusion(value: string | number): this {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.saleValueConclusion.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    verifySaleValueConclusion(value: string | number): this {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.saleValueConclusion.should("have.value", valueToBe);
        return this;
    }

    verifyAsStabilizedPeriod(period: string): this {
        valueConclusionPage.asStabilizedPeriod.should("have.text", period);
        return this;
    }

    verifyAsStabilizedAmount(amount: string | number): this {
        const textToBe = typeof amount === "string" ? amount : `$${numberWithCommas(amount)}`;
        valueConclusionPage.asStabilizedAmount.should("have.text", textToBe);
        return this;
    }

    verifyAsStabilizedFinalValue(value: string | number): this {
        const textToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.asStabilizedFinalValue.should("have.text", textToBe);
        return this;
    }

    verifyAsStabilizedRow(rowData: Readonly<{period: string, amount: string, finalValue: string}>): this {
        this.verifyAsStabilizedPeriod(rowData.period)
            .verifyAsStabilizedAmount(rowData.amount)
            .verifyAsStabilizedFinalValue(rowData.finalValue);
        return this;
    }

    verifyAsCompletePeriod(period: string): this {
        valueConclusionPage.asCompletePeriod.should("have.text", period);
        return this;
    }

    verifyAsCompleteAmount(amount: string): this {
        valueConclusionPage.asCompleteAmount.should("have.text", amount);
        return this;
    }

    verifyAsCompleteFinalValue(value: string): this {
        valueConclusionPage.asCompleteFinalValue.should("have.text", value);
        return this;
    }

    verifyAsCompleteRow(rowData: Readonly<{period: string, amount: string, finalValue: string}>): this {
        this.verifyAsCompletePeriod(rowData.period)
            .verifyAsCompleteAmount(rowData.amount)
            .verifyAsCompleteFinalValue(rowData.finalValue);
        return this;
    }

    verifyAsIsMarketPeriod(period: string): this {
        const textToBe = period.includes("-") ? period.replaceAll("-", "/") : period;
        valueConclusionPage.asIsMarketPeriod.should("have.text", textToBe);
        return this;
    }

    verifyAsIsMarketAmount(amount: string): this {
        valueConclusionPage.asIsMarketAmount.should("have.text", amount);
        return this;
    }

    verifyAsIsMarketFinalValue(value: string): this {
        valueConclusionPage.asIsMarketFinalValue.should("have.text", value);
        return this;
    }

    verifyAsIsMarketRow(rowData: Readonly<{period: string, amount: string, finalValue: string}>): this {
        this.verifyAsIsMarketPeriod(rowData.period)
            .verifyAsIsMarketAmount(rowData.amount)
            .verifyAsIsMarketFinalValue(rowData.finalValue);
        return this;
    }

    checkMatchIncomeApproachDeductionsCheckbox(): this {
        valueConclusionPage.matchIncomeApproachDeductionsCheckbox.check().should("have.value", "true");
        return this;
    }

    verifyMatchIncomeApproachDeductionsChecked(): this {
        valueConclusionPage.matchIncomeApproachDeductionsCheckbox.should("have.value", "true");
        return this;
    }

    verifyAsStabResRentLossTimePeriodByRow(period: number, rowNumber = 0): this {
        valueConclusionPage.asStabResRentLossTimePeriodCells.eq(rowNumber).should("have.value", period);
        return this;
    }

    enterAdditionalCommentary(commentary: string): this {
        valueConclusionPage.additionalCommentaryInput.type(commentary);
        this.verifyAdditionalCommentaryText(commentary);
        return this;
    }

    verifyAdditionalCommentaryText(commToBe: string): this {
        valueConclusionPage.additionalCommentaryInput.should("have.text", commToBe);
        return this;
    }

    verifyGeneratedCommentary(commToBe: string): this {
        valueConclusionPage.valueConclusionDiscussionCommentary.should("have.text", commToBe);
        return this;
    }

    enterNewCommentary(commentary: string): this {
        valueConclusionPage.editCommentaryButton.click();
        valueConclusionPage.commentaryInput.clear().type(commentary).should("have.text", commentary);
        return this;
    }

    clickRevertCommentaryButton(): this {
        valueConclusionPage.revertCommentaryButton.click();
        return this;
    }

    verifyAsCompleteLessEntrepreneurialProfit(profit: string | number): this {
        const valueToBe = typeof profit === "string" ? profit : `${profit}%`;
        valueConclusionPage.asCompleteLessEntrepreneurialProfit.should("have.value", valueToBe);
        return this;
    }

    verifyPopUpWithTitleExists(title: string): this {
        cy.get(`[aria-label='${title}']`).should("exist");
        return this;
    }

    verifyBasisForAnalysisAmount(basisValueToBe: string | number): this {
        const textToBe = typeof basisValueToBe === "string" ? basisValueToBe : numberWithCommas(basisValueToBe);
        valueConclusionPage.basisForAnalysisAmount.should("contain.text", textToBe);
        return this;
    }

    verifyAsStabilizedLaundryLossMonths(monthsToBe: number): this {
        valueConclusionPage.asStabilizedLaundryLossMonths.should("have.value", monthsToBe);
        return this;
    }

    verifyAsCompleteLaundryLossMonths(monthsToBe: number): this {
        valueConclusionPage.asCompleteLessLaundryLossMonths.should("have.value", monthsToBe);
        return this;
    }

    verifyAsStabilizedLaundryLossAmount(amountToBe: string): this {
        valueConclusionPage.asStabilizedLaundryLossAmount.should("have.value", amountToBe);
        return this;
    }

    verifyAsCompleteLaundryLossAmount(amountToBe: string): this {
        valueConclusionPage.asCompleteLaundryLossAmount.should("have.value", amountToBe);
        return this;
    }

    verifyAsStabilizedCommissionFeeAmount(amountToBe: string | number): this {
        const valueToBe = typeof amountToBe === "string" ? amountToBe : `-$${numberWithCommas(amountToBe)}`;
        valueConclusionPage.asStabilizedCommissionFeeAmount.should("have.value", valueToBe);
        return this;
    }

    verifyNumberOfUnitsAmount(amountToBe: string | number): this {
        const valueToBe = typeof amountToBe === "string" ? amountToBe : `-$${numberWithCommas(amountToBe)}`;
        valueConclusionPage.numberOfUnitsAmount.should("have.text", valueToBe);
        return this;
    }

    verifyBasisSFAnalysisTableCellText(basisSFAnalysisText: BoweryReports.BasisSquareFootAnalysisTexts): this {
        valueConclusionPage.asIsAsStabilizedTable.find("td").contains(basisSFAnalysisText).should("exist");
        return this;
    }
}

export default new ValueConclusionActions(valueConclusionPage);