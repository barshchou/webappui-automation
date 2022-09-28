import { BoweryReports } from "../../types/boweryReports.type";
import BasePage from "../base/base.page";

class ExpenseForecastPage extends BasePage {

    get pageHeaderElement() { return cy.get('[data-qa="expenseForecast"]'); }

    get electricityCard() { return cy.get("[data-qa='electricity-forecast-item'] > div").last(); }

    get insuranceCard() { return cy.get('[data-qa="insurance-forecast-item"] > div').last(); }

    get fuelCard() { return cy.get("[data-qa=fuel-forecast-item] > div").last(); }

    get repairsAndMaintenanceCard() { return cy.get("[data-qa=repairsAndMaintenance-forecast-item] > div").last(); }

    // TODO: ask developers to restore old locators with expense names instead of hardcoded "customExpenses[0,1,2...]"
    /**
     * If card is default - locator gets forecast card name 
     * (default names are contained in expensesForecastCardNames.enum.ts) for qa-data attribute. 
     * If card is custom - locator gets forecast card name and 
     * changes it (according to the rule from webapp) for qa-data attribute 
     */
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    forecastItemCardFull(forecastItem: string, custom = false) {
        return cy.get(`[data-qa='${forecastItem}-forecast-item']`);
        /*
         * TODO: Replace with current approach when we get proper custom categories names data-qa attr
         * return !custom ? cy.get(`[data-qa='${forecastItem}-forecast-item']`) :
         *     cy.get(`[data-qa=${Cypress._.camelCase(Cypress._.toLower(Cypress._
         *         .replace(forecastItem, "&", "And")))}-forecast-item]`);
         */
    }

    forecastItemCard(item: string, custom = false) {
        return !custom ? this.forecastItemCardFull(item, custom).children('div').last() :
            this.forecastItemCardFull(item, custom).children('div').eq(1);
    }

    forecastItemTooltipButton(forecastItem: string) {
        return this.forecastItemCardFull(forecastItem)
            .find('svg[aria-label="Unchecking this box will hide the expense from showing up on the Pro Forma."]');
    }

    get toeCard() { return cy.xpath("//*[.='TOTAL OPERATING EXPENSES ($/SF)']/parent::div").first(); }

    getForecastItemBasisRadio(item: string) { return cy.get(`[name='${item}.basis']`); }

    getForecastItemCheckedBasisRadio(custom = false, index = 0, forecastItem?: string) {
        return !custom ? cy.get(`[data-qa="checked"][name='${forecastItem}.basis']`) :
            cy.get(`[data-qa="checked"] [name='customExpenses[${index}].basis']`);
    }

    getElementToCheckRadio(forecastItem: string, radioValue: BoweryReports.UnitSF) {
        return cy.get(`[data-qa=checked] [name='${forecastItem}.basis'][value='${radioValue}']`);
    }

    getElementBasisToSwitch(forecastItem: string, radioValue: BoweryReports.UnitSF) {
        return cy.get(`[name='${forecastItem}.basis'][value='${radioValue}']`);
    }

    getForecastItemForecastInput(item: string, custom = false, index = 0) {
        return !custom ? cy.get(`[name='${item}.concludedValue']`) :
            cy.get(`[name='customExpenses[${index}].concludedValue']`);
    }

    getForecastItemCompMin(item: string) { return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-min]`); }

    getForecastItemCompAvg(item: string) { return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-avg]`); }

    getForecastItemCompMax(item: string) { return cy.get(`[data-qa=${item}-forecast-item] [data-qa=comp-max]`); }

    getForecastItemBasisMoneyValue(item: string, custom = false, perRoom = false) {
        let index = !perRoom ? 0 : 1;
        return this.forecastItemCardFull(item, custom).find('[data-qa=basis]').eq(index);
    }

    getForecastItemSlidingBarTitle(item: string, custom = false) {
        return this.forecastItemCardFull(item, custom).contains(`${Cypress._.toUpper(item)} (`);
    }

    getForecastItemProjectionByType(item: string, type: string, toeCard = false) { 
        return !toeCard ?  cy.contains(`[data-qa=${item}-forecast-item] [data-qa$=historical]`, type) : 
            cy.contains('TOTAL OPERATING EXPENSES').parent().parent().find('[data-qa$=historical]').contains(type);
    }

    getExpenseCommentary(forecastItem: string, index = 1) {
        return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::div[@data-slate-editor][${index}]`);
    }

    getExpenseCommentarySaveButton(forecastItem: string, index = 1) {
        return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Save'][${index}]`);
    }

    getExpenseCommentaryModified(forecastItem: string) { 
        return cy.xpath(`//*[@data-qa="${forecastItem}-forecast-item"]//following::*[.='Modified'][2]`); 
    }

    getExpenseCommentaryRevertToOriginal(forecastItem: string, index = 1) {
        return cy.xpath(
            `//*[@data-qa="${forecastItem}-forecast-item"]//following::button[.='Revert to Original'][${index}]`);
    }

    getCheckboxIncludeInProForma(forecastItem: string) { 
        return cy.get(`[data-qa=${forecastItem}-forecast-item] input[type="checkbox"]`).first(); 
    }

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

    get toeAppraisersForecastValueLine() {
        return cy.xpath("//*[.='TOTAL OPERATING EXPENSES']" + 
        "//following::div[@data-qa='appraisers-forecast-values-line']");
    }

    itemAppraisersForecastValueLine(item: string, custom = false) {
        return this.forecastItemCardFull(item, custom).find('[data-qa=appraisers-forecast-values-line]');
    }

    get createNewCategoryButton() { return cy.contains('Add Expense Category +'); }

    get addCustomExpenseCategoryModal() { 
        return cy.xpath("//*[.='Add Custom Expense Category']//parent::div[@role='dialog']"); 
    }

    get titleOfAddCustomExpenseCategoryModal() { 
        return cy.get('[role=dialog]').contains('Add Custom Expense Category'); 
    }

    get addCustomExpenseCategoryFieldset() { 
        return cy.get('[data-qa="autosuggest-text-input-field"]').find('fieldset'); 
    }

    get addCustomExpenseCategoryCancelButton() { 
        return cy.xpath("//*[.='Add Custom Expense Category']//following::button[.='Cancel']"); 
    }

    get editCustomExpenseCategoryCancelButton() { 
        return cy.xpath("//*[.='Edit Custom Expense Category']//following::button[.='Cancel']"); 
    }

    get addCustomExpenseCategorySaveButton() { 
        return cy.xpath("//*[.='Add Custom Expense Category']//following::button[.='Save']"); 
    }

    get addCustomExpenseCategoryWarning() { return cy.contains('Category name is required'); }

    editCustomExpenseCategoryButton(forecastItem: string, custom = false) {
        return this.forecastItemCardFull(forecastItem, custom).find('[data-testid="EditIcon"]');
    }

    get newCategoryExpenseName() { return cy.get('[name=expenseName]'); }

    get electricityCardText() { 
        return cy.xpath("//span[@data-qa='electricity.includeInProForma-checked']/following-sibling::span"); 
    }

    get categoryErrorMessageExists() {
        return cy.xpath(`//*[.='Expense category already exists']`);
    }

    get categoryErrorMessageRequired() {
        return cy.xpath(`//*[.='Category name is required']`);
    }

    customCategoryDeleteButton(categoryName: string) {
        let name = categoryName.charAt(0).toLocaleUpperCase() + categoryName.toLocaleLowerCase().slice(1);
        return cy.xpath(`//*[@data-qa="${name}-forecast-item"]//following::*[@data-testid="DeleteIcon"]`);
    }

    get editCustomCategoryModalHeader() {
        return cy.xpath(`//h2[.='Edit Custom Expense Category']`);
    }
}

export default new ExpenseForecastPage();
