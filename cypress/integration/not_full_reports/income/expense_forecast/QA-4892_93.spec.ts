import testData from "../../../../fixtures/not_full_reports/income/expense_forecast/QA-4892_93.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { Income, Property } from "../../../../actions";
import { _NavigationSection } from "../../../../actions/base";

describe("Appraiser's Forecast value for Electricity is correctly converted to Per SF/Per Unit value", 
    { tags:[ "@expense_forecast", "@income" ] }, () => {

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


    it("[QA-4893]", () => {
        
        cy.stepInfo("1. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Electricity card");
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastElectricity)
            .verifyForecastItemBasis(testData.expenseForecastElectricity);
    
        cy.stepInfo("2. Fill in Appraiser's Forecast field for Electricity card");
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastElectricity);

        cy.stepInfo("3. Verify that Per SF value below this field is calculated as: Per Unit Appraiser’s Forecast * # of Resi Units / GBA");
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastElectricity, testData.buildingDescription);

    });

    it("[QA-4892]", () => {
        
        cy.stepInfo("1. Go to Expense Forecast and make sure that Per Unit radiobutton is selected for Electricity card");
        _NavigationSection.Actions.navigateToExpenseForecast();
        testData.basis = "sf";
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.expenseForecastElectricity)
            .verifyForecastItemBasis(testData.expenseForecastElectricity);
    
        cy.stepInfo("2. Fill in Appraiser's Forecast field for Electricity card");
        Income._ExpenseForecastActions.enterForecastItemForecast(testData.expenseForecastElectricity);

        cy.stepInfo("3. Verify that Per Unit value below this field is calculated as: PSF Appraiser’s Forecast * GBA / # of Resi Units");
        Income._ExpenseForecastActions.verifyForecastItemBasisMoney(testData.expenseForecastElectricity, testData.buildingDescription);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});