import BasePage from "./base.page";

class NavigationSection extends BasePage {
    get reportInfoButton() { return cy.get('[id="report-information"]');}

    get incomeApproachButton() {return cy.get("#income-approach svg");}

    get residentialIncomeArrow() {return cy.get("#residentialIncome svg");}

    get inPlaceRentRollButton() {return cy.get("#residential-rent-roll");}

    get rentCompsButton() {return cy.get("#residential-rent-comps");}

    get commercialIncomeArrow() {return cy.get("#commercialIncome svg");}

    get commercialRentRollButton() {return cy.get("#commercial-rent-roll");}

    get commercialStabRentRollButton() {return cy.get("#commercial-projected-rent-roll");}

    get finalButton() {return cy.get("#final svg");}

    get unitInspectionButton() {return cy.get("#unit-inspection");}

    get propertyButton() {return cy.get("#property-information svg");}

    get commercialUnitsButton() {return cy.get("#commercial-units");}

    get summaryButton() {return cy.get("#property-summary");}

    get clientButton() {return cy.get("#client");}

    get siteDescription() {return cy.get("#site-description");}

    get propertyMaps() {return cy.get("#property-maps");}

    get expenseForecastBookmark() {return cy.get("#expense-forecast > svg[data-icon=bookmark]");}

    get capRateConclusion() {return cy.get("#cap-rate-conclusion");}

    get insurableReplacementCostBookmark() {return cy.get("#insurable-replacement-cost > svg[data-icon=bookmark]");}

    get salesApproachButton() {return cy.get("#sales-approach svg");}

    get valueConclusionButton() {return cy.get("#sale-value-conclusion");}

    get findCompsButton() {return cy.get("#sales-comps-search");}

    get adjustCompsButton() {return cy.get("#sales-adjustment-grid");}

    get commercialRentCompsButton() {return cy.get("#commercial-rent-comps");}

    get comparableExpenses() {return cy.get("#comparable-expenses");}

    get amenities() {return cy.get("#amenities");}

    get laundry() {return cy.get("#laundry-income");}

    get miscellaneousIncome() {return cy.get("#miscellaneousIncome");}

    get reportButton() {return cy.get("#report svg");}

    get previewEditButton() {return cy.get("#preview-and-edit > svg");}

    get letterOfTransmittal() {return cy.get("#letter-of-transmittal");}

    get potentialGrossIncome() {return cy.get("#potential-gross-income");}

    get proForma() {return cy.get("#pro-forma");}

    get commercialCompGroups() {return cy.get("#commercial-comp-groups");}

    get expenseHistory() {return cy.get("#expense-history");}

    get expenseForecast() {return cy.get("#expense-forecast");}

    get supportingCapRates() {return cy.get("#supporting-cap-rates");}
}

export default new NavigationSection();