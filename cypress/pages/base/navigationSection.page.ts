import BasePage from "./base.page";

class NavigationSection extends BasePage {
    get reportInfoButton() { return cy.get('#report-information'); }

    get reportAppraiserButton() { return cy.get('#appraisers'); }

    get incomeApproachButton() { return cy.get("#income-approach svg"); }

    get residentialIncomeArrow() { return cy.get("#residentialIncome"); }

    get inPlaceRentRollButton() { return cy.get("#residential-rent-roll"); }

    get rentCompsButton() { return cy.get("#residential-rent-comps"); }

    get commercialIncomeArrow() { return cy.get("#commercialIncome"); }

    get commercialRentRollButton() { return cy.get("#commercial-rent-roll"); }

    get residentialUnitGroups() { return cy.get('[id="residential-unit-groups"]'); }

    get commercialStabRentRollButton() { return cy.get("#commercial-projected-rent-roll"); }

    get finalButton() { return cy.get("#final svg"); }

    get unitInspectionButton() { return cy.get("#unit-inspection"); }

    get propertyButton() { return cy.get("#property-information svg"); }

    get commercialUnitsButton() { return cy.get("#commercial-units"); }

    get summaryButton() { return cy.get("#property-summary"); }

    get marketButton() { return cy.get("#property-market"); }

    get propertyDescriptionButton() { return cy.get("#general-property-description"); }

    get clientButton() { return cy.get("#client"); }

    get siteDescription() { return cy.get("#site-description"); }

    get propertyMaps() { return cy.get("#property-maps"); }

    get expenseForecastBookmark() { return cy.get("#expense-forecast > svg[data-icon=bookmark]"); }

    get capRateConclusion() { return cy.get("#cap-rate-conclusion"); }

    get insurableReplacementCostBookmark() { return cy.get("#insurable-replacement-cost > svg[data-icon=bookmark]"); }

    get salesApproachButton() { return cy.get("#sales-approach svg"); }

    get valueConclusionButton() { return cy.get("#sale-value-conclusion"); }

    get findCompsButton() { return cy.get("#sales-comps-search"); }

    get adjustCompsButton() { return cy.get("#sales-adjustment-grid"); }

    get commercialRentCompsButton() { return cy.get("#commercial-rent-comps"); }

    get commercialCompGroupsDiscussionButton() { return cy.get(`#commercial-comp-groups-discussion`); }

    get comparableExpenses() { return cy.get("#comparable-expenses"); }

    get amenities() { return cy.get("#amenities"); }

    get laundry() { return cy.get("#laundry-income"); }

    get storage() { return cy.get("#storage-income"); }

    get parking() { return cy.get("#parking-income"); }

    get other() { return cy.get("#other-income"); }

    get miscellaneousIncome() { return cy.get("#miscellaneousIncome"); }

    get reportButton() { return cy.get("#report svg"); }

    get previewEditButton() { return cy.get("#preview-and-edit svg"); }

    get letterOfTransmittal() { return cy.get("#letter-of-transmittal"); }

    get potentialGrossIncome() { return cy.get("#potential-gross-income"); }

    get taxInfo() { return cy.get("#tax-information"); }

    get proForma() { return cy.get("#pro-forma"); }

    get commercialCompGroups() { return cy.get("#commercial-comp-groups"); }

    get expenseHistory() { return cy.get("#expense-history"); }

    get expenseForecast() { return cy.get("#expense-forecast"); }

    get supportingCapRates() { return cy.get("#supporting-cap-rates"); }

    get introduction() { return cy.get("#introduction"); }

    get coverPage() { return cy.get("#cover-page"); }

    get profileOrganization() { return cy.get("[aria-label='Profile & Organization']"); }

    get menuItemsProfileOrganization() { return cy.get("[role=menu] > li"); }

    get commercialReimbursementButton() { return cy.get("#commercial-reimbursement-summary"); }

    get residentialStabilizedRentRoll() { return cy.get("#residential-projected-rent-roll"); }

    get commercialRentReconciliationButton() { return cy.get(`#commercial-rent-reconciliation`); }

    get certification() { return cy.get('#certification'); }

    get residentialStabilizedRentRollSummary() { return cy.get(`#residential-projected-rent-roll-summary`); }

    get sourceInformation() { return cy.get("#source-info"); }
}

export default new NavigationSection();
