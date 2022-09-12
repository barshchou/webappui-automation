import BasePage from "../base/base.page";

class ValueConclusionPage extends BasePage {
    get unadjustedPriceMin() { return cy.get("[data-qa=unadjusted-price-min]"); }

    get unadjustedPriceAvg() { return cy.get("[data-qa=unadjusted-price-avg]"); }

    get unadjustedPriceMax() { return cy.get("[data-qa=unadjusted-price-max]"); }

    get unadjustedPriceMedian() { return cy.get("[data-qa=unadjusted-price-median]"); }

    get adjustedPriceMin() { return cy.get("[data-qa=adjusted-price-min]"); }

    get adjustedPriceAvg() { return cy.get("[data-qa=adjusted-price-avg]"); }

    get adjustedPriceMax() { return cy.get("[data-qa=adjusted-price-max]"); }

    get adjustedPriceMedian() { return cy.get("[data-qa=adjusted-price-median]"); }

    get incomeApproachConclusion() { return cy.get("[data-qa=income-approach-conclusion]"); }

    get saleValueConclusion() { return cy.get("[data-qa=saleValueConclusion-amount-input] input"); }

    get asStabilizedPeriod() { return cy.get("[data-qa=as-stabilized-period-cell]"); }

    get asStabilizedAmount() { return cy.get("[data-qa=as-stabilized-amount-cell]"); }

    get asStabilizedFinalValue() { return cy.get("[data-qa=as-stabilized-final-value-cell]"); }

    get asCompletePeriod() { return cy.get("[data-qa=as-complete-period-cell]"); }

    get asCompleteAmount() { return cy.get("[data-qa=as-complete-amount-cell]"); }

    get asCompleteFinalValue() { return cy.get("[data-qa=as-complete-final-value-cell]"); }

    get asIsMarketPeriod() { return cy.get("[data-qa=as-is-market-period-cell]"); }

    get asIsMarketAmount() { return cy.get("[data-qa=as-is-market-amount-cell]"); }

    get asIsMarketFinalValue() { return cy.get("[data-qa=as-is-market-final-value-cell]"); }

    get matchIncomeApproachDeductionsCheckbox() { return cy.get("[data-qa^=matchIncomeApproachDeductions] input"); }

    get asStabResRentLossTimePeriodCells() { return cy.get("[name^=asStabilizedResRentLossItems][name$=months]"); }

    get additionalCommentaryInput() { 
        return cy.get("[name='salesApproachValueConclusionCommentary.additionalCommentary']"); 
    }

    get valueConclusionDiscussionCommentary() { return cy.get("[data-qa*='ConclusionCommentary.commentary']"); }

    get editCommentaryButton() { return cy.get("[data-qa=generated-commentary-edit-btn]"); }

    get commentaryInput() { return cy.get("[name*='ConclusionCommentary.commentary']"); }

    get revertCommentaryButton() { return cy.get("[data-qa=generated-commentary-revert-btn]"); }

    get asCompleteLessEntrepreneurialProfit() { 
        return cy.get("[data-qa*='asCompleteLossItems.entrepreneurialProfit'] input[inputmode]"); 
    }

    get basisForAnalysisAmount() { return cy.get("[data-qa='basisForSFAnalysis-amount-cell']"); }

    get asStabilizedLaundryLossMonths() { 
        return cy.get("[data-qa='asStabilizedLossItems.laundryRentLoss.renovation-period-cell'] input[type=text]"); 
    }

    get asCompleteLessLaundryLossMonths() { 
        return cy.get("[data-qa='asCompleteLossItems.laundryRentLoss.renovation-period-cell'] input[type=text]"); 
    }

    get asStabilizedLaundryLossAmount() { 
        return cy.get("[data-qa*='asStabilizedLossItems.laundryRentLoss.amount'] input:not([type=hidden])"); 
    }

    get asCompleteLaundryLossAmount() { 
        return cy.get("[data-qa*='asCompleteLossItems.laundryRentLoss.amount'] input:not([type=hidden])"); 
    }

    get asStabilizedCommissionFeeAmount() { 
        return cy.get("[data-qa^='asStabilizedLossItems.commissionFee.amount'] input:not([type=hidden])"); 
    }

    get numberOfUnitsAmount() { return cy.get("td[data-qa='unitsNumber-amount-cell']"); }

    get salesValueConclusionTableOfUnitsAmount() { 
        return cy.xpath("//tbody[@data-qa='as-is-as-stabilized']/tr[2]/td[1]"); 
    }

    get asIsAsStabilizedTable() { return cy.get("[data-qa=as-is-as-stabilized]"); }
}

export default new ValueConclusionPage();