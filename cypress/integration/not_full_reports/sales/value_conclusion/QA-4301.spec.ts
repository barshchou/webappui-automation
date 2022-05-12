import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4301.fixture";
import {createReport, deleteReport} from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import Sales from "../../../../actions/sales/sales.manager";
import { Tag } from "../../../../utils/tags.utils";

describe("Prospective Market Value As Stabilized -> Less Laundry Rent Loss data is pulled from Cap Rate Conclusion",
{tags:[Tag.sales,Tag.value_conclusion]}, () => {
    before("Login, create report", () => {
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
            .checkLaundryVCLossRadio(testData.vcLossValue)
            .enterLaundryVCLossPercentage(testData.vcLossPercentage);
        NavigationSection.navigateToCapRateConclusion();
        Income.CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.concludedCapRate)
            .enterAsStabilizedLaundryLossMonths(testData.lossMonths)
            .enterAsCompleteLaundryLossMonths(testData.lossMonths);
        NavigationSection.navigateToSalesValueConclusion()
            .verifyProgressBarNotExist();
        Sales.ValueConclusion.verifyAsStabilizedLaundryLossMonths(testData.lossMonths)
            .verifyAsCompleteLaundryLossMonths(testData.lossMonths)
            .verifyAsStabilizedLaundryLossAmount(testData.laundryLossesAmount)
            .verifyAsCompleteLaundryLossAmount(testData.laundryLossesAmount);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});