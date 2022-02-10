import BasePage from "../base/base.page";

class CapRateConclusionPage extends BasePage {
    get bandOfInvestmentsCell() {return cy.get("[data-qa=band-of-investments-cell]");}
    get pwcCell() {return cy.get("[data-qa=pwc-cell]");}
    get situsCell() {return cy.get("[data-qa=situs-rerc-cell]");}
    get changeButton() {return cy.get("[data-qa=no-cap-rate-comps-callout-btn] a");}
    get compCapRatesCell() {return cy.get("[data-qa=comparable-sales-cell]");}
    get conclusionSectionConcludedCapRate() {return cy.get("[data-qa=capRateConclusion-section] [name=concludedCapRate]");}
    get asCompleteMonthsOfRentLoss() {return cy.get("[name=asCompleteMonthsOfRentLoss]");}
    get asStabilizedMonthsOfRentLoss() {return cy.get("[name=asStabilizedMonthsOfRentLoss]");}
    get roundingFactorDropdown() {return cy.get("[data-qa=roundingFactor-select-list] [data-qa=select-value]");}
    getDropdownOptionByValue(value) {return cy.get(`li[data-value='${value}']`);}
    get netOperatingIncomeCell() {return cy.get("[data-qa=noi-amount-cell]");}
    get concludedCapRateCellInputToVerify() {return cy.get("[data-qa=concludedCapRate-amount-cell] input:first-child");}
    get asStabilizedPeriodCell() {return cy.get("[data-qa=as-stabilized-period-cell]");}
    get asStabilizedAmountCell() {return cy.get("[data-qa=as-stabilized-amount-cell]");}
    get asStabilizedFinalValueCell() {return cy.get("[data-qa=as-stabilized-final-value-cell]");}
    get asCompletePeriodCell() {return cy.get("[data-qa=as-complete-period-cell]");}
    get asCompleteAmountCell() {return cy.get("[data-qa=as-complete-amount-cell]");}
    get asCompleteFinalValueCell() {return cy.get("[data-qa=as-complete-final-value-cell]");}
    get asCompleteLessEntrepreneurialProfit() {return cy.get("[data-qa*='asCompleteLossItems.entrepreneurialProfit'] input[inputmode]");}
    get asIsMarketPeriodCell() {return cy.get("[data-qa=as-is-market-period-cell]");}
    get asIsMarketAmountCell() {return cy.get("[data-qa=as-is-market-amount-cell]");}
    get asIsMarketFinalValueCell() {return cy.get("[data-qa=as-is-market-final-value-cell]");}
    get asIsMarketValuePerUnit() {return cy.xpath("//*[.='As Is Market Value Per Unit']//following-sibling::td[3]");}
    get asIsMarketValuePerSF() {return cy.xpath("//*[.='As Is Market Value Per SF']//following-sibling::td[3]");}
    get addResidentialRentLossButton() {return cy.xpath("//*[@data-qa='add-btn'][.='+ New Residential Rent Loss']");}
    get rentLossCheckboxes() {return cy.get("input[type=checkbox][id]");}
    get asStabilizedRentLossSwitch() {return cy.get("[data-qa='As Stabilized-switch-button']");}
    get addButton() {return cy.xpath("//button[.='Add']");}
    get asStabResRentLossTimePeriodCells() {return cy.get("[name^=asStabilizedResRentLossItems][name$=months]");}
    get asCompleteLessBuyoutCost() {return cy.get("[data-qa*='asCompleteLossItems.buyoutCost'] input[inputmode]");}
    // TODO: change laundry loss months locators after adding unique attributes
    get asStabilizedLessLaundryLossMonths() {return cy.get("[name='asStabilizedLossItems[0].months']");}
    get asCompleteLessLaundryLossMonths() {return cy.get("[name='asCompleteLossItems[0].months']");}
}

export default new CapRateConclusionPage();