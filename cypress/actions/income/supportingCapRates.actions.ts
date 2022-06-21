import supportingCapRatesPage from "../../pages/income/supportingCapRates.page";
import BaseActionsExt from "../base/base.actions.ext";

class SupportingCapRatesActions extends BaseActionsExt<typeof supportingCapRatesPage> {

    verifyIncomeCapitalizationCommentary(commToBe: string): SupportingCapRatesActions {
        supportingCapRatesPage.incomeCapitalizationCommentary.should("have.text", commToBe);
        return this;
    }

    clickPersonalSurveySectionButton(): SupportingCapRatesActions {
        supportingCapRatesPage.personalSurveysOpenSectionButton.click();
        return this;
    }

    uncheckIncludePersonalSurvey(): SupportingCapRatesActions {
        this.clickPersonalSurveySectionButton();
        supportingCapRatesPage.includePersonalSurveyCheckbox.uncheck().should("have.value", "false");
        this.clickPersonalSurveySectionButton();
        return this;
    }

    clickSelectedLoanSectionButton(): SupportingCapRatesActions {
        supportingCapRatesPage.selectedLoanOpenSectionButton.click();
        return this;
    }

    verifyAmortizationTerm(termToBe = 30): SupportingCapRatesActions {
        supportingCapRatesPage.amortizationTerm.should("not.be.disabled").should("have.value", termToBe);
        return this;
    }

    verifyNumberOfPaymentsPerYear(number = 12): SupportingCapRatesActions {
        supportingCapRatesPage.numberOfPaymentsPerYear.should("be.disabled").should("have.value", number);
        return this;
    }

    verifyNumberOfPayments(): SupportingCapRatesActions {
        supportingCapRatesPage.amortizationTerm.invoke("attr", "value").then(amortValue => {
           supportingCapRatesPage.numberOfPaymentsPerYear.invoke("attr", "value").then(paymentsPerYear => {
               supportingCapRatesPage.numberOfPayments.should("be.disabled")
                   .should("have.value", `${parseInt(amortValue) * parseInt(paymentsPerYear)}`);
           });
        });
        return this;
    }

    verifyLoanToValueConstant(value = 1): SupportingCapRatesActions {
        supportingCapRatesPage.loanToValueConstant.should("be.disabled").should("have.value", value);
        return this;
    }

    verifySelectedLoanLoanToValueRatio(ratio = 75): SupportingCapRatesActions {
        supportingCapRatesPage.selectedLoanLoanToValueRatio.should("not.be.disabled").should("have.value", ratio);
        return this;
    }

    verifySelectedLoanEquityRatio(): SupportingCapRatesActions {
        supportingCapRatesPage.loanToValueConstant.invoke("attr", "value").then(loanConst => {
           supportingCapRatesPage.selectedLoanLoanToValueRatio.invoke("attr", "value").then(ratio => {
              supportingCapRatesPage.selectedLoanEquityRatio.should("have.value", `${parseInt(loanConst) * 100 - parseInt(ratio)}`);
           });
        });
        return this;
    }

    verifyMortgageRate(percent = 4): SupportingCapRatesActions {
        supportingCapRatesPage.mortgageRate.should("not.be.disabled").should("have.value", percent);
        return this;
    }

    verifySelectedLoanMortgageConstant(value = 0.0573): SupportingCapRatesActions {
        supportingCapRatesPage.selectedLoanMortgageConstant.should("be.disabled").should("have.value", value);
        return this;
    }

    verifyMortgageComponentCommentary(commToBe: string): SupportingCapRatesActions {
        supportingCapRatesPage.mortgageComponentCommentary.should("have.text", commToBe);
        return this;
    }

    verifySelectedLoanTermsSection(sectionData: Readonly<{amortizationTerm: number, paymentsPerYear: number, 
        loanToValueConstant: number, loanToValueRatio: number, mortgageRate: number, 
        mortgageConstant: number, commentary: string}>): SupportingCapRatesActions {
        this.verifyAmortizationTerm(sectionData.amortizationTerm)
            .verifyNumberOfPaymentsPerYear(sectionData.paymentsPerYear)
            .verifyNumberOfPayments()
            .verifyLoanToValueConstant(sectionData.loanToValueConstant)
            .verifySelectedLoanLoanToValueRatio(sectionData.loanToValueRatio)
            .verifySelectedLoanEquityRatio()
            .verifyMortgageRate(sectionData.mortgageRate)
            .verifySelectedLoanMortgageConstant(sectionData.mortgageConstant)
            .verifyMortgageComponentCommentary(sectionData.commentary);
        return this;
    }

    clickBandOfInvestmentSectionButton(): SupportingCapRatesActions {
        supportingCapRatesPage.bandOfInvestmentSectionButton.click();
        return this;
    }

    verifyBandInvestmentLoanRatio(value = 75): SupportingCapRatesActions {
        supportingCapRatesPage.bandInvestmentLoanRatio.should("be.disabled").should("have.value", value);
        return this;
    }

    verifyBandInvestmentMortgageConstant(value = 0.0573): SupportingCapRatesActions {
        supportingCapRatesPage.bandInvestmentMortgageConstant.should("be.disabled").should("have.value", value);
        return this;
    }

    verifyMortgageComponent(): SupportingCapRatesActions {
        supportingCapRatesPage.bandInvestmentLoanRatio.invoke("attr", "value").then(ratio => {
            supportingCapRatesPage.bandInvestmentMortgageConstant.invoke("attr", "value").then(constant => {
                supportingCapRatesPage.mortgageComponent.should("be.disabled")
                    .should("have.value", `${(parseInt(ratio) * parseInt(constant)).toFixed(1)}`);
            });
        });
        return this;
    }

    enterEquityDividendRate(rate: string | number): SupportingCapRatesActions {
        supportingCapRatesPage.equityDividendRate.clear().type(`${rate}`);
        return this;
    }

    verifyEquityDividendRate(rateToBe: number): SupportingCapRatesActions {
        supportingCapRatesPage.equityDividendRate.should("not.be.disabled").should("have.value", rateToBe);
        return this;
    }

    verifyBandInvestmentEquityRatio(value = 25): SupportingCapRatesActions {
        supportingCapRatesPage.bandInvestmentEquityRatio.should("be.disabled").should("have.value", value);
        return this;
    }

    verifyEquityComponent(): SupportingCapRatesActions {
        supportingCapRatesPage.equityDividendRate.invoke("attr", "value").then(rate => {
            supportingCapRatesPage.bandInvestmentEquityRatio.invoke("attr", "value").then(ratio => {
                supportingCapRatesPage.equityComponent.should("be.disabled")
                    .should("have.value", `${parseInt(rate) * (parseInt(ratio) / 100)}`);
            });
        });
        return this;
    }

    verifyBandInvestmentCapRate(): SupportingCapRatesActions {
        supportingCapRatesPage.mortgageComponent.invoke("attr", "value").then(mortgage => {
            supportingCapRatesPage.equityComponent.invoke("attr", "value").then(equity => {
                supportingCapRatesPage.bandInvestmentCapRate.should("be.disabled")
                    .should("have.value", `${Number(mortgage) + Number(equity)}`);
            });
        });
        return this;
    }

    verifyBandInvestmentCommentary(commToBe: string): SupportingCapRatesActions {
        supportingCapRatesPage.bandInvestmentCommentary.should("have.text", commToBe);
        return this;
    }

    verifyBandInvestmentSection(sectionData: Readonly<{loanRatio: number, mortgageConstant: number, 
        equityDividendRate: number, equityRatio: number, commentary: string}>): SupportingCapRatesActions {
        this.verifyBandInvestmentLoanRatio(sectionData.loanRatio)
            .verifyBandInvestmentMortgageConstant(sectionData.mortgageConstant)
            .verifyMortgageComponent()
            .verifyEquityDividendRate(sectionData.equityDividendRate)
            .verifyBandInvestmentEquityRatio(sectionData.equityRatio)
            .verifyEquityComponent()
            .verifyBandInvestmentCapRate()
            .verifyBandInvestmentCommentary(sectionData.commentary);
        return this;
    }
}

export default new SupportingCapRatesActions(supportingCapRatesPage);