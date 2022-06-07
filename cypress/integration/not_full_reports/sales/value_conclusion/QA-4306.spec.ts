import testData from "../../../../fixtures/not_full_reports/sales/value_conclusion/QA-4306.fixture";
import NavigationSection from "../../../../actions/base/navigationSection.actions";
import Property from "../../../../actions/property/property.manager";
import Income from "../../../../actions/income/income.manager";
import Sales from "../../../../actions/sales/sales.manager";
import { createReport, deleteReport } from "../../../../actions/base/baseTest.actions";

describe(`Prospective Market Value As Stabilized -> Less Entrepreneurial Profit 
                data is pulled from Cap Rate Conclusion`, 
    { tags:[ "@sales", "@value_conclusion" ] }, () => {

    before("Login, create report", () => {
        createReport(testData.reportCreationData);
    });

    it("Test body", () => {
        NavigationSection.navigateToPropertySummary();
        Property.Summary.enterNumberOfResUnits(testData.generalData.numberOfUnits);
        NavigationSection.navigateToResInPlaceRentRoll();
        Income.Residential.InPlaceRentRoll.enterBedroomsNumberByRowNumber(testData.rentRollData.bedrooms)
            .enterRentTypeCellByRowNumber(testData.rentRollData.rentType)
            .enterLeaseStatusByRowNumber(testData.rentRollData.leaseStatus)
            .enterMonthlyRentByRowNumber(testData.rentRollData.monthlyRent);
        NavigationSection.navigateToCapRateConclusion();
        Income.CapRateConclusion.enterConclusionSectionConcludedCapRate(testData.generalData.appraiserConclusion)
            .enterAsCompleteLessEntrepreneurialProfit(testData.generalData.lessEntrepreneurialProfit)
            .enterAsCompleteLessBuyoutCost(testData.generalData.lessBuyoutCost)
            .verifyPopUpWithTitleExists(testData.generalData.lessEntrepreneurialProfitPopUp);
        NavigationSection.navigateToSalesValueConclusion()
            .verifyProgressBarNotExist();
        Sales.ValueConclusion.verifyAsCompleteLessEntrepreneurialProfit(testData.generalData.lessEntrepreneurialProfit)
            .verifyPopUpWithTitleExists(testData.generalData.lessEntrepreneurialProfitPopUp);
        deleteReport(testData.reportCreationData.reportNumber);
    });
});
