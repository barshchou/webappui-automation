import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4305.fixture";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import Sales from "../../../../actions/sales/sales.manager";
import { Tag } from "../../../../utils/tags.utils";

describe("Prospective Market Value As Stabilized -> Less Commission Fee data is pulled from Cap Rate Conclusion",
{ tags:[ Tag.sales, Tag.value_conclusion ] }, () => {
    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterRentTypeCellByRowNumber(testData.rentType);
        NavigationSection.navigateToCapRateConclusion();
        Income.CapRateConclusion.enterAsStabilizedCommissionFeeAmount(testData.commissionFee);
        NavigationSection.navigateToSalesValueConclusion()
            .verifyProgressBarNotExist();
        Sales.ValueConclusion.verifyAsStabilizedCommissionFeeAmount(testData.commissionFee);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});