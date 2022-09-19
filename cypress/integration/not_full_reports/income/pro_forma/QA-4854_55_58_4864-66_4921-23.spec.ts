import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4854_55_58_4864-66_4921-23.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import { BoweryReports } from '../../../../types/boweryReports.type';

describe("Pro Forma Page validation Operating Expenses -> Fuel", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);
        
            cy.stepInfo(`1.1 Navigate to Residential rent roll and set rooms amount`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.checkCheckboxByLabel(testData.perRoomAnalysis);
            testData.residentialRooms.forEach((room, index) => {
                Income._Residential.InPlaceRentRoll.enterRoomsNumberByRowNumber(room, index);
            });
        
            cy.stepInfo(`2. Go to the Income → Expense Forecast → Fuel check Per SF 
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

        it("[QA-4854]", () => {
            cy.stepInfo(`3. The value in the Fuel is taken from Income → 
                    Expense Forecast → Fuel Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.fuelSfTotal))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4855]", () => {
            cy.stepInfo(`3. The value in the Fuel is taken from Income → 
                    Expense Forecast → Fuel → Appraiser's Forecast cell`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.fuelSfPerSf.toFixed(2))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4858]", () => {
            cy.stepInfo(`3. The value in the Fuel → Per Unit is calculated 
                    by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.fuelSfPerUnit))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4864]", () => {
        // Navigate to Expense Forecast and change basis
            testData.forecastItem.basis = "unit" as BoweryReports.UnitSF;
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.forecastItem);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();

            cy.stepInfo(`3. The value in the Fuel is taken from Income → Expense Forecast → 
            Fuel Forecast Discussion generated commentary`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.fuelUnitTotal))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4865]", () => {
            cy.stepInfo(`3. The value in the Fuel is taken from Income → 
                    Expense Forecast → Fuel → Appraiser's Forecast cell`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.fuelUnitPerSf.toFixed(2))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4866]", () => {
            cy.stepInfo(`3. The value in the Fuel → Per Unit is calculated 
                    by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.fuelUnitPerUnit))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4921]", () => {
        // Navigate to Expense Forecast and change basis
            testData.forecastItem.basis = "room" as BoweryReports.UnitSF;
            _NavigationSection.navigateToExpenseForecast();
            Income._ExpenseForecastActions.switchExpenseForecastBasis(testData.forecastItem);
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();

            cy.stepInfo(`3. Per Room radio button is checked and the value 
                    into Appraiser’s Forecast cell is filled in`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.fuelRoomTotal))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4922]", () => {
            cy.stepInfo(`3. The value in the Fuel is taken from Income → 
                    Expense Forecast → PSF: Total / GBA Value`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.fuelRoomPerSf.toFixed(2))}`, 
                proFormaTypes.fuel);
        });

        it("[QA-4923]", () => {
            cy.stepInfo(`3. The value in the Fuel → Per Unit is calculated 
                    by the formula: Total / # of ResidentialUnits`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.fuelRoomPerUnit))}`, 
                proFormaTypes.fuel);
        });
    
    });