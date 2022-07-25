import BasePage from "../base/base.page";

class SupportingCapRatesPage extends BasePage {
    get personalSurveysOpenSectionButton() { 
        return cy.get("[data-qa=personal-surveys-ratio-section] > [role=button]"); 
    }

    get includePersonalSurveyCheckbox() { return cy.get("[data-qa^='personalSurveys.includeInExport'] input"); }

    get incomeCapitalizationCommentary() { return cy.get("[data-qa^='incomeCapitalizationIntroduction.commentary']"); }

    get selectedLoanOpenSectionButton() { return cy.get("[data-qa=selected-loan-terms-section] > [role=button]"); }

    get amortizationTerm() { return cy.get("[name=amortizationTerm]"); }

    get numberOfPaymentsPerYear() { return cy.get("[name=numberOfPaymentsPerYear]"); }

    get numberOfPayments() { return cy.get("[name=numberOfPayments]"); }

    get loanToValueConstant() { return cy.get("[name=loanToValueConstant]"); }

    get selectedLoanLoanToValueRatio() { return cy.get("[data-qa=selected-loan-terms-section] [name=loanValueRatio]"); }

    get selectedLoanEquityRatio() { return cy.get("[data-qa=selected-loan-terms-section] [name=equityRatio]"); }

    get mortgageRate() { return cy.get("[name=mortgageRate]"); }

    get selectedLoanMortgageConstant() { 
        return cy.get("[data-qa=selected-loan-terms-section] [name=mortgageConstant]"); 
    }

    get mortgageComponentCommentary() { return cy.get("[data-qa^='mortgageComponentDiscussion.commentary']"); }

    get bandOfInvestmentSectionButton() { return cy.get("[data-qa=band-of-investment-section] > [role=button]"); }

    get bandInvestmentLoanRatio() { return cy.get("[data-qa=band-of-investment-section] [name=loanValueRatio]"); }

    get bandInvestmentMortgageConstant() { 
        return cy.get("[data-qa=band-of-investment-section] [name=mortgageConstant]"); 
    }

    get mortgageComponent() { return cy.get("[name=mortgageComponent]"); }

    get equityDividendRate() { return cy.get("[name=equityDividendRate]"); }

    get bandInvestmentEquityRatio() { return cy.get("[data-qa=band-of-investment-section] [name=equityRatio]"); }

    get equityComponent() { return cy.get("[name=equityComponent]"); }

    get bandInvestmentCapRate() { return cy.get("[name=bandOfInvestmentCapRate]"); }

    get bandInvestmentCommentary() { return cy.get("[data-qa^='bandOfInvestmentDiscussion.commentary']"); }
}

export default new SupportingCapRatesPage();