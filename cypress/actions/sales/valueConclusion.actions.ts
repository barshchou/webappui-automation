import { getNumberFromDollarNumberWithCommas, 
    getNumberFromMinusDollarNumberWithCommas, 
    isHasDecimalPartMoreNumberOfDigits } 
    from './../../../utils/numbers.utils';
import valueConclusionPage from "../../pages/sales/valueConclusion.page";
import { numberWithCommas } from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import { BoweryReports } from "../../types/boweryReports.type";
import capRateConclusionKeys from '../../utils/mapKeys/income/capRateConclusion/capRateConclusion.keys';
import Enums from "../../enums/enums";
import adjustedPricesKeys from '../../utils/mapKeys/sales/adjustedComps/adjustedPrices.keys';
import { _saveDataInFile } from '../../support/commands';
import valueConclusionKeys from '../../utils/mapKeys/sales/valueConclusion.keys';

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

    setAdjustedPriceMinToMap(): ValueConclusionActions {
        valueConclusionPage.adjustedPriceMin.invoke('text').then(priceMin => {
            cy._mapSet(adjustedPricesKeys.adjustedPriceMin, priceMin);
        });
        
        return this;
    }

    setAdjustedPriceMaxToMap(): ValueConclusionActions {
        valueConclusionPage.adjustedPriceMax.invoke('text').then(priceMax => {
            cy._mapSet(adjustedPricesKeys.adjustedPriceMax, priceMax);
        });
        
        return this;
    }

    setAdjustedPriceAverageToMap(): ValueConclusionActions {
        valueConclusionPage.adjustedPriceAvg.invoke('text').then(priceAverage => {
            cy._mapSet(adjustedPricesKeys.adjustedPriceAverage, priceAverage);
        });
        
        return this;
    }

    setAdjustedPriceMedianToMap(): ValueConclusionActions {
        valueConclusionPage.adjustedPriceMedian.invoke('text').then(priceMedian => {
            cy._mapSet(adjustedPricesKeys.adjustedPriceMedian, priceMedian);
        });
        
        return this;
    }

    setAdjustedPricesToMap(): ValueConclusionActions {
        this.setAdjustedPriceMinToMap()
            .setAdjustedPriceMaxToMap()
            .setAdjustedPriceAverageToMap()
            .setAdjustedPriceMedianToMap();
        return this;
    }

    getAllAdjustedPricesAliases(): ValueConclusionActions {
        this.setAdjustedPricesToMap();
        interface IAllAdjustedPricesAliases {
            adjustedPriceMin?: number
            adjustedPriceMax?: number
            adjustedPriceAverage?: number
            adjustedPriceMedian?: number
        }

        let allAdjustedPricesAliases: IAllAdjustedPricesAliases = {};

        cy._mapGet(adjustedPricesKeys.adjustedPriceMin)
            .then(adjustedPriceMin => allAdjustedPricesAliases.adjustedPriceMin = adjustedPriceMin);
        cy._mapGet(adjustedPricesKeys.adjustedPriceMax)
            .then(adjustedPriceMax => allAdjustedPricesAliases.adjustedPriceMax = adjustedPriceMax);
        cy._mapGet(adjustedPricesKeys.adjustedPriceAverage)
            .then(adjustedPriceAverage => allAdjustedPricesAliases.adjustedPriceAverage = adjustedPriceAverage);
        cy._mapGet(adjustedPricesKeys.adjustedPriceMedian)
            .then(adjustedPriceMedian => allAdjustedPricesAliases.adjustedPriceMedian = adjustedPriceMedian);
        

        cy._mapSet(adjustedPricesKeys.adjustedPricesAll, allAdjustedPricesAliases);

        return this;
    }

    verifyGeneratedCommentaryCalculated(): ValueConclusionActions {
        this.setAdjustedPricesToMap()
            .getAllAdjustedPricesAliases();
        cy._mapGet(adjustedPricesKeys.adjustedPricesAll).then(adjustedPrices => {
            valueConclusionPage.saleValueConclusion.invoke('attr', 'value').then(concludedValuePerSf => {
                let concludedValuePerSfAdjusted = 
                    numberWithCommas(getNumberFromDollarNumberWithCommas(concludedValuePerSf).toFixed(2));
                let commentary = 
                `After adjustments, the comparable sales exhibited a range between ` + 
                `${adjustedPrices.adjustedPriceMin} per square foot and ${adjustedPrices.adjustedPriceMax} ` + 
                `per square foot with an average of ${adjustedPrices.adjustedPriceAverage} per square foot ` + 
                `and a median of ${adjustedPrices.adjustedPriceMedian} per square foot. Thus, considering the ` + 
                `elements of comparison noted above, our opinion of market value ` + 
                `is $${concludedValuePerSfAdjusted} per square foot.`;
                valueConclusionPage.valueConclusionDiscussionCommentary.should('have.text', commentary);
                _saveDataInFile(commentary, `${Cypress.spec.name}.txt`);
            });
        });
        
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

    enterNewCommentary(commentary: string, clearText = true): this {
        valueConclusionPage.editCommentaryButton.click();
        if (clearText) {
            valueConclusionPage.commentaryInput.clear();
        }
        valueConclusionPage.commentaryInput.type(commentary).should("include.text", commentary);
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

    verifyAsIsAsStabilizedAmountCell(conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
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

    verifyProspectiveMarketValueAsIsAsCompleteCalculated(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        this.getAllAsStabilizedLossesAliases(valueConclusionKey, Enums.VALUE_CONCLUSION_NAME.asStabilized);
        cy._mapGet(capRateConclusionKeys.allAsStabilizedLossesAliases).then(allAsStabilizedLossesAliases => {
            cy.log(`As Stabilized Amount: ${allAsStabilizedLossesAliases.asStabilizedAmount}`);

            let allRentLosses = allAsStabilizedLossesAliases.residentialRentLoss
                + allAsStabilizedLossesAliases.commercialRentLoss +
                allAsStabilizedLossesAliases.commercialUndRentLoss + allAsStabilizedLossesAliases.commissionFee;
            cy.log(`All Losses: ${allRentLosses}`);

            let entrepreneurLoss = allRentLosses * allAsStabilizedLossesAliases.entrepreneurProfit / 100;
            cy.log(`Entrepreneur Profit: ${entrepreneurLoss}`);

            // Round calculated value
            let prospectiveValue = Math.round((allAsStabilizedLossesAliases.asStabilizedAmount - allRentLosses -
                entrepreneurLoss) / 10) * 10;
            cy.log(`Prospective Value As Complete: ${prospectiveValue}`);

            let expectedProspectiveValueAsComplete = prospectiveValue < 0
                ? `-$${numberWithCommas(prospectiveValue.toFixed(0).replace('-', ''))}`
                : `$${numberWithCommas(prospectiveValue.toFixed(0))}`;

            valueConclusionPage.amountCell(conclusionValueName)
                .should('have.text', expectedProspectiveValueAsComplete);
        });
        return this;
    }

    /**
     * Sets all losses for value conclusion type and generates an object to be
     * stored in map key, to avoid multiple chains from cy._mapGet
     */
    getAllAsStabilizedLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        this.setAllAsStabilizedLossesAliases(valueConclusionKey, conclusionValueName);
        interface IAllAsStabilizedLossesAliases {
            residentialRentLoss?: number
            commercialRentLoss?: number
            commercialUndRentLoss?: number
            commissionFee?: number
            entrepreneurProfit?: number
            asStabilizedAmount?: number
        }

        let allAsStabilizedLossesAliases: IAllAsStabilizedLossesAliases = {};

        cy._mapGet(capRateConclusionKeys.asStabilizedResRentLossItem)
            .then(residentialRentLoss => allAsStabilizedLossesAliases.residentialRentLoss = residentialRentLoss);
        cy._mapGet(capRateConclusionKeys.asStabilizedCommercialRentLossItem)
            .then(commercialRentLoss => allAsStabilizedLossesAliases.commercialRentLoss = commercialRentLoss);
        cy._mapGet(capRateConclusionKeys.asStabilizedCommercialUndeterminedRentLossItem)
            .then(commercialUndRentLoss => allAsStabilizedLossesAliases.commercialUndRentLoss = commercialUndRentLoss);
        cy._mapGet(capRateConclusionKeys.commissionFee)
            .then(commissionFee => allAsStabilizedLossesAliases.commissionFee = commissionFee);
        cy._mapGet(capRateConclusionKeys.entrepreneurialStabilizedProfit)
            .then(entrepreneurProfit => allAsStabilizedLossesAliases.entrepreneurProfit = entrepreneurProfit);
        cy._mapGet(capRateConclusionKeys.asStabilizedAmount)
            .then(asStabilizedAmount => allAsStabilizedLossesAliases.asStabilizedAmount = asStabilizedAmount);

        cy._mapSet(capRateConclusionKeys.allAsStabilizedLossesAliases, allAsStabilizedLossesAliases);

        return this;
    }

    /**
     * Sets corresponding map aliases for Stabilized Losses
     */
    private setAllAsStabilizedLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): 
        ValueConclusionActions {
        this.setResRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialUndeterminedLossAmount(valueConclusionKey, conclusionValueName)
            .setCommissionFee()
            .setEntrepreneurialProfit(conclusionValueName, valueConclusionKey)
            .setAmountAlias(conclusionValueName);
        return this;
    }

    private setAmountAlias(conclusionValueName: BoweryReports.ValueConclusionName): 
    ValueConclusionActions {
        let key = conclusionValueName != Enums.VALUE_CONCLUSION_NAME.asIs 
            ? conclusionValueName == Enums.VALUE_CONCLUSION_NAME.asStabilized 
                ? capRateConclusionKeys.asStabilizedAmount
                : capRateConclusionKeys.asCompleteAmount
            : capRateConclusionKeys.asIsMarketAmount;
        valueConclusionPage.amountCell(conclusionValueName).invoke('text').then(asStabilizedAmount => {
            let asStabilizedAmountAdjusted = getNumberFromDollarNumberWithCommas(asStabilizedAmount);
            cy._mapSet(key, asStabilizedAmountAdjusted);
        });
        return this;
    }

    private setResRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        let key = conclusionValueName == Enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.asStabilizedResRentLossItem
            : capRateConclusionKeys.asCompleteResRentLossItem;
        valueConclusionPage.residentialRentLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(key, rentLossNumber);
            });
        return this;
    }

    private setCommercialRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        let key = conclusionValueName == Enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.asStabilizedCommercialRentLossItem
            : capRateConclusionKeys.asCompleteCommercialRentLossItem;
        valueConclusionPage.commercialLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(key, rentLossNumber);
            });
        return this;
    }

    private setCommercialUndeterminedLossAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        let key = conclusionValueName == Enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.asStabilizedCommercialUndeterminedRentLossItem
            : capRateConclusionKeys.asCompleteCommercialUndeterminedRentLossItem;
        valueConclusionPage.commercialUndeterminedRentLossAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(key, rentLossNumber);
            });
        return this;
    }

    private setCommissionFee(): ValueConclusionActions {
        valueConclusionPage.asStabilizedCommissionFeeAmount.should('exist')
            .invoke('attr', 'value').then(commissionFee => {
                let commissionFeeNumber = getNumberFromMinusDollarNumberWithCommas(commissionFee);
                cy._mapSet(capRateConclusionKeys.commissionFee, commissionFeeNumber);
            });
        return this;
    }

    private setEntrepreneurialProfit(conclusionValueName: BoweryReports.ValueConclusionName, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys): ValueConclusionActions {
        let key = conclusionValueName == Enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.entrepreneurialStabilizedProfit
            : capRateConclusionKeys.entrepreneurialCompleteProfit;
        valueConclusionPage.lessEntrepreneurialProfit(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(entrepreneurialProfit => {
                let entrepreneurialProfitNumber = Number(entrepreneurialProfit.replace('%', ''));
                cy._mapSet(key, entrepreneurialProfitNumber);
            });
        return this;
    }

    /**
     * Verifies As Is Market Value for ACAS report type
     * Sets all aliases for As Complete rent losses, buyout cost, renovation, entrepreneur profit.
     * Gets all aliases that were set and check As Is Market value by formula:
     *   [As Complete Amount] - [Sum of Rent Losses] - [Buyout Cost] - [Renovation] -
     *   (([Sum of Rent Losses] + [Less Buyout Cost]) * Entrepreneur Profit)
     */
    verifyAsIsMarketValueCalculated(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        this.getAllAsCompleteLossesAliases(valueConclusionKey, Enums.VALUE_CONCLUSION_NAME.asComplete);
        cy._mapGet(capRateConclusionKeys.allAsCompleteLossesAliases).then(allAsCompleteLossesAliases => {
            cy.log(`As Complete AmountT: ${allAsCompleteLossesAliases.asCompleteAmount}`);

            let allRentLosses = allAsCompleteLossesAliases.residentialRentLoss + 
                allAsCompleteLossesAliases.commercialRentLoss +
                allAsCompleteLossesAliases.commercialUndRentLoss + 
                allAsCompleteLossesAliases.buyoutCost + allAsCompleteLossesAliases.renovationBudget;
            cy.log(`All Losses: ${allRentLosses}`);

            let entrepreneurLoss = allRentLosses * allAsCompleteLossesAliases.entrepreneurProfit / 100;
            cy.log(`Entrepreneur Profit: ${entrepreneurLoss}`);

            // Round calculated value
            let marketValueAsIs = Math.round((allAsCompleteLossesAliases.asCompleteAmount - allRentLosses -
                entrepreneurLoss) / 10) * 10;
            cy.log(`Market Value As Is: ${marketValueAsIs}`);

            let expectedMarketValueAsIs = marketValueAsIs < 0
                ? `-$${numberWithCommas(marketValueAsIs.toFixed(0).replace('-', ''))}`
                : `$${numberWithCommas(marketValueAsIs.toFixed(0))}`;

            valueConclusionPage.amountCell(conclusionValueName)
                .should('have.text', expectedMarketValueAsIs);
        });
        return this;
    }

    /**
     * Sets all losses for value conclusion type and generates an object to be
     * stored in map key, to avoid multiple chains from cy._mapGet
     */
    getAllAsCompleteLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        this.setAllAsCompleteLossesAliases(valueConclusionKey, conclusionValueName);
        interface IAllAsCompleteLossesAliases {
            residentialRentLoss?: number
            commercialRentLoss?: number
            commercialUndRentLoss?: number
            buyoutCost?: number
            entrepreneurProfit?: number
            asCompleteAmount?: number,
            renovationBudget?: number,
        }

        let allAsCompleteLossesAliases: IAllAsCompleteLossesAliases = {};

        cy._mapGet(capRateConclusionKeys.asCompleteResRentLossItem)
            .then(residentialRentLoss => allAsCompleteLossesAliases.residentialRentLoss = residentialRentLoss);
        cy._mapGet(capRateConclusionKeys.asCompleteCommercialRentLossItem)
            .then(commercialRentLoss => allAsCompleteLossesAliases.commercialRentLoss = commercialRentLoss);
        cy._mapGet(capRateConclusionKeys.asCompleteCommercialUndeterminedRentLossItem)
            .then(commercialUndRentLoss => allAsCompleteLossesAliases.commercialUndRentLoss = commercialUndRentLoss);
        cy._mapGet(capRateConclusionKeys.buyoutCost)
            .then(buyoutCost => allAsCompleteLossesAliases.buyoutCost = buyoutCost);
        cy._mapGet(capRateConclusionKeys.entrepreneurialCompleteProfit)
            .then(entrepreneurProfit => allAsCompleteLossesAliases.entrepreneurProfit = entrepreneurProfit);
        cy._mapGet(capRateConclusionKeys.asCompleteAmount)
            .then(asCompleteAmount => allAsCompleteLossesAliases.asCompleteAmount = asCompleteAmount);
        cy._mapGet(capRateConclusionKeys.renovationBudget)
            .then(renovationBudget => allAsCompleteLossesAliases.renovationBudget = renovationBudget);

        cy._mapSet(capRateConclusionKeys.allAsCompleteLossesAliases, allAsCompleteLossesAliases);

        return this;
    }

    /**
     * Sets corresponding map aliases for Complete Losses
     */
    private setAllAsCompleteLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        this.setResRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialUndeterminedLossAmount(valueConclusionKey, conclusionValueName)
            .setRenovationBudgetAlias()
            .setLessBuyoutCost()
            .setEntrepreneurialProfit(conclusionValueName, valueConclusionKey)
            .setAmountAlias(conclusionValueName);
        return this;
    }

    private setRenovationBudgetAlias(): ValueConclusionActions {
        valueConclusionPage.renovationBudgetAmount.should('exist')
            .invoke('attr', 'value').then(renovationBudget => {
                let renovationBudgetAdjusted = getNumberFromMinusDollarNumberWithCommas(renovationBudget);
                cy._mapSet(capRateConclusionKeys.renovationBudget, renovationBudgetAdjusted);
            });
        return this;
    }

    private setLessBuyoutCost(): ValueConclusionActions {
        valueConclusionPage.asCompleteLessBuyoutCost.should('exist')
            .invoke('attr', 'value').then(buyoutCost => {
                let buyoutCostNumber = getNumberFromMinusDollarNumberWithCommas(buyoutCost);
                cy._mapSet(capRateConclusionKeys.buyoutCost, buyoutCostNumber);
            });
        return this;
    }

    verifyHeaderSalesValue(conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        valueConclusionPage.finalValueCell(conclusionValueName).invoke('text').then(finalValue => {
            valueConclusionPage.headerSalesValue.invoke('text').should('include', finalValue);
        });
        
        return this;
    }

    /**
     * Save Market Final Value into variable for further purpose 
     * @param conclusionValueName Value Conclusion to distinguish type of Market Final Value type
     */
    setMarketValueFinal(conclusionValueName: BoweryReports.ValueConclusionName): ValueConclusionActions {
        valueConclusionPage.finalValueCell(conclusionValueName).invoke('text').then(finalValue => {
            let key = conclusionValueName != Enums.VALUE_CONCLUSION_NAME.asIs 
                ? conclusionValueName == Enums.VALUE_CONCLUSION_NAME.asStabilized 
                    ? valueConclusionKeys.asStabilizedFinalAmount
                    : valueConclusionKeys.asCompleteFinalAmount
                : valueConclusionKeys.asIsMarketFinalAmount;
            cy._mapSet(key, finalValue);
        });
        return this;
    }
}

export default new ValueConclusionActions(valueConclusionPage);
