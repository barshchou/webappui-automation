import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4913_14.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections } from "../../../../actions";
import { Income } from "../../../../actions";

describe("Appraiser's Forecast value for Water & Sewer is correctly converted to Per SF/Unit value", 
    { tags: [ "@income", "@expense_forecast" ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.units)
                .enterGrossBuildingArea(testData.grossBuildingArea)
                .clickSaveButton()
                .verifyProgressBarNotExist();
            cy.saveLocalStorage();
        });

        beforeEach(() => {
            cy.restoreLocalStorage();
        });

        it("[QA-4814]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Water & Sewer card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastWaterAndSewer(
                testData.basisUnit))
                .verifyForecastItemBasis(testData.expenseForecastWaterAndSewer(testData.basisUnit));
    
            cy.stepInfo(`2. Fill in Appraiser's Forecast field for Water & Sewer card`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer(
                testData.basisUnit));

            cy.stepInfo(`3. Verify that Per SF value below this field is calculated as: 
            Per Unit Appraiser's Forecast * # of Residential Units / GBA`);
            Income._ExpenseForecastActions
                .verifyForecastItemBasisMoney(testData.expenseForecastWaterAndSewer(testData.basisUnit),
                    testData.buildingDescription);
        });

        it("[QA-4813]", () => {
            cy.stepInfo(`1. Go to Expense Forecast and make sure that Per Unit radio button 
            is selected for Water & Sewer card`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastWaterAndSewer(
                testData.basisSF))
                .verifyForecastItemBasis(testData.expenseForecastWaterAndSewer(testData.basisSF));
    
            cy.stepInfo(`2. Fill in Appraiser's Forecast field for Water & Sewer card`);
            Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer(
                testData.basisSF));

            cy.stepInfo(`3. Verify that Per Unit value below this field is calculated as: 
            PSF Appraiser's Forecast * GBA / # of Residential Units`);
            Income._ExpenseForecastActions
                .verifyForecastItemBasisMoney(testData.expenseForecastWaterAndSewer(testData.basisSF),
                    testData.buildingDescription);
        });
    });