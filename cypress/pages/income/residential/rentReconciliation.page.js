import BasePage from "../../base/base.page";

class RentReconciliationPage extends BasePage{
    get introCommentary() {return cy.get("[data-qa*='introduction.commentary']");}
    getBedReconByBedNumb(number) {return cy.get(`[data-qa='bedrooms_${number}-bedroom-rent-reconciliation']`);}
    getBedReconByBedNumContainer(num) {return cy.get(`[data-qa^='bedrooms_${num}'][data-qa$='container']`);}
    getBedMinForecastByNum(number) {return this.getBedReconByBedNumContainer(number).find("[data-qa$='forecast-min']");}
    getBedAvgForecastByNum(num) {return this.getBedReconByBedNumContainer(num).find("[data-qa$='forecast-avg']");}
    getBedMaxForecastByNum(num) {return this.getBedReconByBedNumContainer(num).find("[data-qa$='forecast-max']");}
    getBedMinCompByNum(num) {return this.getBedReconByBedNumContainer(num).find("[data-qa$='comparables-min']");}
    getBedAvgCompByNum(num) {return this.getBedReconByBedNumContainer(num).find("[data-qa$='comparables-avg']");}
    getBedMaxCompByNum(num) {return this.getBedReconByBedNumContainer(num).find("[data-qa$='comparables-max']");}
    getMarketConclusionBedByNumb(num) {return this.getBedReconByBedNumContainer(num).find("[name$=marketConclusion]");}

}

export default new RentReconciliationPage();