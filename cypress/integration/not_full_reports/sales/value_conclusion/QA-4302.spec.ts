import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4302.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property, Sales } from "../../../../actions";

describe("Prospective Market Value As Stabilized -> Less Storage Rent Loss data is pulled from Cap Rate Conclusion",
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

        it("[QA-4302]", () => {
            cy.stepInfo(`1. Login, create report. Add residential units.`);
            createReport(testData.reportCreationData);

            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);

            cy.stepInfo(`2. Go to Property → Amenities page and check Storage Units check-box 
                        and put in the number of Storage Units`);
            _NavigationSection.navigateToPropertyAmenities();
            Property._Amenities.addStorageUnits(testData.storageUnits);

            cy.stepInfo(`3. Fill in data on the Income → Residential → In-Place Rent Roll page. Click Save button.`);
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.bedrooms)
                .enterRentTypeCellByRowNumber(testData.rentType)
                .enterLeaseStatusByRowNumber(testData.leaseStatus);

            cy.stepInfo(`4. Fill in the values in the Income → Miscellaneous → Storage`);
            _NavigationSection.navigateToStorage();
            Income._MiscellaneousManager.Storage.addStorageIncome(testData.storageIncome)
                .enterStorageVCLossPercentage(testData.storageVCLoss, testData.storageVcLossTypeRadio);

            cy.stepInfo(`5. Fill in the value in the Cap Rate Conclusion → Appraiser's Conclusion field`);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate);

            cy.stepInfo(`6. Input the number of months in the Cap Rate Conclusion Summary Table → Less 
                        Storage Rent Loss raw → Time Period column. Click Save button.`);
            Income._CapRateConclusion.enterMiscellaneousLossMonths(testData.lossMonths,
                testData.valueConclusionKeyAsStabilized, testData.rentLossTypeStorage)
                .enterMiscellaneousLossMonths(testData.lossMonths, testData.valueConclusionKeyAsComplete, 
                    testData.rentLossTypeStorage);

            cy.stepInfo(`7. Go to Sales → Value Conclusion page → Sales Value Conclusion Table → 
                        Less Storage Rent Loss raw and compare the values from Time Period and Amount columns with the 
                        Time Period and Amount values from Income → Cap Rate Conclusion page → 
                        Cap Rate Conclusion Summary Table → Less Storage Rent Loss raw`);
            _NavigationSection.navigateToSalesValueConclusion();
            Sales._ValueConclusion.verifyMiscellaneousLossMonths(testData.lossMonths,
                testData.valueConclusionKeyAsStabilized, testData.rentLossTypeStorage)
                .verifyMiscellaneousLossMonths(testData.lossMonths, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeStorage);

            cy._mapGet(testData.valueConclusionKeyAsStabilized + testData.rentLossTypeStorage)
                .then(storageLoss => {
                    Sales._ValueConclusion.verifyMiscellaneousLossAmount(storageLoss,
                        testData.valueConclusionKeyAsStabilized, testData.rentLossTypeStorage);
                });
            cy._mapGet(testData.valueConclusionKeyAsComplete + testData.rentLossTypeStorage)
                .then(storageLoss => {
                    Sales._ValueConclusion.verifyMiscellaneousLossAmount(storageLoss,
                        testData.valueConclusionKeyAsComplete, testData.rentLossTypeStorage);
                });
        });
    });