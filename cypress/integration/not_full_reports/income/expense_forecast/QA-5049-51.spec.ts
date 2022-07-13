import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5049-51.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5049] [QA-5050] [QA-5051] [Income>Expense forecast] "Per Unit" + "Per SF" value is calculations + sliding bar view`,
    { tags: [ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {

        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it(`[QA-5049] "Per Unit" value is calculated correct if "Per SF" radiobutton is selected`, () => {

            cy.stepInfo(`1. Go to Property > Summary, add residential units and Gross Building Area`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Go to Expense Forecast and add new Expense Forecast with valid name`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.expenseForecastCustomFixture().name);

            cy.stepInfo(`3. Make sure that Per SF radiobutton is selected for Custom Expense card`);
            Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value").then(value => {
                expect(value).to.be.equal('sf');
            });

            cy.stepInfo(`4. Fill in Appraiser's Forecast field for Custom Expense card`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastCustomFixture(), true, 0);

            cy.stepInfo(`5. Verify that Per Unit value below this field is calculated as: 
                            Per Unit Appraiser’s Forecast * selected Basis for Square Foot Analysis /  # of Resi Units `);
            Income._ExpenseForecastActions.Page.getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true).invoke("text").then(text => {
                expect(text).contain('Per Unit')
                    .contain(testData.perUnitFieldValue());
            });

            cy.stepInfo(`6. Go to Property > Summary and add residential units equal 0`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnitsZero);

            cy.stepInfo(`7. Verify if number of Residential Unit equal 0 →  expected result will be "Per Unit: $NaN"`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.Page.getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true).invoke("text").then(text => {
                expect(text).contain('Per Unit')
                    .contain(testData.perUnitValueTextNaN);
            });
        });

        it(`[QA-5050] "Per SF" value is calculated correct if "Per Unit" radiobutton is selected`, () => {

            cy.stepInfo(`1. Go to Property > Summary, add residential units and Gross Building Area`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Switch basis in Custom Expense card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastCustomFixture('unit'), true);

            cy.stepInfo(`3. Make sure that Per Unit radiobutton is selected for Custom Expense card`);
            Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value").then(value => {
                expect(value).to.be.equal('unit');
            });

            cy.stepInfo(`4. Verify that Per Unit value below this field is calculated as: 
                            Per Unit Appraiser’s Forecast * selected Basis for Square Foot Analysis /  # of Resi Units `);
            Income._ExpenseForecastActions.Page.getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain('Per SF')
                        .contain(testData.perSFFieldValue());
                });

            cy.stepInfo(`5. Go to Property > Summary and add residential units equal 0`);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterGrossBuildingArea(testData.numberOfResidentialUnitsZero);

            cy.stepInfo(`6. Verify if selected Basis for Square Foot Analysis equal 0 -> expected result will be "Per Unit: $0.00"`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.Page.getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain('Per SF')
                        .contain(testData.perSFValueTextNaN);
                });
        });

        it(`[QA-5051] Sliding bar graphic displays Appraiser's Forecast`, () => {

            cy.stepInfo(`1. Verify if Per Unit radiobutton is selected-> Title of Sliding Bar Graphic is #Category Name ($/UNIT)`);
            Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value").then(value => {
                expect(value).to.be.equal('unit');
            });
            Income._ExpenseForecastActions.Page.getForecastItemSlidingBarTitle(testData.expenseForecastCustomFixture().name, true).invoke("text").then(text => {
                expect(text).contain(testData.perUnitSlidingBarTitleNameCustom);
            });

            cy.stepInfo(`2. Verify if Per SF radiobutton is selected-> Title of Sliding Bar Graphic is #Category Name ($/SF)`);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastCustomFixture('sf'), true);
            Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value").then(value => {
                expect(value).to.be.equal('sf');
            });
            Income._ExpenseForecastActions.Page.getForecastItemSlidingBarTitle(testData.expenseForecastCustomFixture().name, true).invoke("text").then(text => {
                expect(text).contain(testData.perSFSlidingBarTitleNameCustom);
            });

            cy.stepInfo(`3. Verify Sliding bar graphic displays Appraiser's Forecast amount but it is always displayed in the left most position `);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.itemAppraisersForecastValueLine(testData.expenseForecastCustomFixture().name, true),
                testData.slidingBarPerSFSnapshotName, { padding: [ 0, 20 ] }
            );
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastCustomFixture('unit'), true);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page.itemAppraisersForecastValueLine(testData.expenseForecastCustomFixture().name, true),
                testData.slidingBarPerUnitSnapshotName, { padding: [ 0, 20 ] }
            );
        });

        it(`[QA-5052] Appraiser's Forecast of Custom Expense Forecast is included in Total Operating Expenses calculation`, () => {

            cy.stepInfo(`1. Verify forecasted amount of custom expense  is added to the calculation of Total Operating Expenses = 
            sum of all selected existing expense expenses + sum of all custom expenses`);
         

            cy.stepInfo(`2. Verify if Generated Commentary on  Total Operating Expenses card is generated correctly`);
           

            cy.stepInfo(`3. Verify if Sliding bar graphic  on  Total Operating Expenses card is displayed correctly`);
           
            

            //deleteReport(testData.reportCreationData.reportNumber);
        });
    });