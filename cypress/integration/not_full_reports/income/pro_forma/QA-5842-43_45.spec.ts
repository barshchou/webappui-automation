import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-5842-43_45.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import { BoweryReports } from '../../../../types/boweryReports.type';

describe("Pro Forma Page validation Operating Expenses -> Miscellaneous", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
            cy.stepInfo(`2. Go to the Income → Expense Forecast → Miscellaneous check Per SF 
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

        it("[QA-5842]", () => {
            cy.stepInfo(`3. The value in the Miscellaneous Total is taken from Income → 
                    Expense Forecast → Miscellaneous Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.miscellaneousSfTotal))}`, 
                proFormaTypes.miscellaneous);
        });

        it("[QA-5843]", () => {
            cy.stepInfo(`3. The value in the Miscellaneous is taken from Income → 
                    Expense Forecast → Miscellaneous → Appraiser's Forecast cell`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.miscellaneousSfPerSf.toFixed(2))}`, 
                proFormaTypes.miscellaneous);
        });

        it("[QA-5845]", () => {
        //Navigate to Expense Forecast and change basis
            testData.forecastItem.basis = "unit" as BoweryReports.UnitSF;
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.forecastItem);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
            cy.stepInfo(`3. The value in the Miscellaneous → PSF is calculated by the formula: 
                    Total / selected Basis of Square Foot Analysis (Property>Summary)`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.miscellaneousUnitPerSf.toFixed(2))}`, 
                proFormaTypes.miscellaneous);
        });
    });