import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5042_44-45_47-48.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";
import Enums from "../../../../enums/enums";

describe(`[QA-5042] [QA-5044] [QA-5045] [QA-5047] [QA-5048] 
[Income>Expense forecast] 'Add New Expense Category' button and modal functionality`,
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

        cy.stepInfo(`2. Verify there is a button titled “Add Expense Category” 
        on Expense Forecast page below page title`);
        Income._ExpenseForecastActions.Page.createNewCategoryButton.should('exist');

        cy.stepInfo(`3. Verify the button is enabled and clickable`);
        Income._ExpenseForecastActions.Page.createNewCategoryButton.should('be.enabled').click();
    });

    it("[QA-5044]", () => {
        cy.stepInfo(`1. Verify the “Add New Expense Category” Dialog Modal is launched 
        on clicking "Add expense category" button`);
        Income._ExpenseForecastActions.Page.addCustomExpenseCategoryModal.should('exist');

        cy.stepInfo(`2.  Verify the modal matches the design:
                         * Title of modal: “Add New Expense Category” 
                         * Title of  the required field "Category Name"
                         * There are two buttons on the right bottom:
                         * "Cancel" button and "Save" button`);
        Income._ExpenseForecastActions.Page.titleOfAddCustomExpenseCategoryModal.should('exist');
        Income._ExpenseForecastActions.Page.newCategoryExpenseName.should('exist');
        Income._ExpenseForecastActions.Page.addCustomExpenseCategoryCancelButton.should('exist');
        Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.should('exist');
    });

    it("[QA-5045]", () => {

        cy.stepInfo(`1. Verify "Save" button is disabled if Category Name field is empty and 
        user can not new expense with the empty field`);
        Income._ExpenseForecastActions.Page.newCategoryExpenseName.should('be.empty');
        Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton
            .should('be.disabled').click({ force: true });
        Income._ExpenseForecastActions.Page.titleOfAddCustomExpenseCategoryModal.should('exist');

        cy.stepInfo(`2. Verify "Save" button is enabled if Category Name field is filled 
        with valid data (the field is free-text.`);
        Income._ExpenseForecastActions.Page.newCategoryExpenseName.click()
            .type(`${testData.customCategoryNameValidation.name}{downArrow}{enter}`);
        Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.should('be.enabled');
    });

    it("[QA-5047]", () => {
        cy.stepInfo(`1. Verify after clicking Save button  on the “Add New Expense Category” modal 
        with the filled "Category Name" field -> a new card is added to the bottom of the 
        page underneath “Replacement Reserves” and below Total Operating Expenses card`);
        Income._ExpenseForecastActions.Page.newCategoryExpenseName.clear()
            .type(`${testData.firstCustomCategory.name}{downArrow}{enter}`);
        Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.click();
        Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.firstCustomCategory.name, true)
            .should('exist');
        Income._ExpenseForecastActions.Page.forecastItemCardFull(Enums.EXPENSE_FORECAST_ITEMS.replacementsAndReserves)
            .then(el => cy.wrap(el[0].offsetTop).as('coordinatesReplacementCard'));
        Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.firstCustomCategory.name, true)
            .then(el => cy.wrap(el[0].offsetTop).as('coordinatesCustomCard'));
        Income._ExpenseForecastActions.Page.toeCard
            .then(el => cy.wrap(el[0].offsetTop).as('coordinatesTotalCard'));
        cy.get('@coordinatesReplacementCard').then(coordinatesReplacementCard => {
            cy.get('@coordinatesCustomCard').then(coordinatesCustomCard => {
                cy.get('@coordinatesTotalCard').then(coordinatesTotalCard => {
                    expect(Number(coordinatesTotalCard)).to.be.greaterThan(Number(coordinatesCustomCard));
                    expect(Number(coordinatesCustomCard)).to.be.greaterThan(Number(coordinatesReplacementCard));
                });
            });
        });

        cy.stepInfo(`2. Verify new custom expense forecast is added on “Save” button on “Adding New Expense Category” 
                         after “Editing Expense Category” modal was closed`);
        Income._ExpenseForecastActions.Page
            .editCustomExpenseCategoryButton(testData.firstCustomCategory.name, true).click();
        Income._ExpenseForecastActions.Page.editCustomExpenseCategoryCancelButton.click();
        Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
        Income._ExpenseForecastActions.Page.newCategoryExpenseName.invoke('val').should('be.empty');
        Income._ExpenseForecastActions.Page.newCategoryExpenseName
            .type(`${testData.secondCustomCategory.name}{downArrow}{enter}`);
        Income._ExpenseForecastActions.Page.addCustomExpenseCategorySaveButton.click();
        Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.secondCustomCategory.name, true)
            .should('exist');
        Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.firstCustomCategory.name, true)
            .should('exist');

        cy.stepInfo(`3. Verify each subsequent custom expense card is added underneath previously added 
        custom expense card and below Total Operating Expenses`);
        Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.firstCustomCategory.name, true)
            .then(el => cy.wrap(el[0].offsetTop).as('coordinatesFirstCustomCard'));
        Income._ExpenseForecastActions.Page.forecastItemCardFull(testData.secondCustomCategory.name, true)
            .then(el => cy.wrap(el[0].offsetTop).as('coordinatesSecondCustomCard'));
        Income._ExpenseForecastActions.Page.toeCard
            .then(el => cy.wrap(el[0].offsetTop).as('coordinatesTotalCard'));
        cy.get('@coordinatesFirstCustomCard').then(coordinatesFirstCustomCard => {
            cy.get('@coordinatesSecondCustomCard').then(coordinatesSecondCustomCard => {
                cy.get('@coordinatesTotalCard').then(coordinatesTotalCard => {
                    expect(Number(coordinatesTotalCard)).to.be.greaterThan(Number(coordinatesSecondCustomCard));
                    expect(Number(coordinatesSecondCustomCard)).to.be.greaterThan(Number(coordinatesFirstCustomCard));
                });
            });
        });
    });

    it("[QA-5048]", () => {
        cy.stepInfo(`1. Verify as soon as user clicks Cancel button on the “Add New Expense Category” 
        modal (with filled/empty Category Name field) -> no expense card is added`);
        Income._ExpenseForecastActions.Page.allForecastsInputs
            .then(inputs => {
                cy.wrap(inputs.length).as('cardsNumberBeforeCancel');
            });
        Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
        Income._ExpenseForecastActions.Page.addCustomExpenseCategoryCancelButton.click();
        Income._ExpenseForecastActions.Page.allForecastsInputs
            .then(inputs => {
                cy.wrap(inputs.length).as('cardsNumberAfterCancel');
            });
        cy.get('@cardsNumberBeforeCancel').then(cardsNumberBeforeCancel => {
            cy.get('@cardsNumberAfterCancel').then(cardsNumberAfterCancel => {
                expect(cardsNumberBeforeCancel).to.eq(cardsNumberAfterCancel);
            });
        });
        Income._ExpenseForecastActions.Page.allForecastsInputs
            .then(inputs => {
                cy.wrap(inputs.length).as('cardsNumberBeforeCancel');
            });
        Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
        Income._ExpenseForecastActions.Page.newCategoryExpenseName
            .type(`${testData.thirdCustomCategory.name}{downArrow}{enter}`);
        Income._ExpenseForecastActions.Page.addCustomExpenseCategoryCancelButton.click();
        Income._ExpenseForecastActions.Page.allForecastsInputs
            .then(inputs => {
                cy.wrap(inputs.length).as('cardsNumberAfterCancel');
            });
        cy.get('@cardsNumberBeforeCancel').then(cardsNumberBeforeCancel => {
            cy.get('@cardsNumberAfterCancel').then(cardsNumberAfterCancel => {
                expect(cardsNumberBeforeCancel).to.eq(cardsNumberAfterCancel);
            });
        });
        Income._ExpenseForecastActions.Page
            .forecastItemCardFull(testData.thirdCustomCategory.name, true).should('not.exist');

        cy.stepInfo(`2. Verify  “Add New Expense Category” modal closes after clicking on Cancel button`);
        Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
        Income._ExpenseForecastActions.Page.addCustomExpenseCategoryCancelButton.click();
        Income._ExpenseForecastActions.Page.addCustomExpenseCategoryModal.should('not.exist');

        cy.stepInfo(`3. Verify  if user clicks on Cancel button with filled Category Name and opens 
        “Add New Expense Category” modal again-> Category Name field is empty. no previous data is displayed there`);
        Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
        Income._ExpenseForecastActions.Page.newCategoryExpenseName
            .type(`${testData.thirdCustomCategory.name}{downArrow}{enter}`);
        Income._ExpenseForecastActions.Page.addCustomExpenseCategoryCancelButton.click();
        Income._ExpenseForecastActions.Page.createNewCategoryButton.click();
        Income._ExpenseForecastActions.Page.newCategoryExpenseName.invoke('val').should('be.empty');
    });
});