import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4510-12.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property } from "../../../../actions";
import proFormaTypes from "../../../../enums/proFormaTypes.enum";
import Enums from "../../../../enums/income/incomeTypesCellNames.enum";

describe("Potential Storage Income", 
    { tags:[ "@income", "@pro_forma" ] }, () => { 
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo("2. Go to Property → Amenities, check Storage checkbox");
            _NavigationSection.navigateToPropertyAmenities();
            Property._Amenities.addStorageUnits(testData.storageUnits);
        
            cy.stepInfo("3. Go to Income → Miscellaneous → Storage and fill in all necessary values"); 
            _NavigationSection.navigateToStorage();
            Income._MiscellaneousManager.Storage.addStorageIncome(testData.storageIncome);
        
            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it("[QA-4510]", () => {
            cy.stepInfo(`5 Verify that Pro Forma table contains Storage Income Total value`);
            Income._ProFormaActions.verifyCategoryTotal(
                `$${numberWithCommas(Math.round(testData.storageIncome))}`, 
                proFormaTypes.storageIncome);

            cy.stepInfo(`5.1 Verify that Total is taken from Income → Potential Gross Income → 
                    table → Storage Income`);
            _NavigationSection.navigateToPotentialGrossIncome();
            Income._PotentialGrossIncome.verifyIncomeTypeUnified(
                Enums.storageIncome, 
                `$${numberWithCommas(testData.storageIncome.toFixed(2))}`);
        });

        it("[QA-4511]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Storage Income PSF value`);
            Income._ProFormaActions.verifyCategoryPSFTotal(
                `$${numberWithCommas(testData.storageIncomePerSf.toFixed(2))}`, 
                proFormaTypes.storageIncome);
        });

        it("[QA-4512]", () => {
            cy.stepInfo(`5. Verify that Pro Forma table contains Storage Income Per Unit value`);
            Income._ProFormaActions.verifyCategoryPerUnitTotal(
                `$${numberWithCommas(Math.round(testData.storageIncomePerUnit))}`, 
                proFormaTypes.storageIncome);
        });
    });