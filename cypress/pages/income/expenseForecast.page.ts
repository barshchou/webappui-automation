import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class ExpenseForecastPage extends BasePage {

    get pageHeaderElement() { return cy.get('[data-qa="expenseForecast"]'); }

    get electricityCard() { return cy.get("[data-qa='electricity-forecast-item'] > div").last(); }

    get insuranceCard() { return cy.get('[data-qa="insurance-forecast-item"] > div').last(); }

    get fuelCard() { return cy.get("[data-qa=fuel-forecast-item] > div").last(); }

    get repairsAndMaintenanceCard() { return cy.get("[data-qa=repairsMaintenance-forecast-item] > div").last(); }

    forecastItemCard(forecastItem: string) { return cy.get(`[data-qa=${forecastItem}-forecast-item] > div`).last(); }

    forecastItemCardFull(forecastItem: string, custom = false) {
        return !custom ? cy.get(`[data-qa=${forecastItem}-forecast-item]`) :
            cy.get(`[data-qa=${Cypress._.camelCase(Cypress._.toLower(Cypress._.replace(forecastItem, "&", "And")))}-forecast-item]`);
    }

    forecastItemTooltipButton(forecastItem: string) { return cy.get(`[data-qa=${forecastItem}-forecast-item] svg[aria-label="Unchecking this box will hide the expense from showing up on the Pro Forma."]`); }

    get toeCard() { return cy.xpath("//*[.='TOTAL OPERATING EXPENSES ($/SF)']/parent::div").first(); }

    getForecastItemBasisRadio(item) { return cy.get(`[name='${item}.basis']`); }


    getForecastItemCheckedBasisRadio(custom = false, index = 0, forecastItem?: string) {
        return !custom ? cy.get(`[data-qa="checked"][name='${forecastItem}.basis']`) :
            cy.get(`[data-qa="checked"] [name='customExpenses[${index}].basis']`);
    }

    getElementToCheckRadio(forecastItem: string, radioValue: BoweryReports.UnitSF) { return cy.get(`[data-qa=checked] [name='${forecastItem}.basis'][value='${radioValue}']`); }

    getElementBasisToSwitch(forecastItem: string, radioValue: BoweryReports.UnitSF) { return cy.get(`[name='${forecastItem}.basis'][value='${radioValue}']`); }

    getForecastItemForecastInput(item: string, custom = false, index = 0) { return !custom ? cy.get(`[name='${item}.concludedValue']`) : cy.get(`[name='customExpenses[${index}].concludedValue']`); }

    getForecastItemCompMin(item: string) { return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-min]`); }

    getForecastItemCompAvg(item: string) { return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-avg]`); }

    getForecastItemCompMax(item: string) { return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-max]`); }

    getForecastItemBasisMoneyValue(item: string) { return cy.get(`[data-qa=${item}-forecast-item] [data-qa=basis]`); }

    getForecastItemProjectionByType(item: string, type: string) { return cy.contains(`[data-qa=${item}-forecast-item] [data-qa$=historical]`, type); }

    getExpenseCommentary(forecastItem: string, index = 1) { return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::div[@data-slate-editor][${index}]`); }

    getExpenseCommentaryEditButton(forecastItem: string, index = 1) { return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Edit'][${index}]`); }

    getExpenseCommentarySaveButton(forecastItem: string, index = 1) { return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Save'][${index}]`); }

    getExpenseCommentaryModified(forecastItem: string) { return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::*[.='Modified'][2]`); }

    getExpenseCommentaryRevertToOriginal(forecastItem: string) { return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Revert to Original'][1]`); }

    getCheckboxIncludeInProForma(forecastItem: string) { return cy.get(`[data-qa^="${forecastItem}.includeInProForma"]`).find('input[type="checkbox"]'); }

    get inputPercentOfEGICheckbox() { return cy.get("[label='Input % of EGI'] input"); }

    get percentOfEgiInput() { return cy.get("[name='management.percentOfEgi']"); }

    get toeCompMin() { return cy.get("[data-qa=comp-min]").last(); }

    get toeCompAvg() { return cy.get("[data-qa=comp-avg]").last(); }

    get toeCompMax() { return cy.get("[data-qa=comp-max]").last(); }

    get allProjections() { return cy.get("[data-qa$=historical]"); }

    get allForecastsInputs() { return cy.get("[name$=concludedValue]"); }

    get allForecastsInputsCustomCards() { return cy.get("[name^=customExpenses][name$=concludedValue]"); }

    get toeOwnerProjection() { return cy.get("[data-qa=owners-projection]"); }

    get appraisersTotalForecast() { return cy.get("[data-qa=appraisers-total-conclusion]"); }

    get toeCommentary() { return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::div[@data-slate-editor]"); }

    get toeCommentaryEditButton() { return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::button[.='Edit']"); }

    get toeCommentarySaveButton() { return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::button[.='Save'][1]"); }

    get toeCommentaryModified() { return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']//following::*[.='Modified']"); }

    get toeAppraisersForecastValueLine() { return cy.xpath(`//*[.='TOTAL OPERATING EXPENSES']//following::div[@data-qa='appraisers-forecast-values-line']`); }

    get createNewCategoryButton() { return cy.contains('Add Expense Category +'); }

    get addCustomExpenseCategoryModal() { return cy.xpath("//*[.='Add Custom Expense Category']//parent::div[@role='dialog']"); }

    get titleOfAddCustomExpenseCategoryModal() { return cy.get('[role=dialog]').contains('Add Custom Expense Category'); }

    get addCustomExpenseCategoryInput() { return cy.get('input[placeholder="Enter Custom Expense..."]'); }

    get addCustomExpenseCategoryFieldset() { return cy.get('[data-qa="autosuggest-text-input-field"]').find('fieldset'); }

    get addCustomExpenseCategoryCancelButton() { return cy.xpath("//*[.='Add Custom Expense Category']//following::button[.='Cancel']"); }

    get editCustomExpenseCategoryCancelButton() { return cy.xpath("//*[.='Edit Custom Expense Category']//following::button[.='Cancel']"); }

    get addCustomExpenseCategorySaveButton() { return cy.xpath("//*[.='Add Custom Expense Category']//following::button[.='Save']"); }

    get addCustomExpenseCategoryWarning() { return cy.contains('Category name is required'); }

    editCustomExpenseCategoryButton(forecastItem: string, custom = false) {
        return !custom ? cy.get(`[data-qa=${forecastItem}-forecast-item]`).find('[data-testid="EditIcon"]') :
            cy.get(`[data-qa=${Cypress._.camelCase(Cypress._.toLower(Cypress._.replace(forecastItem, "&", "And")))}-forecast-item]`).find('[data-testid="EditIcon"]');
    }

    get newCategoryExpenseName() { return cy.get('[data-qa="expenseName-form-control"] input'); }

    get electricityCardText() { return cy.xpath("//span[@data-qa='electricity.includeInProForma-checked']/following-sibling::span"); }
}

export default new ExpenseForecastPage();
