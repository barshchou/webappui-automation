import grossIncomePage from "../../pages/income/potentialGrossIncome.page";
import { getNumberFromDollarNumberWithCommas, numberWithCommas } from "../../../utils/numbers.utils";
import potentialGrossIncomePage from "../../pages/income/potentialGrossIncome.page";
import BaseActionsExt from "../base/base.actions.ext";

class PotentialGrossIncomeActions extends BaseActionsExt<typeof potentialGrossIncomePage> {

    enterResVacancyCollLoss(value: number): PotentialGrossIncomeActions {
        grossIncomePage.resVacancyPotentialLossInput.clear().type(`${value}`)
            .should("have.value", `${value.toFixed(2)}`);
        return this;
    }

    verifyResidentialVCLoss(vacancyCollLoss: number, potentialIncome: string | number): PotentialGrossIncomeActions {
        const potIncomeNumber = getNumberFromDollarNumberWithCommas(potentialIncome);
        const valueToBe = `$${numberWithCommas(Math.round(potIncomeNumber / 100 * vacancyCollLoss))}`;
        grossIncomePage.residentialVCLoss.should("be.disabled").should("have.value", valueToBe);
        return this;
    }

    enterCoStarSubmarketRate(value: number): PotentialGrossIncomeActions {
        grossIncomePage.coStarSubmarketRateInput.clear().type(`${value}`).should("have.value", value);
        return this;
    }

    enterCoStarMetroRate(value: number): PotentialGrossIncomeActions {
        grossIncomePage.coStarMetroRateInput.clear().type(`${value}`).should("have.value", value);
        return this;
    }

    editCommentary(newCommentary: string): PotentialGrossIncomeActions {
        grossIncomePage.commentaryEditButton.click();
        grossIncomePage.commentaryInput.clear().type(newCommentary).should("have.text", newCommentary);
        return this;
    }

    verifyPotentialResidentialIncome(incomeToBe: string): PotentialGrossIncomeActions {
        grossIncomePage.potentialResidentialIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPotentialRealEstateTaxesReimbursement(incomeToBe: string): PotentialGrossIncomeActions {
        grossIncomePage.potentialRealEstateTaxesReimbursement.should("have.text", incomeToBe);
        return this;
    }

    verifyPotentialGrossIncomeValue(incomeToBe: string): PotentialGrossIncomeActions {
        grossIncomePage.potentialGrossIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyOtherIncome(incomeToBe = "$0.00"): PotentialGrossIncomeActions {
        grossIncomePage.otherIncome.should("have.text", incomeToBe);
        return this;
    }

    verifyPotentialGrossIncome(): PotentialGrossIncomeActions {
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

    verifyLessResidentialVCLoss(): PotentialGrossIncomeActions {
        grossIncomePage.residentialVCLoss.then(vcLoss => {
           const resVCLossNumber = getNumberFromDollarNumberWithCommas(vcLoss.attr("value"));
            const textToBe = `-$${numberWithCommas(resVCLossNumber.toFixed(2))}`;
            grossIncomePage.lessResidentialVCLoss.should("have.text", textToBe);
        });
        return this;
    }

    verifyEffectiveGrossIncome(): PotentialGrossIncomeActions {
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

    verifyIncomeTable(potentialResIncomeToBe: string, otherIncome = "$0.00"): PotentialGrossIncomeActions {
        this.verifyPotentialResidentialIncome(potentialResIncomeToBe)
            .verifyOtherIncome(otherIncome)
            .verifyPotentialGrossIncome()
            .verifyLessResidentialVCLoss()
            .verifyEffectiveGrossIncome();
        return this;
    }

    enterCommercialVCLossPercentage(percentage: string | number, useValue: string): PotentialGrossIncomeActions {
        const valueToBe = typeof percentage === "string" ? percentage : percentage.toFixed(2);
        potentialGrossIncomePage.getCommercialVCLossPercentage(useValue).clear().type(`${percentage}`)
            .should("have.value", valueToBe);
        return this;
    }

    enterSubjectAreaCommercialVacancy(vacancy: number | string, useValue: string): PotentialGrossIncomeActions {
        potentialGrossIncomePage.getSubjectAreaCommercialVacancy(useValue).clear().type(`${vacancy}`)
            .should("have.value", vacancy);
        return this;
    }

    checkCommercialSubjectSuitabilityByValue(useValue: string, checkValue: string): PotentialGrossIncomeActions {
        potentialGrossIncomePage.getCommercialSubjectSuitabilityRadio(useValue).check(checkValue).should("be.checked");
        return this;
    }

    verifyCommercialVCLossCommentaryContain(elementToContain: string | number): PotentialGrossIncomeActions {
        potentialGrossIncomePage.commercialVCLossCommentary.should("contain.text", elementToContain);
        return this;
    }

    verifyPotentialReimbursementValue(reimbursementType: string, value: string): PotentialGrossIncomeActions {
        potentialGrossIncomePage.getPotentialReimbursementValue(reimbursementType).should('have.text', value);
        return this;
    }
    
    verifyLessReimbursementVCLossValue(reimbursementType: string, value: string): PotentialGrossIncomeActions {
        potentialGrossIncomePage.getLessReimbursementVCLossValue(reimbursementType).should('have.text', value);
        return this;
    }
}

export default new PotentialGrossIncomeActions(potentialGrossIncomePage);
