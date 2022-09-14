import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-5835-37.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import { BoweryReports } from '../../../../types/boweryReports.type';

describe("Pro Forma Page validation Operating Expenses -> General & Administrative", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
            cy.stepInfo(`2. Go to the Income → Expense Forecast → General & Administrative check Per SF 
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

        it("[QA-5835]", () => {
            cy.stepInfo(`3. The value in the General & Administrative Total is taken from Income → 
                    Expense Forecast → General & Administrative Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.generalAndAdministrativeSfTotal))}`, 
                proFormaTypes.generalAndAdministrative);
        });

        it("[QA-5836]", () => {
            cy.stepInfo(`3. The value in the General & Administrative is taken from Income → 
                    Expense Forecast → General & Administrative → Appraiser's Forecast cell`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.generalAndAdministrativeSfPerSf.toFixed(2))}`, 
                proFormaTypes.generalAndAdministrative);
        });

        it("[QA-5837]", () => {
        //Navigate to Expense Forecast and change basis
            testData.forecastItem.basis = "unit" as BoweryReports.UnitSF;
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.forecastItem);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
            cy.stepInfo(`3. The value in the General & Administrative → PSF is calculated by the formula: 
                    Total / selected Basis of Square Foot Analysis (Property>Summary)`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.generalAndAdministrativeUnitPerSf.toFixed(2))}`, 
                proFormaTypes.generalAndAdministrative);
        });
    });