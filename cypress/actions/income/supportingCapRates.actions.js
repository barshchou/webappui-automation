import BaseActions from "../base/base.actions";
import supportingCapRatesPage from "../../pages/income/supportingCapRates.page";

class SupportingCapRatesActions extends BaseActions {
    verifyIncomeCapitalizationCommentary(commToBe) {
        supportingCapRatesPage.incomeCapitalizationCommentary.should("have.text", commToBe);
    }

    clickPersonalSurveySectionButton() {
        supportingCapRatesPage.personalSurveysOpenSectionButton.click();
    }

    uncheckIncludePersonalSurvey() {
        this.clickPersonalSurveySectionButton();
        supportingCapRatesPage.includePersonalSurveyCheckbox.uncheck().should("have.value", "false");
        this.clickPersonalSurveySectionButton();
    }

    clickSelectedLoanSectionButton() {
        supportingCapRatesPage.selectedLoanOpenSectionButton.click();
    }

    verifyAmortizationTerm(termToBe = "30") {
        supportingCapRatesPage.amortizationTerm.should("not.be.disabled").should("have.value", termToBe);
    }

    verifyNumberOfPaymentsPerYear(number = "12") {
        supportingCapRatesPage.numberOfPaymentsPerYear.should("be.disabled").should("have.value", number);
    }

    verifyNumberOfPayments() {
        supportingCapRatesPage.amortizationTerm.invoke("attr", "value").then(amortValue => {
           supportingCapRatesPage.numberOfPaymentsPerYear.invoke("attr", "value").then(paymentsPerYear => {
               supportingCapRatesPage.numberOfPayments.should("be.disabled")
                   .should("have.value", `${amortValue * paymentsPerYear}`);
           });
        });
    }

    verifyLoanToValueConstant(value = "1") {
        supportingCapRatesPage.loanToValueConstant.should("be.disabled").should("have.value", value);
    }

    verifySelectedLoanLoanToValueRatio(ratio = "75") {
        supportingCapRatesPage.selectedLoanLoanToValueRatio.should("not.be.disabled").should("have.value", ratio);
    }

    verifySelectedLoanEquityRatio() {
        supportingCapRatesPage.loanToValueConstant.invoke("attr", "value").then(loanConst => {
           supportingCapRatesPage.selectedLoanLoanToValueRatio.invoke("attr", "value").then(ratio => {
              supportingCapRatesPage.selectedLoanEquityRatio.should("have.value", `${loanConst * 100 - ratio}`);
           });
        });
    }

    verifyMortgageRate(percent = "4") {
        supportingCapRatesPage.mortgageRate.should("not.be.disabled").should("have.value", percent);
    }

    verifySelectedLoanMortgageConstant(value = "0.0573") {
        supportingCapRatesPage.selectedLoanMortgageConstant.should("be.disabled").should("have.value", value);
    }

    verifyMortgageComponentCommentary(commToBe) {
        supportingCapRatesPage.mortgageComponentCommentary.should("have.text", commToBe);
    }

    verifySelectedLoanTermsSection(mortgageComm, amortTerm, paymentsPerYear, loanConstant, ratio, mortgageRate, mortgageConst) {
        this.verifyAmortizationTerm(amortTerm);
        this.verifyNumberOfPaymentsPerYear(paymentsPerYear);
        this.verifyNumberOfPayments();
        this.verifyLoanToValueConstant(loanConstant);
        this.verifySelectedLoanLoanToValueRatio(ratio);
        this.verifySelectedLoanEquityRatio();
        this.verifyMortgageRate(mortgageRate);
        this.verifySelectedLoanMortgageConstant(mortgageConst);
        this.verifyMortgageComponentCommentary(mortgageComm);
    }

    clickBandOfInvestmentSectionButton() {
        supportingCapRatesPage.bandOfInvestmentSectionButton.click();
    }

    verifyBandInvestmentLoanRatio(value = "75") {
        supportingCapRatesPage.bandInvestmentLoanRatio.should("be.disabled").should("have.value", value);
    }

    verifyBandInvestmentMortgageConstant(value = "0.0573") {
        supportingCapRatesPage.bandInvestmentMortgageConstant.should("be.disabled").should("have.value", value);
    }

    verifyMortgageComponent() {
        supportingCapRatesPage.bandInvestmentLoanRatio.invoke("attr", "value").then(ratio => {
            supportingCapRatesPage.bandInvestmentMortgageConstant.invoke("attr", "value").then(constant => {
                supportingCapRatesPage.mortgageComponent.should("be.disabled")
                    .should("have.value", `${(ratio * constant).toFixed(1)}`);
            });
        });
    }

    enterEquityDividendRate(rate) {
        supportingCapRatesPage.equityDividendRate.clear().type(rate);
    }

    verifyEquityDividendRate(rateToBe) {
        supportingCapRatesPage.equityDividendRate.should("not.be.disabled").should("have.value", rateToBe);
    }

    verifyBandInvestmentEquityRatio(value = "25") {
        supportingCapRatesPage.bandInvestmentEquityRatio.should("be.disabled").should("have.value", value);
    }

    verifyEquityComponent() {
        supportingCapRatesPage.equityDividendRate.invoke("attr", "value").then(rate => {
            supportingCapRatesPage.bandInvestmentEquityRatio.invoke("attr", "value").then(ratio => {
                supportingCapRatesPage.equityComponent.should("be.disabled")
                    .should("have.value", `${rate * (ratio / 100)}`);
            });
        });
    }

    verifyBandInvestmentCapRate() {
        supportingCapRatesPage.mortgageComponent.invoke("attr", "value").then(mortgage => {
            supportingCapRatesPage.equityComponent.invoke("attr", "value").then(equity => {
                supportingCapRatesPage.bandInvestmentCapRate.should("be.disabled")
                    .should("have.value", `${Number(mortgage) + Number(equity)}`);
            });
        });
    }

    verifyBandInvestmentCommentary(commToBe) {
        supportingCapRatesPage.bandInvestmentCommentary.should("have.text", commToBe);
    }

    verifyBandInvestmentSection(comm, equityDividend, loanRatio, constant, equityRatio) {
        this.verifyBandInvestmentLoanRatio(loanRatio);
        this.verifyBandInvestmentMortgageConstant(constant);
        this.verifyMortgageComponent();
        this.verifyEquityDividendRate(equityDividend);
        this.verifyBandInvestmentEquityRatio(equityRatio);
        this.verifyEquityComponent();
        this.verifyBandInvestmentCapRate();
        this.verifyBandInvestmentCommentary(comm);
    }
}

export default new SupportingCapRatesActions();