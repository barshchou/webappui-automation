import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4504-06.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Income, DataCollections, Property } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/income/incomeTypesCellNames.enum";

describe("Potential Parking Income", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. Go to Property → Amenities, check Parking checkbox and fill 
            in the number of Parking Spaces`);
            _NavigationSection.navigateToPropertyAmenities();
            Property._Amenities.addParkingPlaces(testData.numberOfParkingPlaces);
        
            cy.stepInfo("3. Go to Income → Miscellaneous → Parking and fill in all necessary values"); 
            _NavigationSection.navigateToParking();
            Income._MiscellaneousManager.Parking.addMonthlyRents(testData.monthlyRents);
        
            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4504]", () => {
            cy.stepInfo(`5 Verify that Pro Forma table contains Parking Income Total value`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.annualRentTotal))}`, 
                proFormaTypes.parkingIncome);

            cy.stepInfo(`5.1 Verify that Total is taken from Income → Potential Gross Income → table → Parking Income`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.verifyIncomeTypeUnified(
                Enums.parkingIncome, 
                `$${numberWithCommas(testData.annualRentTotal.toFixed(2))}`);
        });

        it("[QA-4505]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Parking Income PSF value`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.parkingIncomePerSf.toFixed(2))}`, 
                proFormaTypes.parkingIncome);
        });

        it("[QA-4506]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Parking Income Per Unit value`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.parkingIncomePerUnit))}`, 
                proFormaTypes.parkingIncome);
        });
    });