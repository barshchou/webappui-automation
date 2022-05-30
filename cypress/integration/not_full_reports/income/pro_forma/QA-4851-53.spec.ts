import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4851-53.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";

describe("Pro Forma Page validation Operating Expenses -> Electricity", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
    before("Login, create report, prepare data", () => {
        cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
        createReport(testData.reportCreationData);
        _NavigationSection.navigateToPropertySummary();
        Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
            .enterNumberOfResUnits(testData.numberOfResidentialUnits)
            .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
        cy.stepInfo(`2. Go to the Income → Expense Forecast → Electricity check Per SF 
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

    it("[QA-4851]", () => {
        cy.stepInfo(`3. The value in the Electricity Total is taken from Income → 
                    Expense Forecast → Electricity Forecast Discussion generated commentary`);
        Income._ProFormaActions.verifyCategoryTotal(
            `$${numberWithCommas(Math.round(testData.electricityUnitTotal))}`, 
            proFormaTypes.electricity);
    });

    it("[QA-4852]", () => {
        cy.stepInfo(`3. The value in the Electricity → PSF is calculated by the formula: Total / GBA`);
        Income._ProFormaActions.verifyCategoryPSFTotal(
            `$${numberWithCommas(testData.electricityUnitPerSf.toFixed(2))}`, 
            proFormaTypes.electricity);
    });

    it("[QA-4853]", () => {
        cy.stepInfo(`3. The value in the Electricity Per Unit is Appraiser's Forecast value`);
        Income._ProFormaActions.verifyCategoryPerUnitTotal(
            `$${numberWithCommas(Math.round(testData.electricityUnitPerUnit))}`, 
            proFormaTypes.electricity);

        deleteReport(testData.reportCreationData.reportNumber);
    });
});