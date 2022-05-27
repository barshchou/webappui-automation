import { numberWithCommas } from './../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4759_63_65.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";

describe("Pro Forma Page validation Operating Expenses -> Insurance", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
    before("Login, create report, prepare data", () => {
        cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
        cy.stepInfo(`2. Go to the Income → Expense Forecast → Insurance check Per SF 
                    radio button and fill in the value into Appraiser’s Forecast cell`);
        _NavigationSection.navigateToExpenseForecast();
        Income._ExpenseForecastActions.chooseForecastItemBasis(testData.forecastItem)
            .enterForecastItemForecast(testData.forecastItem);

        cy.saveLocalStorage();
    });
    
    beforeEach("Restore local storeage", () => {
        cy.restoreLocalStorage();
        _NavigationSection.navigateToProForma()
            .verifyProgressBarNotExist();
    });

    it("[QA-4756]", () => {
        cy.stepInfo(`3. The value in the Insurance is taken from Income → 
                    Expense Forecast → Insurance Forecast Discussion generated commentary`);
        Income._ProFormaActions.verifyCategoryTotal(
            `$${numberWithCommas(Math.round(testData.insuranceSFTotal))}`, 
            proFormaTypes.insurace);
    });

    it("[QA-4757]", () => {
        cy.stepInfo(`3. The value in the Insurance is taken from Income → 
                    Expense Forecast → Insurance → Appraiser’s Forecast cell`);
        Income._ProFormaActions.verifyCategoryPSFTotal(
            `$${numberWithCommas(testData.insuranceSFPerSf.toFixed(2))}`, 
            proFormaTypes.insurace);
    });

    it("[QA-4758]", () => {
        cy.stepInfo(`3. The value in the Insurance Per Uni is calculated by 
                    formula: Annual value / # of Residential Units`);
        Income._ProFormaActions.verifyCategoryPerUnitTotal(
            `$${numberWithCommas(Math.round(testData.insuranceSFPerUnit))}`, 
            proFormaTypes.insurace);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});