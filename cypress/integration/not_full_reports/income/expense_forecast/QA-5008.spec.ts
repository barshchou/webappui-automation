import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5008.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import expensesCardsNames from " ../../../cypress/enums/expenseForecast.enum";

describe(`[] [Income>Expense forecast] “Include Expense on Pro Forma” checkbox is displayed under existing expense card`,
    { tags:[ "@income", "@expense_forecast" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
 //  cy.saveLocalStorage();
    });
    
    // beforeEach(() => {
    //     cy.restoreLocalStorage();
    // });

    it("[QA-5008]", () => {
        cy.stepInfo(`1. Go to Income > Expense Forecast`);
        _NavigationSection.navigateToExpenseForecast();

        cy.stepInfo(`2. Verify  “Include Expense on Pro Forma”  checkbox is displayed under existing expense card`);
        expensesCardsNames.expensesCheckboxIncludeInProFormaNamesArray.forEach(element => {
          Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxExists(element);
});

cy.stepInfo(`3. Verify  “Include Expense on Pro Forma” checkbox is NOT displayed under custom expense card`);
Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customCategory.name);
   Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.customCategory.name).children()
   .contains("Include Expense on Pro Forma").should('not.exist')

});

it("[QA-5009]", () => {
    cy.stepInfo(` Verify “Include Expense on Pro Forma” checkbox is selected by default for each existing expense card`);
    expensesCardsNames.expensesCheckboxIncludeInProFormaNamesArray.forEach(element => {
        Income._ExpenseForecastActions.verifyIncludeInProFormaCheckboxIsChecked(element);
});
});

it("[QA-5010]", () => {
    cy.stepInfo(` Verify user hover on icon right to the "Include Expense on Pro Forma" checkbox - tooltip
     with the following text "Unchecking this box will hide the expense from showing up on the Pro Forma." appears `);
     expensesCardsNames.expensesCheckboxIncludeInProFormaNamesArray.forEach(element => {
      //  Income._ExpenseForecastActions.(element);

     //   verifyGuidelineTooltip() {
        Income._ExpenseForecastActions.Page.forecastItemTooltip(element).should("exist");
            // clientPage.toCheckTooltipExist.should("not.exist");
            // clientPage.guidelinesTooltip.trigger("mouseover");
            // clientPage.toCheckTooltipExist.should("exist");
       //     return this;
     //   }


});


// label="Include Expense on Pro Forma"span
// cy.get(`[data-qa="${forecastItem}"].filter('.users')
// cy.get('td').filter('.users')
        // cy.stepInfo(`[] => 3. Fill expenses forecast for custom and regular categories`);
        // testData.expensesItems.forEach(foreCastItem => {
        //     Income._ExpenseForecastActions.enterForecastItemForecast(foreCastItem);
        // });
        // Income._ExpenseForecastActions.enterForecastItemForecast(testData.firstCustomCategory, true, 0);
        // Income._ExpenseForecastActions.enterForecastItemForecast(testData.secondCustomCategory, true, 1);
        
        // cy.stepInfo(`[] => 4. Verify total expenses calculation and commentary`);
        // Income._ExpenseForecastActions.verifyTOECommentary(testData.commentaryTotalExpenses.generatedPerSF)
        //     .verifyTotalForecast();


        // deleteReport(testData.reportCreationData.reportNumber);
    });
});