import { BoweryReports } from "../../types/boweryReports.type";
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

    amountCell(conclusionValue: BoweryReports.ValueConclusionName) { 
        let conclusionValueAdjusted = conclusionValue.toLocaleLowerCase().replace(' ', '-');
        return cy.get(`[data-qa^="${conclusionValueAdjusted}"][data-qa$="-amount-cell"]`); 
    }

    finalValueCell(conclusionValue: BoweryReports.ValueConclusionName) { 
        let conclusionValueAdjusted = conclusionValue.toLocaleLowerCase().replace(' ', '-');
        return cy.get(`[data-qa^="${conclusionValueAdjusted}"][data-qa$="-final-value-cell"]`); 
    }

    get asCompletePeriod() { return cy.get("[data-qa=as-complete-period-cell]"); }

    get asIsMarketPeriod() { return cy.get("[data-qa=as-is-market-period-cell]"); }

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

    getMiscellaneousLossMonths(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        miscellaneousType: BoweryReports.RentLossType) { 
        return cy.get(`[data-qa='${valueConclusionKey}LossItems.` + 
        `${miscellaneousType}.renovation-period-cell'] input[type=text]`); 
    }

    getMiscellaneousLossAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        miscellaneousType: BoweryReports.RentLossType) { 
        return cy.get(`[data-qa='${valueConclusionKey}LossItems.` + 
        `${miscellaneousType}.amount-cell'] input:not([type=hidden])`); 
    }

    get asStabilizedCommissionFeeAmount() { 
        return cy.get("[data-qa^='asStabilizedLossItems.commissionFee.amount'] input:not([type=hidden])"); 
    }

    get numberOfUnitsAmount() { return cy.get("td[data-qa='unitsNumber-amount-cell']"); }

    get salesValueConclusionTableOfUnitsAmount() { 
        return cy.xpath("//tbody[@data-qa='as-is-as-stabilized']/tr[2]/td[1]"); 
    }

    get asIsAsStabilizedTable() { return cy.get("[data-qa=as-is-as-stabilized]"); }

    residentialRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) {
        return cy.get(`[name="${valueConclusionKey}ResRentLossItems[${index}].amount"]`);
    }

    commercialLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) {
        return cy.get(`[name="${valueConclusionKey}CommercialRentLossItems[${index}].amount"]`);
    }

    commercialUndeterminedRentLossAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) {
        return cy.get(`[name="${valueConclusionKey}LossItems[${index}].amount"]`);
    }

    lessEntrepreneurialProfit(valueConclusionKey: BoweryReports.ValueConclusionKeys) { 
        return cy.get(`[data-qa*='${valueConclusionKey}LossItems.entrepreneurialProfit'] input[inputmode]`); 
    }

    get renovationBudgetAmount() {
        return cy.get(`[name="asCompleteLossItems[1].amount"]`);
    }

    get asCompleteLessBuyoutCost() { return cy.get("[data-qa*='asCompleteLossItems.buyoutCost'] input[inputmode]"); }

    get headerSalesValue() { return cy.xpath("//p[contains(text(), 'Sales Value ')]"); }

    get incomeDeductionCheckbox() { return cy.get(`[data-qa^="matchIncomeApproachDeductions"] input`); }
}

export default new ValueConclusionPage();