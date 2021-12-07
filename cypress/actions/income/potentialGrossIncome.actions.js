import BaseActions from "../base/base.actions";
import grossIncomePage from "../../pages/income/potentialGrossIncome.page";
import {getNumberFromDollarNumberWithCommas, numberWithCommas} from "../../../utils/numbers.utils";

class PotentialGrossIncomeActions extends BaseActions {

    enterResVacancyCollLoss(value) {
        grossIncomePage.resVacancyPotentialLossInput.clear().type(value)
            .should("have.value", `${value.toFixed(2)}`);
    }

    verifyResidentialVCLoss(vacancyCollLoss, potentialIncome) {
        const potIncomeNumber = getNumberFromDollarNumberWithCommas(potentialIncome);
        const valueToBe = `$${numberWithCommas(Math.round(potIncomeNumber / 100 * vacancyCollLoss))}`;
        grossIncomePage.residentialVCLoss.should("be.disabled").should("have.value", valueToBe);
    }

    enterCoStarSubmarketRate(value) {
        grossIncomePage.coStarSubmarketRateInput.clear().type(value).should("have.value", value);
    }

    enterCoStarMetroRate(value) {
        grossIncomePage.coStarMetroRateInput.clear().type(value).should("have.value", value);
    }

    editCommentary(newCommentary) {
        grossIncomePage.commentaryEditButton.click();
        grossIncomePage.commentaryInput.clear().type(newCommentary).should("have.text", newCommentary);
    }

    verifyPotentialResidentialIncome(incomeToBe) {
        // TODO: return to this row after WEB-3766 bug fix: "grossIncomePage.potentialResidentialIncome.should("have.text", incomeToBe);"
        grossIncomePage.potentialResidentialIncome.should("exist");
    }

    verifyOtherIncome(incomeToBe = "$0.00") {
        grossIncomePage.otherIncome.should("have.text", incomeToBe);
    }

    verifyPotentialGrossIncome() {
        grossIncomePage.potentialResidentialIncome.then(el => {
            const potResIncomeNumber = getNumberFromDollarNumberWithCommas(el.text());
            grossIncomePage.otherIncome.then(otherIncome => {
                const otherIncomeNumber = getNumberFromDollarNumberWithCommas(otherIncome.text());
                const textToBe = `$${numberWithCommas((potResIncomeNumber + otherIncomeNumber).toFixed(2))}`;
                // TODO: return to this row after WEB-3766 bug fix: "grossIncomePage.potentialGrossIncome.should("have.text", textToBe);"
                grossIncomePage.potentialGrossIncome.should("exist");
            });
        });
    }

    verifyLessResidentialVCLoss() {
        grossIncomePage.residentialVCLoss.then(vcLoss => {
           const resVCLossNumber = getNumberFromDollarNumberWithCommas(vcLoss.attr("value"));
            const textToBe = `-$${numberWithCommas(resVCLossNumber.toFixed(2))}`;
            grossIncomePage.lessResidentialVCLoss.should("have.text", textToBe);
        });
    }

    verifyEffectiveGrossIncome() {
        grossIncomePage.potentialGrossIncome.then(grossIncome => {
            const potGrossIncomeNumber = getNumberFromDollarNumberWithCommas(grossIncome.text());
            grossIncomePage.lessResidentialVCLoss.then(lessVCLoss => {
                const lessResVCLossNumber = getNumberFromDollarNumberWithCommas(lessVCLoss.text());
                const textToBe = `$${numberWithCommas((potGrossIncomeNumber + lessResVCLossNumber).toFixed(2))}`;
                grossIncomePage.effectiveGrossIncome.should("have.text", textToBe);
            });
        });
    }

    verifyIncomeTable(potentialResIncomeToBe, otherIncome = "$0.00") {
        this.verifyPotentialResidentialIncome(potentialResIncomeToBe);
        this.verifyOtherIncome(otherIncome);
        this.verifyPotentialGrossIncome();
        this.verifyLessResidentialVCLoss();
        this.verifyEffectiveGrossIncome();
    }
}

export default new PotentialGrossIncomeActions();
