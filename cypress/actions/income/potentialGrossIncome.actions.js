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
        grossIncomePage.potentialResidentialIncome.should("have.text", incomeToBe);
    }

    verifyOtherIncome(incomeToBe = "$0.00") {
        grossIncomePage.otherIncome.should("have.text", incomeToBe);
    }

    async verifyPotentialGrossIncome() {
        const potResIncomeText = await grossIncomePage.potentialResidentialIncome.then(el => el.text()).promisify();
        const potResIncomeNumber = getNumberFromDollarNumberWithCommas(potResIncomeText);
        const otherIncomeText = await grossIncomePage.otherIncome.then(el => el.text()).promisify();
        const otherIncomeNumber = getNumberFromDollarNumberWithCommas(otherIncomeText);
        const grossIncomeTextToBe = `$${numberWithCommas((potResIncomeNumber + otherIncomeNumber).toFixed(2))}`;
        grossIncomePage.potentialGrossIncome.should("have.text", grossIncomeTextToBe);
    }

    async verifyLessResidentialVCLoss() {
        const resVCLossText = await grossIncomePage.residentialVCLoss.then(el => el.text()).promisify();
        grossIncomePage.lessResidentialVCLoss.should("have.text", `-${resVCLossText}`);
    }

    async verifyEffectiveGrossIncome() {
        const potGrossIncomeText = await grossIncomePage.potentialGrossIncome.then(el => el.text()).promisify();
        const potGrossIncomeNumber = getNumberFromDollarNumberWithCommas(potGrossIncomeText);
        const lessResVCLossText = await grossIncomePage.lessResidentialVCLoss.then(el => el.text()).promisify();
        const lessResVCLossNumber = getNumberFromDollarNumberWithCommas(lessResVCLossText);
        const textToBe = `$${numberWithCommas((potGrossIncomeNumber + lessResVCLossNumber).toFixed(2))}`;
        grossIncomePage.effectiveGrossIncome.should("have.text", textToBe);
    }

    async verifyIncomeTable(potentialResIncomeToBe, otherIncome = "$0.00") {
        this.verifyPotentialResidentialIncome(potentialResIncomeToBe);
        this.verifyOtherIncome(otherIncome);
        await this.verifyPotentialGrossIncome();
        await this.verifyLessResidentialVCLoss();
        await this.verifyEffectiveGrossIncome();
    }
}

export default new PotentialGrossIncomeActions();
