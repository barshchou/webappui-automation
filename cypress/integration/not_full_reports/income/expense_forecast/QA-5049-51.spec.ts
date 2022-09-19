import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-5049-51.fixture";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income } from "../../../../actions";
import { createReport } from "../../../../actions/base/baseTest.actions";

describe(`[QA-5049] [QA-5050] [QA-5051] [Income>Expense forecast] Custom card values calculations + card appearance`,
    { tags: [ "@snapshot_tests", "@income", "@expense_forecast" ] }, () => {
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it(`[QA-5049] "Per Unit" value is calculated correct if "Per SF" radio button is selected`, () => {
            cy.stepInfo(`1. Go to Property > Summary, add residential units and Gross Building Area`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Go to Expense Forecast and add new Expense Forecast with valid name`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.expenseForecastCustomFixture().name);

            cy.stepInfo(`3. Make sure that Per SF radio button is selected for Custom Expense card`);
            Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0)
                .invoke("attr", "value").then(value => {
                    expect(value).to.be.equal('sf');
                });

            cy.stepInfo(`4. Fill in Appraiser's Forecast field for Custom Expense card`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastCustomFixture(), true, 0);

            cy.stepInfo(`5. Verify that Per Unit value below this field is calculated as: 
            Per Unit Appraiser's Forecast * selected Basis for Square Foot Analysis /  # of Residential Units `);
            Income._ExpenseForecastActions.Page
                .getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain('Per Unit')
                        .contain(testData.perUnitFieldValue());
                });

            cy.stepInfo(`6. Go to Property > Summary and add residential units equal 0`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfResidentialUnitsZero);

            cy.stepInfo(`7. Verify if number of Residential Unit equal 0 →  expected result will be "Per Unit: $NaN"`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.Page
                .getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain('Per Unit')
                        .contain(testData.perUnitValueTextNaN);
                });
        });

        it(`[QA-5050] "Per SF" value is calculated correct if "Per Unit" radio button is selected`, () => {
            cy.stepInfo(`1. Go to Property > Summary, add residential units and Gross Building Area`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.buildingDescription.grossArea);

            cy.stepInfo(`2. Switch basis in Custom Expense card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastCustomFixture('unit'), true);

            cy.stepInfo(`3. Make sure that Per Unit radio button is selected for Custom Expense card`);
            Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value")
                .then(value => {
                    expect(value).to.be.equal('unit');
                });

            cy.stepInfo(`4. Verify that Per Unit value below this field is calculated as: 
            Per Unit Appraiser's Forecast * selected Basis for Square Foot Analysis /  # of Residential Units `);
            Income._ExpenseForecastActions.Page
                .getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain('Per SF')
                        .contain(testData.perSFFieldValue());
                });

            cy.stepInfo(`5. Go to Property > Summary and add residential units equal 0`);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.buildingDescription.numberOfUnits)
                .enterGrossBuildingArea(testData.numberOfResidentialUnitsZero);

            cy.stepInfo(`6. Verify if selected Basis for Square Foot Analysis equal 0 -> 
            expected result will be "Per Unit: $0.00"`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.Page
                .getForecastItemBasisMoneyValue(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain('Per SF')
                        .contain(testData.perSFValueTextNaN);
                });
        });

        it(`[QA-5051] Sliding bar graphic displays Appraiser's Forecast`, () => {
            cy.stepInfo(`1. Verify if Per Unit radio button is selected -> 
            Title of Sliding Bar Graphic is #Category Name ($/UNIT)`);
            Income._ExpenseForecastActions.Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value")
                .then(value => {
                    expect(value).to.be.equal('unit');
                });
            Income._ExpenseForecastActions.Page
                .getForecastItemSlidingBarTitle(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain(testData.perUnitSlidingBarTitleNameCustom);
                });

            cy.stepInfo(`2. Verify if Per SF radio button is selected -> 
            Title of Sliding Bar Graphic is #Category Name ($/SF)`);
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastCustomFixture('sf'), true)
                .Page.getForecastItemCheckedBasisRadio(true, 0).invoke("attr", "value")
                .then(value => {
                    expect(value).to.be.equal('sf');
                });
            Income._ExpenseForecastActions.Page
                .getForecastItemSlidingBarTitle(testData.expenseForecastCustomFixture().name, true)
                .invoke("text").then(text => {
                    expect(text).contain(testData.perSFSlidingBarTitleNameCustom);
                });

            cy.stepInfo(`3. Verify Sliding bar graphic displays Appraiser's Forecast amount 
            but it is always displayed in the left most position `);
            Income._ExpenseForecastActions.matchElementSnapshot(
                Income._ExpenseForecastActions.Page
                    .forecastItemCard(testData.expenseForecastCustomFixture().name, true),
                testData.slidingBarPerSFSnapshotName, { padding: [ 50, 30 ] }
            );
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastCustomFixture('unit'), true)
                .matchElementSnapshot(
                    Income._ExpenseForecastActions.Page
                        .forecastItemCard(testData.expenseForecastCustomFixture().name, true),
                    testData.slidingBarPerUnitSnapshotName, { padding: [ 50, 30 ] }
                );
        });
    });