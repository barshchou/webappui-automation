import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4507-09.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/income/incomeTypesCellNames.enum";

describe("Potential Laundry Income", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo("2. Go to Property → Amenities, check Laundry checkbox");
            _NavigationSection.navigateToPropertyAmenities();
            Property._Amenities.checkLaundryRoomCheckbox();
        
            cy.stepInfo("3. Go to Income → Miscellaneous → Laundry and fill in all necessary values"); 
            _NavigationSection.navigateToLaundry();
            Income._MiscellaneousManager.Laundry.enterLaundryIncome(testData.laundryIncome);
        
            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4507]", () => {
            cy.stepInfo(`5 Verify that Pro Forma table contains Laundry Income Total value`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.laundryIncome))}`, 
                proFormaTypes.laundryIncome);

            cy.stepInfo(`5.1 Verify that Total is taken from Income → Potential Gross Income → 
                    table → Laundry Income`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.verifyIncomeTypeUnified(
                Enums.laundryIncome, 
                `$${numberWithCommas(testData.laundryIncome.toFixed(2))}`);
        });

        it("[QA-4508]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Laundry Income PSF value`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.laundryIncomePerSf.toFixed(2))}`, 
                proFormaTypes.laundryIncome);
        });

        it("[QA-4509]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Laundry Income Per Unit value`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.laundryIncomePerUnit))}`, 
                proFormaTypes.laundryIncome);
        });
    });