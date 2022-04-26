import BasePage from "../base/base.page";

class ExpenseForecastPage extends BasePage {
    get ExpenseForecastHeader(){
        return cy.get('[data-qa="expenseForecast"]');
    }

    get ElectricityCard(){
        return cy.get("[data-qa='electricity-forecast-item'] > div").last();
    }

    get InsuranceCard(){
        return cy.get('[data-qa="insurance-forecast-item"] > div').last();
    }

    get FuelCard() {
        return cy.get("[data-qa=fuel-forecast-item] > div").last();
    }

    get RepairsAndMaintenanceCard() {
        return cy.get("[data-qa=repairsMaintenance-forecast-item] > div").last();    
    }

    getForecastItemBasisRadio(item) {return cy.get(`[name='${item}.basis']`);}

    getElementToCheckRadio(forecastItem: BoweryReports.ForecastItemBasis, radioValue: BoweryReports.UnitSF) {return cy.get(`[data-qa=checked] [name='${forecastItem}.basis'][value='${radioValue}']`);}

    getElementBasisToSwitch(forecastItem: BoweryReports.ForecastItemBasis, radioValue: BoweryReports.UnitSF) {return cy.get(`[name='${forecastItem}.basis'][value='${radioValue}']`);}

    getForecastItemForecastInput(item, custom = false, index = 0) {return !custom ? cy.get(`[name='${item}.concludedValue']`) : cy.get(`[name='${item}Expenses[${index}].concludedValue']`);}

    getForecastItemCompMin(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-min]`);}

    getForecastItemCompAvg(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-avg]`);}

    getForecastItemCompMax(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-max]`);}

    getForecastItemBasisMoneyValue(item) {return cy.get(`[data-qa=${item}-forecast-item] [data-qa=basis]`);}

    getForecastItemProjectionByType(item, type) {return cy.contains(`[data-qa=${item}-forecast-item] [data-qa$=historical]`, type);}

    getExpenseCommentary(forecastItem: string) {return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::div[@data-slate-editor][1]`);}

    getExpenseCommentaryEditButton(forecastItem: string) {return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Edit'][1]`);}

    getExpenseCommentarySaveButton(forecastItem: string) {return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Save'][1]`);}

    getExpenseCommentaryModified(forecastItem: string) {return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::*[.='Modified'][2]`);}

    getExpenseCommentaryRevertToOriginal(forecastItem: string) {return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Revert to Original'][1]`);}

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

    get expenseConfirmRevertButton() {return cy.xpath("//*[.='Yes, revert']");}

    get createNewCategoryButton() {return cy.contains('+ Add Expense Category');}

    get newCategoryExpenseName() { return cy.get('[name="expense"]');}

    get saveNewExpenseCategory() {return cy.get('button').contains('Save');}

}

export default new ExpenseForecastPage();