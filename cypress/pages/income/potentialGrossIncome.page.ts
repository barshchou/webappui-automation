import BasePage from "../base/base.page";

class PotentialGrossIncomePage extends BasePage {

    get resVacancyPotentialLossInput() { return cy.get("[name=residentialVCLossPercentage]"); }

    get residentialVCLoss() { return cy.get("[name=residentialVCLossAmount]"); }

    get coStarSubmarketRateInput() { return cy.get("[name=costarSubmarketRate]"); }

    get coStarMetroRateInput() { return cy.get("[name=costarMetroRate]"); }

    get vCLossDiscussionCommentaryEditButton() { return cy.get("[data-qa^=residentialVCLossDiscussion] [data-qa$=edit-btn]"); }

    get vCLossDiscussionCommentaryInput() { return cy.get("[name='residentialVCLossDiscussion.commentary']"); }

    get lessResidentialVCLoss() { return cy.get("[data-qa^=lessResidentialVCLoss] > [data-qa=value-cell]"); }

    getIncomeTypeUnified(incomeType: string) {return cy.get(`[data-qa=${incomeType}-row] > [data-qa=value-cell]`);}

    getCommercialVCLossPercentage(useValue: string) { return cy.get(`[name='commercialVCLossPercentage.${useValue}']`); }

    getSubjectAreaCommercialVacancy(useValue: string) { return cy.get(`[name='subjectAreaCommercialVacancy.${useValue}']`); }

    getCommercialSubjectSuitabilityRadio(useValue: string) { return cy.get(`[name='commercialSubjectSuitability.${useValue}']`); }

    get commercialVCLossCommentary() { return cy.get("[data-qa^='commercialVCLossDiscussion.commentary']"); }

    getPotentialReimbursementValue(reimbursementType: string) { return cy.get(`[data-qa^='potential${reimbursementType}Reimbursement-row'] > [data-qa=value-cell]`); }

    getLessReimbursementVCLossValue(reimbursementType: string) { return cy.get(`[data-qa^='less${reimbursementType}ReimbursementVCLoss'] > [data-qa=value-cell]`); }
}
export default new PotentialGrossIncomePage();
