import BasePage from "../base/base.page";

class PotentialGrossIncomePage extends BasePage {

    get resVacancyPotentialLossInput() {return cy.get("[name=residentialVCLossPercentage]");}

    get residentialVCLoss() {return cy.get("[name=residentialVCLossAmount]");}

    get coStarSubmarketRateInput() {return cy.get("[name=costarSubmarketRate]");}

    get coStarMetroRateInput() {return cy.get("[name=costarMetroRate]");}

    get commentaryEditButton() {return cy.get("[data-qa^=residentialVCLossDiscussion] [data-qa$=edit-btn]");}

    get commentaryInput() {return cy.get("[name='residentialVCLossDiscussion.commentary']");}

    get lessResidentialVCLoss() {return cy.get("[data-qa^=lessResidentialVCLoss] > [data-qa=value-cell]");}

    getIncomeTypeUnified(incomeType: string) {return cy.get(`[data-qa=${incomeType}-row] > [data-qa=value-cell]`);}

    getCommercialVCLossPercentage(useValue) {return cy.get(`[name='commercialVCLossPercentage.${useValue}']`);}

    getSubjectAreaCommercialVacancy(useValue) {return cy.get(`[name='subjectAreaCommercialVacancy.${useValue}']`);}

    getCommercialSubjectSuitabilityRadio(useValue) {return cy.get(`[name='commercialSubjectSuitability.${useValue}']`);}

    get commercialVCLossCommentary() {return cy.get("[data-qa^='commercialVCLossDiscussion.commentary']");}

}
export default new PotentialGrossIncomePage();
