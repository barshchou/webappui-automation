import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4301.fixture";
import { createReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import Sales from "../../../../actions/sales/sales.manager";

describe("Prospective Market Value As Stabilized -> Less Laundry Rent Loss data is pulled from Cap Rate Conclusion",
    { tags:[ "@sales", "@value_conclusion" ] }, () => {
        
        beforeEach("Login, create report", () => {
            createReport(testData.reportCreationData);
        });

        it("Test body", () => {
            NavigationSection.navigateToPropertySummary();
            Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
            NavigationSection.navigateToPropertyAmenities();
            Property.Amenities.checkLaundryRoomCheckbox();
            NavigationSection.navigateToResInPlaceRentRoll();
            Income.Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.bedrooms)
                .enterRentTypeCellByRowNumber(testData.rentType)
                .enterLeaseStatusByRowNumber(testData.leaseStatus);
            NavigationSection.navigateToLaundry();
            Income.Miscellaneous.Laundry.enterLaundryIncome(testData.laundryIncome)
                .enterLaundryVCLossPercentage(testData.vcLossPercentage, testData.vcLossValue);
            NavigationSection.navigateToCapRateConclusion();
            Income.CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate)
                .enterLaundryLossMonths(testData.lossMonths, testData.valueConclusionKeyAsStabilized)
                .enterLaundryLossMonths(testData.lossMonths, testData.valueConclusionKeyAsComplete);
            NavigationSection.navigateToSalesValueConclusion()
                .verifyProgressBarNotExist();
            Sales.ValueConclusion.verifyAsStabilizedLaundryLossMonths(testData.lossMonths)
                .verifyAsCompleteLaundryLossMonths(testData.lossMonths)
                .verifyAsStabilizedLaundryLossAmount(testData.laundryLossesAmount)
                .verifyAsCompleteLaundryLossAmount(testData.laundryLossesAmount);
        });
    });