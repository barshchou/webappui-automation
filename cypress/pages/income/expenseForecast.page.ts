import BasePage from "../base/base.page";

class ExpenseForecastPage extends BasePage {
    get ExpenseForecastHeader(){
        return cy.get('[data-qa="expenseForecast"]');
    }
    get ElectricityCard(){
        return cy.get('[data-qa="electricity-forecast-item"]');
    };
    get InsuranceCard(){
        return cy.get('[data-qa="insurance-forecast-item"]');
    }
    get FuelCard() {
        return cy.get("[data-qa=fuel-forecast-item]");
    }
    getForecastItemBasisRadio(item) {return cy.get(`[name='${item}.basis']`);}
    getElementToCheckRadio(forecastItem: BoweryReports.ForecastItemBasis, radioValue: BoweryReports.UnitSF) {return cy.get(`[name='${forecastItem}.basis'][value='${radioValue}']`);}
    getForecastItemForecastInput(item) {return cy.get(`[name='${item}.concludedValue']`);}
    getForecastItemCompMin(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-min]`);}
    getForecastItemCompAvg(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-avg]`);}
    getForecastItemCompMax(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-max]`);}
    getForecastItemBasisMoneyValue(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=basis]`);}
    getForecastItemProjectionByType(item, type) {return cy.contains(`[data-qa=${item}-forecast-item] [data-qa$=historical]`, type);}
    get inputPercentOfEGICheckbox() {return cy.get("[label='Input % of EGI'] input");}
    get percentOfEgiInput() {return cy.get("[name='management.percentOfEgi']");}
    get toeCompMin() {return cy.get("[data-qa=comp-min]").last();}
    get toeCompAvg() {return cy.get("[data-qa=comp-avg]").last();}
    get toeCompMax() {return cy.get("[data-qa=comp-max]").last();}
    get allProjections() {return cy.get("[data-qa$=historical]");}
    get allForecastsInputs() {return cy.get("[name$=concludedValue]");}
    get toeOwnerProjection() {return cy.get("[data-qa=owners-projection]");}
    get appraisersTotalForecast() {return cy.get("[data-qa=appraisers-total-conclusion]");}
    get toeCommentary() {return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::div[@data-slate-editor]");}
    get toeCommentaryEditButton() {return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::button[.='Edit']");}
    get toeCommentarySaveButton() {return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::button[.='Save'][1]");}
    get toeCommentaryModified() {return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::*[.='Modified']");}
}

export default new ExpenseForecastPage();