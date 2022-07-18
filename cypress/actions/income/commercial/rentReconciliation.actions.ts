import enums from "../../../enums/enums";
import rentReconciliationPage from "../../../pages/income/commercial/rentReconciliation.page";
import { BoweryReports } from "../../../types/boweryReports.type";
import BaseActionsExt from "../../base/base.actions.ext";

class RentReconciliationActions extends BaseActionsExt<typeof rentReconciliationPage> {
    addMarketRentConclusion(value: number | string, index = 0): RentReconciliationActions{
        rentReconciliationPage.getMarketRentConclusion(index)
            .clear()
            .type(`${value}`)
            .should('have.value', `$${value}`);
        return this;
    }

    verifyRentLabel(expectedLabelName: string): RentReconciliationActions {
        rentReconciliationPage.rentTypeLabel.should('have.text', expectedLabelName);
        return this;
    }

    verifyBaseUnitRent(expectedRent: number): RentReconciliationActions {
        rentReconciliationPage.baseUnitRentSfMonth.invoke('text').should('deep.equal', `$${expectedRent.toFixed(2)}`);
        return this;
    }

    verifySubjectUnitRent(expectedRent: number, unit = 0): RentReconciliationActions {
        rentReconciliationPage.subjectUnitRentSfMonth(unit).invoke('text').should('deep.equal', `$${expectedRent.toFixed(2)}`);
        return this;
    }

    verifyCompsRent(expectedRent: number, compIndex = 0): RentReconciliationActions {
        rentReconciliationPage.compRent(compIndex).should("have.text", `$${expectedRent.toFixed(2)}`);
        return this;
    }

    verifyCalculationInputValue(expectedLeaseTermsCalcType: BoweryReports.CalculationType): RentReconciliationActions {
        rentReconciliationPage.calculationDropdown.invoke('text').should('deep.equal', expectedLeaseTermsCalcType);
        return this;
    }

    setLeaseTermsCalculationType(leaseTermsCalcType: BoweryReports.CalculationType): RentReconciliationActions {
        this.openCalculationDropdown()
            .selectLeaseTermsCalculationOption(leaseTermsCalcType);
        return this;
    }

    openCalculationDropdown(): RentReconciliationActions {
        rentReconciliationPage.calculationDropdown.click();
        return this;
    }

    selectLeaseTermsCalculationOption(leaseTermsCalcType: BoweryReports.CalculationType): RentReconciliationActions {
        rentReconciliationPage.calculationOption(leaseTermsCalcType).click();
        this.verifyCalculationInputValue(leaseTermsCalcType);
        return this;
    }

    setLeaseTermsAdjustment(adjustment: number, calculationType: BoweryReports.CalculationType, compIndex = 0): RentReconciliationActions {
        let expectedAdjustmentValue = calculationType === enums.CALCULATION_TYPE.percent 
            ? adjustment 
            : adjustment < 0 ? `-$${Math.abs(adjustment).toFixed(2)}` : `$${adjustment.toFixed(2)}`;
        rentReconciliationPage.leaseTermsAdjustments(compIndex)
            .clear()
            .type(`{del}`)
            .type(adjustment < 0 && calculationType === enums.CALCULATION_TYPE.dollarPerSF ? `${adjustment}-` : `${adjustment}`)
            .blur()
            .should('have.value', expectedAdjustmentValue);
        return this;
    }

    setMarketConditionAdjustment(adjustment: number, compIndex = 0): RentReconciliationActions {
        rentReconciliationPage.marketConditionsAdjustments(compIndex).clear().type(`${adjustment}`)
            .should('have.value', adjustment);
        return this;
    }

    getLeaseTermsAdjustment(rentSf: number, calculationType: BoweryReports.CalculationType, compIndex = 0): RentReconciliationActions {
        rentReconciliationPage.leaseTermsAdjustments(compIndex).invoke('attr', 'value').then(leaseTermAdj => {
            let leaseTermsAdjustmentSubTotal = calculationType === enums.CALCULATION_TYPE.percent 
                ? (rentSf * (100 + Number(leaseTermAdj))) / 100 
                : rentSf + Number(leaseTermAdj.replace('$', ''));
            cy._mapSet('leaseTermsAdj', leaseTermsAdjustmentSubTotal);
        });
        return this;
    }

    getMarketConditionAdjustment(compIndex = 0): RentReconciliationActions {
        rentReconciliationPage.marketConditionsAdjustments(compIndex).invoke('attr', 'value').then(marketConditionAdj => {
            cy._mapSet('marketConditionAdj', marketConditionAdj);
        });
        return this;
    }

    getCompRent(compIndex = 0): RentReconciliationActions {
        rentReconciliationPage.compRent(compIndex).invoke('text').then(rentSf => {
            cy._mapSet('compRentSF', Number(rentSf.replace('$', '')));
        });
        return this;
    }

    /**
     * Verify Comps Trended Rent/SF/Month based on rent, adjustments and calculation type set.
     * 
     * We're getting comp rent, lease terms adjustments and market condition adjustments from map aliases. 
     * Having those values we can calculate Trended Price/Sf/Month expected value.
     */
    verifyTrendedRentSF(calculationType: BoweryReports.CalculationType, compIndex = 0): RentReconciliationActions {
        this.getCompRent(compIndex);
        cy._mapGet('compRentSF').then(compRent => {
            this.getLeaseTermsAdjustment(compRent, calculationType, compIndex)
                .getMarketConditionAdjustment(compIndex);
            cy._mapGet('leaseTermsAdj').then(leaseTermsAdjustmentSubTotal => {
                cy._mapGet('marketConditionAdj').then(marketConditionAdjustment => {
                    let expectedTrendedRentSF = ((Number(leaseTermsAdjustmentSubTotal) * (100 + Number(marketConditionAdjustment))) / 100);
                    let expectedTrendedRentSFRounded = Math.round(expectedTrendedRentSF * 1000) / 1000;
                    rentReconciliationPage.getTrendedRentSF(compIndex)
                        .should('have.text', expectedTrendedRentSFRounded < 0 
                            ? `-$${Math.abs(expectedTrendedRentSFRounded).toFixed(2)}` 
                            : `$${expectedTrendedRentSFRounded.toFixed(2)}`);
                });
            });
        });
        return this;
    }

    verifyLeaseTermsAdjustment(calculationType: BoweryReports.CalculationType, compIndex = 0): RentReconciliationActions {
        this.getCompRent(compIndex);
        cy._mapGet('compRentSF').then(compRent => {
            this.getLeaseTermsAdjustment(compRent, calculationType, compIndex);
            cy._mapGet('leaseTermsAdj').then(leaseTermsAdjustmentSubTotal => {
                rentReconciliationPage.getLeaseTermsAdjustmentSubTotal(compIndex)
                    .should('have.text', leaseTermsAdjustmentSubTotal < 0 
                        ? `-$${Math.abs(leaseTermsAdjustmentSubTotal).toFixed(2)}`
                        : `$${leaseTermsAdjustmentSubTotal.toFixed(2)}`);
            });
        });
        return this;
    }

    verifyLeaseTermsAdjustmentDefault(calculationType: BoweryReports.CalculationType, compIndex = 0): RentReconciliationActions {
        rentReconciliationPage.leaseTermsAdjustmentsPlaceholder(compIndex).invoke('text').should('deep.equal', calculationType);
        return this;
    }
}
export default new RentReconciliationActions(rentReconciliationPage);
