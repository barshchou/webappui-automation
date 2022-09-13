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

    enterMonthsOfRentLoss(number: number | string, valueConclusionKey: BoweryReports.ValueConclusionKeys): 
    CapRateConclusionActions {
        capRateConclusionPage.monthsOfRentLoss(valueConclusionKey).type(`${number}`).should("have.value", `${number}`);
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
            .verifyAsIsMarketPerSF(partData.perSF, valueConclusionName);
        return this;
    }

    verifyAsIsMarketPeriodCell(period: string, conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.periodCell(conclusionValueName).should("have.text", period);
        return this;
    }

    enterLessEntrepreneurialProfit(profit: string | number, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys): CapRateConclusionActions {
        capRateConclusionPage.lessEntrepreneurialProfit(valueConclusionKey).clear().type(`${profit}`)
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

    verifyAsIsMarketPerSF(value: string, valueConclusionName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        capRateConclusionPage.marketValuePerSF(valueConclusionName).should("have.text", value);
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

    enterLossTimePeriodByRow(period: number | string, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys, rentLostType: BoweryReports.RentLossType, 
        rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.lossTimePeriodCells(valueConclusionKey, rentLostType, rowNumber).type(`${period}`)
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

    enterAsStabilizedCommissionFeeAmount(amount: string | number): CapRateConclusionActions {
        const valueToBe = typeof amount === "string" ? amount : `-$${numberWithCommas(amount)}`;
        capRateConclusionPage.asStabilizedCommissionFeeAmount.clear().type(`${amount}`).should("have.value", valueToBe);
        return this;
    }

    enterMiscellaneousLossMonths(months: number, valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        lossType: BoweryReports.RentLossType): CapRateConclusionActions {
        capRateConclusionPage.lessMiscellaneousLossMonths(valueConclusionKey, lossType).clear()
            .type(`${months}`).should("have.value", months);
        this.setMiscellaneousLossAmountAlias(valueConclusionKey, lossType);
        return this;
    }

    /**
     * Gets cap rate rounding factor and As Stabilized amount.
     * It verifies whether final value is rounded correctly.
     * Formula: As Stabilized Amount * Rounding Factor => round result => multiply by rounding factor
     */
    verifyFinalValueCalculated(conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        this.setRoundingFactorValueAlias()
            .setAmountAlias(conclusionValueName);
        let key = capRateConclusionKeys.asStabilizedAmount;
        
        switch (conclusionValueName) {
            case enums.VALUE_CONCLUSION_NAME.asIs:
                key = capRateConclusionKeys.asIsMarketAmount;
                break;
            case enums.VALUE_CONCLUSION_NAME.asStabilized:
                key = capRateConclusionKeys.asStabilizedAmount;
                break;
            case enums.VALUE_CONCLUSION_NAME.asComplete:
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
    addNewRentLoss(
        unitIncomeType: BoweryReports.UnitIncomeType, 
        unitsNumber: number, 
        conclusionValue: BoweryReports.ConclusionValue, 
        valueConclusionName?: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.clickAddRentLoss(unitIncomeType);

        if (conclusionValue == enums.VALUE_CONCLUSION_TYPE.AS_COMPLETE) {
            capRateConclusionPage
                .valueConclusionSwitcher(valueConclusionName)
                .click()
                .should("have.attr", "aria-pressed", "true");
        }

        for (let index = 0; index < unitsNumber; index++) {
            this.checkRentLossCheckboxByRow(index);
        }

        this.clickAddButton();
        return this;
    }

    /**
     * Verifies Market Value As Complete or As Is based on report type (As Complete or As Stabilized)
     * Sets all aliases for As Stablilized rent losses, commission, entrepreneur profit.
     * Gets all aliases that were set and check As Complete value by formula:
     *   [As Stabilized Amount] - [Sum of Rent Losses] - [Commission Fee] - 
     *   (([Sum of Rent Losses] + [Commission Fee]) * Entrepreneur Profit)
     */
    verifyProspectiveMarketValueAsIsAsCompleteCalculated(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.getAllAsStabilizedLossesAliases(valueConclusionKey, enums.VALUE_CONCLUSION_NAME.asStabilized);
        cy._mapGet(capRateConclusionKeys.allAsStabilizedLossesAliases).then(allAsStabilizedLossesAliases => {
            cy.log(`As Stabilized Amount: ${allAsStabilizedLossesAliases.asStabilizedAmount}`);

            let allRentLosses = allAsStabilizedLossesAliases.residentialRentLoss
                + allAsStabilizedLossesAliases.commercialRentLoss +
                allAsStabilizedLossesAliases.commercialUndRentLoss + allAsStabilizedLossesAliases.commissionFee;
            cy.log(`All Losses: ${allRentLosses}`);

            let entrepreneurLoss = allRentLosses * allAsStabilizedLossesAliases.entrepreneurProfit / 100;
            cy.log(`Entrepreneur Profit: ${entrepreneurLoss}`);

            // Round calculated value
            let prospectiveValue = Math.floor((allAsStabilizedLossesAliases.asStabilizedAmount - allRentLosses -
                entrepreneurLoss));
            cy.log(`Prospective Value As Complete: ${prospectiveValue}`);

            let expectedProspectiveValueAsComplete = prospectiveValue < 0
                ? `-$${numberWithCommas(prospectiveValue.toFixed(0).replace('-', ''))}`
                : `$${numberWithCommas(prospectiveValue.toFixed(0))}`;

            capRateConclusionPage.amountCell(conclusionValueName)
                .should('have.text', expectedProspectiveValueAsComplete);
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
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.getAllAsCompleteLossesAliases(valueConclusionKey, enums.VALUE_CONCLUSION_NAME.asComplete);
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
            let marketValueAsIs = Math.ceil((allAsCompleteLossesAliases.asCompleteAmount - allRentLosses -
                entrepreneurLoss));
            cy.log(`Market Value As Is: ${marketValueAsIs}`);

            let expectedMarketValueAsIs = marketValueAsIs < 0
                ? `-$${numberWithCommas(marketValueAsIs.toFixed(0).replace('-', ''))}`
                : `$${numberWithCommas(marketValueAsIs.toFixed(0))}`;

            capRateConclusionPage.amountCell(conclusionValueName)
                .should('have.text', expectedMarketValueAsIs);
        });
        return this;
    }

    /**
     * Sets corresponding map aliases for Stabilized Losses
     */
    private setAllAsStabilizedLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): 
        CapRateConclusionActions {
        this.setResRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialUndeterminedLossAmount(valueConclusionKey, conclusionValueName)
            .setCommissionFee()
            .setEntrepreneurialProfit(conclusionValueName, valueConclusionKey);
        return this;
    }

    /**
     * Sets all losses for value conclusion type and generates an object to be
     * stored in map key, to avoid multiple chains from cy._mapGet
     */
    getAllAsStabilizedLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
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
     * Sets corresponding map aliases for Complete Losses
     */
    private setAllAsCompleteLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.setResRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialRentLossItemsAmount(valueConclusionKey, conclusionValueName)
            .setCommercialUndeterminedLossAmount(valueConclusionKey, conclusionValueName)
            .setRenovationBudgetAlias()
            .setLessBuyoutCost()
            .setEntrepreneurialProfit(conclusionValueName, valueConclusionKey);
        return this;
    }

    /**
     * Sets all losses for value conclusion type and generates an object to be
     * stored in map key, to avoid multiple chains from cy._mapGet
     */
    getAllAsCompleteLossesAliases(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
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

    private setResRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        let key = conclusionValueName == enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.asStabilizedResRentLossItem
            : capRateConclusionKeys.asCompleteResRentLossItem;
        capRateConclusionPage.residentialRentLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(key, rentLossNumber);
            });
        return this;
    }

    private setCommercialRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        let key = conclusionValueName == enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.asStabilizedCommercialRentLossItem
            : capRateConclusionKeys.asCompleteCommercialRentLossItem;
        capRateConclusionPage.commercialLossItemsAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(key, rentLossNumber);
            });
        return this;
    }

    private setCommercialUndeterminedLossAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        let key = conclusionValueName == enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.asStabilizedCommercialUndeterminedRentLossItem
            : capRateConclusionKeys.asCompleteCommercialUndeterminedRentLossItem;
        capRateConclusionPage.commercialUndeterminedRentLossAmount(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(key, rentLossNumber);
            });
        return this;
    }

    private setEntrepreneurialProfit(conclusionValueName: BoweryReports.ValueConclusionName, 
        valueConclusionKey: BoweryReports.ValueConclusionKeys): CapRateConclusionActions {
        let key = conclusionValueName == enums.VALUE_CONCLUSION_NAME.asStabilized 
            ? capRateConclusionKeys.entrepreneurialStabilizedProfit
            : capRateConclusionKeys.entrepreneurialCompleteProfit;
        capRateConclusionPage.lessEntrepreneurialProfit(valueConclusionKey).should('exist')
            .invoke('attr', 'value').then(entrepreneurialProfit => {
                let entrepreneurialProfitNumber = Number(entrepreneurialProfit.replace('%', ''));
                cy._mapSet(key, entrepreneurialProfitNumber);
            });
        return this;
    }

    private setAmountAlias(conclusionValueName: BoweryReports.ValueConclusionName): 
    CapRateConclusionActions {
        let key = conclusionValueName != enums.VALUE_CONCLUSION_NAME.asIs 
            ? conclusionValueName == enums.VALUE_CONCLUSION_NAME.asStabilized 
                ? capRateConclusionKeys.asStabilizedAmount
                : capRateConclusionKeys.asCompleteAmount
            : capRateConclusionKeys.asIsMarketAmount;
        capRateConclusionPage.amountCell(conclusionValueName).invoke('text').then(asStabilizedAmount => {
            let asStabilizedAmountAdjusted = getNumberFromDollarNumberWithCommas(asStabilizedAmount);
            cy._mapSet(key, asStabilizedAmountAdjusted);
        });
        return this;
    }

    private setAmountFinalAlias(conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        let key = conclusionValueName != enums.VALUE_CONCLUSION_NAME.asIs 
            ? conclusionValueName == enums.VALUE_CONCLUSION_NAME.asStabilized 
                ? capRateConclusionKeys.asStabilizedFinalAmount
                : capRateConclusionKeys.asCompleteFinalAmount
            : capRateConclusionKeys.asIsMarketFinalAmount;
        capRateConclusionPage.finalValueCell(conclusionValueName).should('exist')
            .invoke('text').then(asIsMarketFinalValue => {
                let asIsMarketAmountAdjusted = getNumberFromDollarNumberWithCommas(asIsMarketFinalValue);
                cy._mapSet(key, asIsMarketAmountAdjusted);
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

    setRoundingFactorValueAlias(): CapRateConclusionActions {
        capRateConclusionPage.roundingFactorInput.invoke('attr', 'value').then(roundingFactor => {
            cy._mapSet(capRateConclusionKeys.capRateRoundingFactor, roundingFactor);
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

    private setMiscellaneousLossAmountAlias(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        lossType: BoweryReports.RentLossType): CapRateConclusionActions {
        capRateConclusionPage.miscellaneousRentLossAmount(valueConclusionKey, lossType).should('exist')
            .invoke('attr', 'value').then(miscellaneousLoss => {
                let key = valueConclusionKey + lossType;
                let miscellaneousLossNumber = getNumberFromDollarNumberWithCommas(miscellaneousLoss);
                cy._mapSet(key, miscellaneousLossNumber);
            });
        return this;
    }

    /**
     * Verifies As Is Market value per SF by formula:
     * [As Is Market Final Value] / [Square Foot Analysis Area]
     * @param squareFootAnalysisArea Area for selected square foot analysis basis 
     */
    verifyMarketValuePerSFCalculated(
        squareFootAnalysisArea: number, 
        conclusionValueName: BoweryReports.ValueConclusionName): CapRateConclusionActions {
        this.setAmountFinalAlias(conclusionValueName);
        let key = capRateConclusionKeys.asIsMarketFinalAmount;

        switch (conclusionValueName) {
            case enums.VALUE_CONCLUSION_NAME.asIs:
                key = capRateConclusionKeys.asIsMarketFinalAmount;
                break;
            case enums.VALUE_CONCLUSION_NAME.asStabilized:
                key = capRateConclusionKeys.asStabilizedFinalAmount;
                break;
            case enums.VALUE_CONCLUSION_NAME.asComplete:
                key = capRateConclusionKeys.asCompleteFinalAmount;
                break;
            default:
                cy.log(`Value Conclusion type is not supported!`);
                break;
        }

        cy._mapGet(key).then(marketFinalAmount => {
            let marketFinalSFAmount = marketFinalAmount / squareFootAnalysisArea;
            let expectedMarketSFAmount = marketFinalSFAmount < 0 
                ? `-$${numberWithCommas(Math.abs(marketFinalSFAmount).toFixed(2))}`
                : `${numberWithCommas(marketFinalSFAmount.toFixed(2))}`;
            capRateConclusionPage.marketValuePerSF(conclusionValueName).should('have.text', expectedMarketSFAmount);
        });
        
        return this;
    }

    verifyGeneratedPurposeCommentary(expectedText: string): CapRateConclusionActions {
        capRateConclusionPage.purposeDateOfValueDiscussion.invoke('text').should('deep.equal', expectedText);
        return this;
    }
}

export default new CapRateConclusionActions(capRateConclusionPage);
