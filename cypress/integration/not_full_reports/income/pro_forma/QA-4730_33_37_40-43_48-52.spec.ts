import { numberWithCommas } from '../../../../../utils/numbers.utils';
import testData from "../../../../fixtures/not_full_reports/income/pro_forma/QA-4730_33_37_40-43_48-52.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { Property } from '../../../../actions';
import { Income } from "../../../../actions";

describe("Pro Forma page table Miscellaneous Loss", 
    { tags:[ "@income", "@pro_forma" ] }, () => {
    
        before("Login, create report, prepare data", () => {
            cy.stepInfo(`1. Create new report or open the report which is already created. 
                    Make sure that there is at least three commercial units.`);
            createReport(testData.reportCreationData);
            _NavigationSection.navigateToPropertySummary();
            Property._Summary.enterGrossBuildingArea(testData.grossBuildingArea)
                .enterNumberOfResUnits(testData.numberOfResidentialUnits)
                .enterNumberOfCommercialUnits(testData.numberOfCommercialUnits);

            cy.stepInfo(`2. Go to Income → Residential → In-Place Rent Roll and fill 
            in all necessary values to the table`); 
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterMonthlyRents(testData.residentialMonthlyRent);

            cy.stepInfo(`3. Go to Property → Commercial Units and fill in the values 
            of Leasable Area for all commercial units`); 
            _NavigationSection.navigateToCommercialUnits();
            Property._CommercialUnits.enterListUnitSF(testData.listOfUnitsSF, testData.numberOfCommercialUnits);

            cy.stepInfo(`4. Go to Income → Commercial → In-Place Rent Roll and fill 
            in all necessary values to the table`); 
            _NavigationSection.navigateToCommercialInPlaceRentRoll();
            Income._CommercialManager.InPlaceRentRoll.chooseListLeaseStatuses(testData.leaseStatuses, 
                testData.numberOfCommercialUnits);
            testData.rentsPsf.forEach((rent, index) => {
                Income._CommercialManager.InPlaceRentRoll.enterRentPerSFAnnuallyByRowNumber(rent, index);
            });
        
            cy.stepInfo(`5. Go to Property → Amenities, check Parking checkbox and fill 
            in the number of Parking Spaces, check Laundry checkbox, check Storage Units checkbox 
            and fill in the number of Storage Units`);
            _NavigationSection.navigateToPropertyAmenities();
            Property._Amenities.addParkingPlaces(testData.numberOfParkingPlaces)
                .addStorageUnits(testData.storageUnits)
                .checkLaundryRoomCheckbox();
        
            cy.stepInfo(`6. Go to Income → Miscellaneous → Parking and fill in all necessary values`);
            _NavigationSection.navigateToParking();
            Income._MiscellaneousManager.Parking.addMonthlyRents(testData.monthlyRents)
                .addParkingVCLossPercentage(testData.parkingVcLossTypeRadio, testData.parkingVCLoss);

            cy.stepInfo(`7. Go to Income → Miscellaneous → Laundry and fill in all necessary values`); 
            _NavigationSection.navigateToLaundry();
            Income._MiscellaneousManager.Laundry.enterLaundryIncome(testData.laundryIncome)
                .enterLaundryVCLossPercentage(testData.laundryVCLoss, testData.laundryVcLossTypeRadio);

            cy.stepInfo(`8. Go to Income → Miscellaneous → Storage and fill in all necessary values`); 
            _NavigationSection.navigateToStorage();

            Income._MiscellaneousManager.Storage.addStorageIncome(testData.storageIncome)
                .enterStorageVCLossPercentage(testData.storageVCLoss, testData.storageVcLossTypeRadio);

            cy.stepInfo(`9. Go to Income → Miscellaneous → Other and fill in all necessary values`); 
            _NavigationSection.navigateToOther();
            Income._MiscellaneousManager.Other.addOtherIncome(testData.otherIncomeItem);

            cy.saveLocalStorage();
        });
    
        beforeEach("Restore local storage", () => {
            cy.restoreLocalStorage();
            _NavigationSection.navigateToProForma()
                .verifyProgressBarNotExist();
        });

        it(`[QA-4730]`, () => {
            cy.stepInfo(`10. The value in the Less Parking V/C Loss @ X% is taken from Income → 
                    Potential Gross Income → table → Less Parking V/C Loss @ X% → $`);
            Income._ProFormaActions.verifyResidentialVCLossTotal(
                testData.parkingVcLossTypeRadio, 
                `-$${numberWithCommas(Math.round(testData.parkingLossTotal))}`);
        });

        it(`[QA-4733]`, () => {
            cy.stepInfo(`10. Verify that Pro Forma table contains Effective Gross Income PSF value`);
            Income._ProFormaActions.verifyResidentialVCLossPerSF(
                testData.parkingVcLossTypeRadio, testData.grossBuildingArea);
        });

        it(`[QA-4737]`, () => {
            cy.stepInfo(`10. Verify that Pro Forma table contains Effective Gross Income Per Unit value`);
            Income._ProFormaActions.verifyResidentialVCLossPerUnit(
                testData.parkingVcLossTypeRadio, testData.numberOfResidentialUnits);
        });

        it(`[QA-4740]`, () => {
            cy.stepInfo(`10. The value in the Less Laundry V/C Loss @ X% is taken from Income → 
                    Potential Gross Income → table → Less Laundry V/C Loss @ X% → $`);
            Income._ProFormaActions.verifyResidentialVCLossTotal(
                testData.laundryVcLossTypeRadio, 
                `-$${numberWithCommas(Math.round(testData.laundryLossTotal))}`);
        });

        it(`[QA-4741]`, () => {
            cy.stepInfo(`10. The value in the Less Laundry V/C Loss @ X% → PSF is calculated 
                    by the formula: Total / GBA`);
            Income._ProFormaActions.verifyResidentialVCLossPerSF(
                testData.laundryVcLossTypeRadio, testData.grossBuildingArea);
        });

        it(`[QA-4742]`, () => {
            cy.stepInfo(`10. The value in the Less Laundry V/C Loss @ X% → Per Unit is calculated 
                    by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyResidentialVCLossPerUnit(
                testData.laundryVcLossTypeRadio, testData.numberOfResidentialUnits);
        });

        it(`[QA-4743]`, () => {
            cy.stepInfo(`10. The value in the Less Storage V/C Loss @ X% is taken from Income → 
                    Potential Gross Income → table → Less Laundry V/C Loss @ X% → $`);
            Income._ProFormaActions.verifyResidentialVCLossTotal(
                testData.storageVcLossTypeRadio, 
                `-$${numberWithCommas(Math.round(testData.storageLossTotal))}`);
        });

        it(`[QA-4748]`, () => {
            cy.stepInfo(`10. The value in the Less Storage V/C Loss @ X% → PSF is calculated 
                    by the formula: Total / GBA`);
            Income._ProFormaActions.verifyResidentialVCLossPerSF(
                testData.storageVcLossTypeRadio, testData.grossBuildingArea);
        });

        it(`[QA-4749]`, () => {
            cy.stepInfo(`10. The value in the Less Storage V/C Loss @ X% → Per Unit is calculated 
                    by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyResidentialVCLossPerUnit(
                testData.storageVcLossTypeRadio, testData.numberOfResidentialUnits);
        });

        it(`[QA-4750]`, () => {
            cy.stepInfo(`10. The value in the Less [Other] V/C Loss @ X% is taken from Income → 
                    Potential Gross Income → table → Less [Other] V/C Loss @ X% → $`);
            Income._ProFormaActions.verifyResidentialVCLossTotal(
                testData.otherIncomeItem.incomeCategory, 
                `-$${numberWithCommas(Math.round(testData.otherLossTotal))}`);
        });

        it(`[QA-4751]`, () => {
            cy.stepInfo(`10. The value in the Less [Other] V/C Loss @ X% → PSF is calculated 
                    by the formula: Total / GBA`);
            Income._ProFormaActions.verifyResidentialVCLossPerSF(
                testData.otherIncomeItem.incomeCategory, testData.grossBuildingArea);
        });

        it(`[QA-4752]`, () => {
            cy.stepInfo(`10. The value in the Less [Other] V/C Loss @ X% → Per Unit is calculated 
                    by the formula: Total / # of Residential Units`);
            Income._ProFormaActions.verifyResidentialVCLossPerUnit(
                testData.otherIncomeItem.incomeCategory, testData.numberOfResidentialUnits);
        });
    });