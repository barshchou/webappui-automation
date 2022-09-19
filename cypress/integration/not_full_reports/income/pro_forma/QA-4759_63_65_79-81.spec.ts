import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4759_63_65_79-81.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import { BoweryReports } from '../../../../types/boweryReports.type';

describe("Pro Forma Page validation Operating Expenses -> Insurance", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
            cy.stepInfo(`2. Go to the Income → Expense Forecast → Insurance check Per SF 
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

        it("[QA-4759]", () => {
            cy.stepInfo(`3. The value in the Insurance is taken from Income → 
                    Expense Forecast → Insurance Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.insuranceSFTotal))}`, 
                proFormaTypes.insurance);
        });

        it("[QA-4763]", () => {
            cy.stepInfo(`3. The value in the Insurance is taken from Income → 
                    Expense Forecast → Insurance → Appraiser's Forecast cell`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.insuranceSFPerSf.toFixed(2))}`, 
                proFormaTypes.insurance);
        });

        it("[QA-4765]", () => {
            cy.stepInfo(`3. The value in the Insurance Per Unit is calculated by 
                    formula: Annual value / # of Residential Units`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.insuranceSFPerUnit))}`, 
                proFormaTypes.insurance);
        });

        it("[QA-4779]", () => {
        // Navigate to Expense Forecast and change basis
            testData.forecastItem.basis = "unit" as BoweryReports.UnitSF;
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.forecastItem);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        
            cy.stepInfo(`3. The value in the Insurance Total is taken from Income → 
                    Expense Forecast → Insurance Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.insuranceUnitTotal))}`, 
                proFormaTypes.insurance);
        });

        it("[QA-4780]", () => {
            cy.stepInfo(`3. The value in the Insurance → PSF is calculated by the formula: Total / GBA`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.insuranceUnitPerSf.toFixed(2))}`, 
                proFormaTypes.insurance);
        });

        it("[QA-4781]", () => {
            cy.stepInfo(`3. The value in the Insurance Per Unit is Appraiser's Forecast value`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.insuranceUnitPerUnit))}`, 
                proFormaTypes.insurance);
        });
    });