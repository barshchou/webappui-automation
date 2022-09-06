import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-5854-56.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, Property } from "../../../../actions";
import { BoweryReports } from '../../../../types/boweryReports.type';

describe("Pro Forma Page validation Operating Expenses -> Custom Expense", 
    { tags:[ "@income", "@pro_forma", "@fix" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
            cy.stepInfo(`2. Go to the Income → Expense Forecast → Custom Expense check Per SF 
                    radio button and fill in the value into Appraiser's Forecast cell`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.addCustomExpenseCategory(testData.customExpenseName)
                .chooseForecastItemBasis(testData.forecastItem, true)
                .enterForecastItemForecast(testData.forecastItem, true);

            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-5854]", () => {
            cy.stepInfo(`3. The value in the Custom Expense Total is taken from Income → 
                    Expense Forecast → Custom Expense Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.customSfTotal))}`, 
                testData.customExpenseName);
        });

        it("[QA-5855]", () => {
            cy.stepInfo(`3. The value in the Custom Expense is taken from Income → 
                    Expense Forecast → Custom Expense → Appraiser's Forecast cell`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.customSfPerSf.toFixed(2))}`, 
                testData.customExpenseName);
        });

        it("[QA-5856]", () => {
        //Navigate to Expense Forecast and change basis
            testData.forecastItem.basis = "unit" as BoweryReports.UnitSF;
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.forecastItem, true);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
            cy.stepInfo(`3. The value in the Custom Expense → PSF is calculated by the formula: 
                    Total / selected Basis of Square Foot Analysis (Property>Summary)`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.customUnitPerSf.toFixed(2))}`, 
                testData.customExpenseName);
        });
    });