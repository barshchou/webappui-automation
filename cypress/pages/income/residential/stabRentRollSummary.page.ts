import BasePage from "../../base/base.page";

class StabilizedRentRollSummaryPage extends BasePage{
    get annualRentCells() {return cy.get("[data-qa^='summaryTableData-annualRent']:not([data-qa*='total'])");}
    get totalAnnualRent() {return cy.get("[data-qa=summaryTableData-annualRent-total-cell]");}
    get increaseCells() {return cy.get("[data-qa^='summaryTableData-increase'] input[name]");}
    get pgiCells() {return cy.get("[data-qa^=summaryTableData-pgi]:not([data-qa*=total])");}
    get pgiTotal() {return cy.get("[data-qa=summaryTableData-pgi-total-cell]");}
    get summaryDiscussionTab() {return cy.get("[data-qa=summaryDiscussion-tab]");}
    get stabRRSummaryDiscussion() {return cy.get("[data-qa^='rentRollSummaryDiscussion.commentary']");}
    get grossIncomeDiscussion() {return cy.get("[data-qa^='potentialGrossResidentialIncomeDiscussion.commentary']");}
    get distributionSummary() {return cy.get("[data-qa^='rentRollUnitDistributionSummary.commentary']");}
}

export default new StabilizedRentRollSummaryPage();
