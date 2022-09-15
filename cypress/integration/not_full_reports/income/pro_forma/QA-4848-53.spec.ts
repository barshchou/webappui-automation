import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4848-53.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import { BoweryReports } from '../../../../types/boweryReports.type';

describe("Pro Forma Page validation Operating Expenses -> Electricity", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
            cy.stepInfo(`2. Go to the Income → Expense Forecast → Electricity check Per SF 
                    radio button and fill in the value into Appraiser's Forecast cell`);
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.chooseForecastItemBasis(testData.forecastItem)
                .enterForecastItemForecast(testData.forecastItem);

            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4848]", () => {
            cy.stepInfo(`3. The value in the Electricity Total is taken from Income → 
                    Expense Forecast → Electricity Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.electricitySfTotal))}`, 
                proFormaTypes.electricity);
        });

        it("[QA-4849]", () => {
            cy.stepInfo(`3. The value in the Electricity is taken from Income → 
                    Expense Forecast → Electricity → Appraiser's Forecast cell`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.electricitySfPerSf.toFixed(2))}`, 
                proFormaTypes.electricity);
        });

        it("[QA-4850]", () => {
            cy.stepInfo(`3. The value in the Electricity → 
                    Per Unit is calculated by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.electricitySfPerUnit))}`, 
                proFormaTypes.electricity);
        });

        it("[QA-4851]", () => {
        // Navigate to Expense Forecast and change basis
            testData.forecastItem.basis = "unit" as BoweryReports.UnitSF;
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.forecastItem);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();

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
        });
    });