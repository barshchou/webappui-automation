import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5042.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5008] [QA-5009] [QA-5010] [Income>Expense forecast] “Include Expense on Pro Forma” checkbox and tooltip functionality`,
    { tags: ["@income", "@expense_forecast"] }, () => {

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
            Income._ExpenseForecastActions.Page.createNewCategoryButton.should('be.enabled').click();
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
            Income._ExpenseForecastActions.Page.titleOfaddCustomExpenseCategoryModal.should('exist');
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.should('exist');
            Income._ExpenseForecastActions.Page.formCancelButton().should('exist');
            Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.should('exist');
        });



        // it("should handle the alerts automatically", () => {
        //   Cypress.on("uncaught:exception", (err, runnable) => {
        //     // returning false here prevents Cypress from failing the test
        //     return false;
        //   });
        //   Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.trigger('mouseover', 'center', { bubbles: true }).invoke('show') //trigger('mouseover', { bubbles: true }  )    //focused({timeout:10000})
        //   cy.wait(10000)

        //   cy.on("window:alert", (str) => {

        //   //window:alert is the event which get fired on alert open
        //     expect(str).to.equal("I am alert");
        //   cy.get('[name="alert"]').click();
        //   });
        // });


        it("[QA-5045]", () => {
            cy.stepInfo(`1. Verify Category Name field is required on "Add New Expense Category" modal `);

            // cy.on("window:alert", (str) => {

            //     Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.trigger('mouseover')
            //     //window:alert is the event which get fired on alert open
            //     cy.log(str)
            //       expect(str).to.equal("I am alert");
            //     //cy.get('[name="alert"]').click();
            //     });


            //pointerover???

            cy.stepInfo(`2. Verify "Save" button is disabled if Category Name field is empty and user can not new expense with the empty field`);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.should('be.empty');
            Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.should('be.disabled').click({ force: true });    //maybe from base page?
            Income._ExpenseForecastActions.Page.titleOfaddCustomExpenseCategoryModal.should('exist');

            cy.stepInfo(`3. Verify if user click on the empty field and then clicks outside the field → 
            the field is highlighted with red and “Category name is required” warning appears under the field`);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.click().blur();
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryWarning.should('exist');
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryFieldset.should('have.css', 'border-color', 'rgb(244, 67, 54)');


            cy.stepInfo(`4. Verify "Save" button is enabled if Category Name field is filled with valid data (the field is free-text. `);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.click().type(testData.customCategoryNameValidation.name);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.should('be.enabled');
        });

        it("[QA-5047]", () => {

            cy.stepInfo(`1. Verify after clicking Save button  on the “Add New Expense Category” modal with the filled "Category Name" field ->  
            a new card is added to the bottom of the page underneath “Replacement Reserves” and below Total Operating Expenses card`);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.clear().type(testData.firstCustomCategory.name);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.click();

            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.firstCustomCategory.name, true).should('exist');
            // .then($el => $el[0].offsetTop)

            //.offsetTop

            // assert.isAbove(valueToCheck, valueToBeAbove, [message])

            cy.stepInfo(`2. Verify new custom expense forecast is added on “Save” button on “Adding New Expense Category” after “Editing Expense Category” modal was closed`);
            Income._ExpenseForecastActions.Page.editCustomExpenseCategoryButton(testData.firstCustomCategory.name, true).click();
            Income._ExpenseForecastActions.Page.formCancelButton().click();
            Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.invoke('val').should('be.empty');
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.type(testData.secondCustomCategory.name);
            Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.click();
            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.secondCustomCategory.name, true).should('exist');
            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.firstCustomCategory.name, true).should('exist');

            cy.stepInfo(`3. Verify each subsequent custom expense card is added underneath  previously added custom expense card and below  Total Operating Expenses `);
            //  ???

        });

        it("[QA-5048]", () => {
            cy.stepInfo(`1. Verify as soon as user clicks Cancel button  on the “Add New Expense Category” modal (with filled/empty Category Name field) ->  
            no expense card is added`);
            Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
            Income._ExpenseForecastActions.Page.formCancelButton().click();
            // .should('not.exist');

            Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.type(testData.thirdCustomCategory.name);
            Income._ExpenseForecastActions.Page.formCancelButton().click();
            Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.thirdCustomCategory.name, true).should('not.exist');

            cy.stepInfo(`2. Verify  “Add New Expense Category” modal closes after clicking on Cancel button`);
            Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
            Income._ExpenseForecastActions.Page.formCancelButton().click();
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryModal.should('not.exist');


            cy.stepInfo(`3. Verify  if user clicks on Cancel button with filled Category Name and opens “Add New Expense Category” modal again-> 
            Category Name field is empty. no previous data is displayed there`);
            Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.type(testData.thirdCustomCategory.name);
            Income._ExpenseForecastActions.Page.formCancelButton().click();
            Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
            Income._ExpenseForecastActions.Page.addCustomExpenseCategoryInput.invoke('val').should('be.empty');
        });



        //   deleteReport(testData.reportCreationData.reportNumber);
    });