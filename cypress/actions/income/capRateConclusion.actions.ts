import capRateConclusionPage from "../../pages/income/capRateConclusion.page";
import { 
    getNumberFromDollarNumberWithCommas, 
    getNumberFromMinusDollarNumberWithCommas, 
    numberWithCommas 
} from "../../../utils/numbers.utils";
import BaseActionsExt from "../base/base.actions.ext";
import capRateConclusionKeys from "../../utils/mapKeys/income/capRateConclusion/capRateConclusion.keys";
import { BoweryReports } from "../../types/boweryReports.type";

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

    verifyAsStabilizedTablePart(partData: Readonly<{period: string, finalValue: string}>): CapRateConclusionActions {
        this.verifyAsStabilizedPeriodCell(partData.period)
            .verifyAsStabilizedAmountCell()
            .verifyAsStabilizedFinalValueCell(partData.finalValue);
        return this;
    }

    verifyAsStabilizedPeriodCell(period: string): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedPeriodCell.should("have.text", period);
        return this;
    }

    verifyAsStabilizedAmountCell() {
        capRateConclusionPage.netOperatingIncomeCell.invoke("text").then(noiText => {
            const noiNumber = getNumberFromDollarNumberWithCommas(noiText);
            capRateConclusionPage.concludedCapRateCellInputToVerify.invoke("attr", "value").then(capRate => {
                let stringNumber = numberWithCommas(Math.round(noiNumber / Number.parseInt(capRate) * 100));
                const textToBe = noiNumber < 0 
                    ? `-$${stringNumber.replace('-', '')}` 
                    : `$${stringNumber}`;
                capRateConclusionPage.asStabilizedAmountCell.should("have.text", textToBe);
            });
        });
        return this;
    }

    verifyAsStabilizedFinalValueCell(finalValue: string): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedFinalValueCell.should("have.text", finalValue);
        return this;
    }

    verifyAsCompleteTablePart(partData: Readonly<{period: string, amount: string, finalValue: string}>): 
    CapRateConclusionActions {
        this.verifyAsCompletePeriodCell(partData.period)
            .verifyAsCompleteAmountCell(partData.amount)
            .verifyAsCompleteFinalValueCell(partData.finalValue);
        return this;
    }

    verifyAsCompletePeriodCell(period: string): CapRateConclusionActions {
        capRateConclusionPage.asCompletePeriodCell.should("have.text", period);
        return this;
    }

    verifyAsCompleteAmountCell(amount: string): CapRateConclusionActions {
        capRateConclusionPage.asCompleteAmountCell.should("have.text", amount);
        return this;
    }

    verifyAsCompleteFinalValueCell(finalValue: string): CapRateConclusionActions {
        capRateConclusionPage.asCompleteFinalValueCell.should("have.text", finalValue);
        return this;
    }

    verifyAsIsMarketTablePart(partData: Readonly<{period: string, amount: string, 
        finalValue: string, perUnit: string, perSF: string}>): CapRateConclusionActions {
        this.verifyAsIsMarketPeriodCell(partData.period)
            .verifyAsIsMarketAmountCell(partData.amount)
            .verifyAsIsMarketFinalValueCell(partData.finalValue)
            .verifyAsIsMarketPerUnit(partData.perUnit)
            .verifyAsIsMarketPerSF(partData.perSF);
        return this;
    }

    verifyAsIsMarketPeriodCell(period: string): CapRateConclusionActions {
        capRateConclusionPage.asIsMarketPeriodCell.should("have.text", period);
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

    verifyAsIsMarketAmountCell(amount: string): CapRateConclusionActions {
        capRateConclusionPage.asIsMarketAmountCell.should("have.text", amount);
        return this;
    }

    verifyAsIsMarketFinalValueCell(finalValue: string): CapRateConclusionActions {
        capRateConclusionPage.asIsMarketFinalValueCell.should("have.text", finalValue);
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

    enterAsStabResRentLossTimePeriodByRow(period: number | string, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.asStabResRentLossTimePeriodCells(rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsStabCommercialRentLossTimePeriodByRow(period: number | string, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.asStabCommercialRentLossTimePeriodCells(rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsStabCommercialUndeterminedRentLossTimePeriodByRow(period: number | string, rowNumber = 0): 
    CapRateConclusionActions {
        capRateConclusionPage.asStabCommercialUndeterminedRentLossItemsTimePeriodCells(rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsCompleteResRentLossTimePeriodByRow(period: number | string, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.asCompleteResRentLossTimePeriodCells(rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsCompleteCommercialRentLossTimePeriodByRow(period: number | string, rowNumber = 0): CapRateConclusionActions {
        capRateConclusionPage.asCompleteCommercialRentLossTimePeriodCells(rowNumber).type(`${period}`)
            .should("have.value", period);
        return this;
    }

    enterAsCompleteCommercialUndeterminedRentLossTimePeriodByRow(period: number | string, rowNumber = 0): 
    CapRateConclusionActions {
        capRateConclusionPage.asCompleteCommercialUndeterminedRentLossItemsTimePeriodCells(rowNumber).type(`${period}`)
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

    setRoundingFactorValueAlias(): CapRateConclusionActions {
        capRateConclusionPage.roundingFactorInput.invoke('attr', 'value').then(roundingFactor => {
            cy._mapSet(capRateConclusionKeys.capRateRoundingFactor, roundingFactor);
        });
        return this;
    }

    setAsStabilizedAmountAlias(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedAmountCell.invoke('text').then(asStabilizedAmount => {
            let asStabilizedAmountAdjusted = getNumberFromDollarNumberWithCommas(asStabilizedAmount);
            cy._mapSet(capRateConclusionKeys.asStabilizedAmount, asStabilizedAmountAdjusted);
        });
        return this;
    }

    /**
     * Gets cap rate rounding factor and As Stabilized amount.
     * It verifies whether final value is rounded correctly.
     * Formula: As Stabilized Amount * Rounding Factor => round result => multiply by rounding factor
     * @returns CapRateConclusionActions
     */
    verifyAsStabilizedFinalValueCalculated(): CapRateConclusionActions {
        this.setRoundingFactorValueAlias()
            .setAsStabilizedAmountAlias();
        cy._mapGet(capRateConclusionKeys.capRateRoundingFactor).then(capRateRounding => {
            cy._mapGet(capRateConclusionKeys.asStabilizedAmount).then(asStabilizedValue => {
                let expectedFinalValue = Math.round(asStabilizedValue / capRateRounding) * capRateRounding;
                let expectedFinalValueText = expectedFinalValue < 0 
                    ? `-$${numberWithCommas(getNumberFromMinusDollarNumberWithCommas(expectedFinalValue))}` 
                    : `$${numberWithCommas(expectedFinalValue)}`;
                capRateConclusionPage.asStabilizedFinalValueCell.should("have.text", expectedFinalValueText);
            });
        });
        return this;
    }

    /**
     * Gets cap rate rounding factor and As Complete amount.
     * It verifies whether final value is rounded correctly.
     * Formula: As Complete AMount * Rounding Factor => round result => multiply by rounding factor
     * @returns CapRateConclusionActions
     */
    verifyAsCompleteFinalValueCalculated(): CapRateConclusionActions {
        this.setRoundingFactorValueAlias()
            .setAsCompleteAmountAlias();
        cy._mapGet(capRateConclusionKeys.capRateRoundingFactor).then(capRateRounding => {
            cy._mapGet(capRateConclusionKeys.asCompleteAmount).then(asCompleteAmount => {
                let expectedFinalValue = Math.round(asCompleteAmount / capRateRounding) * capRateRounding;
                let expectedFinalValueText = expectedFinalValue < 0 
                    ? `-$${numberWithCommas(getNumberFromMinusDollarNumberWithCommas(expectedFinalValue))}` 
                    : `$${numberWithCommas(expectedFinalValue)}`;
                capRateConclusionPage.asCompleteFinalValueCell.should("have.text", expectedFinalValueText);
            });
        });
        return this;
    }

    /**
     * Gets cap rate rounding factor and As Complete amount.
     * It verifies whether final value is rounded correctly.
     * Formula: As Is AMount * Rounding Factor => round result => multiply by rounding factor
     * @returns CapRateConclusionActions
     */
    verifyAsIsFinalValueCalculated(): CapRateConclusionActions {
        this.setRoundingFactorValueAlias()
            .setAsIsAmountAlias();
        cy._mapGet(capRateConclusionKeys.capRateRoundingFactor).then(capRateRounding => {
            cy._mapGet(capRateConclusionKeys.asIsMarketAmount).then(asIsMarketAmount => {
                let expectedFinalValue = Math.round(asIsMarketAmount / capRateRounding) * capRateRounding;
                let expectedFinalValueText = expectedFinalValue < 0 
                    ? `-$${numberWithCommas(getNumberFromMinusDollarNumberWithCommas(expectedFinalValue))}` 
                    : `$${numberWithCommas(expectedFinalValue)}`;
                capRateConclusionPage.asIsMarketFinalValueCell.should("have.text", expectedFinalValueText);
            });
        });
        return this;
    }

    /**
     * Adds new Residential/Commercial rent loss with provided value conclusion value, 
     * unit income type and amount of unit required to be checked for rent loss.
     * @param  unitIncomeType
     * @param  unitsNumber
     * @param  valueConclusion
     * @returns CapRateConclusionActions
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
     * Gets all aliases that were set and check As Complete value by formula:
     *   [As Stabilized Amount] - [Sum of Rent Losses] - [Commission Fee] - 
     *   (([Sum of Rent Losses] + [Commission Fee]) * Entrepreneur Profit)
     * @returns CapRateConclusionActions
     */
    verifyProspectiveMarketValueAsCompleteCalculated(): CapRateConclusionActions {
        cy._mapGet(capRateConclusionKeys.asStabilizedResRentLossItem).then(residentialRentLoss => {
            cy._mapGet(capRateConclusionKeys.asStabilizedCommercialRentLossItem).then(commercialRentLoss => {
                cy._mapGet(capRateConclusionKeys.asStabilizedCommercialUndeterminedRentLossItem)
                    .then(commercialUndRentLoss => {
                        cy._mapGet(capRateConclusionKeys.commissionFee).then(commissionFee => {
                            cy._mapGet(capRateConclusionKeys.entrepreneurialStabilizedProfit)
                                .then(entrepreneurProfit => {
                                    cy._mapGet(capRateConclusionKeys.asStabilizedAmount).then(asStabilizedAmount => {
                                        cy.log(`As Stabilized AmountT: ${asStabilizedAmount}`);
                                    
                                        let allRentLosses = residentialRentLoss  + commercialRentLoss + 
                                        commercialUndRentLoss  + commissionFee;
                                        cy.log(`All Losses: ${allRentLosses}`);

                                        let entrepreneurLoss = allRentLosses * entrepreneurProfit / 100;
                                        cy.log(`Entrepreneur Profit: ${entrepreneurLoss}`);

                                        let prospectiveValue = Math.round((asStabilizedAmount - allRentLosses - 
                                        entrepreneurLoss) / 10) * 10;
                                        cy.log(`Prospective Value As Complete: ${prospectiveValue}`);

                                        let expectedProspectiveValueAsComplete = prospectiveValue < 0 
                                            ? `-$${numberWithCommas(prospectiveValue.toFixed(0).replace('-', ''))}`
                                            : `${numberWithCommas(prospectiveValue.toFixed(0))}`;

                                        capRateConclusionPage.asCompleteAmountCell
                                            .should('have.text', expectedProspectiveValueAsComplete);
                                    });
                                });
                        });
                    });
            });
        });
        return this;
    }

    /**
     * Verifies As Is Market Value
     * Gets all aliases that were set and check As Is Market value by formula:
     *   [As Complete Amount] - [Sum of Rent Losses] - [Buyout Cost] - [Renovation] -
     *   (([Sum of Rent Losses] + [Less Buyout Cost]) * Entrepreneur Profit)
     * @returns CapRateConclusionActions
     */
    verifyAsIsMarketValueCalculated(): CapRateConclusionActions {
        cy._mapGet(capRateConclusionKeys.asCompleteResRentLossItem).then(residentialRentLoss => {
            cy._mapGet(capRateConclusionKeys.asCompleteCommercialRentLossItem).then(commercialRentLoss => {
                cy._mapGet(capRateConclusionKeys.asCompleteCommercialUndeterminedRentLossItem)
                    .then(commercialUndRentLoss => {
                        cy._mapGet(capRateConclusionKeys.buyoutCost).then(buyoutCost => {
                            cy._mapGet(capRateConclusionKeys.entrepreneurialCompleteProfit)
                                .then(entrepreneurProfit => {
                                    cy._mapGet(capRateConclusionKeys.asCompleteAmount).then(asCompleteAmount => {
                                        cy._mapGet(capRateConclusionKeys.renovationBudget).then(renovationBudget => {
                                            cy.log(`As Complete AmountT: ${asCompleteAmount}`);
                                    
                                            let allRentLosses = residentialRentLoss  + commercialRentLoss + 
                                            commercialUndRentLoss  + buyoutCost + renovationBudget;
                                            cy.log(`All Losses: ${allRentLosses}`);
    
                                            let entrepreneurLoss = allRentLosses * entrepreneurProfit / 100;
                                            cy.log(`Entrepreneur Profit: ${entrepreneurLoss}`);
    
                                            let marketValueAsIs = Math.round((asCompleteAmount - allRentLosses - 
                                            entrepreneurLoss) / 10) * 10;
                                            cy.log(`Prospective Value As Complete: ${marketValueAsIs}`);
    
                                            let expectedMarketValueAsIs = marketValueAsIs < 0 
                                                ? `-$${numberWithCommas(marketValueAsIs.toFixed(0).replace('-', ''))}`
                                                : `${numberWithCommas(marketValueAsIs.toFixed(0))}`;
    
                                            capRateConclusionPage.asIsMarketAmountCell
                                                .should('have.text', expectedMarketValueAsIs);
                                        });
                                        
                                    });
                                });
                        });
                    });
            });
        });
        return this;
    }

    /**
     * Sets corresponding map aliases for Stabilized Losses
     * @returns CapRateConclusionActions
     */
    setAllAsStabilizedLossesAliases(): CapRateConclusionActions {
        this.setAsStabilizedResRentLossItemsAmount()
            .setAsStabilizedCommercialRentLossItemsAmount()
            .setAsStabilizedCommercialUndeterminedLossAmount()
            .setCommissionFee()
            .setStabilizedEntrepreneurialProfit();
        return this;
    }

    /**
     * Sets corresponding map aliases for Complete Losses
     * @returns CapRateConclusionActions
     */
    setAllAsCompleteLossesAliases(): CapRateConclusionActions {
        this.setAsCompleteResRentLossItemsAmount()
            .setAsCompleteCommercialRentLossItemsAmount()
            .setAsCompleteCommercialUndeterminedLossAmount()
            .setRenovationBudgetAlias()
            .setLessBuyoutCost()
            .setCompleteEntrepreneurialProfit();
        return this;
    }

    setAsStabilizedResRentLossItemsAmount(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedResRentLossItemsAmount().invoke('attr', 'value').then(rentLoss => {
            let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
            cy._mapSet(capRateConclusionKeys.asStabilizedResRentLossItem, rentLossNumber);
        });
        return this;
    }

    setAsStabilizedCommercialRentLossItemsAmount(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedCommercialLossItemsAmount().invoke('attr', 'value').then(rentLoss => {
            let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
            cy._mapSet(capRateConclusionKeys.asStabilizedCommercialRentLossItem, rentLossNumber);
        });
        return this;
    }

    setAsStabilizedCommercialUndeterminedLossAmount(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedCommercialUndeterminedRentLossAmount()
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asStabilizedCommercialUndeterminedRentLossItem, rentLossNumber);
            });
        return this;
    }

    setCommissionFee(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedCommissionFeeAmount.invoke('attr', 'value').then(commissionFee => {
            let commissionFeeNumber = getNumberFromMinusDollarNumberWithCommas(commissionFee);
            cy._mapSet(capRateConclusionKeys.commissionFee, commissionFeeNumber);
        });
        return this;
    }

    setStabilizedEntrepreneurialProfit(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedLessEntrepreneurialProfit.invoke('attr', 'value')
            .then(entrepreneurialProfit => {
                let entrepreneurialProfitNumber = Number(entrepreneurialProfit.replace('%', ''));
                cy._mapSet(capRateConclusionKeys.entrepreneurialStabilizedProfit, entrepreneurialProfitNumber);
            });
        return this;
    }

    setAsCompleteAmountAlias(): CapRateConclusionActions {
        capRateConclusionPage.asCompleteAmountCell.invoke('text').then(asCompleteAmount => {
            let asCompleteAmountAdjusted = getNumberFromDollarNumberWithCommas(asCompleteAmount);
            cy._mapSet(capRateConclusionKeys.asCompleteAmount, asCompleteAmountAdjusted);
        });
        return this;
    }

    setAsCompleteResRentLossItemsAmount(): CapRateConclusionActions {
        capRateConclusionPage.asCompleteResRentLossItemsAmount().invoke('attr', 'value').then(rentLoss => {
            let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
            cy._mapSet(capRateConclusionKeys.asCompleteResRentLossItem, rentLossNumber);
        });
        return this;
    }

    setAsCompleteCommercialRentLossItemsAmount(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedCommercialLossItemsAmount().invoke('attr', 'value').then(rentLoss => {
            let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
            cy._mapSet(capRateConclusionKeys.asCompleteCommercialRentLossItem, rentLossNumber);
        });
        return this;
    }

    setAsCompleteCommercialUndeterminedLossAmount(): CapRateConclusionActions {
        capRateConclusionPage.asStabilizedCommercialUndeterminedRentLossAmount()
            .invoke('attr', 'value').then(rentLoss => {
                let rentLossNumber = getNumberFromMinusDollarNumberWithCommas(rentLoss);
                cy._mapSet(capRateConclusionKeys.asCompleteCommercialUndeterminedRentLossItem, rentLossNumber);
            });
        return this;
    }

    setRenovationBudgetAlias(): CapRateConclusionActions {
        capRateConclusionPage.renovationBudgetAmount.invoke('attr', 'value').then(renovationBudget => {
            let renovationBudgetAdjusted = getNumberFromMinusDollarNumberWithCommas(renovationBudget);
            cy._mapSet(capRateConclusionKeys.renovationBudget, renovationBudgetAdjusted);
        });
        return this;
    }

    setLessBuyoutCost(): CapRateConclusionActions {
        capRateConclusionPage.asCompleteLessBuyoutCost.invoke('attr', 'value').then(buyoutCost => {
            let buyoutCostNumber = getNumberFromMinusDollarNumberWithCommas(buyoutCost);
            cy._mapSet(capRateConclusionKeys.buyoutCost, buyoutCostNumber);
        });
        return this;
    }

    setCompleteEntrepreneurialProfit(): CapRateConclusionActions {
        capRateConclusionPage.asCompleteLessEntrepreneurialProfit.invoke('attr', 'value')
            .then(entrepreneurialProfit => {
                let entrepreneurialProfitNumber = Number(entrepreneurialProfit.replace('%', ''));
                cy._mapSet(capRateConclusionKeys.entrepreneurialCompleteProfit, entrepreneurialProfitNumber);
            });
        return this;
    }

    setAsIsAmountAlias(): CapRateConclusionActions {
        capRateConclusionPage.asIsMarketAmountCell.invoke('text').then(asIsMarketAmount => {
            let asIsMarketAmountAdjusted = getNumberFromDollarNumberWithCommas(asIsMarketAmount);
            cy._mapSet(capRateConclusionKeys.asIsMarketAmount, asIsMarketAmountAdjusted);
        });
        return this;
    }

    setAsIsAmountFinalAlias(): CapRateConclusionActions {
        capRateConclusionPage.asIsMarketFinalValueCell.invoke('text').then(asIsMarketFinalValue => {
            let asIsMarketAmountAdjusted = getNumberFromDollarNumberWithCommas(asIsMarketFinalValue);
            cy._mapSet(capRateConclusionKeys.asIsMarketFinalAmount, asIsMarketAmountAdjusted);
        });
        return this;
    }

    /**
     * Verifies As Is Market value per SF by formula:
     * [As Is Market Final Value] / [Square Foot Analysis Area]
     * @param squareFootAnalysisArea Area for selected square foot analysis basis 
     * @returns CapRateConclusionActions
     */
    verifyAsIsMarketPerSFCalculated(squareFootAnalysisArea: number): CapRateConclusionActions {
        this.setAsIsAmountFinalAlias();
        cy._mapGet(capRateConclusionKeys.asIsMarketFinalAmount).then(asIsMarketFinalAmount => {
            let asIsMarketFinalSFAmount = asIsMarketFinalAmount / squareFootAnalysisArea;
            let expectedAsIsMarketSFAmount = asIsMarketFinalSFAmount < 0 
                ? `-$${asIsMarketFinalSFAmount}`
                : `${asIsMarketFinalSFAmount}`;
            capRateConclusionPage.asIsMarketValuePerSF.invoke('text', expectedAsIsMarketSFAmount);
        });
        
        return this;
    }
}

export default new CapRateConclusionActions(capRateConclusionPage);