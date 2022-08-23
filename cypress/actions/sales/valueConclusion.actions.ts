import { getNumberFromDollarNumberWithCommas, isHasDecimalPartMoreNumberOfDigits } 
    from './../../../utils/numbers.utils';
import valueConclusionPage from "../../pages/sales/valueConclusion.page";
import { numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";
import capRateConclusionKeys from '../../utils/mapKeys/income/capRateConclusion/capRateConclusion.keys';

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
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value.toFixed(2))}`;
        valueConclusionPage.saleValueConclusion.clear().type(`${value}`).should("have.value", valueToBe);
        return this;
    }

    verifySaleValueConclusion(value: string | number): this {
        const valueToBe = typeof value === "string" ? value : `$${numberWithCommas(value.toFixed(2))}`;
        valueConclusionPage.saleValueConclusion.should("have.value", valueToBe);
        return this;
    }

    verifyAsStabilizedPeriod(period: string): this {
        valueConclusionPage.asStabilizedPeriod.should("have.text", period);
        return this;
    }

    verifyProspectiveMarketValueAmount(conclusionValueName: BoweryReports.ValueConclusionName, 
        amount: string | number): this {
        const textToBe = typeof amount === "string" ? amount : `$${numberWithCommas(amount)}`;
        valueConclusionPage.amountCell(conclusionValueName).should("have.text", textToBe);
        return this;
    }

    verifyProspectiveMarketValueFinal(conclusionValueName: BoweryReports.ValueConclusionName, 
        value: string | number): this {
        const textToBe = typeof value === "string" ? value : `$${numberWithCommas(value)}`;
        valueConclusionPage.finalValueCell(conclusionValueName).should("have.text", textToBe);
        return this;
    }

    verifyAsStabilizedRow(conclusionValueName: BoweryReports.ValueConclusionName, 
        rowData: Readonly<{period: string, amount: string, finalValue: string}>): this {
        this.verifyAsStabilizedPeriod(rowData.period)
            .verifyProspectiveMarketValueAmount(conclusionValueName, rowData.amount)
            .verifyProspectiveMarketValueFinal(conclusionValueName, rowData.finalValue);
        return this;
    }

    verifyAsCompletePeriod(period: string): this {
        valueConclusionPage.asCompletePeriod.should("have.text", period);
        return this;
    }

    verifyAsCompleteRow(conclusionValueName: BoweryReports.ValueConclusionName, 
        rowData: Readonly<{period: string, amount: string, finalValue: string}>): this {
        this.verifyAsCompletePeriod(rowData.period)
            .verifyProspectiveMarketValueAmount(conclusionValueName, rowData.amount)
            .verifyProspectiveMarketValueFinal(conclusionValueName, rowData.finalValue);
        return this;
    }

    verifyAsIsMarketPeriod(period: string): this {
        const textToBe = period.includes("-") ? period.replaceAll("-", "/") : period;
        valueConclusionPage.asIsMarketPeriod.should("have.text", textToBe);
        return this;
    }

    verifyAsIsMarketRow(conclusionValueName: BoweryReports.ValueConclusionName, 
        rowData: Readonly<{period: string, amount: string, finalValue: string}>): this {
        this.verifyAsIsMarketPeriod(rowData.period)
            .verifyProspectiveMarketValueAmount(conclusionValueName, rowData.amount)
            .verifyProspectiveMarketValueFinal(conclusionValueName, rowData.finalValue);
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

    verifyMiscellaneousLossMonths(monthsToBe: number, valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        miscellaneousType: BoweryReports.RentLossType): this {
        valueConclusionPage.getMiscellaneousLossMonths(valueConclusionKey, miscellaneousType)
            .should("have.value", monthsToBe);
        return this;
    }

    verifyMiscellaneousLossAmount(amountToBe: number, valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        miscellaneousType: BoweryReports.RentLossType): this {
        let numberToDecimal = isHasDecimalPartMoreNumberOfDigits(amountToBe) 
            ? amountToBe.toFixed(2) 
            : amountToBe.toString();

        let amountToBeAdjusted = amountToBe < 0 
            ? `-$${numberWithCommas(numberToDecimal.replace('-', ''))}`
            : `$${numberWithCommas(numberToDecimal)}`;
        valueConclusionPage.getMiscellaneousLossAmount(valueConclusionKey, miscellaneousType)
            .should("have.value", amountToBeAdjusted);
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

    verifyAsStabilizedAmountCell(conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        valueConclusionPage.saleValueConclusion.invoke('attr', 'value').then(concludedValue => {
            const concludedNumber = getNumberFromDollarNumberWithCommas(concludedValue);
            valueConclusionPage.basisForAnalysisAmount.invoke('text').then(areaSf => {
                let areaSfNumber = Number(areaSf.split(' ')[0].replaceAll(',', ''));
                let stringNumber = `$${numberWithCommas(Math.round(concludedNumber * areaSfNumber))}`;
                valueConclusionPage.amountCell(conclusionValueName).should("have.text", stringNumber);
            });
        });
        return this;
    }

    /**
     * Note: Cap rate rounding factor key map should value should be set.
     * It verifies whether final value is rounded correctly.
     * Formula: Prospective Market Value {conclusionValueName} Amount * Rounding Factor => 
     * round result => multiply by rounding factor
     */
    verifyFinalValueCalculated(conclusionValueName: BoweryReports.ValueConclusionName): 
    ValueConclusionActions {
        cy._mapGet(capRateConclusionKeys.capRateRoundingFactor).then(capRateRounding => {
            valueConclusionPage.amountCell(conclusionValueName).invoke('text').then(marketValue => {
                let marketValueNumber = getNumberFromDollarNumberWithCommas(marketValue);
                let expectedFinalValue = `$${numberWithCommas(Math.round(marketValueNumber / capRateRounding) * 
                    capRateRounding)}`;
                valueConclusionPage.finalValueCell(conclusionValueName).should("have.text", expectedFinalValue);
            });
        });
        return this;
    }
}

export default new ValueConclusionActions(valueConclusionPage);