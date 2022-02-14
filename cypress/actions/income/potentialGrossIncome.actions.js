import BaseActions from "../base/base.actions";
import grossIncomePage from "../../pages/income/potentialGrossIncome.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";
import potentialGrossIncomePage from "../../pages/income/potentialGrossIncome.page";

class PotentialGrossIncomeActions extends BaseActions {

    /**
     *
     * @param {number} value
     * @returns {PotentialGrossIncomeActions}
     */
    enterResVacancyCollLoss(value) {
        grossIncomePage.resVacancyPotentialLossInput.clear().type(value)
            .should("have.value", `${value.toFixed(2)}`);
        return this;
    }

    /**
     *
     * @param {number} vacancyCollLoss
     * @param {string | number} potentialIncome
     * @returns {PotentialGrossIncomeActions}
     */
    verifyResidentialVCLoss(vacancyCollLoss, potentialIncome) {
        const potIncomeNumber = getNumberFromDollarNumberWithCommas(potentialIncome);
        const valueToBe = `$${numberWithCommas(Math.round(potIncomeNumber / 100 * vacancyCollLoss))}`;
        grossIncomePage.residentialVCLoss.should("be.disabled").should("have.value", valueToBe);
        return this;
    }

    /**
     *
     * @param {number} value
     * @returns {PotentialGrossIncomeActions}
     */
    enterCoStarSubmarketRate(value) {
        grossIncomePage.coStarSubmarketRateInput.clear().type(value).should("have.value", value);
        return this;
    }

    /**
     *
     * @param {number} value
     * @returns {PotentialGrossIncomeActions}
     */
    enterCoStarMetroRate(value) {
        grossIncomePage.coStarMetroRateInput.clear().type(value).should("have.value", value);
        return this;
    }

    /**
     *
     * @param {string} newCommentary
     * @returns {PotentialGrossIncomeActions}
     */
    editCommentary(newCommentary) {
        grossIncomePage.commentaryEditButton.click();
        grossIncomePage.commentaryInput.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {PotentialGrossIncomeActions}
     */
    verifyPotentialResidentialIncome(incomeToBe) {
        grossIncomePage.potentialResidentialIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @param {string} incomeToBe
     * @returns {PotentialGrossIncomeActions}
     */
    verifyOtherIncome(incomeToBe = "$0.00") {
        grossIncomePage.otherIncome.should("have.text", incomeToBe);
        return this;
    }

    /**
     *
     * @returns {PotentialGrossIncomeActions}
     */
    verifyPotentialGrossIncome() {
        grossIncomePage.potentialResidentialIncome.then(el => {
            const potResIncomeNumber = getNumberFromDollarNumberWithCommas(el.text());
            grossIncomePage.otherIncome.then(otherIncome => {
                const otherIncomeNumber = getNumberFromDollarNumberWithCommas(otherIncome.text());
                const textToBe = `$${numberWithCommas((potResIncomeNumber + otherIncomeNumber).toFixed(2))}`;
                grossIncomePage.potentialGrossIncome.should("have.text", textToBe);
            });
        });
        return this;
    }

    /**
     *
     * @returns {PotentialGrossIncomeActions}
     */
    verifyLessResidentialVCLoss() {
        grossIncomePage.residentialVCLoss.then(vcLoss => {
           const resVCLossNumber = getNumberFromDollarNumberWithCommas(vcLoss.attr("value"));
            const textToBe = `-$${numberWithCommas(resVCLossNumber.toFixed(2))}`;
            grossIncomePage.lessResidentialVCLoss.should("have.text", textToBe);
        });
        return this;
    }

    /**
     *
     * @returns {PotentialGrossIncomeActions}
     */
    verifyEffectiveGrossIncome() {
        grossIncomePage.potentialGrossIncome.then(grossIncome => {
            const potGrossIncomeNumber = getNumberFromDollarNumberWithCommas(grossIncome.text());
            grossIncomePage.lessResidentialVCLoss.then(lessVCLoss => {
                const lessResVCLossNumber = getNumberFromDollarNumberWithCommas(lessVCLoss.text());
                const textToBe = `$${numberWithCommas((potGrossIncomeNumber + lessResVCLossNumber).toFixed(2))}`;
                grossIncomePage.effectiveGrossIncome.should("have.text", textToBe);
            });
        });
        return this;
    }

    /**
     *
     * @param {string} potentialResIncomeToBe
     * @param {string} otherIncome
     * @returns {PotentialGrossIncomeActions}
     */
    verifyIncomeTable(potentialResIncomeToBe, otherIncome = "$0.00") {
        this.verifyPotentialResidentialIncome(potentialResIncomeToBe)
            .verifyOtherIncome(otherIncome)
            .verifyPotentialGrossIncome()
            .verifyLessResidentialVCLoss()
            .verifyEffectiveGrossIncome();
        return this;
    }

    /**
     * @param {string | number} percentage
     * @param {string} useValue
     * @returns {PotentialGrossIncomeActions}
     */
    enterCommercialVCLossPercentage(percentage, useValue) {
        const valueToBe = typeof percentage === "string" ? percentage : percentage.toFixed(2);
        potentialGrossIncomePage.getCommercialVCLossPercentage(useValue).clear().type(percentage).should("have.value", valueToBe);
        return this;
    }
}

export default new PotentialGrossIncomeActions();
