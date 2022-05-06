import testData from "../../../../fixtures/not_full_reports/income/tax_info/QA-4295.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from "../../../../actions";
import { Income } from "../../../../actions";

describe("Assessed Value & RE Taxes] Verify the 'Tax Calculation Discussion' generated commentary is displayed on the Tax Info page.", () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        cy.stepInfo("1. Navigate to Income -> Tax Info");
        _NavigationSection.Actions.navigateToPropertySummary();
        Property._Summary.Actions.enterGrossBuildingArea(testData.buildingDescription.grossArea)
            .enterNumberOfResUnits(testData.buildingDescription.numberOfUnits);
        
        cy.stepInfo("2. Verify  Tax Calculation discussion title and commentary is diplayed");
        
        cy.stepInfo("3. Export the report and verify comment");
        _NavigationSection.Actions.navigateToExpenseForecast();
        Income._ExpenseForecastActions.Actions.chooseForecastItemBasis(testData.forecastItem);
        Income._ExpenseForecastActions.Actions.verifyForecastItemBasis(testData.forecastItem);

        cy.stepInfo("4. Fill in Appraiser's Forecast field for Water & Sewer card");
        Income._ExpenseForecastActions.Actions.enterForecastItemForecast(testData.forecastItem);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});