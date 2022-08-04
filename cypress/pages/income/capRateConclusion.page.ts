import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class CapRateConclusionPage extends BasePage {
    get bandOfInvestmentsCell() { return cy.get("[data-qa=band-of-investments-cell]"); }

    get pwcCell() { return cy.get("[data-qa=pwc-cell]"); }

    get situsCell() { return cy.get("[data-qa=situs-rerc-cell]"); }

    get changeButton() { return cy.get("[data-qa=no-cap-rate-comps-callout-btn] a"); }

    get compCapRatesCell() { return cy.get("[data-qa=comparable-sales-cell]"); }

    get conclusionSectionConcludedCapRate() { 
        return cy.get("[data-qa=capRateConclusion-section] [name=concludedCapRate]"); 
    }

    get asCompleteMonthsOfRentLoss() { return cy.get("[name=asCompleteMonthsOfRentLoss]"); }

    get asStabilizedMonthsOfRentLoss() { return cy.get("[name=asStabilizedMonthsOfRentLoss]"); }

    get roundingFactorDropdown() { return cy.get("[data-qa=roundingFactor-select-list] [data-qa=select-value]"); }

    get roundingFactorInput() { return cy.get("[data-qa=roundingFactor-select-list] input"); }

    getDropdownOptionByValue(value: number) { return cy.get(`li[data-value='${value}']`); }

    get netOperatingIncomeCell() { return cy.get("[data-qa=noi-amount-cell]"); }

    get concludedCapRateCellInputToVerify() { 
        return cy.get("[data-qa=concludedCapRate-amount-cell] input:first-child"); 
    }

    periodCell(conclusionValue: BoweryReports.ValueConclusionName) { 
        let conclusionValueAdjusted = conclusionValue.toLocaleLowerCase().replace(' ', '-');
        return cy.get(`[data-qa^="${conclusionValueAdjusted}"][data-qa$="-period-cell"]`); 
    }

    amountCell(conclusionValue: BoweryReports.ValueConclusionName) { 
        let conclusionValueAdjusted = conclusionValue.toLocaleLowerCase().replace(' ', '-');
        return cy.get(`[data-qa^="${conclusionValueAdjusted}"][data-qa$="-amount-cell"]`); 
    }

    finalValueCell(conclusionValue: BoweryReports.ValueConclusionName) { 
        let conclusionValueAdjusted = conclusionValue.toLocaleLowerCase().replace(' ', '-');
        return cy.get(`[data-qa^="${conclusionValueAdjusted}"][data-qa$="-final-value-cell"]`); 
    }

    get asCompleteLessEntrepreneurialProfit() { 
        return cy.get("[data-qa*='asCompleteLossItems.entrepreneurialProfit'] input[inputmode]"); 
    }

    get asStabilizedLessEntrepreneurialProfit() { 
        return cy.get("[data-qa*='asStabilizedLossItems.entrepreneurialProfit'] input[inputmode]"); 
    }

    get asIsMarketValuePerUnit() { return cy.xpath("//*[.='As Is Market Value Per Unit']//following-sibling::td[3]"); }

    get asIsMarketValuePerSF() { return cy.xpath("//*[.='As Is Market Value Per SF']//following-sibling::td[3]"); }

    prospectiveMarketValuePerSF(valueConclusionValue: BoweryReports.ValueConclusionName) { 
        return cy.xpath(`//*[.='Prospective Market Value ${valueConclusionValue} Per SF']//following-sibling::td[3]`); 
    }

    addRentLossButton(incomeType: BoweryReports.UnitIncomeType) { 
        return cy.xpath(`//*[@data-qa='add-btn'][.='+ New ${incomeType} Rent Loss']`); 
    }

    get rentLossCheckboxes() { return cy.get("input[type=checkbox][id]"); }

    valueConclusionSwitcher(valueConclusion: BoweryReports.ValueConclusionName) { 
        return cy.get(`[data-qa='${valueConclusion}-switch-button']`); 
    }

    get addButton() { return cy.xpath("//button[.='Add']"); }

    residentialRentLossTimePeriodCells(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) { 
        return cy.get(`[name="${valueConclusionKey}ResRentLossItems[${index}].months"]`); 
    }

    commercialRentLossTimePeriodCells(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) { 
        return cy.get(`[name="${valueConclusionKey}CommercialRentLossItems[${index}].months"]`); 
    }

    commercialUndeterminedRentLossItemsTimePeriodCells(valueConclusionKey: BoweryReports.ValueConclusionKeys, 
        index = 0) { 
        return cy.get(`[name="${valueConclusionKey}LossItems[${index}].months"]`); 
    }

    get asCompleteLessBuyoutCost() { return cy.get("[data-qa*='asCompleteLossItems.buyoutCost'] input[inputmode]"); }

    get asStabilizedLessLaundryLossMonths() { 
        return cy.get("[data-qa='asStabilizedLossItems.laundryRentLoss.renovation-period-cell'] input[type=text]"); 
    }

    get asCompleteLessLaundryLossMonths() { 
        return cy.get("[data-qa='asCompleteLossItems.laundryRentLoss.renovation-period-cell'] input[type=text]"); 
    }

    get asStabilizedCommissionFeeAmount() { 
        return cy.get("[data-qa^='asStabilizedLossItems.commissionFee.amount'] input:not([type=hidden])"); 
    }

    residentialRentLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) {
        return cy.get(`[name="${valueConclusionKey}ResRentLossItems[${index}].amount"]`);
    }

    commercialLossItemsAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) {
        return cy.get(`[name="${valueConclusionKey}CommercialRentLossItems[${index}].amount"]`);
    }

    commercialUndeterminedRentLossAmount(valueConclusionKey: BoweryReports.ValueConclusionKeys, index = 0) {
        return cy.get(`[name="${valueConclusionKey}LossItems[${index}].amount"]`);
    }

    get renovationBudgetAmount() {
        return cy.get(`[name="asCompleteLossItems[1].amount"]`);
    }
}

export default new CapRateConclusionPage();