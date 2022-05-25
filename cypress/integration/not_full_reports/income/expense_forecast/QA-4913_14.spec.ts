import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4913_14.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import { Income } from "../../../../actions";
import { Tag } from "../../../../utils/tags.utils";

describe("Appraiser's Forecast value for Water & Sewer is correctly converted to Per SF/Unit value", 
    { tags: [ Tag.income, Tag.expense_forecast ] }, () => {
        
        before("Login, create report", () => {
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
                Property._Summary.enterNumberOfResUnits(testData.units)
                    .enterGrossBuildingArea(testData.grossBuildingArea)
                    .clickSaveButton();
            cy.saveLocalStorage();
        });
        beforeEach(() => {
            cy.restoreLocalStorage();
        });

    it("[QA-4814]", () => {

        cy.stepInfo("1. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        testData.basis = "unit";
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastWaterAndSewer)
            .verifyForecastItemBasis(testData.expenseForecastWaterAndSewer);
    
        cy.stepInfo("2. Fill in Appraiser's Forecast field for Water & Sewer card");
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer);

        cy.stepInfo("3. Verify that Per SF value below this field is calculated as: Per Unit Appraiser’s Forecast * # of Resi Units / GBA");
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastWaterAndSewer, testData.buildingDescription);
    });

    it("[QA-4813]", () => {
        
        cy.stepInfo("1. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Water & Sewer card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        testData.basis = "sf";
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastWaterAndSewer)
            .verifyForecastItemBasis(testData.expenseForecastWaterAndSewer);
    
        cy.stepInfo("2. Fill in Appraiser's Forecast field for Water & Sewer card");
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastWaterAndSewer);

        cy.stepInfo("3. Verify that Per Unit value below this field is calculated as: PSF Appraiser’s Forecast * GBA / # of Resi Units");
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastWaterAndSewer, testData.buildingDescription);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});