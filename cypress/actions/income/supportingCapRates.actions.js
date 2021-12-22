import BaseActions from "../base/base.actions";
import supportingCapRatesPage from "../../pages/income/supportingCapRates.page";

class SupportingCapRatesActions extends BaseActions {

    /**
     *
     * @param {string} commToBe
     * @returns {SupportingCapRatesActions}
     */
    verifyIncomeCapitalizationCommentary(commToBe) {
        supportingCapRatesPage.incomeCapitalizationCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    clickPersonalSurveySectionButton() {
        supportingCapRatesPage.personalSurveysOpenSectionButton.click();
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    uncheckIncludePersonalSurvey() {
        this.clickPersonalSurveySectionButton();
        supportingCapRatesPage.includePersonalSurveyCheckbox.uncheck().should("have.value", "false");
        this.clickPersonalSurveySectionButton();
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    clickSelectedLoanSectionButton() {
        supportingCapRatesPage.selectedLoanOpenSectionButton.click();
        return this;
    }

    /**
     *
     * @param {number} termToBe
     * @returns {SupportingCapRatesActions}
     */
    verifyAmortizationTerm(termToBe = 30) {
        supportingCapRatesPage.amortizationTerm.should("not.be.disabled").should("have.value", termToBe);
        return this;
    }

    /**
     *
     * @param {number} number
     * @returns {SupportingCapRatesActions}
     */
    verifyNumberOfPaymentsPerYear(number = 12) {
        supportingCapRatesPage.numberOfPaymentsPerYear.should("be.disabled").should("have.value", number);
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    verifyNumberOfPayments() {
        supportingCapRatesPage.amortizationTerm.invoke("attr", "value").then(amortValue => {
           supportingCapRatesPage.numberOfPaymentsPerYear.invoke("attr", "value").then(paymentsPerYear => {
               supportingCapRatesPage.numberOfPayments.should("be.disabled")
                   .should("have.value", `${amortValue * paymentsPerYear}`);
           });
        });
        return this;
    }

    /**
     *
     * @param {number} value
     * @returns {SupportingCapRatesActions}
     */
    verifyLoanToValueConstant(value = 1) {
        supportingCapRatesPage.loanToValueConstant.should("be.disabled").should("have.value", value);
        return this;
    }

    /**
     *
     * @param {number} ratio
     * @returns {SupportingCapRatesActions}
     */
    verifySelectedLoanLoanToValueRatio(ratio = 75) {
        supportingCapRatesPage.selectedLoanLoanToValueRatio.should("not.be.disabled").should("have.value", ratio);
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    verifySelectedLoanEquityRatio() {
        supportingCapRatesPage.loanToValueConstant.invoke("attr", "value").then(loanConst => {
           supportingCapRatesPage.selectedLoanLoanToValueRatio.invoke("attr", "value").then(ratio => {
              supportingCapRatesPage.selectedLoanEquityRatio.should("have.value", `${loanConst * 100 - ratio}`);
           });
        });
        return this;
    }

    /**
     *
     * @param {number} percent
     * @returns {SupportingCapRatesActions}
     */
    verifyMortgageRate(percent = 4) {
        supportingCapRatesPage.mortgageRate.should("not.be.disabled").should("have.value", percent);
        return this;
    }

    /**
     *
     * @param {number} value
     * @returns {SupportingCapRatesActions}
     */
    verifySelectedLoanMortgageConstant(value = 0.0573) {
        supportingCapRatesPage.selectedLoanMortgageConstant.should("be.disabled").should("have.value", value);
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {SupportingCapRatesActions}
     */
    verifyMortgageComponentCommentary(commToBe) {
        supportingCapRatesPage.mortgageComponentCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     * @param {Readonly<{amortizationTerm: number , paymentsPerYear: number , loanToValueConstant: number ,
     * loanToValueRatio: number , mortgageRate: number , mortgageConstant: number, commentary: string}>} sectionData
     * @returns {SupportingCapRatesActions}
     */
    verifySelectedLoanTermsSection(sectionData) {
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

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    clickBandOfInvestmentSectionButton() {
        supportingCapRatesPage.bandOfInvestmentSectionButton.click();
        return this;
    }

    /**
     *
     * @param {number} value
     * @returns {SupportingCapRatesActions}
     */
    verifyBandInvestmentLoanRatio(value = 75) {
        supportingCapRatesPage.bandInvestmentLoanRatio.should("be.disabled").should("have.value", value);
        return this;
    }

    /**
     *
     * @param {number} value
     * @returns {SupportingCapRatesActions}
     */
    verifyBandInvestmentMortgageConstant(value = 0.0573) {
        supportingCapRatesPage.bandInvestmentMortgageConstant.should("be.disabled").should("have.value", value);
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    verifyMortgageComponent() {
        supportingCapRatesPage.bandInvestmentLoanRatio.invoke("attr", "value").then(ratio => {
            supportingCapRatesPage.bandInvestmentMortgageConstant.invoke("attr", "value").then(constant => {
                supportingCapRatesPage.mortgageComponent.should("be.disabled")
                    .should("have.value", `${(ratio * constant).toFixed(1)}`);
            });
        });
        return this;
    }

    /**
     *
     * @param {string, number} rate
     * @returns {SupportingCapRatesActions}
     */
    enterEquityDividendRate(rate) {
        supportingCapRatesPage.equityDividendRate.clear().type(rate);
        return this;
    }

    /**
     *
     * @param {number} rateToBe
     * @returns {SupportingCapRatesActions}
     */
    verifyEquityDividendRate(rateToBe) {
        supportingCapRatesPage.equityDividendRate.should("not.be.disabled").should("have.value", rateToBe);
        return this;
    }

    /**
     *
     * @param {number} value
     * @returns {SupportingCapRatesActions}
     */
    verifyBandInvestmentEquityRatio(value = 25) {
        supportingCapRatesPage.bandInvestmentEquityRatio.should("be.disabled").should("have.value", value);
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    verifyEquityComponent() {
        supportingCapRatesPage.equityDividendRate.invoke("attr", "value").then(rate => {
            supportingCapRatesPage.bandInvestmentEquityRatio.invoke("attr", "value").then(ratio => {
                supportingCapRatesPage.equityComponent.should("be.disabled")
                    .should("have.value", `${rate * (ratio / 100)}`);
            });
        });
        return this;
    }

    /**
     *
     * @returns {SupportingCapRatesActions}
     */
    verifyBandInvestmentCapRate() {
        supportingCapRatesPage.mortgageComponent.invoke("attr", "value").then(mortgage => {
            supportingCapRatesPage.equityComponent.invoke("attr", "value").then(equity => {
                supportingCapRatesPage.bandInvestmentCapRate.should("be.disabled")
                    .should("have.value", `${Number(mortgage) + Number(equity)}`);
            });
        });
        return this;
    }

    /**
     *
     * @param {string} commToBe
     * @returns {SupportingCapRatesActions}
     */
    verifyBandInvestmentCommentary(commToBe) {
        supportingCapRatesPage.bandInvestmentCommentary.should("have.text", commToBe);
        return this;
    }

    /**
     *
     * @param {Readonly<{loanRatio: number, mortgageConstant: number, equityDividendRate: number, equityRatio: number,
     * commentary: string}>} sectionData
     * @returns {SupportingCapRatesActions}
     */
    verifyBandInvestmentSection(sectionData) {
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

export default new SupportingCapRatesActions();