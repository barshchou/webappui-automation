import capRateConclusionPage from "../../pages/income/capRateConclusion.page";
import { 
    getNumberFromDollarNumberWithCommas, 
    getNumberFromMinusDollarNumberWithCommas, 
    numberWithCommas 
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import capRateConclusionKeys from "../../utils/mapKeys/income/capRateConclusion/capRateConclusion.keys";
import { BoweryReports } from "../../types/boweryReports.type";
import enums from "../../enums/enums";

class CapRateConclusionActions extends BaseActionsExt<typeof capRateConclusionPage> {

    verifyBandOfInvestments(textToBe: string): CapRateConclusionActions {
        capRateConclusionPage.bandOfInvestmentsCell.should("have.text", textToBe);
        return this;
    }

    verifyPWCCell(textToBe: string): CapRateConclusionActions {
        capRateConclusionPage.pwcCell.should("have.text", textToBe);
        return this;
    }

    verifySitusCell(textToBe: string): CapRateConclusionActions {
        capRateConclusionPage.situsCell.should("have.text", textToBe);
        return this;
    }

    navigateToCapRateComps() {
        capRateConclusionPage.changeButton.click();
    }

    verifyCompCapRatesCell(minCapRate: number, maxCapRate: number): CapRateConclusionActions {
        capRateConclusionPage.compCapRatesCell.should("have.text", `${minCapRate}-${maxCapRate}%`);
        return this;
    }

    enterConclusionSectionConcludedCapRate(rate: number | string): CapRateConclusionActions {
        capRateConclusionPage.conclusionSectionConcludedCapRate.clear().type(`${rate}`).should("have.value", `${rate}`);
        return this;
    }

    enterAsCompleteMonthsOfRentLoss(number: number | string): CapRateConclusionActions {
        capRateConclusionPage.asCompleteMonthsOfRentLoss.type(`${number}`).should("have.value", `${number}`);
        return this;
    }

    enterASStabilizedMonthsOfRentLoss(number: string | number): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedMonthsOfRentLoss.type(`${number}`).should("have.value", `${number}`);
        return this;
    }

    selectRoundingFactor(value: number): CapRateConclusionActions {
        capRateConclusionPage.roundingFactorDropdown.click();
        capRateConclusionPage.getDropdownOptionByValue(value).click();
        const textToBe = `$${numberWithCommas(value.toFixed(2))}`;
        capRateConclusionPage.roundingFactorDropdown.should("have.text", textToBe);
        return this;
    }

    verifyNetOperatingIncome(incomeToBe: string): CapRateConclusionActions {
        capRateConclusionPage.netOperatingIncomeCell.should("have.text", incomeToBe);
        return this;
    }

    verifyConcludedCapRateCell(rate: number | string): CapRateConclusionActions {
        capRateConclusionPage.concludedCapRateCellInputToVerify.should("have.value", `${rate}`);
        return this;
    }

    verifyAsStabilizedTablePart(
        partData: Readonly<{period: string, finalValue: string}>, 
        valueConclusionName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.verifyAsStabilizedPeriodCell(partData.period, valueConclusionName)
            .verifyAsStabilizedAmountCell(valueConclusionName)
            .verifyAsStabilizedFinalValueCell(partData.finalValue, valueConclusionName);
        return this;
    }

    verifyAsStabilizedPeriodCell(period: string, conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.periodCell(conclusionValueName).should("have.text", period);
        return this;
    }

    verifyAsStabilizedAmountCell(conclusionValueName: BoweryReports.ValueConclusionName) {
        capRateConclusionPage.netOperatingIncomeCell.invoke("text").then(noiText => {
            const noiNumber = getNumberFromDollarNumberWithCommas(noiText);
            capRateConclusionPage.concludedCapRateCellInputToVerify.invoke("attr", "value").then(capRate => {
                let stringNumber = numberWithCommas(Math.round(noiNumber / Number.parseInt(capRate) * 100));
                const textToBe = noiNumber < 0 
                    ? `-$${stringNumber.replace('-', '')}` 
                    : `$${stringNumber}`;
                capRateConclusionPage.amountCell(conclusionValueName).should("have.text", textToBe);
            });
        });
        return this;
    }

    verifyAsStabilizedFinalValueCell(finalValue: string, valueConclusionName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.finalValueCell(valueConclusionName).should("have.text", finalValue);
        return this;
    }

    verifyAsCompleteTablePart(partData: Readonly<{period: string, amount: string, finalValue: string}>, 
        valueConclusionName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.verifyAsCompletePeriodCell(partData.period, valueConclusionName)
            .verifyAsCompleteAmountCell(partData.amount, valueConclusionName)
            .verifyAsCompleteFinalValueCell(partData.finalValue, valueConclusionName);
        return this;
    }

    verifyAsCompletePeriodCell(period: string, conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.periodCell(conclusionValueName).should("have.text", period);
        return this;
    }

    verifyAsCompleteAmountCell(amount: string, conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.amountCell(conclusionValueName).should("have.text", amount);
        return this;
    }

    verifyAsCompleteFinalValueCell(finalValue: string, valueConclusionName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.finalValueCell(valueConclusionName).should("have.text", finalValue);
        return this;
    }

    verifyAsIsMarketTablePart(partData: Readonly<{period: string, amount: string, 
        finalValue: string, perUnit: string, perSF: string}>, valueConclusionName: BoweryReports.ValueConclusionName): 
        CapRateConclusionActions {
        this.verifyAsIsMarketPeriodCell(partData.period, valueConclusionName)
            .verifyAsIsMarketAmountCell(partData.amount, valueConclusionName)
            .verifyAsIsMarketFinalValueCell(partData.finalValue, valueConclusionName)
            .verifyAsIsMarketPerUnit(partData.perUnit)
            .verifyAsIsMarketPerSF(partData.perSF);
        return this;
    }

    verifyAsIsMarketPeriodCell(period: string, conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.periodCell(conclusionValueName).should("have.text", period);
        return this;
    }

    enterAsCompleteLessEntrepreneurialProfit(profit: string | number): CapRateConclusionActions {
        capRateConclusionPage.asCompleteLessEntrepreneurialProfit.clear().type(`${profit}`)
            .should("have.value", `${profit}%`);
        return this;
    }

    enterAsStabilizedLessEntrepreneurialProfit(profit: string | number): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedLessEntrepreneurialProfit.clear().type(`${profit}`)
            .should("have.value", `${profit}%`);
        return this;
    }

    verifyAsIsMarketAmountCell(amount: string, conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.amountCell(conclusionValueName).should("have.text", amount);
        return this;
    }

    verifyAsIsMarketFinalValueCell(finalValue: string, valueConclusionName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.finalValueCell(valueConclusionName).should("have.text", finalValue);
        return this;
    }

    verifyAsIsMarketPerUnit(value: string): CapRateConclusionActions {
        capRateConclusionPage.asIsMarketValuePerUnit.should("have.text", value);
        return this;
    }

    verifyAsIsMarketPerSF(value: string): CapRateConclusionActions {
        capRateConclusionPage.asIsMarketValuePerSF.should("have.text", value);
        return this;
    }

    clickAddRentLoss(unitIncomeType: BoweryReports.UnitIncomeType): CapRateConclusionActions {
        capRateConclusionPage.addRentLossButton(unitIncomeType).should("not.be.disabled").click();
        return this;
    }

    clickAsStabilizedRentLossSwitch(valueConclusion: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        capRateConclusionPage.valueConclusionSwitcher(valueConclusion)
            .click().should("have.attr", "aria-pressed", "true");
        return this;
    }

    checkRentLossCheckboxByRow(rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.rentLossCheckboxes.eq(rowNumber).check();
        return this;
    }

    clickAddButton(): CapRateConclusionActions {
        capRateConclusionPage.addButton.should("not.be.disabled").click();
        return this;
    }

    enterAsStabResRentLossTimePeriodByRow(period: number | string, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.residentialRentLossTimePeriodCells(valueConclusionKey, rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsStabCommercialRentLossTimePeriodByRow(period: number | string, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.commercialRentLossTimePeriodCells(valueConclusionKey, rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsStabCommercialUndeterminedRentLossTimePeriodByRow(period: number | string, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.commercialUndeterminedRentLossItemsTimePeriodCells(valueConclusionKey, rowNumber)
            .type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsCompleteResRentLossTimePeriodByRow(period: number | string, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.residentialRentLossTimePeriodCells(valueConclusionKey, rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsCompleteCommercialRentLossTimePeriodByRow(period: number | string, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.commercialRentLossTimePeriodCells(valueConclusionKey, rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsCompleteCommercialUndeterminedRentLossTimePeriodByRow(period: number | string, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.commercialUndeterminedRentLossItemsTimePeriodCells(valueConclusionKey, rowNumber)
            .type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsCompleteLessBuyoutCost(cost: string | number): CapRateConclusionActions {
        const costValue = typeof cost === "string" ? cost : `-$${numberWithCommas(cost)}`;
        capRateConclusionPage.asCompleteLessBuyoutCost.clear().type(`${cost}`).should("have.value", costValue);
        return this;
    }

    verifyPopUpWithTitleExists(title: string): CapRateConclusionActions {
        cy.get(`[aria-label='${title}']`).should("exist");
        return this;
    }

    enterAsStabilizedLaundryLossMonths(months: number): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedLessLaundryLossMonths.clear().type(`${months}`).should("have.value", months);
        return this;
    }

    enterAsCompleteLaundryLossMonths(months: number): CapRateConclusionActions {
        capRateConclusionPage.asCompleteLessLaundryLossMonths.clear().type(`${months}`).should("have.value", months);
        return this;
    }

    enterAsStabilizedCommissionFeeAmount(amount: string | number): CapRateConclusionActions {
        const valueToBe = typeof amount === "string" ? amount : `-$${numberWithCommas(amount)}`;
        capRateConclusionPage.asStabilizedCommissionFeeAmount.clear().type(`${amount}`).should("have.value", valueToBe);
        return this;
    }

    private setRoundingFactorValueAlias(): CapRateConclusionActions {
        capRateConclusionPage.roundingFactorInput.invoke('attr', 'value').then(roundingFactor => {
            cy._mapSet(capRateConclusionKeys.capRateRoundingFactor, roundingFactor);
        });
        return this;
    }

    private setAsStabilizedAmountAlias(conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.amountCell(conclusionValueName).invoke('text').then(asStabilizedAmount => {
            let asStabilizedAmountAdjusted = getNumberFromDollarNumberWithCommas(asStabilizedAmount);
            cy._mapSet(capRateConclusionKeys.asStabilizedAmount, asStabilizedAmountAdjusted);
        });
        return this;
    }

    /**
     * Gets cap rate rounding factor and As Stabilized amount.
     * It verifies whether final value is rounded correctly.
     * Formula: As Stabilized Amount * Rounding Factor => round result => multiply by rounding factor
     */
    verifyFinalValueCalculated(conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        this.setRoundingFactorValueAlias();
        let key = capRateConclusionKeys.asStabilizedAmount;

        switch (conclusionValueName) {
            case enums.VALUE_CONCLUSION_NAME.asIs:
                this.setAsIsAmountAlias(conclusionValueName);
                key = capRateConclusionKeys.asIsMarketAmount;
                break;
            case enums.VALUE_CONCLUSION_NAME.asStabilized:
                this.setAsStabilizedAmountAlias(conclusionValueName);
                key = capRateConclusionKeys.asStabilizedAmount;
                break;
            case enums.VALUE_CONCLUSION_NAME.asComplete:
                this.setAsCompleteAmountAlias(conclusionValueName);
                key = capRateConclusionKeys.asCompleteAmount;
                break;
            default:
                cy.log(`Value Conclusion type is not supported!`);
                break;
        }
        
        cy._mapGet(capRateConclusionKeys.capRateRoundingFactor).then(capRateRounding => {
            cy._mapGet(key).then(marketValue => {
                let expectedFinalValue = Math.round(marketValue / capRateRounding) * capRateRounding;
                let expectedFinalValueText = expectedFinalValue < 0 
                    ? `-$${numberWithCommas(getNumberFromMinusDollarNumberWithCommas(expectedFinalValue))}` 
                    : `$${numberWithCommas(expectedFinalValue)}`;
                capRateConclusionPage.finalValueCell(conclusionValueName).should("have.text", expectedFinalValueText);
            });
        });
        return this;
    }

    /**
     * Adds new Residential/Commercial rent loss with provided value conclusion value, 
     * unit income type and amount of unit required to be checked for rent loss.
     */
    addNewRentLoss(unitIncomeType: BoweryReports.UnitIncomeType, unitsNumber: number, 
        valueConclusion: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.clickAddRentLoss(unitIncomeType);
        capRateConclusionPage
            .valueConclusionSwitcher(valueConclusion)
            .click()
            .should("have.attr", "aria-pressed", "true");

        for (let index = 0; index < unitsNumber; index++) {
            this.checkRentLossCheckboxByRow(index);
        }

        this.clickAddButton();
        return this;
    }

    /**
     * Verifies Prospective Market Value As Complete
     * Sets all aliases for As Stablilized rent losses, commission, entrepreneur profit.
     * Gets all aliases that were set and check As Complete value by formula:
     *   [As Stabilized Amount] - [Sum of Rent Losses] - [Commission Fee] - 
     *   (([Sum of Rent Losses] + [Commission Fee]) * Entrepreneur Profit)
     */
    verifyProspectiveMarketValueAsCompleteCalculated(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.getAllAsStabilizedLossesAliases(valueConclusionKey);
        cy._mapGet(capRateConclusionKeys.allAsStabilizedLossesAliases).then(allAsStabilizedLossesAliases => {
            cy.log(`As Stabilized AmountT: ${allAsStabilizedLossesAliases.asStabilizedAmount}`);

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
                : `${numberWithCommas(prospectiveValue.toFixed(0))}`;

            capRateConclusionPage.amountCell(conclusionValueName)
                .should('have.text', expectedProspectiveValueAsComplete);
        });
        return this;
    }

    /**
     * Verifies As Is Market Value
     * Sets all aliases for As Complete rent losses, buyout cost, renovation, entrepreneur profit.
     * Gets all aliases that were set and check As Is Market value by formula:
     *   [As Complete Amount] - [Sum of Rent Losses] - [Buyout Cost] - [Renovation] -
     *   (([Sum of Rent Losses] + [Less Buyout Cost]) * Entrepreneur Profit)
     */
    verifyAsIsMarketValueCalculated(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.getAllAsCompleteLossesAliases(valueConclusionKey);
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
                : `${numberWithCommas(marketValueAsIs.toFixed(0))}`;

            capRateConclusionPage.amountCell(conclusionValueName)
                .should('have.text', expectedMarketValueAsIs);
        });
        return this;
    }

    /**
     * Sets corresponding map aliases for Stabilized Losses
     */
    private setAllAsStabilizedLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        this.setAsStabilizedResRentLossItemsAmount(valueConclusionKey)
            .setAsStabilizedCommercialRentLossItemsAmount(valueConclusionKey)
            .setAsStabilizedCommercialUndeterminedLossAmount(valueConclusionKey)
            .setCommissionFee()
            .setStabilizedEntrepreneurialProfit();
        return this;
    }

    /**
     * Sets all losses for value conclusion type and generates an object to be
     * stored in map key, to avoid multiple chains from cy._mapGet
     */
    getAllAsStabilizedLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys): CapRateConclusionActions {
        this.setAllAsStabilizedLossesAliases(valueConclusionKey);
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
     * Sets corresponding map aliases for Complete Losses
     */
    private setAllAsCompleteLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        this.setAsCompleteResRentLossItemsAmount(valueConclusionKey)
            .setAsCompleteCommercialRentLossItemsAmount(valueConclusionKey)
            .setAsCompleteCommercialUndeterminedLossAmount(valueConclusionKey)
            .setRenovationBudgetAlias()
            .setLessBuyoutCost()
            .setCompleteEntrepreneurialProfit();
        return this;
    }

    /**
     * Sets all losses for value conclusion type and generates an object to be
     * stored in map key, to avoid multiple chains from cy._mapGet
     */
    getAllAsCompleteLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys): CapRateConclusionActions {
        this.setAllAsCompleteLossesAliases(valueConclusionKey);
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

    private setAsStabilizedResRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        capRateConclusionPage.residentialRentLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asStabilizedResRentLossItem, rentLossNumber);
            });
        return this;
    }

    private setAsStabilizedCommercialRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        capRateConclusionPage.commercialLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asStabilizedCommercialRentLossItem, rentLossNumber);
            });
        return this;
    }

    private setAsStabilizedCommercialUndeterminedLossAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        capRateConclusionPage.commercialUndeterminedRentLossAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asStabilizedCommercialUndeterminedRentLossItem, rentLossNumber);
            });
        return this;
    }

    private setCommissionFee(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedCommissionFeeAmount.should('exist')
            .invoke('attr', 'value').then(commissionFee => {
                let commissionFeeNumber = getNumberFromMinusDollarNumberWithCommas(commissionFee);
                cy._mapSet(capRateConclusionKeys.commissionFee, commissionFeeNumber);
            });
        return this;
    }

    private setStabilizedEntrepreneurialProfit(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedLessEntrepreneurialProfit.should('exist')
            .invoke('attr', 'value').then(entrepreneurialProfit => {
                let entrepreneurialProfitNumber = Number(entrepreneurialProfit.replace('%', ''));
                cy._mapSet(capRateConclusionKeys.entrepreneurialStabilizedProfit, entrepreneurialProfitNumber);
            });
        return this;
    }

    private setAsCompleteAmountAlias(conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        capRateConclusionPage.amountCell(conclusionValueName).should('exist')
            .invoke('text').then(asCompleteAmount => {
                let asCompleteAmountAdjusted = getNumberFromDollarNumberWithCommas(asCompleteAmount);
                cy._mapSet(capRateConclusionKeys.asCompleteAmount, asCompleteAmountAdjusted);
            });
        return this;
    }

    private setAsCompleteResRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        capRateConclusionPage.residentialRentLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asCompleteResRentLossItem, rentLossNumber);
            });
        return this;
    }

    private setAsCompleteCommercialRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        capRateConclusionPage.commercialLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asCompleteCommercialRentLossItem, rentLossNumber);
            });
        return this;
    }

    private setAsCompleteCommercialUndeterminedLossAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        capRateConclusionPage.commercialUndeterminedRentLossAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asCompleteCommercialUndeterminedRentLossItem, rentLossNumber);
            });
        return this;
    }

    private setRenovationBudgetAlias(): CapRateConclusionActions {
        capRateConclusionPage.renovationBudgetAmount.should('exist')
            .invoke('attr', 'value').then(renovationBudget => {
                let renovationBudgetAdjusted = getNumberFromMinusDollarNumberWithCommas(renovationBudget);
                cy._mapSet(capRateConclusionKeys.renovationBudget, renovationBudgetAdjusted);
            });
        return this;
    }

    private setLessBuyoutCost(): CapRateConclusionActions {
        capRateConclusionPage.asCompleteLessBuyoutCost.should('exist')
            .invoke('attr', 'value').then(buyoutCost => {
                let buyoutCostNumber = getNumberFromMinusDollarNumberWithCommas(buyoutCost);
                cy._mapSet(capRateConclusionKeys.buyoutCost, buyoutCostNumber);
            });
        return this;
    }

    private setCompleteEntrepreneurialProfit(): CapRateConclusionActions {
        capRateConclusionPage.asCompleteLessEntrepreneurialProfit.should('exist')
            .invoke('attr', 'value').then(entrepreneurialProfit => {
                let entrepreneurialProfitNumber = Number(entrepreneurialProfit.replace('%', ''));
                cy._mapSet(capRateConclusionKeys.entrepreneurialCompleteProfit, entrepreneurialProfitNumber);
            });
        return this;
    }

    private setAsIsAmountAlias(conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        capRateConclusionPage.amountCell(conclusionValueName).should('exist')
            .invoke('text').then(asIsMarketAmount => {
                let asIsMarketAmountAdjusted = getNumberFromDollarNumberWithCommas(asIsMarketAmount);
                cy._mapSet(capRateConclusionKeys.asIsMarketAmount, asIsMarketAmountAdjusted);
            });
        return this;
    }

    private setAsIsAmountFinalAlias(conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        capRateConclusionPage.finalValueCell(conclusionValueName).should('exist')
            .invoke('text').then(asIsMarketFinalValue => {
                let asIsMarketAmountAdjusted = getNumberFromDollarNumberWithCommas(asIsMarketFinalValue);
                cy._mapSet(capRateConclusionKeys.asIsMarketFinalAmount, asIsMarketAmountAdjusted);
            });
        return this;
    }

    private setAsCompleteFinalAmount(conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        capRateConclusionPage.finalValueCell(conclusionValueName).should('exist')
            .invoke('text').then(asCompleteFinalAmount => {
                let asCompleteFinalAmountAdjusted = getNumberFromDollarNumberWithCommas(asCompleteFinalAmount);
                cy._mapSet(capRateConclusionKeys.asCompleteFinalAmount, asCompleteFinalAmountAdjusted);
            });
        return this;
    }

    private setFinalAmountAlias(conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        capRateConclusionPage.finalValueCell(conclusionValueName).should('exist')
            .invoke('text').then(asStabilizedFinalAmount => {
                let asStabilizedFinalAmountAdjusted = getNumberFromDollarNumberWithCommas(asStabilizedFinalAmount);
                cy._mapSet(capRateConclusionKeys.asStabilizedFinalAmount, asStabilizedFinalAmountAdjusted);
            });
        return this;
    }

    /**
     * Verifies As Is Market value per SF by formula:
     * [As Is Market Final Value] / [Square Foot Analysis Area]
     * @param squareFootAnalysisArea Area for selected square foot analysis basis 
     */
    verifyAsIsMarketPerSFCalculated(
        squareFootAnalysisArea: number, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.setAsIsAmountFinalAlias(conclusionValueName);
        cy._mapGet(capRateConclusionKeys.asIsMarketFinalAmount).then(asIsMarketFinalAmount => {
            let asIsMarketFinalSFAmount = asIsMarketFinalAmount / squareFootAnalysisArea;
            let expectedAsIsMarketSFAmount = asIsMarketFinalSFAmount < 0 
                ? `-$${numberWithCommas(Math.abs(asIsMarketFinalSFAmount).toFixed(2))}`
                : `${numberWithCommas(asIsMarketFinalSFAmount.toFixed(2))}`;
            capRateConclusionPage.asIsMarketValuePerSF.should('have.text', expectedAsIsMarketSFAmount);
        });
        
        return this;
    }

    /**
     * Verifies Prospective Market value As Complete per SF by formula:
     * [Prospective Market Value As Complete (Final Value)] / [Square Foot Analysis Area]
     * @param squareFootAnalysisArea Area for selected square foot analysis basis 
     */
    verifyAsCompleteFinalPerSFCalculated(valueConclusionName: BoweryReports.ValueConclusionName, 
        squareFootAnalysisArea: number): CapRateConclusionActions {
        this.setAsCompleteFinalAmount(valueConclusionName);
        cy._mapGet(capRateConclusionKeys.asCompleteFinalAmount).then(asCompleteFinalAmount => {
            let asCompleteFinalSFAmount = asCompleteFinalAmount / squareFootAnalysisArea;
            let expectedAsCompleteMarketSFAmount = asCompleteFinalSFAmount < 0 
                ? `-$${numberWithCommas(Math.abs(asCompleteFinalSFAmount).toFixed(2))}`
                : `${numberWithCommas(asCompleteFinalSFAmount.toFixed(2))}`;
            capRateConclusionPage.prospectiveMarketValuePerSF(valueConclusionName)
                .invoke('text', expectedAsCompleteMarketSFAmount);
        });
        
        return this;
    }

    /**
     * Verifies Prospective Market value As Stabilized per SF by formula:
     * [Prospective As Market Value As Stabilized (Final Value)] / [Square Foot Analysis Area]
     * @param squareFootAnalysisArea Area for selected square foot analysis basis 
     */
    verifyAsStabilizedFinalPerSFCalculated(valueConclusionName: BoweryReports.ValueConclusionName, 
        squareFootAnalysisArea: number): CapRateConclusionActions {
        this.setFinalAmountAlias(valueConclusionName);
        cy._mapGet(capRateConclusionKeys.asStabilizedFinalAmount).then(asStabilizedFinalAmount => {
            let asStabilizedFinalSFAmount = asStabilizedFinalAmount / squareFootAnalysisArea;
            let expectedAsStabilizedFinalSFAmount = asStabilizedFinalSFAmount < 0 
                ? `-$${numberWithCommas(Math.abs(asStabilizedFinalSFAmount).toFixed(2))}`
                : `${numberWithCommas(asStabilizedFinalSFAmount.toFixed(2))}`;
            capRateConclusionPage.prospectiveMarketValuePerSF(valueConclusionName)
                .invoke('text', expectedAsStabilizedFinalSFAmount);
        });
        
        return this;
    }
}

export default new CapRateConclusionActions(capRateConclusionPage);