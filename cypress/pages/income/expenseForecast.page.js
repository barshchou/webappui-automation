import BasePage from "../base/base.page";

class ExpenseForecastPage extends BasePage {
    getForecastItemBasisRadio(item) {return cy.get(`[name='${item}.basis']`);}
    getElementToCheckRadio(forecastItem, radioValue) {return cy.get(`[data-qa=checked] [name='${forecastItem}.basis'][value='${radioValue}']`);}
    getForecastItemForecastInput(item) {return cy.get(`[name='${item}.concludedValue']`);}
    getForecastItemCompMin(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-min]`);}
    getForecastItemCompAvg(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-avg]`);}
    getForecastItemCompMax(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-max]`);}
    getForecastItemBasisMoneyValue(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=basis]`);}
    getForecastItemProjection(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa$=historical]`);}
    get inputPercentOfEGICheckbox() {return cy.get("[label='Input % of EGI'] input");}
    get percentOfEgiInput() {return cy.get("[name='management.percentOfEgi']");}
    get toeCompMin() {return cy.get("[data-qa=comp-min]").last();}
    get toeCompAvg() {return cy.get("[data-qa=comp-avg]").last();}
    get toeCompMax() {return cy.get("[data-qa=comp-max]").last();}
    get allProjections() {return cy.get("[data-qa$=historical]");}
    get allForecastsInputs() {return cy.get("[name$=concludedValue]");}
    get toeOwnerProjection() {return cy.get("[data-qa=owners-projection]");}
    get appraisersTotalForecast() {return cy.get("[data-qa=appraisers-total-conclusion]");}
}

export default new ExpenseForecastPage();