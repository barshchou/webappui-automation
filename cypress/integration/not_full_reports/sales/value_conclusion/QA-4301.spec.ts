import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4301.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import { _NavigationSection } from "../../../../actions/base";
import { DataCollections, Income, Property, Sales } from "../../../../actions";
describe("Prospective Market Value As Stabilized -> Less Laundry Rent Loss data is pulled from Cap Rate Conclusion",
    { tags:[ "@sales", "@value_conclusion" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            _NavigationSection.navigateToSubjectPropertyData();
            DataCollections._SubjectPropertyData.enterNumberOfResUnits(testData.numberOfUnits);
            _NavigationSection.navigateToPropertyAmenities();
            Property._Amenities.checkLaundryRoomCheckbox();
            _NavigationSection.navigateToResInPlaceRentRoll();
            Income._Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.bedrooms)
                .enterRentTypeCellByRowNumber(testData.rentType)
                .enterLeaseStatusByRowNumber(testData.leaseStatus);
            _NavigationSection.navigateToLaundry();
            Income._MiscellaneousManager.Laundry.enterLaundryIncome(testData.laundryIncome)
                .enterLaundryVCLossPercentage(testData.vcLossPercentage, testData.vcLossValue);
            _NavigationSection.navigateToCapRateConclusion();
            Income._CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate)
                .enterMiscellaneousLossMonths(testData.lossMonths, testData.valueConclusionKeyAsStabilized, 
                    testData.rentLossTypeLaundry)
                .enterMiscellaneousLossMonths(testData.lossMonths, testData.valueConclusionKeyAsComplete, 
                    testData.rentLossTypeLaundry);
            _NavigationSection.navigateToSalesValueConclusion()
                .verifyProgressBarNotExist();
            Sales._ValueConclusion.verifyMiscellaneousLossMonths(testData.lossMonths,
                testData.valueConclusionKeyAsStabilized, testData.rentLossTypeLaundry)
                .verifyMiscellaneousLossMonths(testData.lossMonths, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeLaundry)
                .verifyMiscellaneousLossAmount(testData.laundryLossesAmount, 
                    testData.valueConclusionKeyAsStabilized, testData.rentLossTypeLaundry)
                .verifyMiscellaneousLossAmount(testData.laundryLossesAmount, 
                    testData.valueConclusionKeyAsComplete, testData.rentLossTypeLaundry);
        });
    });