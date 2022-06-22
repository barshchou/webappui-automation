import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5008-10.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5008] [QA-5009] [QA-5010] [Income>Expense forecast] “Include Expense on Pro Forma” checkbox and tooltip functionality`,
    { tags: [ "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-5042]", () => {
            cy.stepInfo(`1. Go to Income > Expense Forecast`);
            _NavigationSection.navigateToExpenseForecast();

            cy.stepInfo(`2. Verify there is a button titled “Add Expense Category” on Expense Forecast page below page title`);
            Income._ExpenseForecastActions.Page.createNewCategoryButton.should('exist');

            cy.stepInfo(`3. Verify the button is enabled and clickable`);
            Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryModal.should('exist');
            
        });

        it("[QA-5044]", () => {
            cy.stepInfo(`1. Verify the “Add New Expense Category” Dialog Modal is launched on clicking "Add expense category" button`);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryModal.should('exist');

            cy.stepInfo(`2.  Verify the modal matches the design:
            * Title of modal: “Add New Expense Category” 
            * Title of  the required field "Category Name"
            * There are two buttons on the right bottom:
            * "Cancel" button and "Save" button`);
           
            
        });

        it("[QA-5010]", () => {
            cy.stepInfo(`1. Verify user hover on icon right to the "Include Expense on Pro Forma" checkbox - tooltip
                         with the following text "Unchecking this box will hide the expense from showing up on the Pro Forma." appears `);
           

            deleteReport(testData.reportCreationData.reportNumber);
        });
    });