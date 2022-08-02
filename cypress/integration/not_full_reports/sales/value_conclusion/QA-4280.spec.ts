import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4280.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Income from "../../../../actions/income/income.manager";
import Property from "../../../../actions/property/property.manager";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport } from "../../../../actions/base/baseTest.actions";
import enums from "../../../../enums/enums";

describe(`Prospective Market Value As Stabilized -> Less Residential Rent Loss 
                data is pulled from Cap Rate Conclusion`, 
{ tags:[ "@sales", "@value_conclusion" ] }, () => {
    beforeEach("Login action", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.data.numberOfUnits);
        if (testData.reportCreationData.conclusionValue === "AS_COMPLETE") {
            Property.Summary.enterCurrentNumberOfResUnits(testData.data.numberOfUnits);
        }
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.data.bedroomsNumber)
            .enterRentTypeCellByRowNumber(testData.data.rentType)
            .enterLeaseStatusByRowNumber(testData.data.leaseStatus)
            .enterMonthlyRentByRowNumber(testData.data.monthlyRent);
        NavigationSection.navigateToCapRateConclusion();
        Income.CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.data.appraisersConclusion)
            .clickAddRentLoss(enums.UNIT_INCOME_TYPE.residential);
        if (testData.reportCreationData.conclusionValue === "AS_COMPLETE") {
            Income.CapRateConclusion.clickAsStabilizedRentLossSwitch(enums.VALUE_CONCLUSION_NAME.asStabilized);
        }
        Income.CapRateConclusion.checkRentLossCheckboxByRow()
            .clickAddButton()
            .enterAsStabResRentLossTimePeriodByRow(testData.data.rentLossTimePeriod);
        NavigationSection.navigateToSalesValueConclusion()
            .verifyProgressBarNotExist();
        Sales.ValueConclusion.verifyAsStabResRentLossTimePeriodByRow(testData.data.rentLossTimePeriod);
    });
});
